import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import "./styles.scss";
import BubblePage from "./components/BubblePage";

//Build private route that renders BubblePage component
const PrivRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={ props => {
    if (localStorage.getItem("token")) {
      return <Component {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  }} />
}

const privRoute = Component => props => {
  if (localStorage.getItem("token")) {
    return <Component {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
}

const PrivBubblePage = privRoute(BubblePage);

function App() {
  const [colorList, setColorList] = useState([]);
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
      <Route path="/bubblepage" component={PrivBubblePage} />
      </div>
    </Router>
  );
}

export default App;
