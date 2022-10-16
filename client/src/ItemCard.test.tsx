import { render, screen } from "@testing-library/react";
import ItemCard from "./ItemCard";
import reducer from './store/reducer';
import { Provider  } from 'react-redux';
import thunk from 'redux-thunk'; 
import { createStore, applyMiddleware, compose } from 'redux';

export const store = createStore(
  reducer,
  compose(applyMiddleware(thunk)) 
  );

// Followed this guide to create unit test https://www.browserstack.com/guide/unit-testing-of-react-apps-using-jest

test("Displays correct item information", () => {
  const item = {name:"item1", quantity: 1, price: 31.31, image: "", tags: []};
  render(
    <Provider store={store}>
      <ItemCard item={item} theme='{}' />
    </Provider>
  );
  const itemName = screen.getByTestId("itemName");
  const itemPrice = screen.getByTestId("itemPrice");

  expect(itemName).toHaveTextContent(item.name);
  expect(itemPrice).toHaveTextContent(`${item.price}`);
});