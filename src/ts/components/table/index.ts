import { IComponent } from '@/core/interface';

import { componentTemplate } from './table.component.template';

export class Table implements IComponent {
  static className = 'excel-table';

  public toHtml(): HTMLElement {
    return componentTemplate(1000);
  }

  public destroy(): void {}
}
