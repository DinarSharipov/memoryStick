import "./App.css";
import HeaderComp from "./components/Header/HeaderComp";
import MainCont from "./hoc/MainCont/MainCont";
import { Route, Switch } from "react-router-dom";
import MemorizedGame from "./pages/MemorizedGame/MemorizedGame";
import WordsList from "./pages/MemorizedGame/WordsList/WordsList";
import GameResults from "./pages/MemorizedGame/GameResults/GameResults";
import AppList from "./pages/AppList/AppList";
import Auth from "./pages/Auth/Auth";
import { connect } from "react-redux";
import { useEffect } from "react";
import { autoLogin } from "./store/actions/auth";
import MemorizedWordsMode from "./pages/MemorizedGame/MemorizedWords/MemorizedWordsMode";
import GameMode from "./pages/DragAndDropPage/GameMode/GameMode";
import DnDGame from "./pages/DragAndDropPage/DnDGame/DnDGame";

function App(props) {
  let routes = (
    <Switch>
      <Route path="/" exact component={Auth} />
    </Switch>
  );

  useEffect(() => {
    props.autoLogin();
  }, []);

  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/" exact component={AppList} />
        <Route path="/wordslist" exact component={WordsList} />
        <Route path="/gameresults" exact component={GameResults} />
        <Route path="/drag&dropApp" exact component={GameMode} />
        <Route path="/drag&dropApp/:id" exact component={DnDGame} />
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

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
