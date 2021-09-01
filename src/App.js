import './App.css';
import {BrowserRouter, Link, NavLink, Route, Switch} from "react-router-dom";
import Home from "./Conteiner/Home/Home";
import Admin from "./Conteiner/Admin/Admin";



function App() {
  return (
      <div className="Container">
          <BrowserRouter>
              <div className="Header">
                  <p className="NaviHeader"><Link exact to="/" style={{textDecoration: 'none'}} >Static Page</Link></p>
                  <ul>
                      <li><NavLink exact className="Link" to="/">Home</NavLink></li>
                      <li><NavLink className="Link" to="/pages/about">About</NavLink></li>
                      <li><NavLink className="Link" to="/pages/contacts">Contacts</NavLink></li>
                      <li><NavLink className="Link" to="/pages/divisions">Divisions</NavLink></li>
                      <li><NavLink className="Link" to="/admin">Admin</NavLink></li>
                  </ul>
              </div>

              <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path="/pages/:page" component={Home}/>
                  <Route path="/admin" component={Admin}/>
                  <Route render={()=><h1>NotFound</h1>}/>
              </Switch>
          </BrowserRouter>
      </div>
  );
}

export default App;
