import { useCallback, useState } from "react";
import Grid from "./Components/Grid/Grid";
import Header from "./Components/Header/Header";
import Graph from "./algorithms/dijkstras";

function App() {
    const [rangeVal, setRangeVal] = useState(50)
    const [generate, setGenerate] = useState(0)
    const [algorithm, setAlgorithm] = useState("Dij")
    const [djakstrasStartingEndingNode, setDjakstrasStartingEndingNode] = useState([])
    const [gridItems, setGridItems] = useState([])

    const changeRange = (val) => {
        setRangeVal(val)
    }

    const changeAlgorithm = (val) => {
        setAlgorithm(val)
    }

    const clearWalls = () => {
        setGridItems(gridItems.map(item => {
            return {
                ...item,
                "wall": false,
                "path": false,
                "visited": false
            }
        }))
    }

    const visualize = useCallback(() => {
        switch (algorithm) {
            case "Dij":
                let g = new Graph();
                const weight = 1
                const width = Math.floor(Math.sqrt(rangeVal / 2)) * 2
                for (let i = 0; i < rangeVal; i++) {
                    if (!gridItems[i].wall) {
                        g.addVertex(i)
                        if (!gridItems[i + 1]?.wall && i + 1 < rangeVal && (i + 1) % width !== 0) {
                            g.addEdge(i, i + 1, weight);
                        }
                        if (!gridItems[i + width]?.wall && i + width < rangeVal) {
                            g.addEdge(i, i + width, weight);
                        }
                        if (!gridItems[i - 1]?.wall && i - 1 >= 0 && (i - 1) % width !== width - 1) {
                            g.addEdge(i, i - 1, weight);
                        }
                        if (!gridItems[i - width]?.wall && i - width >= 0) {
                            g.addEdge(i, i - width, weight);
                        }
                    }
                }
                g.dijkstrasAlgorithm(djakstrasStartingEndingNode);
                const path = g.drawShortestPath()
                const visited = g.drawVisitedNodes()

                setGridItems(gridItems.map(item => {
                    if(visited.has("" + item.id)){
                        if (path.includes(item.id)) {
                            return {
                                ...item,
                                "path": true,
                                "visited": true
                            }
                        }
                        return {
                            ...item,
                            "visited": true,
                            "path": false
                        }
                    }
                    return {
                        ...item,
                        "path": false,
                        "visited": false
                    }
                }))

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

    }, [gridItems, algorithm, rangeVal, djakstrasStartingEndingNode])

    const generateNewGridWithMaze = () => {
        setGenerate(generate + 1)
    }

    return (
        <div className="App">
            <Header
                changeRange={changeRange}
                changeAlgorithm={changeAlgorithm}
                clearWalls={clearWalls}
                visualize={visualize}
                generateNewGridWithMaze={generateNewGridWithMaze}>
            </Header>
            <Grid
                rangeVal={rangeVal}
                generate={generate}
                setDjakstrasStartingEndingNode={setDjakstrasStartingEndingNode}
                gridItems={gridItems}
                setGridItems={setGridItems}
                clearWalls={clearWalls}
                visualize={visualize}>
            </Grid>
        </div>
    );
}

export default App;
