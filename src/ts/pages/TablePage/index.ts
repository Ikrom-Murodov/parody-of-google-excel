import { EventEmitter, IEventEmitter } from 'observer-pattern-js';
import { createStore, IUnsubscribe } from 'parody-of-redux';
import { IPage, IPageParams } from 'router-for-dom';
import { $, IDomHelper } from 'helper-for-dom';
import {
  TRootState,
  TRootActions,
  rootReducer,
  initialState,
  actions,
} from '@/store';
import { IComponent, TStore } from '@/core/interface';
import * as Components from '@/components';
import { isEqual, storage } from '@/utils';

const arrayOfComponents = Object.values(Components);

export class TablePage implements IPage {
  /**
   * This field stores instances of classes.
   * @private - This field is not available to instances of the TablePage class.
   */
  private classInstances: IComponent[] = [];

  /**
   * This field is an instance of the EventEmitter class.
   * @private - This field is not available to instances of the TablePage class.
   */
  private emitter: IEventEmitter = new EventEmitter();

  /**
   * This field stores storage.
   * @private - This field is not available to instances of the TablePage class.
   */
  private store!: TStore;

  /**
   * This field contains the method for unsubscribing from the store.
   * @private This field is not available to instances of the TablePage class.
   */
  private unsubscribeFromStorage!: IUnsubscribe;

  constructor(private params: IPageParams) {}

  /**
   * This method creates a store and subscribes to it. If the state changes,
   *   the store saves the data on the server.
   * @private - this method is not available to instances of the TablePage class.
   * @return { Promise<void> }
   */
  private async init(): Promise<void> {
    const localStorageKey: string = `table:${this.params.stateHistory.id}`;
    const initState = (await storage.getItem(localStorageKey)) || initialState;

    this.store = createStore<TRootState, TRootActions>(
      rootReducer,
      initState as TRootState,
    );

    this.store.dispatch(actions.updateDate());
    this.store.dispatch(
      actions.changePageId(this.params.router.getStateHistory().id),
    );

    let prevState: TRootState = this.store.getState();

    this.unsubscribeFromStorage = this.store.subscribe((state) => {
      storage.setItem(localStorageKey, JSON.stringify(state));
      const stateKeys = Object.keys(state) as Array<keyof TRootState>;

      stateKeys.forEach((key) => {
        if (!isEqual(prevState[key], state[key])) {
          this.classInstances.forEach((component) => {
            if (component.subscribeToChangeStorage.includes(key)) {
              component.storeChanged(state);
            }
          });
        }
      });

      prevState = this.store.getState();
    });
  }

  /**
   * This method will be called by the router to render the page template
   *   in the browser.
   * @public - This method is available to all instances of the TablePage class.
   * @return {Promise<HTMLElement>} - Returns the page template asynchronously.
   */
  public async toHtml(): Promise<HTMLElement> {
    await this.init();

    const $root = $.create('div', 'excel');
    const $childRoot = $.create('div', 'excel__container');

    this.classInstances = arrayOfComponents.map((Component) => {
      const $wrapperEl: IDomHelper = $.create('div', Component.className);

      const component = new Component({
        componentParams: {
          $root: $wrapperEl,
        },

        parentData: {
          element: $wrapperEl.$el,
          emitter: this.emitter,
          router: this.params.router,
          $root: $wrapperEl,
          store: this.store,
        },
      });

      $wrapperEl.html(component.toHtml());
      $childRoot.append($wrapperEl);
      return component;
    });

    $root.append($childRoot);
    return $root.$el;
  }

  /**
   * This method will be called by the router after rendering the html element.
   * @public - This method is available to all instances of the TablePage class.
   * @return { void } - This method returns nothing.
   */
  public afterRenderElement(): void {
    this.classInstances.forEach((component) => component.init());
  }
}
