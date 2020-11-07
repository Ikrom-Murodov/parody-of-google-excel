import { IDomParams } from 'add-event-for-dom-elements';
import { IEventEmitter } from 'observer-pattern-js';
import { IRouter } from 'router-for-dom';
import { IDomHelper } from 'helper-for-dom';

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

/**
 * Interface for parameter of the ExcelComponent class.
 * @interface
 */
export interface IExcelComponentParams extends IDomParams {
  emitter: IEventEmitter;
  router: IRouter;
  $root: IDomHelper;
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
    element: HTMLElement;
    $root: IDomHelper;
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
