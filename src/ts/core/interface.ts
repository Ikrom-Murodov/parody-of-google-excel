import { IDomParams } from 'add-event-for-dom-elements';
import { IEventEmitter } from 'observer-pattern-js';
import { IRouter } from 'router-for-dom';
import { IDomHelper } from 'helper-for-dom';
import { IStore } from 'parody-of-redux';
import { TRootState, TRootActions } from '@/store';

/**
 * Interface for components.
 * @interface
 */
export interface IComponent {
  toHtml(): HTMLElement;
  destroy(): void;
  init(): void;
}

/**
 * @interface
 */
export interface ICellId {
  row: number;
  column: number;
}

export type TStore = IStore<TRootState, TRootActions>;

/**
 * Interface for parameter of the ExcelComponent class.
 * @interface
 */
export interface IExcelComponentParams extends IDomParams {
  emitter: IEventEmitter;
  router: IRouter;
  $root: IDomHelper;
  store: TStore;
}

/**
 * Interface for input parameters of component.
 * @interface
 */
export interface IComponentParams {
  $root: IDomHelper;
}

/**
 * Component input settings.
 * @interface
 */
export interface IComponentSettings {
  componentParams: IComponentParams;

  parentData: {
    emitter: IEventEmitter;
    router: IRouter;
    $root: IDomHelper;
    store: TStore;
    element: HTMLElement;
  };
}

/**
 * @interface
 */
export interface ICellStyles {
  fontStyle: string;
  fontWeight: string;
  textAlign: string;
  textDecoration: string;
}
