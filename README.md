# Product Feedback

Solution for the product feedback exercise

[![Fronted Unit Test](https://github.com/zepinheiro/product-feedback/actions/workflows/frontend.js.yml/badge.svg?branch=main)](https://github.com/zepinheiro/product-feedback/actions/workflows/frontend.js.yml)

## Requirements to run

- Docker

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
- RTK Query for fetching
- Chart.js for displaying the product reviews

For `BE` i've used:

- NodeJs
- Express
- MongoDB

## What is missing

- [ ] Add pagination
- [ ] Add better validations
- [ ] Use env vars and build for production
- [ ] Make website responsive

## Why RTK Query

I've decided to use RTK Query as it is a really powerfull tool for data fetching. Even though it was my first time using it, I've found it really enjoyable. It made the caching/fetching mechanism super simple.
