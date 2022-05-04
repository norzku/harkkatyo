import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Editproducts from "./editproducts";
import Tuotelista from "./harkkatyo";
import App from "./App";
import Koti from "./Koti";

ReactDOMClient.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Koti />} />
        <Route path="products" element={<Tuotelista />} />

        <Route path="editproducts" element={<Editproducts />} />
        <Route
          path="*"
          element={
            <h1>
              <b>Täällä ei ole mitään</b>
            </h1>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
