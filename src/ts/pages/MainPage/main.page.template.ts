import { $ } from 'helper-for-dom';
import { TRootState } from '@/store';

let appState: TRootState[];

/**
 * This function returns the header of the main page.
 * @return {string} - Html template
 */
function headerTemplate(): string {
  const template: string = `
    <header class="header">
      <div class="header__wrapper-content">
        <div class="header__content main-page__container">
          <div class="header__wrapper-title">
            <h1 class="header__title"> Parody of google excel.</h1>
           </div>
        </div>
      </div>
    </header>
  `;

  return template;
}

/**
 * This function returns home page section.
 * @return {string} - Html template
 */
function sectionTableTemplate(): string {
  const template: string = `
    <section class="section-table">
      <div class="section-table__wrapper-content">
        <div class="section-table__content main-page__container">
          <div class="section-table-button">
            <div class="section-table-button__wrapper-content">
              <span class="section-table-button__title">
                 Create a new table.
               </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  return template;
}

/**
 * This function returns a list of created tables.
 * @return {string} - Html template
 */
function test(): string {
  // eslint-disable-next-line
  const template: string[] = appState.map((state): string => {
    return `
       <li  data-router-link="/table/${state.pageId}" 
        class="section-created-tables__item">
       
        <span data-router-link="/table/${state.pageId}" 
          class="section-created-tables__item-name">
          ${state.tableName}
        </span>
        
         <div data-router-link="/table/${state.pageId}"  
           class="section-created-tables__wrapper-item-opened">
           
          <span 
            data-router-link="/table/${state.pageId}" 
            class="section-created-tables__item-opened">
              ${new Date(state.openedDate).toLocaleDateString()}
              ${new Date(state.openedDate).toLocaleTimeString()}
          </span>
          
        </div>
      </li>
    `;
  });

  return template.join(' ');
}

/**
 * This function returns the section of the main page where the created
 *   tables are located.
 * @return {string} - Html template.
 */
function sectionCreatedTableTemplate(): string {
  const template: string = `
    <section class="section-created-tables">
      <div class="section-created-tables__wrapper-content">
        <div class="section-created-tables__content main-page__container">
          <div class="section-created-tables__titles">
            <span>Table name.</span>
            <span>Last opened date.</span>
          </div>
          <div class="section-created-tables__wrapper-list">
            <ul class="section-created-tables__list">
              ${test()}
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;

  return template;
}

/**
 * This function creates an html element and adds all sections of the main page
 * to it and then returns the html element.
 * @param {TRootState[]} state - app state
 * @return {HTMLElement}
 */
export function pageTemplate(state: TRootState[]): HTMLElement {
  const $element = $.create('div', 'main-page');

  appState = state;

  $element.html(`
    ${headerTemplate()}
    ${sectionTableTemplate()}
    ${sectionCreatedTableTemplate()}
  `);

  return $element.$el;
}
