import { $ } from 'helper-for-dom';

/**
 * This interface describes the state of the button.
 * @interface
 */
interface IButtonState {
  iconName: string;
  active: boolean;
  value: {
    [key: string]: string;
  };
}

/**
 *  This function returns the button of the toolbar component.
 *
 *  @param {IButtonState} buttonState - Button state
 *  @return {string} - Html template
 */
function buttonsTemplate(buttonState: IButtonState): string {
  const activeClass = buttonState.active ? 'excel-toolbar__button_active' : '';
  const value: string = JSON.stringify(buttonState.value);

  return `
    <div data-value='${value}' data-type="button" class="excel-toolbar__button ${activeClass}">
      <i data-value='${value}' data-type="button" class="material-icons">${buttonState.iconName}</i>
    </div>
  `;
}

/**
 * This function creates an html element and adds all the buttons of the toolbar
 *   component to it and returns this html element.
 *
 * @return {HTMLElement}
 */
export function componentTemplate(): HTMLElement {
  const $wrapper = $.create('div', 'excel-toolbar__container');
  const $childWrapper = $.create('div', 'excel-toolbar__wrapper-buttons');

  const buttons: IButtonState[] = [
    {
      iconName: 'format_align_left',
      active: false,
      value: {
        textAlign: 'left',
      },
    },
    {
      iconName: 'format_align_center',
      active: false,
      value: {
        textAlign: 'center',
      },
    },
    {
      iconName: 'format_align_right',
      active: false,
      value: {
        textAlign: 'right',
      },
    },
    {
      iconName: 'format_bold',
      active: false,
      value: {
        fontWeight: 'normal',
      },
    },
    {
      iconName: 'format_italic',
      active: false,
      value: {
        fontStyle: 'normal',
      },
    },
    {
      iconName: 'format_underline',
      active: false,
      value: {
        textDecoration: 'none',
      },
    },
  ];

  $childWrapper.html(buttons.map(buttonsTemplate).join(' '));
  $wrapper.append($childWrapper);

  return $wrapper.$el;
}
