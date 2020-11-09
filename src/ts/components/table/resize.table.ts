import { IDomHelper } from 'helper-for-dom';

export default function resizeTable(
  $arrow: IDomHelper,
  $root: IDomHelper,
): Promise<{ type: string; id: number; width?: number; height?: number }> {
  return new Promise((resolve) => {
    const $parentElement: IDomHelper = $arrow.closest(
      '[data-resize-element]',
    ) as IDomHelper;

    const {
      columnId,
      minWidth,
      minHeight,
    }: DOMStringMap = $parentElement.dataset();

    const { resizeType = '' }: DOMStringMap = $arrow.dataset();
    const { width = 0, height = 0 } = $arrow.getCords();

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

        elements.forEach(($el): void => {
          $el.css({ width: `${value + width}px` });
        });
      } else if (resizeType === 'row') {
        $parentElement.css({ height: `${value + height}px` });
      }

      $arrow.css({
        [resizeType === 'column' ? 'height' : 'width']:
          resizeType === 'column' ? '100%' : '100%',
        opacity: '0',
      });

      const data = {
        type: resizeType as string,
        id: Number($parentElement.dataset()[`${resizeType}Id`]),
        [resizeType === 'column' ? 'width' : 'height']:
          resizeType === 'column' ? value + width : value + height,
      };

      resolve(data);
    };
  });
}
