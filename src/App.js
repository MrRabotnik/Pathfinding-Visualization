import { useState } from "react";
import Grid from "./Components/Grid/Grid";
import Header from "./Components/Header/Header";
import Graph from "./algorithms/dijkstras";

function App() {
  const [rangeVal, setRangeVal] = useState(50)
  const [generate, setGenerate] = useState(0)
  const [algorithm, setAlgorithm] = useState("Dij")
  const [djakstrasStartingEndingNode, setDjakstrasStartingEndingNode] = useState([])

  const changeRange = (val) => {
    setRangeVal(val)
  }

  const changeAlgorithm = (val) => {
    setAlgorithm(val)
  }

  const clear = () => {

  }

  const visualize = () => {
    switch (algorithm) {
      case "Dij":
        console.log(djakstrasStartingEndingNode)
        let g = new Graph();

        // add the vertices
        g.addVertex('A');
        g.addVertex('B');
        g.addVertex('C');
        g.addVertex('D');
        g.addVertex('E');
        g.addVertex('F');
        g.addVertex('G');

        // create the edges
        g.addEdge('A', 'B', 2);
        g.addEdge('A', 'C', 6);
        g.addEdge('B', 'D', 5);
        g.addEdge('C', 'D', 8);
        g.addEdge('D', 'E', 10);
        g.addEdge('D', 'F', 15);
        g.addEdge('E', 'F', 6);
        g.addEdge('E', 'G', 2);
        g.addEdge('G', 'F', 6);
        g.addEdge('F', 'G', 6);

        g.dijkstrasAlgorithm("A");
        break;

      case "A*":
        Graph.dijkstrasAlgorithm("A");
        break;

      case "Greedy":
        Graph.dijkstrasAlgorithm("A");
        break;

      case "Swarm":
        Graph.dijkstrasAlgorithm("A");
        break;

      case "Convergent":
        Graph.dijkstrasAlgorithm("A");
        break;

      case "Bidirectional":
        Graph.dijkstrasAlgorithm("A");
        break;

      case "Breadth":
        Graph.dijkstrasAlgorithm("A");
        break;

      case "Depth":
        Graph.dijkstrasAlgorithm("A");
        break;

      default:
        Graph.dijkstrasAlgorithm("A");
        break;



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
        generate={generate}
        setDjakstrasStartingEndingNode={setDjakstrasStartingEndingNode}>
      </Grid>
    </div>
  );
}

export default App;
