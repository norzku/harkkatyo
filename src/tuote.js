import "./harkkatyo.css";
import React, { useState, useEffect } from "react";
import { Button, dividerClasses } from "@mui/material";
import TextField from "@mui/material/TextField";
import Editproducts from "./editproducts";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function MuokkaaTavara() {
  const [name, setName] = useState("");
  const [hyllypaikka, setHyllypaikka] = useState("");
  const [id, setId] = useState("");
  const [maara, setMaara] = useState("");
  const navigate = useNavigate();
  let { productId } = useParams();
  console.log(productId);
  function lisaaTuote() {
    let muokattavaTuote = {
      id: productId,
      nimi: name,
      hyllypaikka: hyllypaikka,
      maara: maara,
    };

    console.log(productId);
    fetch("http://localhost:4000/tuotteet/" + productId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(muokattavaTuote),
    }).then((response) => {
/*       this.setState((prevState) => ({
        products: [...prevState.products, muokattavaTuote],
      })); */
      console.log(response);
      navigate('/editproducts');
    });
  }
  const muutaNimi = (event) => {
    console.log(event);
    setName(event.target.value);
  };
  const muutaHyllypaikka = (event) => {
    console.log(event);
    setHyllypaikka(event.target.value);
  };
  const muutaMaara = (event) => {
    console.log(event);
    setMaara(event.target.value);
  };

  async function fetchData() {
    let response = await fetch(
      "http://localhost:4000/tuotteet/" + productId,
    );
    let data = await response.json();
    setName(data.nimi);
    setMaara(data.maara);
    setHyllypaikka(data.hyllypaikka);
    console.log(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <br></br>
      <TextField id="id" value={productId} variant="filled" size="small" />
      &nbsp;
      <TextField
        id="nimi"
        value={name}
        variant="filled"
        size="small"
        onChange={muutaNimi}
      />
      &nbsp;
      <TextField
        id="hyllypaikka"
        value={hyllypaikka}
        variant="filled"
        size="small"
        onChange={muutaHyllypaikka}
      />{" "}
      &nbsp;
      <TextField
        id="maara"
        value={maara}
        variant="filled"
        size="small"
        onChange={muutaMaara}
      />
      <Button
        variant="contained"
        color="success"
        type="submit"
        value="Lisää"
        onClick={lisaaTuote}
      >
        Tallenna
      </Button>
    </div>
  );
}
export default MuokkaaTavara;
