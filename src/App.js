import { useState } from "react";
import Grid from "./Components/Grid/Grid";
import Header from "./Components/Header/Header";
import Graph from "./algorithms/dijkstras";
import AStar from "./algorithms/AStarSearch";
import GreedyBestFirst from "./algorithms/greedy";
import AntColonyOptimization from "./algorithms/swarm";
import BidirectionalSearch from "./algorithms/bidirectional";
import BreadthFirstSearch from "./algorithms/breadth";
import DepthFirstSearch from "./algorithms/depth";
import BellmanFord from "./algorithms/bellmanFord";
import JPS from "./algorithms/jumpPoint";
import FloydWarshall from "./algorithms/floydWarshall";
import ThetaStar from "./algorithms/thetaStar";

function App() {
    const [rangeVal, setRangeVal] = useState(450);
    const [animationSpeed, setAnimationSpeed] = useState(4);
    const [generate, setGenerate] = useState(0);
    const [algorithm, setAlgorithm] = useState("Dij");
    const [djakstrasStartingEndingNode, setDjakstrasStartingEndingNode] = useState([]);
    const [gridItems, setGridItems] = useState([]);
    const [visualizing, setVisualizing] = useState(false);
    const [instantSpeed, setInstantSpeed] = useState(false);

    const changeRange = (val) => {
        setRangeVal(val);
    };

    const changeSpeed = (val) => {
        setInstantSpeed(false);
        if (val === "fast") setAnimationSpeed(10);
        else if (val === "middle") setAnimationSpeed(50);
        else if (val === "slow") setAnimationSpeed(100);
        else if (val === "true") setInstantSpeed(true);
    };

    const changeAlgorithm = (val) => {
        setAlgorithm(val);
    };

    const clearWalls = () => {
        setGridItems(
            gridItems.map((item) => {
                return {
                    ...item,
                    wall: false,
                    path: false,
                    visited: false,
                };
            })
        );
    };

    const clearVisualization = () => {
        return gridItems.map((item) => {
            return {
                ...item,
                path: false,
                visited: false,
            };
        });
    };

    const visualize = async (arr, startEndArr = djakstrasStartingEndingNode) => {
        if (visualizing) return;

        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        if (algorithm === "Dij") {
            let array = arr ? arr : clearVisualization();

            const width =
                window.innerWidth > window.innerHeight
                    ? Math.floor(Math.sqrt(rangeVal / 2)) * 2
                    : Math.floor(Math.sqrt(rangeVal / 2));
            let g = new Graph();
            const weight = 1;
            for (let i = 0; i < rangeVal; i++) {
                if (!array[i].wall) {
                    g.addVertex(i);
                    if (!array[i + 1]?.wall && i + 1 < rangeVal && (i + 1) % width !== 0) {
                        g.addEdge(i, i + 1, weight);
                    }
                    if (!array[i + width]?.wall && i + width < rangeVal) {
                        g.addEdge(i, i + width, weight);
                    }
                    if (!array[i - 1]?.wall && i - 1 >= 0 && (i - 1) % width !== width - 1) {
                        g.addEdge(i, i - 1, weight);
                    }
                    if (!array[i - width]?.wall && i - width >= 0) {
                        g.addEdge(i, i - width, weight);
                    }
                }
            }
            g.dijkstrasAlgorithm(startEndArr);
            const path = g.drawShortestPath();
            const visited = g.drawVisitedNodes();

            let tmpVisited = visited.values();
            let index = 0;

            const draw = async () => {
                setVisualizing(true);
                const currentNodeVisited = Number(tmpVisited.next().value); // id of current visited node

                array = array.map((item) => {
                    if (currentNodeVisited === item.id) {
                        if (path.includes(item.id)) {
                            return {
                                ...item,
                                path: true,
                                visited: true,
                            };
                        }
                        return {
                            ...item,
                            visited: true,
                            path: false,
                        };
                    }
                    return item;
                });

                index++;
                setGridItems(array);
            };

            const setSize = visited.size;
            while (index <= setSize) {
                if (!instantSpeed) {
                    await delay(animationSpeed);
                }
                draw();
            }
            setVisualizing(false);
        } else if (algorithm === "A*") {
            let array = arr ? arr : clearVisualization();

            const width =
                window.innerWidth > window.innerHeight
                    ? Math.floor(Math.sqrt(rangeVal / 2)) * 2
                    : Math.floor(Math.sqrt(rangeVal / 2));
            let g = new AStar();
            const weight = 1;
            for (let i = 0; i < rangeVal; i++) {
                if (!array[i].wall) {
                    g.addVertex(i);
                    if (!array[i + 1]?.wall && i + 1 < rangeVal && (i + 1) % width !== 0) {
                        g.addEdge(i, i + 1, weight);
                    }
                    if (!array[i + width]?.wall && i + width < rangeVal) {
                        g.addEdge(i, i + width, weight);
                    }
                    if (!array[i - 1]?.wall && i - 1 >= 0 && (i - 1) % width !== width - 1) {
                        g.addEdge(i, i - 1, weight);
                    }
                    if (!array[i - width]?.wall && i - width >= 0) {
                        g.addEdge(i, i - width, weight);
                    }
                }
            }
            g.aStarAlgorithm(startEndArr, width);
            const path = g.drawShortestPath();
            const visited = g.drawVisitedNodes();

            let tmpVisited = visited.values();
            let index = 0;

            const draw = async () => {
                setVisualizing(true);
                const currentNodeVisited = Number(tmpVisited.next().value);

                array = array.map((item) => {
                    if (currentNodeVisited === item.id) {
                        if (path.includes(item.id)) {
                            return {
                                ...item,
                                path: true,
                                visited: true,
                            };
                        }
                        return {
                            ...item,
                            visited: true,
                            path: false,
                        };
                    }
                    return item;
                });

                index++;
                setGridItems(array);
            };

            const setSize = visited.size;
            while (index <= setSize) {
                if (!instantSpeed) {
                    await delay(animationSpeed);
                }
                draw();
            }
            setVisualizing(false);
        } else if (algorithm === "Greedy") {
            let array = arr ? arr : clearVisualization();

            const width =
                window.innerWidth > window.innerHeight
                    ? Math.floor(Math.sqrt(rangeVal / 2)) * 2
                    : Math.floor(Math.sqrt(rangeVal / 2));
            let g = new GreedyBestFirst();
            const weight = 1;
            for (let i = 0; i < rangeVal; i++) {
                if (!array[i].wall) {
                    g.addVertex(i);
                    if (!array[i + 1]?.wall && i + 1 < rangeVal && (i + 1) % width !== 0) {
                        g.addEdge(i, i + 1, weight);
                    }
                    if (!array[i + width]?.wall && i + width < rangeVal) {
                        g.addEdge(i, i + width, weight);
                    }
                    if (!array[i - 1]?.wall && i - 1 >= 0 && (i - 1) % width !== width - 1) {
                        g.addEdge(i, i - 1, weight);
                    }
                    if (!array[i - width]?.wall && i - width >= 0) {
                        g.addEdge(i, i - width, weight);
                    }
                }
            }
            g.greedyBestFirstAlgorithm(startEndArr, width);
            const path = g.drawShortestPath();
            const visited = g.drawVisitedNodes();

            let tmpVisited = visited.values();
            let index = 0;

            const draw = async () => {
                setVisualizing(true);
                const currentNodeVisited = Number(tmpVisited.next().value);

                array = array.map((item) => {
                    if (currentNodeVisited === item.id) {
                        if (path.includes(item.id)) {
                            return {
                                ...item,
                                path: true,
                                visited: true,
                            };
                        }
                        return {
                            ...item,
                            visited: true,
                            path: false,
                        };
                    }
                    return item;
                });

                index++;
                setGridItems(array);
            };

            const setSize = visited.size;
            while (index <= setSize) {
                if (!instantSpeed) {
                    await delay(animationSpeed);
                }
                draw();
            }
            setVisualizing(false);
        } else if (algorithm === "Swarm") {
            let array = arr ? arr : clearVisualization();

            const width =
                window.innerWidth > window.innerHeight
                    ? Math.floor(Math.sqrt(rangeVal / 2)) * 2
                    : Math.floor(Math.sqrt(rangeVal / 2));
            let g = new AntColonyOptimization();
            const weight = 1;
            for (let i = 0; i < rangeVal; i++) {
                if (!array[i].wall) {
                    g.addVertex(i);
                    if (!array[i + 1]?.wall && i + 1 < rangeVal && (i + 1) % width !== 0) {
                        g.addEdge(i, i + 1, weight);
                    }
                    if (!array[i + width]?.wall && i + width < rangeVal) {
                        g.addEdge(i, i + width, weight);
                    }
                    if (!array[i - 1]?.wall && i - 1 >= 0 && (i - 1) % width !== width - 1) {
                        g.addEdge(i, i - 1, weight);
                    }
                    if (!array[i - width]?.wall && i - width >= 0) {
                        g.addEdge(i, i - width, weight);
                    }
                }
            }
            g.acoAlgorithm(startEndArr);
            const path = g.drawPath();

            let index = 0;

            const draw = async () => {
                setVisualizing(true);

                array = array.map((item) => {
                    if (path.includes(item.id)) {
                        return {
                            ...item,
                            path: true,
                            visited: true,
                        };
                    }
                    return item;
                });

                index++;
                setGridItems(array);
            };

            while (index < path.length) {
                if (!instantSpeed) {
                    await delay(animationSpeed);
                }
                draw();
            }
            setVisualizing(false);
        } else if (algorithm === "Bidirectional") {
            let array = arr ? arr : clearVisualization();

            const width =
                window.innerWidth > window.innerHeight
                    ? Math.floor(Math.sqrt(rangeVal / 2)) * 2
                    : Math.floor(Math.sqrt(rangeVal / 2));
            let g = new BidirectionalSearch();
            const weight = 1;
            for (let i = 0; i < rangeVal; i++) {
                if (!array[i].wall) {
                    g.addVertex(i);
                    if (!array[i + 1]?.wall && i + 1 < rangeVal && (i + 1) % width !== 0) {
                        g.addEdge(i, i + 1, weight);
                    }
                    if (!array[i + width]?.wall && i + width < rangeVal) {
                        g.addEdge(i, i + width, weight);
                    }
                    if (!array[i - 1]?.wall && i - 1 >= 0 && (i - 1) % width !== width - 1) {
                        g.addEdge(i, i - 1, weight);
                    }
                    if (!array[i - width]?.wall && i - width >= 0) {
                        g.addEdge(i, i - width, weight);
                    }
                }
            }
            g.bidirectionalSearch(startEndArr);
            const path = g.drawShortestPath();
            const visited = g.drawVisitedNodes();

            let tmpVisited = visited.values();
            let index = 0;

            const draw = async () => {
                setVisualizing(true);
                const currentNodeVisited = Number(tmpVisited.next().value);

                array = array.map((item) => {
                    if (currentNodeVisited === item.id) {
                        if (path.includes(item.id)) {
                            return {
                                ...item,
                                path: true,
                                visited: true,
                            };
                        }
                        return {
                            ...item,
                            visited: true,
                            path: false,
                        };
                    }
                    return item;
                });

                index++;
                setGridItems(array);
            };

            const setSize = visited.size;
            while (index <= setSize) {
                if (!instantSpeed) {
                    await delay(animationSpeed);
                }
                draw();
            }
            setVisualizing(false);
            // } else if (algorithm === "Breadth") {
            //     let array = arr ? arr : clearVisualization();

            //     const width =
            //         window.innerWidth > window.innerHeight
            //             ? Math.floor(Math.sqrt(rangeVal / 2)) * 2
            //             : Math.floor(Math.sqrt(rangeVal / 2));
            //     let g = new BreadthFirstSearch();
            //     const weight = 1;
            //     for (let i = 0; i < rangeVal; i++) {
            //         if (!array[i].wall) {
            //             g.addVertex(i);
            //             if (!array[i + 1]?.wall && i + 1 < rangeVal && (i + 1) % width !== 0) {
            //                 g.addEdge(i, i + 1, weight);
            //             }
            //             if (!array[i + width]?.wall && i + width < rangeVal) {
            //                 g.addEdge(i, i + width, weight);
            //             }
            //             if (!array[i - 1]?.wall && i - 1 >= 0 && (i - 1) % width !== width - 1) {
            //                 g.addEdge(i, i - 1, weight);
            //             }
            //             if (!array[i - width]?.wall && i - width >= 0) {
            //                 g.addEdge(i, i - width, weight);
            //             }
            //         }
            //     }
            //     g.bfsAlgorithm(startEndArr);
            //     const path = g.drawShortestPath();
            //     const visited = g.drawVisitedNodes();

            //     let tmpVisited = visited.values();
            //     let index = 0;

            //     const draw = async () => {
            //         setVisualizing(true);
            //         const currentNodeVisited = Number(tmpVisited.next().value);

            //         array = array.map((item) => {
            //             if (currentNodeVisited === item.id) {
            //                 if (path.includes(item.id)) {
            //                     return {
            //                         ...item,
            //                         path: true,
            //                         visited: true,
            //                     };
            //                 }
            //                 return {
            //                     ...item,
            //                     visited: true,
            //                     path: false,
            //                 };
            //             }
            //             return item;
            //         });

            //         index++;
            //         setGridItems(array);
            //     };

            //     const setSize = visited.size;
            //     while (index <= setSize) {
            //         if (!instantSpeed) {
            //             await delay(animationSpeed);
            //         }
            //         draw();
            //     }
            //     setVisualizing(false);
        } else if (algorithm === "Depth") {
            let array = arr ? arr : clearVisualization();

            const width =
                window.innerWidth > window.innerHeight
                    ? Math.floor(Math.sqrt(rangeVal / 2)) * 2
                    : Math.floor(Math.sqrt(rangeVal / 2));
            let g = new DepthFirstSearch();
            const weight = 1;
            for (let i = 0; i < rangeVal; i++) {
                if (!array[i].wall) {
                    g.addVertex(i);
                    if (!array[i + 1]?.wall && i + 1 < rangeVal && (i + 1) % width !== 0) {
                        g.addEdge(i, i + 1, weight);
                    }
                    if (!array[i + width]?.wall && i + width < rangeVal) {
                        g.addEdge(i, i + width, weight);
                    }
                    if (!array[i - 1]?.wall && i - 1 >= 0 && (i - 1) % width !== width - 1) {
                        g.addEdge(i, i - 1, weight);
                    }
                    if (!array[i - width]?.wall && i - width >= 0) {
                        g.addEdge(i, i - width, weight);
                    }
                }
            }
            g.dfsAlgorithm(startEndArr);
            const path = g.drawShortestPath();
            const visited = g.drawVisitedNodes();

            let tmpVisited = visited.values();
            let index = 0;

            const draw = async () => {
                setVisualizing(true);
                const currentNodeVisited = Number(tmpVisited.next().value);

                array = array.map((item) => {
                    if (currentNodeVisited === item.id) {
                        if (path.includes(item.id)) {
                            return {
                                ...item,
                                path: true,
                                visited: true,
                            };
                        }
                        return {
                            ...item,
                            visited: true,
                            path: false,
                        };
                    }
                    return item;
                });

                index++;
                setGridItems(array);
            };

            const setSize = visited.size;
            while (index <= setSize) {
                if (!instantSpeed) {
                    await delay(animationSpeed);
                }
                draw();
            }
            setVisualizing(false);
        } else if (algorithm === "Bellman") {
            let array = arr ? arr : clearVisualization();

            const width =
                window.innerWidth > window.innerHeight
                    ? Math.floor(Math.sqrt(rangeVal / 2)) * 2
                    : Math.floor(Math.sqrt(rangeVal / 2));
            let g = new BellmanFord();
            const weight = 1;

            // Add vertices and edges to BellmanFord instance
            for (let i = 0; i < rangeVal; i++) {
                if (!array[i].wall) {
                    g.addVertex(i);
                    if (!array[i + 1]?.wall && i + 1 < rangeVal && (i + 1) % width !== 0) {
                        g.addEdge(i, i + 1, weight);
                    }
                    if (!array[i + width]?.wall && i + width < rangeVal) {
                        g.addEdge(i, i + width, weight);
                    }
                    if (!array[i - 1]?.wall && i - 1 >= 0 && (i - 1) % width !== width - 1) {
                        g.addEdge(i, i - 1, weight);
                    }
                    if (!array[i - width]?.wall && i - width >= 0) {
                        g.addEdge(i, i - width, weight);
                    }
                }
            }

            // Perform Bellman-Ford algorithm
            try {
                const startNode = startEndArr[0];
                const { distances, parents } = g.bellmanFord(startNode);

                // Extract visited nodes
                const visited = new Set(Object.keys(distances));

                // Optional: Implement drawShortestPath() if needed for visualization
                const path = []; // Implement if necessary

                let tmpVisited = visited.values();
                let index = 0;

                // Function to update visualization grid
                const draw = async () => {
                    setVisualizing(true);
                    const currentNodeVisited = Number(tmpVisited.next().value);

                    array = array.map((item) => {
                        if (currentNodeVisited === item.id) {
                            if (path.includes(item.id)) {
                                return {
                                    ...item,
                                    path: true,
                                    visited: true,
                                };
                            }
                            return {
                                ...item,
                                visited: true,
                                path: false,
                            };
                        }
                        return item;
                    });

                    index++;
                    setGridItems(array);
                };

                // Visualize the process step-by-step
                const setSize = visited.size;
                while (index <= setSize) {
                    if (!instantSpeed) {
                        await delay(animationSpeed);
                    }
                    draw();
                }
            } catch (error) {
                console.error("Error during Bellman-Ford execution:", error.message);
                // Handle error (e.g., display an error message)
            } finally {
                setVisualizing(false);
            }
        } else if (algorithm === "JumpPoint") {
            let array = arr ? arr : clearVisualization();

            const width =
                window.innerWidth > window.innerHeight
                    ? Math.floor(Math.sqrt(rangeVal / 2)) * 2
                    : Math.floor(Math.sqrt(rangeVal / 2));
            let g = new JPS();
            const weight = 1;
            for (let i = 0; i < rangeVal; i++) {
                if (!array[i].wall) {
                    g.addVertex(i);
                    if (!array[i + 1]?.wall && i + 1 < rangeVal && (i + 1) % width !== 0) {
                        g.addEdge(i, i + 1, weight);
                    }
                    if (!array[i + width]?.wall && i + width < rangeVal) {
                        g.addEdge(i, i + width, weight);
                    }
                    if (!array[i - 1]?.wall && i - 1 >= 0 && (i - 1) % width !== width - 1) {
                        g.addEdge(i, i - 1, weight);
                    }
                    if (!array[i - width]?.wall && i - width >= 0) {
                        g.addEdge(i, i - width, weight);
                    }
                }
            }

            g.jpsAlgorithm(startEndArr, width);
            const path = g.drawShortestPath();
            const visited = g.drawVisitedNodes();

            let tmpVisited = visited.values();
            let index = 0;

            const draw = async () => {
                setVisualizing(true);
                const currentNodeVisited = Number(tmpVisited.next().value); // id of current visited node

                array = array.map((item) => {
                    if (currentNodeVisited === item.id) {
                        if (path.includes(item.id)) {
                            return {
                                ...item,
                                path: true,
                                visited: true,
                            };
                        }
                        return {
                            ...item,
                            visited: true,
                            path: false,
                        };
                    }
                    return item;
                });

                index++;
                setGridItems(array);
            };

            const setSize = visited.size;
            while (index <= setSize) {
                if (!instantSpeed) {
                    await delay(animationSpeed);
                }
                draw();
            }
            setVisualizing(false);
        } else if (algorithm === "Floyd") {
            let array = arr ? arr : clearVisualization();

            const width =
                window.innerWidth > window.innerHeight
                    ? Math.floor(Math.sqrt(rangeVal / 2)) * 2
                    : Math.floor(Math.sqrt(rangeVal / 2));
            let g = new FloydWarshall();
            const weight = 1;

            // Add vertices and edges based on grid and walls
            for (let i = 0; i < rangeVal; i++) {
                if (!array[i].wall) {
                    g.addVertex(i);
                    if (!array[i + 1]?.wall && i + 1 < rangeVal && (i + 1) % width !== 0) {
                        g.addEdge(i, i + 1, weight);
                    }
                    if (!array[i + width]?.wall && i + width < rangeVal) {
                        g.addEdge(i, i + width, weight);
                    }
                    if (!array[i - 1]?.wall && i - 1 >= 0 && (i - 1) % width !== width - 1) {
                        g.addEdge(i, i - 1, weight);
                    }
                    if (!array[i - width]?.wall && i - width >= 0) {
                        g.addEdge(i, i - width, weight);
                    }
                }
            }

            // Execute Floyd-Warshall algorithm
            g.floydWarshallAlgorithm();

            // Retrieve and visualize the shortest path
            const start = startEndArr[0];
            const end = startEndArr[1];
            const path = g.reconstructPath(start, end);

            if (!path) {
                // Handle case where no path exists
                console.log("No path found!");
                return;
            }

            let index = 0;
            const setSize = path.length;

            const draw = async () => {
                setVisualizing(true);
                const currentNode = path[index]; // id of current visited node

                array = array.map((item) => {
                    if (currentNode === item.id) {
                        return {
                            ...item,
                            path: true,
                            visited: true,
                        };
                    }
                    return {
                        ...item,
                        visited: true,
                        path: false,
                    };
                });

                index++;
                setGridItems(array);
            };

            while (index < setSize) {
                if (!instantSpeed) {
                    await delay(animationSpeed);
                }
                draw();
            }
            setVisualizing(false);
        } else if (algorithm === "Theta") {
            let array = arr ? arr : clearVisualization();

            const width =
                window.innerWidth > window.innerHeight
                    ? Math.floor(Math.sqrt(rangeVal / 2)) * 2
                    : Math.floor(Math.sqrt(rangeVal / 2));
            let g = new ThetaStar();
            const weight = 1;
            for (let i = 0; i < rangeVal; i++) {
                if (!array[i].wall) {
                    g.addVertex(i);
                    if (!array[i + 1]?.wall && i + 1 < rangeVal && (i + 1) % width !== 0) {
                        g.addEdge(i, i + 1, weight);
                    }
                    if (!array[i + width]?.wall && i + width < rangeVal) {
                        g.addEdge(i, i + width, weight);
                    }
                    if (!array[i - 1]?.wall && i - 1 >= 0 && (i - 1) % width !== width - 1) {
                        g.addEdge(i, i - 1, weight);
                    }
                    if (!array[i - width]?.wall && i - width >= 0) {
                        g.addEdge(i, i - width, weight);
                    }
                }
            }

            g.thetaStarAlgorithm(startEndArr, array, width);
            const path = g.drawShortestPath();
            const visited = g.drawVisitedNodes();

            let tmpVisited = visited.values();
            let index = 0;

            const draw = async () => {
                setVisualizing(true);
                const currentNodeVisited = Number(tmpVisited.next().value); // id of current visited node

                array = array.map((item) => {
                    if (currentNodeVisited === item.id) {
                        if (path.includes(item.id)) {
                            return {
                                ...item,
                                path: true,
                                visited: true,
                            };
                        }
                        return {
                            ...item,
                            visited: true,
                            path: false,
                        };
                    }
                    return item;
                });

                index++;
                setGridItems(array);
            };

            const setSize = visited.size;
            while (index <= setSize) {
                if (!instantSpeed) {
                    await delay(animationSpeed);
                }
                draw();
            }
            setVisualizing(false);
        }
    };

    const generateNewGridWithMaze = () => {
        setGenerate(generate + 1);
    };

    return (
        <div className="App">
            <Header
                changeRange={changeRange}
                changeSpeed={changeSpeed}
                changeAlgorithm={changeAlgorithm}
                clearWalls={clearWalls}
                visualize={visualize}
                generateNewGridWithMaze={generateNewGridWithMaze}
            ></Header>
            <Grid
                rangeVal={rangeVal}
                generate={generate}
                setDjakstrasStartingEndingNode={setDjakstrasStartingEndingNode}
                gridItems={gridItems}
                setGridItems={setGridItems}
                clearWalls={clearWalls}
                visualize={visualize}
            ></Grid>
        </div>
    );
}

export default App;
