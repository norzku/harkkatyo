//json-server db.json --watch --port 4000 -delay 1000
import * as React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./App.css";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useMenu, MenuUnstyledContext } from "@mui/base/MenuUnstyled";
import { useMenuItem } from "@mui/base/MenuItemUnstyled";
import { GlobalStyles } from "@mui/system";

const grey = {
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const styles = `
  .menu-root {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 5px;
    margin: 10px 0;
    min-width: 200px;
    background: #fff;
    border: 1px solid ${grey[300]};
    border-radius: 0.75em;
    color: ${grey[900]};
    overflow: auto;
    outline: 0px;
  }

  .mode-dark .menu-root {
    background: ${grey[900]};
    border-color: ${grey[800]};
    color: ${grey[300]};
  }

  .menu-item {
    list-style: none;
    padding: 8px;
    border-radius: 0.45em;
    cursor: default;
  }

  .menu-item:last-of-type {
    border-bottom: none;
  }

  .menu-item:focus {
    background-color: ${grey[100]};
    color: ${grey[900]};
    outline: 0;
  }

  .mode-dark .menu-item:focus {
    background-color: ${grey[800]};
    color: ${grey[300]};
  }

  .menu-item.disabled {
    color: ${grey[400]};
  }

  .mode-dark .menu-item.disabled {
    color: ${grey[700]};
  }

  .menu-item:hover:not(.disabled) {
    background-color: ${grey[100]};
    color: ${grey[900]};
  }

  .mode-dark .menu-item:hover:not(.disabled){
    background-color: ${grey[100]};
    color: ${grey[900]};
  }
`;

const Menu = React.forwardRef(function Menu(props, ref) {
  const { children, ...other } = props;

  const {
    registerItem,
    unregisterItem,
    getListboxProps,
    getItemProps,
    getItemState,
  } = useMenu({
    listboxRef: ref,
  });

  const contextValue = {
    registerItem,
    unregisterItem,
    getItemState,
    getItemProps,
    open: true,
  };

  return (
    <ul className="menu-root" {...other} {...getListboxProps()}>
      <MenuUnstyledContext.Provider value={contextValue}>
        {children}
      </MenuUnstyledContext.Provider>
    </ul>
  );
});

Menu.propTypes = {
  children: PropTypes.node,
};

const MenuItem = React.forwardRef(function MenuItem(props, ref) {
  const { children, ...other } = props;

  const { getRootProps, itemState } = useMenuItem({
    component: "li",
    ref,
  });

  const classes = {
    "menu-item": true,
    disabled: itemState?.disabled,
  };

  return (
    <li className={clsx(classes)} {...other} {...getRootProps()}>
      {children}
    </li>
  );
});

MenuItem.propTypes = {
  children: PropTypes.node,
};
function App() {
  return (
    <React.Fragment>
      <GlobalStyles styles={styles} />
      <div className="App">
        <h1>Tuotehallinta</h1>
        <Menu>
          <MenuItem>
            {" "}
            <NavLink to="/">Koti</NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/products">Tuotehaku</NavLink>
          </MenuItem>
          <MenuItem>
            {" "}
            <NavLink to="/editproducts">Lisää/poista tuotteita</NavLink>
          </MenuItem>
        </Menu>
        <Outlet />
      </div>
    </React.Fragment>
  );
}

export default App;
