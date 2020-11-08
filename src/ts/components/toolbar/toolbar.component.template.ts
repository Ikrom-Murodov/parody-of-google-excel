import { $ } from 'helper-for-dom';
import { TRootState } from '@/store';

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
 * @param {TRootState} state - state app
 * @return {HTMLElement}
 */
export function componentTemplate(state: TRootState): HTMLElement {
  const $wrapper = $.create('div', 'excel-toolbar__container');
  const $childWrapper = $.create('div', 'excel-toolbar__wrapper-buttons');

  const buttons: IButtonState[] = [
    {
      iconName: 'format_align_left',
      active: state.currentCellStyles.textAlign === 'left',
      value: {
        textAlign: 'left',
      },
    },
    {
      iconName: 'format_align_center',
      active: state.currentCellStyles.textAlign === 'center',
      value: {
        textAlign: 'center',
      },
    },
    {
      iconName: 'format_align_right',
      active: state.currentCellStyles.textAlign === 'right',
      value: {
        textAlign: 'right',
      },
    },
    {
      iconName: 'format_bold',
      active: state.currentCellStyles.fontWeight === 'bold',
      value: {
        fontWeight:
          state.currentCellStyles.fontWeight === 'bold' ? 'normal' : 'bold',
      },
    },
    {
      iconName: 'format_italic',
      active: state.currentCellStyles.fontStyle === 'italic',
      value: {
        fontStyle:
          state.currentCellStyles.fontStyle === 'italic' ? 'normal' : 'italic',
      },
    },
    {
      iconName: 'format_underline',
      active: state.currentCellStyles.textDecoration === 'underline',
      value: {
        textDecoration:
          state.currentCellStyles.textDecoration === 'underline'
            ? 'none'
            : 'underline',
      },
    },
  ];

  $childWrapper.html(buttons.map(buttonsTemplate).join(' '));
  $wrapper.append($childWrapper);

  return $wrapper.$el;
}
