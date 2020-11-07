import { combineReducers } from 'parody-of-redux';
import * as table from './table';

const rootReducer = combineReducers({
  table: table.tableReducer,
});

const actions = {
  ...table.tableActions,
};

type TRootState = ReturnType<typeof rootReducer>;
type TRootActions = table.tableTypes.TTableActions;

export { rootReducer, actions, TRootState, TRootActions };
