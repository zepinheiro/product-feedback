# Product Feedback

Solution for the product feedback exercise

## Requirements to run

- Docker

## How to run

```javascript
  npm run build:dev // Build the docker dev stack
  npm run start:dev // Lifts the tech stack
```

Navigate to `localhost:3000/` and use the app.

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
