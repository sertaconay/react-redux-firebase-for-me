import { GET_ALL_HOME_POST, GET_ONE_HOME_POST, CLEAR_HOME_POST, DELETE_HOME_POST } from 'core/actionTypes';
import initialState from 'core/initialState';
import { dbRefs } from 'core/firebase';
import { removeByKey } from 'core/helpers';

export default function homeReducer(state = initialState[dbRefs.home], action) {
  switch (action.type) {
    case GET_ALL_HOME_POST:
      return {
        ...state,
        items: Object.assign({}, state.items, action.data),
        length: action.length,
      };
    case GET_ONE_HOME_POST:
      return {
        ...state,
        item: Object.assign({}, state.item, action.data, { key: action.key }),
      };
    case CLEAR_HOME_POST:
      return {
        ...state,
        item: {},
      };
    case DELETE_HOME_POST:
      return {
        ...state,
        items: Object.assign({}, removeByKey(state.items, action.key)),
        length: state.length - 1,
      };
    default:
      return state;
  }
}
