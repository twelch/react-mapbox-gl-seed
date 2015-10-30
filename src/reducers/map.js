import { createReducer } from 'utils';

// Action type
const CHANGE_BASELAYER = 'CHANGE_BASELAYER';

// Reducer
const initialState = {
  baselayer: 'streets'
};
export default createReducer(initialState, {
  [CHANGE_BASELAYER] : (state, payload) => {
    return Object.assign({}, state, {
      baselayer: payload
    });
  }
});
