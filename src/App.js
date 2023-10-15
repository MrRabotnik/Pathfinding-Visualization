import { useState } from "react";
import Grid from "./Components/Grid/Grid";
import Header from "./Components/Header/Header";
import { dijkstrasAlgorithm } from "./algorithms/dijkstras";

function App() {
  const [rangeVal, setRangeVal] = useState(50)
  const [generate, setGenerate] = useState(0)
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
    if (algorithm === "Dij") {
      dijkstrasAlgorithm()
    }
  }

  const generateNewGridWithMaze = () => {
    setGenerate(generate + 1)
  }

  return (
    <div className="App">
      <Header
        changeRange={changeRange}
        changeAlgorithm={changeAlgorithm}
        clear={clear}
        visualize={visualize}
        generateNewGridWithMaze={generateNewGridWithMaze}>
      </Header>
      <Grid
        rangeVal={rangeVal}
        generate={generate}>
      </Grid>
    </div>
  );
}

export default App;
