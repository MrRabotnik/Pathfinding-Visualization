import { useState } from "react";
import Grid from "./Components/Grid/Grid";
import Header from "./Components/Header/Header";
import { dijkstrasAlgorithm } from "./algorithms/dijkstras";

function App() {
  const [rangeVal, setRangeVal] = useState(50)
  const [algorithm, setAlgorithm] = useState("Dij")

  const changeRange = (val) => {
    setRangeVal(val)
    console.log(algorithm)
  }

  const changeAlgorithm = (val) => {
    setAlgorithm(val)
  }

  const clear = () => {

  }

  const visualize = () => {
    if (algorithm === "Dij") {
      dijkstrasAlgorithm()
    }
  }

  

  return (
    <div className="App">
      <Header
        changeRange={changeRange}
        changeAlgorithm={changeAlgorithm}
        clear={clear}
        visualize={visualize}>
      </Header>
      <Grid rangeVal={rangeVal}></Grid>
    </div>
  );
}

export default App;
