import { DomListener } from 'add-event-for-dom-elements';
import { IPage, IPageParams } from 'router-for-dom';
import { IDomHelper, $ } from 'helper-for-dom';
import { storage, uid } from '@/utils';
import { pageTemplate } from './main.page.template';

export class MainPage extends DomListener implements IPage {
  constructor(private pageParams: IPageParams) {
    // eslint-disable-next-line
    // @ts-ignore
    super({
      eventNames: ['click'],
    });
  }

  public onClick = (event: MouseEvent) => {
    const $target: IDomHelper = $(event.target as HTMLElement);

    if ($target.closest('[data-type="create-new-table"]')) {
      const id: string = uid(15);
      this.pageParams.router.push(`/table/${id}`);
    }
  };

  /**
   * This method will be called by the router to render the page template
   *   in the browser.
   * @public - This method is available to all instances of the MainPage class.
   * @return {HTMLElement} - Returns the page template.
   */
  public async toHtml(): Promise<HTMLElement> {
    const data = await storage.getAllData();
    return pageTemplate(data);
  }

  public afterRenderElement(): void {
    // eslint-disable-next-line
    // @ts-ignore
    this.params.element = document.querySelector(
      '.section-table',
    ) as HTMLElement;

    this.initDomListener();
  }
}
