import * as types from './types';
import rootReducer from './reducer';
import * as actions from './actions';

type TRootState = ReturnType<typeof rootReducer>;
type TRootActions = types.TTablePageActions;

export { rootReducer, TRootState, TRootActions, actions };
export { initialState } from './reducer';
