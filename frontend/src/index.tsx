import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./app/store";

import reportWebVitals from "./reportWebVitals";
import "./normalize.css";
import "./theme.css";
import "./index.css";

import { ProductsPage } from "./components/ProductsPage/ProductsPage";
import { ProductPage } from "./components/ProductPage/ProductPage";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div className="pageContent">
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path=":productId" element={<ProductPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
