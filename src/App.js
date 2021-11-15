import "./App.css";
import HeaderComp from "./components/Header/HeaderComp";
import MainCont from "./hoc/MainCont/MainCont";
import { Route, Switch } from "react-router-dom";
import MemorizedWordsMode from "./pages/MemorizedWords/MemorizedWordsMode";
import MemorizedGame from "./pages/MemorizedGame/MemorizedGame";
import WordsList from "./pages/WordsList/WordsList";
import GameResults from "./pages/MemorizedGame/GameResults/GameResults";
import AppList from "./pages/AppList/AppList";
import Auth from "./pages/Auth/Auth";
import { connect } from "react-redux";

function App(props) {
  let routes = (
    <Switch>
      <Route path="/" exact component={Auth} />
    </Switch>
  );

  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/" exact component={AppList} />
        <Route path="/wordslist" exact component={WordsList} />
        <Route path="/gameresults" exact component={GameResults} />
        <Route path="/:id" exact component={MemorizedWordsMode} />
        <Route path="/mode/:id" exact component={MemorizedGame} />
      </Switch>
    );
  }
  return (
    <div className="App">
      <HeaderComp />
      <MainCont>{routes}</MainCont>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuth: !!state.auth.token,
  };
}

export default connect(mapStateToProps)(App);
