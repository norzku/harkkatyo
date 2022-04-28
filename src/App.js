//json-server db.json --watch --port 4000 -delay 1000

import { Outlet, NavLink } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Tuotehallinta</h1>
      <nav>
        <NavLink to="/products">Tuotehaku</NavLink>|
        <NavLink to="/editproducts">Lisää/poista tuotteita</NavLink> |
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
