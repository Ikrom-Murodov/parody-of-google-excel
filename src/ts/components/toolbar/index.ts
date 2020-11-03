import { IComponent } from '@/core/interface';

import { componentTemplate } from './toolbar.component.template';

export class Toolbar implements IComponent {
  static className = 'excel-toolbar';

  public toHtml(): HTMLElement {
    return componentTemplate();
  }

  public destroy(): void {}
}
