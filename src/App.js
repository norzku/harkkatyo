//json-server db.json --watch --port 4000 -delay 1000

import logo from "./logo.svg";
import "./App.css";
import Tuotelista from "./harkkatyo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Tuotelista />
      </header>
    </div>
  );
}

export default App;
