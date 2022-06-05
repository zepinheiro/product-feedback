# Product Feedback

Solution for the product feedback exercise

[![Fronted Unit Test](https://github.com/zepinheiro/product-feedback/actions/workflows/frontend.js.yml/badge.svg?branch=main)](https://github.com/zepinheiro/product-feedback/actions/workflows/frontend.js.yml)
[![Cypress Tests](https://github.com/zepinheiro/product-feedback/actions/workflows/cypress.js.yml/badge.svg)](https://github.com/zepinheiro/product-feedback/actions/workflows/cypress.js.yml)

## Requirements to run

- Docker
- NodeJs LTS

## How to run

```javascript
  npm run build:dev // Build the docker dev stack
  npm run start:dev // Lifts the tech stack
  npm run stop:dev // Stops all dev containers

  npm run build // Build production ready images
  npm run start // Lifts production ready tech stack
  npm run stop // Stops all production containers
```

Navigate to `localhost/` and use the app.

---

## Tech stack

For `FE` i've used:

- React
- Typescript
- Redux Toolkit
- RTK Query for data fetching and caching
- Chart.js for displaying the product reviews

For `BE` I've used:

- NodeJs
- Express
- MongoDB

## How docker is setup

Nginx serves port 80. It them redirects the requests for the frontend and the backend.
When we build as "production" nginx serves static files ( frontend ) and redirects the requests for the backend.

When running on `dev` mode all ports are exposed to make it easier to debug any part of the stack.
Running in production, it only exposes port 80.

## CI / CD

When a commit gets to `main` or a pull request is opened pointing to `main`, frontend `unit` tests and frontend `regression` tests run with `github actions`.

All docker images and docker orchestration are ready to quickly publish them on a server. Missing only the `ssl` certificates to make it into a truly ready stack. We would need a more robust `nginx` configuration.

## What is missing

- [ ] Add pagination
- [ ] Add better validations

## Why RTK Query

I've decided to use RTK Query as it is a really powerful tool for data fetching. Even though it was my first time using it, I've found it really enjoyable. It made the caching/fetching mechanism super simple.
