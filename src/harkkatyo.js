// Käynnistä REST-API komennolla npx json-server db.json --watch --port 4000 --delay 1000

import React, { useState, useEffect } from "react";

function Asiakaslista3(props) {
  const [userlist, setUserlist] = useState([]);
  const [name, setName] = useState("");
  const [osoite, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const teksti = "Annetuilla hakuehdoilla ei löytynyt dataa";
  
  async function fetchData() {
    setLoading(false);
    setUserlist([]);
    let response = await fetch(
      "http://localhost:4000/asiakkaat?nimi_like=" +
        name +
        "&osoite_like=" +
        osoite
    );
    let data = await response.json();
    setLoading(true);
    setUserlist(data);  
  }

  useEffect(() => {
    fetchData();
  }, []);
  const muutaNimi = (event) => {
    // tai function(event) {...}
    console.log(event);
    setName(event.target.value);
  };
  const muutaOsoite = (event) => {
    // tai function(event) {...}
    console.log(event);
    setAddress(event.target.value);
  };



  return (
    <>
      <div className="App">
        <label>
          Name:
          <input type="text" onChange={muutaNimi} />{" "}
        </label>
        <label>
          Address:
          <input type="text" onChange={muutaOsoite} />{" "}
        </label>
        <button type="submit" onClick={fetchData}>
          Search
        </button>
      </div>
      {loading === false && <p>Loading...</p>}
      {userlist.length === 0 && loading === true ? <p>{teksti}</p>: null}
      {userlist.length > 0 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Nimi</th>
                <th>Osoite</th>
                <th>Postinumero</th>
                <th>Postitoimipaikka</th>
              </tr>
            </thead>

            <tbody>
              {userlist.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nimi}</td>
                    <td>{user.osoite}</td>
                    <td>{user.postinumero}</td>
                    <td>{user.postitoimipaikka}</td>
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

export default Asiakaslista3;
