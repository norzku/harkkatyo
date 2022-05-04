import { Component } from "react";
import React from "react";

class Editproducts extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null, products: [] };
    this.poista = this.poista.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:4000/tuotteet")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          products: json,
          DataisLoaded: true,
        });
      });
  }

  async lisaaPoistettava() {
    // näin voidaan määrittää asynkroninen haku ilman, että se erikseen otetaan muuttujaan
    await fetch("http://localhost:4000/tuotteet", {
      method: "DELETE", // Tässä voidaan määrittää metodi
      headers: {
        // jos http-kutsu tehdään näin, niin pitää määrittää myös headerit
        "Content-Type": "application/json",
      },
      // body-lohkossa pitää välittää data palvelimelle post ja put-metodeilla. Deletellä tämä ei ole pakollista
    }).then((response) => {
      console.log(response);
      this.fetchData();
    });
  }
  poista(event) {
    console.log(event.target.id);
    fetch("http://localhost:4000/tuotteet/" + event.target.id, {
      method: "DELETE",
    }).then(() => this.setState({products: products.filter(product => product.id !== event.target.id}));
    // Kutsutaan fetchiä delete-metodilla
  }

  render() {
    if (this.state.DataisLoaded == null)
      // Tämä koodi palautuu komponenttia luodessa, koska alustettiin data konstruktorissa
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    else if (this.state.DataisLoaded != null) {
      // Vasta kun data on haettu json-serveriltä, niin voidaan käsitellä data ja lisätä html-komponentit
      const { products } = this.state;
      return (
        <div>
            <><div className="App">
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
                  {products.map((product) => {
                    return (
                      <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.nimi}</td>
                    <td>{product.hyllypaikka}</td>
                    <td>{product.maara}</td>
                        <td>
                          <button onClick={this.poista} id={product.id}>
                            Poista
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        </div>
      );
    }
  }
}

export default Editproducts;
