import { BoundingBox, ElementHandle } from 'puppeteer';

const pathToPage = 'http://localhost:3000/';
let newTableName: string;

beforeAll(async () => {
  await page.goto(pathToPage);
});

it('Create a new table.', async () => {
  await expect(page).toClick('[data-type="create-new-table"]', {
    text: 'Create a new table.',
  });

  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  expect(page.url()).not.toBe(pathToPage);
});

it('update table name.', async () => {
  const selector: string = '[data-type="header-input"]';
  newTableName = 'Some text.';

  await page.focus(selector);

  await page.keyboard.down('Control');
  await page.keyboard.press('KeyA');
  await page.keyboard.up('Control');
  await page.keyboard.press('Delete');

  await page.type(selector, newTableName);

  const text = await page.$eval<HTMLInputElement>(
    selector,
    // eslint-disable-next-line
    (e: any) => e.value,
  );

  expect(text).toBe(newTableName);
});

it('Resize row.', async () => {
  const selector: string = '[data-resize-type="column"]';

  const element = (await page.$(selector)) as ElementHandle;
  let cords = (await element.boundingBox()) as BoundingBox;

  await page.mouse.move(cords.x, cords.y);
  await page.mouse.down();
  await page.mouse.move(500, 0);
  await page.mouse.up();

  cords = (await element.boundingBox()) as BoundingBox;
  expect(cords.x).toBe(500);
});

it('Resize column.', async () => {
  const selector: string = '[data-resize-type="row"]';

  const element = (await page.$(selector)) as ElementHandle;
  let cords = (await element.boundingBox()) as BoundingBox;

  await page.mouse.move(cords.x, cords.y);
  await page.mouse.down();
  await page.mouse.move(0, 500);
  await page.mouse.up();

  cords = (await element.boundingBox()) as BoundingBox;
  expect(cords.y).toBe(500);
});

it('Add styles to cell.', async () => {
  const selector: string = '[data-cell-id="0:0"]';

  const elements = await page.$$('.excel-toolbar__button');

  await Promise.all(elements.map((element) => element.click()));

  await page.type(selector, 'some cell text.');

  // eslint-disable-next-line
  const dataCell = await page.$eval(selector, (e: any) => ({
    textContent: e.textContent,
    styles: {
      textDecoration: e.style.textDecoration,
      fontStyle: e.style.fontStyle,
      fontWeight: e.style.fontWeight,
      textAlign: e.style.textAlign,
    },
  }));

  expect(dataCell.textContent).toBe('some cell text.');
  expect(dataCell.styles).toEqual({
    textDecoration: 'underline',
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'right',
  });
});

test('Add content to cell from formula.', async () => {
  const formulaSelector: string = '[data-type="formula-input"]';
  const cellSelector: string = '[data-cell-id="0:0"]';

  await page.focus(formulaSelector);
  await page.keyboard.down('Control');
  await page.keyboard.press('KeyA');
  await page.keyboard.up('Control');
  await page.keyboard.press('Delete');

  await page.type(formulaSelector, '=2*2');

  const cellData = await page.$eval(cellSelector, (e) => ({
    textContent: e.textContent,
    value: e.getAttribute('data-value'),
  }));

  expect(cellData.textContent).toBe('4');
  expect(cellData.value).toBe('=2*2');
});

test('Go to main page.', async () => {
  const selector: string = '[data-router-link="/"]';

  await expect(page).toClick(selector);
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  expect(page.url()).toBe(pathToPage);
});

test('Transition from the main page to the table page.', async () => {
  const selector = 'span[class="section-created-tables__item-name"]';

  await expect(page).toClick(selector, {
    text: newTableName,
  });

  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  expect(page.url()).not.toBe(pathToPage);
});

test('Delete table page and go to main page.', async () => {
  const selector: string = 'i[data-type="delete"]';

  await expect(page).toClick(selector);
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  expect(page.url()).toBe(pathToPage);

  const element = await page.$('span[class="section-created-tables__item"]');

  expect(element).toBeNull();
});
