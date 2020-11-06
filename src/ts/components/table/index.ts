import { ExcelComponent } from '@/core/ExcelComponent';

import {
  IComponent,
  IComponentSettings,
  IComponentParams,
} from '@/core/interface';

import { componentTemplate } from './table.component.template';

export class Table extends ExcelComponent implements IComponent {
  private componentParams: IComponentParams;

  constructor({ componentParams, parentData }: IComponentSettings) {
    super({
      eventNames: [],
      ...parentData,
    });

    this.componentParams = componentParams;
  }

  static className = 'excel-table';

  public toHtml(): HTMLElement {
    return componentTemplate(1000);
  }

  public init(): void {
    super.init();
  }

  public destroy(): void {}
}
