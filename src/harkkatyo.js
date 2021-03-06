// Käynnistä REST-API komennolla npx json-server db.json --watch --port 4000 --delay 1000
import "./harkkatyo.css";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

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
        <br></br>
        <TextField
          id="nimi"
          label="Nimi"
          variant="filled"
          size="small"
          data-testid="inputName"
          onChange={muutaNimi}
        />
        &nbsp;
        <TextField
          id="hyllypaikka"
          label="Hyllypaikka"
          variant="filled"
          size="small"
          onChange={muutaHyllypaikka}
        />{" "}
        <Button variant="contained" color="secondary" onClick={fetchData} data-testid="btn1">
          Search
        </Button>
      </div>
      <br></br>
      {loading === false && <p>Loading...</p>}
      {productlist.length === 0 && loading === true ? <p>{teksti}</p> : null}
      {productlist.length > 0 && (
        <div>
          <table className="center">
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
                    <td data-testid="pUser">{product.nimi}</td>
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
