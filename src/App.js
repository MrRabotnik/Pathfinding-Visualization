import { useState } from "react";
import Grid from "./Components/Grid/Grid";
import Header from "./Components/Header/Header";

function App() {
  const [rangeVal, setRangeVal] = useState(50)
  const [algorithm, setAlgorithm] = useState("Dij")

  const changeRange = (val) => {
    setRangeVal(val)
  }

  const changeAlgorithm = (val) => {
    setAlgorithm(val)
  }

  const clear = () => {

  }

  const visualize = () => {

  }

  return (
    <div className="App">
      <Header changeRange={changeRange} changeAlgorithm={changeAlgorithm}></Header>
      <Grid rangeVal={rangeVal}></Grid>
    </div>
  );
}

export default App;
