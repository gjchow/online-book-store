import * as React from 'react';
import ItemCard from './ItemCard';
import Container from 'react-bootstrap/Container';
import { Row, Col, Card } from "react-bootstrap";

//Taken from https://reactjs.org/docs/faq-ajax.html
export default function ItemCardContainer(props: any) {
  const [error, setError] = React.useState<any>(null);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [items, setItems] = React.useState<any[]>([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  React.useEffect(() => {
    const api = process.env.API_URL || "https://assignment-2-12-gjchow-ranachi.herokuapp.com/api";
    fetch(`${api}/items`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      //Layout from https://javascript.plainenglish.io/render-react-cards-and-images-dynamically-2387434e809d
      <Container>
      <Row>
          {items.map((item, k) => (
              <Col key={k} xs={12} md={4} lg={3}>
                  <ItemCard item={item} theme={props.theme}></ItemCard>
              </Col>
          ))}
      </Row>
  </Container>
    );
  }
}
