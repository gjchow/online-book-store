# Online Book Store

This application is a simple online book store where users can add books to the cart, view the cart and apply discounts to their totals.

## Application

![Application Demo](./images/output.gif)

* Notes:
  * Coupon code: 1111 applies $10 discount to any book
  * Coupon code: 1234 applies $5 discount only if books "Hard Times" and "It Starts With Us" are in the cart

## Running Unit Tests

Unit Tests can be run both locally and as part of the CI/CD pipeline. Developer can easily scale up the amount of unit tests and the application will be able to run them without changing anything else.

### Locally

1. Clone the application locally and go the root directory
2. Run the following commands

```
cd client
npm install
npm test *
```

### Using GitHub Actions

The unit tests are also part of the CI/CD pipeline:

![unit test](./images/unittest.gif)


## CI/CD Process

![cicd process](./images/CICD-Process.jpg)

## Local Development

### Frontend

1. Clone the application locally and go the root directory
2. Run the following shell commands

```
cd client
npm install
npm start
```

### Backend (Frontend served as static files)

1. Clone the application locally and go the root directory
2. Run the following shell commands

```
cd client
npm install
npm run build
cd ..
cd server
npm install
npm start
```

## References

This application is largely based on the following tutorials (repository structure, package.json for client and backend): 
* https://www.youtube.com/watch?v=lR1gR9WhY10
* https://www.youtube.com/watch?v=swgH9MGM9nM
* The code from the tutorials is: https://github.com/SparkDevTeams/ds2020_mauricio.

Dockerfile is based on this guide:
* https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

Mongoose Schemas is based on the documentation:
* https://mongoosejs.com/docs/guide.html

For setting up state management in React:
* https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers

For setting up Heroku Deployment using Github Actions:
* https://github.com/marketplace/actions/deploy-to-heroku

For setting up Nodejs building and testing using Github Actions:
* https://github.com/actions/setup-node


## Authors

* Chirag Rana
* Gabriel Chow
