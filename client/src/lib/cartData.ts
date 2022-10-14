export function getItems() {
  return JSON.parse(window.localStorage.getItem("cart-data") || '[]') || [];
}

export function addToCart(item: any) {
  const currentItem = JSON.parse(window.localStorage.getItem("cart-data") || '[]');
  if(!currentItem) {
      window.localStorage.setItem("cart-data", JSON.stringify([item]));
  } else {
    if(currentItem.find((i: any) => i.name === item.name)) {
      updateItemQuantity(item.name, 'increase');
    } else {
      currentItem.unshift(item);
      window.localStorage.setItem("cart-data", JSON.stringify(currentItem));
    }
  }
}

export function removeFrom(item: any) {
  let currentItem = JSON.parse(window.localStorage.getItem("cart-data") || '[]');
  const newQuantity = updateItemQuantity(item.name, 'decrease');
  if (newQuantity === 0) {
    currentItem = currentItem.filter((i: any) => i.name !== item.name);
    window.localStorage.setItem("cart-data", JSON.stringify(currentItem));
  }
}

export function updateItemQuantity(itemName: any, change: 'increase' | 'decrease') {
  const currentItem = JSON.parse(window.localStorage.getItem("cart-data") || '[]');
  const ItemToUpdateIndex = currentItem.findIndex((item: any) => (item.name === itemName));
  if(change === 'increase') {
    currentItem[ItemToUpdateIndex].quantity += 1;
  } 
  if(change === 'decrease') {
    currentItem[ItemToUpdateIndex].quantity -= 1;
  } 
  const newQuantity = currentItem[ItemToUpdateIndex].quantity;
  window.localStorage.setItem("cart-data", JSON.stringify(currentItem));
  return newQuantity;
}