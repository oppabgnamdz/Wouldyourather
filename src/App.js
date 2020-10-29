import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import Navigation from './containers/Navigation';
import Login from './containers/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './containers/Home';
import LeaderBoard from './containers/LeaderBoard';
import NewQuestion from './containers/NewQuestion';
function App({ store }) {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navigation />
          <header className="App-header">
            <Switch>
              <Route path="/NewQuestion" component={NewQuestion}>
              </Route>
              <Route path="/LeaderBoard" component={LeaderBoard}>
              </Route>
              <Route path="/Home" component={Home}>
              </Route>
              <Route path="/" component={Login}>
              </Route>
            </Switch>
          </header>

        </div>
      </Router>
    </Provider>
  );
}

export default App;
