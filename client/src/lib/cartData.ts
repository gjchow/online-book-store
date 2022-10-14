export function getItems() {
  return JSON.parse(window.localStorage.getItem("cart-data") || '[]') || [];
}

export function addToCart(item: any) {
  const currentItem = JSON.parse(window.localStorage.getItem("cart-data") || '[]');
  if(!currentItem) {
      window.localStorage.setItem("cart-data", JSON.stringify([item]));
  } else {
    currentItem.unshift(item);
      window.localStorage.setItem("cart-data", JSON.stringify(currentItem));
  }
}

export function removeFrom(item: any) {
  const currentItem = JSON.parse(window.localStorage.getItem("cart-data") || '[]');
  currentItem.filter((i: any) => i.name !== item.name);
  window.localStorage.setItem("cart-data", JSON.stringify(currentItem));
}

export function updateCart(itemId: any, field: any, newValue: any) {
  const currentItem = JSON.parse(window.localStorage.getItem("cart-data") || '[]');
  const ItemToUpdateIndex = currentItem.findIndex((item: any) => (item.id === itemId));
  currentItem[ItemToUpdateIndex][field] = newValue;
  window.localStorage.setItem("cart-data", JSON.stringify(currentItem));
}