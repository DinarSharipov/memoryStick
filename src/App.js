import "./App.css";
import HeaderComp from "./components/Header/HeaderComp";
import MainCont from "./hoc/MainCont/MainCont";
import { Route, Switch } from "react-router-dom";
import MemorizedWordsMode from "./containers/MemorizedWords/MemorizedWordsMode";
import MemorizedGame from "./components/MemorizedGame/MemorizedGame";
import WordsList from "./containers/WordsList/WordsList";
import GameResults from "./components/MemorizedGame/GameResults/GameResults";

function App() {
  return (
    <div className="App">
      <HeaderComp />
      <MainCont>
        <Switch>
          <Route path="/" exact component={MemorizedWordsMode} />
          <Route path="/mode/:id" exact component={MemorizedGame} />
          <Route path="/gameresults" exact component={GameResults} />
          <Route path="/wordslist" exact component={WordsList} />
        </Switch>
      </MainCont>
    </div>
  );
}

export default App;
