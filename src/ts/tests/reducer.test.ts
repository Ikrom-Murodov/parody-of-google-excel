import { createStore, IStore } from 'parody-of-redux';
import { rootReducer, TRootState, TRootActions, actions } from '@/store';
import { ICellStyles } from '@/core/interface';
import { IColumnState, IRowState } from '@/store/types';

let store: IStore<TRootState, TRootActions>;
const ids: string[] = ['0:0', '0:1', '0:2'];
const styles: ICellStyles = {
  fontStyle: 'italic',
  textDecoration: 'underline',
  fontWeight: 'bold',
  textAlign: 'center',
};

beforeEach(() => {
  store = createStore<TRootState, TRootActions>(rootReducer);
});

describe('checking application state.', () => {
  test('updating current cell text.', () => {
    const currentCellText: string = 'some text';
    store.dispatch(actions.changeTextCurrentCell(currentCellText));
    expect(store.getState().currentCellText).toBe(currentCellText);
  });

  test('updating cell styles.', () => {
    store.dispatch(actions.changeCellStyles({ styles, ids }));
    ids.forEach((id) => {
      expect(store.getState().cellStyles[id]).toEqual(styles);
    });
  });

  test('updating current cell styles.', () => {
    store.dispatch(actions.changeStylesCurrentCell({ ...styles }));
    expect(store.getState().currentCellStyles).toEqual(styles);
  });

  test('updating cells text', () => {
    const data: { text: string; id: string } = { text: 'some text', id: '0:0' };
    store.dispatch(actions.changeCellsText(data));
    expect(store.getState().cellsText).toEqual([data]);
  });

  test('updating columns state', () => {
    const data: IRowState = {
      height: 500,
      id: 15,
      type: 'row',
    };

    store.dispatch(actions.resizeRow(data));
    expect(store.getState().rowsState).toEqual([data]);
  });

  test('updating rows state', () => {
    const data: IColumnState = {
      width: 500,
      id: 15,
      type: 'column',
    };

    store.dispatch(actions.resizeColumn(data));
    expect(store.getState().columnsState).toEqual([data]);
  });

  test('updating table name.', () => {
    const tableName: string = 'New Table name';
    store.dispatch(actions.changeTableName(tableName));
    expect(store.getState().tableName).toBe(tableName);
  });

  test('updating page id', () => {
    const id = 'Ikrom-Murodov';
    store.dispatch(actions.changePageId(id));
    expect(store.getState().pageId).toBe(id);
  });
});
