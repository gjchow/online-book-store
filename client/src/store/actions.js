// Followed: https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers

export const addItem = (item) => ({
  type: "ADD_ITEM",
  item,
});

export const removeItem = (item) => ({
  type: "REMOVE_ITEM",
  item,
});

export const destroyItem = (item) => ({
  type: "DESTROY_ITEM",
  item,
});


