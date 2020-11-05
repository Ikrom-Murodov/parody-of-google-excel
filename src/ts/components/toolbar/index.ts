import { ExcelComponent } from '@/core/ExcelComponent';

import {
  IComponent,
  IComponentParams,
  IComponentSettings,
} from '@/core/interface';

import { componentTemplate } from './toolbar.component.template';

export class Toolbar extends ExcelComponent implements IComponent {
  static className = 'excel-toolbar';

  private ExcelComponent: IComponentParams;

  constructor({ componentParams, parentData }: IComponentSettings) {
    super({
      eventNames: [],
      ...parentData,
    });

    this.ExcelComponent = componentParams;
  }

  public toHtml(): HTMLElement {
    return componentTemplate();
  }

  public destroy(): void {}
}
