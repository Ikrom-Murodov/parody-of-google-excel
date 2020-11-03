import { IPage, IPageParams } from 'router-for-dom';
import { pageTemplate } from './main.page.template';

export class MainPage implements IPage {
  constructor(private params: IPageParams) {}

  public toHtml(): HTMLElement {
    return pageTemplate();
  }
}
