import { Component } from "react";
import "./harkkatyo.css";
import "./index.css";
import { Link } from "react-router-dom";
import { Button } from '@mui/material';

class Editproducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      nimi: null,
      hyllypaikka: null,
      maara: null,
      data: null,
      products: [],
    };
    this.poista = this.poista.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.lisaaTuote = this.lisaaTuote.bind(this);
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
  handleChange(event) {
    this.setState({
      id: event.target.value,
      nimi: event.target.value,
      hyllypaikka: event.target.value,
      maara: event.target.value,
    });
  }

  async lisaaTuote(event) {
    event.preventDefault();
    let uusiTuote = {
      id: this.state.id,
      nimi: this.state.nimi,
      hyllypaikka: this.state.hyllypaikka,
      maara: this.state.maara,
    };
    console.log("Hyvin menee");
    // näin voidaan määrittää asynkroninen haku ilman, että se erikseen otetaan muuttujaan
    await fetch("http://localhost:4000/tuotteet", {
      method: "POST", // Tässä voidaan määrittää metodi
      headers: {
        // jos http-kutsu tehdään näin, niin pitää määrittää myös headerit
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uusiTuote),
      // body-lohkossa pitää välittää data palvelimelle post ja put-metodeilla. Deletellä tämä ei ole pakollista
    }).then((response) => {
      this.setState((prevState) => ({
        products: [...prevState.products, uusiTuote],
      }));
      console.log(response);
    });
  }
  async muokkaaTuote(event) {
    event.preventDefault();
    let uusiTuote = {
      id: this.state.id,
      nimi: this.state.nimi,
      hyllypaikka: this.state.hyllypaikka,
      maara: this.state.maara,
    };
    console.log("HotPink");
    // näin voidaan määrittää asynkroninen haku ilman, että se erikseen otetaan muuttujaan
    await fetch("http://localhost:4000/tuotteet", {
      method: "PUT", // Tässä voidaan määrittää metodi
      headers: {
        // jos http-kutsu tehdään näin, niin pitää määrittää myös headerit
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uusiTuote),
      // body-lohkossa pitää välittää data palvelimelle post ja put-metodeilla. Deletellä tämä ei ole pakollista
    }).then((response) => {
      this.setState((prevState) => ({
        products: [...prevState.products, uusiTuote],
      }));
      console.log(response);
    });
  }
  poista(event) {
    console.log(event.target.id);
    fetch("http://localhost:4000/tuotteet/" + event.target.id, {
      method: "DELETE",
    }).then((e) => {
      this.setState((prevState) => {
        return {
          products: prevState.products.filter((p) => p.id !== event.target.id),
        };
      });
    });
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
        <>
          <div>
            <form onSubmit={this.lisaaTuote}>
              <label>
                ID:
                <input
                  type="text"
                  value={this.state.value}
                  onChange={(e) => {
                    this.setState({ id: e.target.value });
                  }}
                />{" "}
              </label>
              <label>
                Nimi:
                <input
                  type="text"
                  value={this.state.value}
                  onChange={(e) => {
                    this.setState({ nimi: e.target.value });
                  }}
                />{" "}
              </label>
              <label>
                Hyllypaikka:
                <input
                  type="text"
                  value={this.state.value}
                  onChange={(e) => {
                    this.setState({ hyllypaikka: e.target.value });
                  }}
                />{" "}
              </label>{" "}
              <label>
                Määrä:
                <input
                  type="text"
                  value={this.state.value}
                  onChange={(e) => {
                    this.setState({ maara: e.target.value });
                  }}
                />{" "}
              </label>
              <input type="submit" value="Lisää" />
            </form>{" "}
          </div>

          <div className="App">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nimi</th>
                  <th>Hyllypaikka</th>
                  <th>Määrä</th>
                  <th>Poista</th>
                  <th>Muokkaa</th>
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
                      <td>
                      <Link to={`/products/${product.id}`}>
          <Button>Edit</Button>
        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      );
    }
  }
}

export default Editproducts;
