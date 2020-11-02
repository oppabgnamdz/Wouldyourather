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
import Detail from './containers/Detail';
import VoteResult from './containers/VoteResult';
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
              <Route path="/Detail" component={Detail}>
              </Route>
              <Route path="/VoteResult/:id" component={VoteResult}>
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
