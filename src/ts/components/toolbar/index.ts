import { $, IDomHelper } from 'helper-for-dom';

import { ExcelComponent } from '@/core/ExcelComponent';
import { TRootState } from '@/store';
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
      eventNames: ['click'],
      subscribeToState: [],
      ...parentData,
    });

    this.ExcelComponent = componentParams;
  }

  public storeChanged(state: TRootState) {}

  public toHtml(): HTMLElement {
    return componentTemplate();
  }

  public onClick = (event: MouseEvent): void => {
    const $target: IDomHelper = $(event.target as HTMLElement);
    const { type, value } = $target.dataset();

    if (type === 'button') {
      const styles = JSON.parse(value as string);
      this.$emit('toolbar:applyStyle', styles);
    }
  };

  public init(): void {
    super.init();
  }

  public destroy(): void {}
}
