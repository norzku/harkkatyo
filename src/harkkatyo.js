// Käynnistä REST-API komennolla npx json-server db.json --watch --port 4000 --delay 1000

import React, { useState, useEffect } from "react";

function Tuotelista(props) {
  const [productlist, setProductlist] = useState([]);
  const [name, setName] = useState("");
  const [hyllypaikka, setHyllypaikka] = useState("");
  const [loading, setLoading] = useState(false);
  const teksti = "Annetuilla hakuehdoilla ei löytynyt dataa";

  async function fetchData() {
    setLoading(false);
    setProductlist([]);
    let response = await fetch(
      "http://localhost:4000/tuotteet?nimi_like=" +
        name +
        "&hyllypaikka_like=" +
        hyllypaikka
    );
    let data = await response.json();
    setLoading(true);
    setProductlist(data);
  }

  useEffect(() => {
    fetchData();
  }, []);
  const muutaNimi = (event) => {
    // tai function(event) {...}
    console.log(event);
    setName(event.target.value);
  };
  const muutaHyllypaikka = (event) => {
    // tai function(event) {...}
    console.log(event);
    setHyllypaikka(event.target.value);
  };

  return (
    <>
      <div className="App">
        <label>
          Nimi:
          <input type="text" onChange={muutaNimi} />{" "}
        </label>
        <label>
          Hyllypaikka:
          <input type="text" onChange={muutaHyllypaikka} />{" "}
        </label>
        <button type="submit" onClick={fetchData}>
          Search
        </button>
      </div>
      {loading === false && <p>Loading...</p>}
      {productlist.length === 0 && loading === true ? <p>{teksti}</p> : null}
      {productlist.length > 0 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nimi</th>
                <th>Hyllypaikka</th>
                <th>Määrä</th>
              </tr>
            </thead>

            <tbody>
              {productlist.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.nimi}</td>
                    <td>{product.hyllypaikka}</td>
                    <td>{product.maara}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Tuotelista;
