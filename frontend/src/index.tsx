import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { store } from "./app/store";

import reportWebVitals from "./reportWebVitals";

import "./normalize.css";
import "./theme.css";
import "./index.css";

import "react-toastify/dist/ReactToastify.css";

const ProductPage = React.lazy(
  () => import("./components/ProductPage/ProductPage")
);
const ProductsPage = React.lazy(
  () => import("./components/ProductsPage/ProductsPage")
);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div className="pageContent">
          <ToastContainer />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path=":productId" element={<ProductPage />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
