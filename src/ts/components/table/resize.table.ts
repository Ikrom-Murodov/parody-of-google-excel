import { IDomHelper } from 'helper-for-dom';

export default function resizeTable(
  $arrow: IDomHelper,
  $root: IDomHelper,
): void {
  const $parentElement: IDomHelper = $arrow.closest(
    '[data-resize-element]',
  ) as IDomHelper;

  const {
    columnId,
    minWidth,
    minHeight,
  }: DOMStringMap = $parentElement.dataset();

  const { resizeType }: DOMStringMap = $arrow.dataset();

  $arrow.css({
    [resizeType === 'column' ? 'height' : 'width']:
      resizeType === 'column' ? '100vh' : '5000px',
    opacity: '1',
  });

  let value: number;

  document.onmousemove = (event): void => {
    if (resizeType === 'column') {
      value = event.pageX - $parentElement.getCords().left;

      if (value > Number(minWidth)) {
        $arrow.css({
          left: `${value}px`,
        });
      }
    } else if (resizeType === 'row') {
      value = event.pageY - $parentElement.getCords().top;

      if (value > Number(minHeight)) {
        $arrow.css({
          top: `${value}px`,
        });
      }
    }
  };

  document.onmouseup = (): void => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (resizeType === 'column') {
      const elements: IDomHelper[] | null = $root.findAll(
        `[data-column-id="${columnId}"]`,
      ) as IDomHelper[];

      const { width = 0 } = $arrow.getCords();

      elements.forEach(($el): void => {
        $el.css({ width: `${value + width}px` });
      });
    } else if (resizeType === 'row') {
      const { height = 0 } = $arrow.getCords();

      $parentElement.css({ height: `${value + height}px` });
    }

    $arrow.css({
      [resizeType === 'column' ? 'height' : 'width']:
        resizeType === 'column' ? '100%' : '100%',

      opacity: '0',
    });
  };
}
