import { IPage, IPageParams } from 'router-for-dom';
import { pageTemplate } from './main.page.template';

export class MainPage implements IPage {
  constructor(private params: IPageParams) {}

  /**
   * This method will be called by the router to render the page template
   *   in the browser.
   * @public - This method is available to all instances of the MainPage class.
   * @return {HTMLElement} - Returns the page template.
   */
  public toHtml(): HTMLElement {
    return pageTemplate();
  }
}
