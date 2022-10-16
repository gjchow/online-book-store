// Followed: https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers

import { getItems, addToCart, removeFrom, destroyFrom } from '../lib/cartData';

function reducer(state = getItems(), action) {
  switch(action.type) {
    case "ADD_ITEM":
      addToCart(action.item);
      return getItems();
    case "REMOVE_ITEM":
      removeFrom(action.item);
      return getItems();
    case "DESTROY_ITEM":
      destroyFrom(action.item);
      return getItems();
    default:
      return state;
  }
}


export default reducer;