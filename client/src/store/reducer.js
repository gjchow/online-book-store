import { getItems, addToCart, removeFrom } from '../lib/cartData';

function reducer(state = getItems(), action) {
  switch(action.type) {
    case "ADD_ITEM":
      addToCart(action.item);
      return getItems();
    case "REMOVE_ITEM":
      removeFrom(action.item);
      return getItems();
    default:
      return state;
  }
}


export default reducer;