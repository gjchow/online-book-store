import { render, fireEvent, screen } from "@testing-library/react";
import CartPreviewModal from "./CartPreviewModal";
import reducer from './store/reducer';
import { Provider  } from 'react-redux';
import thunk from 'redux-thunk'; 
import { createStore, applyMiddleware, compose } from 'redux';

export const store = createStore(
  reducer,
  compose(applyMiddleware(thunk)) 
  );

// Followed this guide to create unit test https://www.browserstack.com/guide/unit-testing-of-react-apps-using-jest
test("Shopping cart sidebar opens and cart totals exist", () => {
  render(
    <Provider store={store}>
      <CartPreviewModal />
    </Provider>
  );

  const shoppingCartBtn = screen.getByTestId("shoppingCartBtn");

  expect(shoppingCartBtn).toBeTruthy();

  fireEvent.click(shoppingCartBtn);
  
  const cartSubtotal = screen.getByTestId("cartSubtotal");
  const cartTotal = screen.getByTestId("cartTotal");

  expect(cartSubtotal).toBeTruthy();
  expect(cartTotal).toBeTruthy();
});