import { DomListener } from 'add-event-for-dom-elements';
import { IEmitterCallBack, IEmitterSubscriber } from 'observer-pattern-js';
import { IExcelComponentParams } from '@/core/interface';

export class ExcelComponent extends DomListener {
  /**
   * This field contains a list of all subscribers.
   * @private
   */
  private subscribers: IEmitterSubscriber[] = [];

  constructor(private excelParams: IExcelComponentParams) {
    super({
      element: excelParams.element,
      eventNames: excelParams.eventNames,
    });
  }

  /**
   * Adds the listener function to the end of the listeners array for the event named eventName.
   * @param { string } eventName - name of events to subscribe.
   * @param { IEmitterCallBack } cb - listener function.
   * @public - This method is available to all instances of the  EventEmitter class.
   * @return { void } - This method returns nothing.
   */
  public $on(eventName: string, cb: IEmitterCallBack): void {
    const subscriber = this.excelParams.emitter.subscribe(eventName, cb);
    this.subscribers.push(subscriber);
  }

  /**
   * Synchronously calls each of the listeners registered for the event named eventName.
   * @param { string } eventName.
   * @param { ...* } args - You can pass as many arguments as you like.
   * @throws Throws an error if no listener has been registered for an event named eventName.
   * @public - This method is available to all instances of the  EventEmitter class.
   * @return { void } - This method returns nothing.
   */
  public $emit(eventName: string, ...args: unknown[]): void {
    this.excelParams.emitter.emit(eventName, ...args);
  }

  /**
   * To navigate to a different URL, use this method.
   * @param{ string } path - Url address to go to a new page.
   * @public - This method is available to all instances of the ExcelComponent class.
   * @return { Promise<void> }
   */
  public async $push(path: string): Promise<void> {
    await this.excelParams.router.push(path);
  }

  /**
   * This method returns the states of the browser history.
   * @public - This method is available to all instances of the ExcelComponent class.
   * @returns {Object} - history state
   */
  public get $getStateHistory(): { [key: string]: string } {
    return this.excelParams.router.getStateHistory();
  }

  /**
   * This method needs to be called when you want to initialize
   *   the class (add event to html element).
   * @return { void } - This method returns nothing.
   */
  public init(): void {
    this.initDomListener();
  }

  /**
   * this method needs to be called when you want to destroy
   *   the class (remove event from html element or unsubscribe)
   * @return { void } - This method returns nothing.
   */
  public destroy(): void {
    this.removeDomListener();
    this.subscribers.forEach((subscriber) => subscriber.unsubscribe());
  }
}
