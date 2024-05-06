import { useEffect, useState } from "react";
import "./Grid.scss";
import panda from "../../assets/panda.png";
import bamboo from "../../assets/bamboo.png";

function Grid({ rangeVal, generate, setDjakstrasStartingEndingNode, gridItems, setGridItems, visualize }) {
    const WW = window.innerWidth;
    const WH = window.innerHeight;

    const [boxWidth, setBoxWidth] = useState(WW > WH ? 30 : 15);
    const [boxHeight, setBoxHeight] = useState(WW > WH ? 15 : 30);
    const [startNodePos, setStartNodePos] = useState(null);
    const [endNodePos, setEndNodePos] = useState(null);
    const [startPickedUp, setStartPickedUp] = useState(false);
    const [endPickedUp, setEndPickedUp] = useState(false);
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [visibility, setVisibility] = useState("hidden");
    const [movingNodeImage, setMovingNodeImage] = useState("");
    const [mouseDown, setMouseDown] = useState(false);
    const [removeWall, setRemoveWall] = useState(false);

    const generateMaze = () => {
        const maze = [];

        for (let col = 0; col < boxHeight; col++) {
            maze[col] = [];
            for (let row = 0; row < boxWidth; row++) {
                maze[col][row] = 0;
            }
        }

        // Generate random walls in the maze
        for (let col = boxHeight < 10 ? 1 : 0; col < (boxHeight < 10 ? boxHeight - 1 : boxHeight); col += 2) {
            for (let row = boxHeight < 10 ? 1 : 0; row < (boxHeight < 10 ? boxWidth - 1 : boxWidth); row += 2) {
                maze[col][row] = 1;

                if (col > 1 && Math.random() < 0.4) {
                    maze[col - 1][row] = 1;
                }

                if (row < boxWidth - 1 && Math.random() < 0.4) {
                    maze[col][row + 1] = 1;
                }
            }
        }

        const arr = [];
        let count = 0;
        for (let i = 0; i < boxHeight; i++) {
            for (let j = 0; j < boxWidth; j++) {
                if (maze[i][j]) {
                    arr.push(count);
                }
                count++;
            }
        }
        return arr;
    };

    const randomStartingPos = (maze) => {
        let startingPos = boxWidth * Math.ceil(boxHeight / 2 - 1) + Math.floor(boxWidth / 4);
        let endingPos = boxWidth * Math.ceil(boxHeight / 2 - 1) + Math.floor((boxWidth / 4) * 3);
        while (maze.includes(startingPos)) {
            startingPos = Math.floor(Math.random() * (rangeVal - 1));
        }

        while (maze.includes(endingPos) || startingPos === endingPos) {
            endingPos = Math.floor(Math.random() * (rangeVal - 1));
        }

        setDjakstrasStartingEndingNode([startingPos, endingPos]);
        return [startingPos, endingPos];
    };

    const initGrid = () => {
        const arr = [];
        const maze = generateMaze();
        const pos = randomStartingPos(maze);

        if (WW > WH) {
            setBoxWidth(Math.floor(Math.sqrt(rangeVal / 2)) * 2);
            setBoxHeight(Math.floor(Math.sqrt(rangeVal / 2)));
        } else {
            setBoxWidth(Math.floor(Math.sqrt(rangeVal / 2)));
            setBoxHeight(Math.floor(Math.sqrt(rangeVal / 2)) * 2);
        }

        setStartNodePos(pos[0]);
        setEndNodePos(pos[1]);
        for (let i = 0; i < rangeVal; i++) {
            arr.push({
                id: i,
                start: i === pos[0] ? true : false,
                end: i === pos[1] ? true : false,
                wall: maze.includes(i) ? true : false,
                path: false,
                visited: false,
            });
        }
        setGridItems(arr);
    };

    const updateGridWalls = (box, remove) => {
        if (startPickedUp || endPickedUp) return;
        if (remove) {
            const arr = gridItems.map((item) => {
                if (!item.start && !item.end && item.id === box.id) {
                    if (item.wall) {
                        return {
                            ...item,
                            wall: false,
                        };
                    }
                }
                return item;
            });
            setGridItems(arr);
        } else {
            const arr = gridItems.map((item) => {
                if (!item.start && !item.end && item.id === box.id) {
                    if (!item.wall) {
                        return {
                            ...item,
                            wall: true,
                        };
                    }
                }
                return item;
            });
            setGridItems(arr);
        }
    };

    const mouseDownOnBox = (e, box) => {
        e.preventDefault();
        setMouseDown(true);
        setMouseX(e.clientX);
        setMouseY(e.clientY);
        setVisibility("visible");
        if (box.wall) setRemoveWall(true);
        else setRemoveWall(false);
        if (box.start) {
            setStartPickedUp(true);
            setMovingNodeImage(panda);
        } else if (box.end) {
            setEndPickedUp(true);
            setMovingNodeImage(bamboo);
        } else {
            updateGridWalls(box, box.wall);
        }
    };

    const mouseUpOnBox = (box) => {
        setMouseDown(false);
        if (box.wall) {
            checkIfThereIsAWallOnMouseDown(startPickedUp, endPickedUp);
            return;
        }
        let changeStartPos = startNodePos;
        let changeEndPos = endNodePos;

        if (startPickedUp) {
            const arr = gridItems.map((item) => {
                if (!item.end && item.id === box.id) {
                    setStartNodePos(item.id);
                    changeStartPos = item.id;
                    return {
                        ...item,
                        start: true,
                        path: false,
                        visited: false,
                    };
                }
                return {
                    ...item,
                    start: false,
                    path: false,
                    visited: false,
                };
            });
            setGridItems(arr);
            visualize(arr, [changeStartPos, changeEndPos]);
        } else if (endPickedUp) {
            const arr = gridItems.map((item) => {
                if (!item.start && item.id === box.id) {
                    setEndNodePos(item.id);
                    changeEndPos = item.id;
                    return {
                        ...item,
                        end: true,
                        path: false,
                        visited: false,
                    };
                }
                return {
                    ...item,
                    end: false,
                    path: false,
                    visited: false,
                };
            });
            setGridItems(arr);
            visualize(arr, [changeStartPos, changeEndPos]);
        }
        setStartPickedUp(false);
        setEndPickedUp(false);
        setMovingNodeImage(null);
        setDjakstrasStartingEndingNode([changeStartPos, changeEndPos]);
    };

    const checkIfThereIsAWallOnMouseDown = (startPickedUp, endPickedUp) => {
        if (startPickedUp) {
            const arr = gridItems.map((item) => {
                if (item.id === startNodePos) {
                    return {
                        ...item,
                        start: true,
                    };
                }
                return {
                    ...item,
                    start: false,
                };
            });
            setGridItems(arr);
        } else if (endPickedUp) {
            const arr = gridItems.map((item) => {
                if (item.id === endNodePos) {
                    return {
                        ...item,
                        end: true,
                    };
                }
                return {
                    ...item,
                    end: false,
                };
            });
            setGridItems(arr);
        }
        setStartPickedUp(false);
        setEndPickedUp(false);
        setMovingNodeImage(null);
    };

    const moveMouse = (e, box) => {
        if (startPickedUp || endPickedUp) {
            setMouseX(e.clientX);
            setMouseY(e.clientY);
        }
    };

    const moveOnBoxes = (box) => {
        if (mouseDown) {
            updateGridWalls(box, removeWall);
        }
    };

    useEffect(() => {
        initGrid();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rangeVal, generate, boxHeight, boxWidth]);

    return (
        <div className="grid">
            <div
                className="pickedUpItem"
                style={{
                    left: `${mouseX}px`,
                    top: `${mouseY}px`,
                    visibility: `${visibility}`,
                    backgroundImage: `URL(${movingNodeImage})`,
                    animation: `${startPickedUp || endPickedUp ? "pickedUpNode 1s infinite" : ""}`,
                }}
            ></div>
            {gridItems &&
                gridItems.map((box, index) => {
                    return (
                        <div
                            key={index}
                            className="gridItem"
                            style={{
                                width: `${100 / boxWidth}%`,
                                height: `${100 / boxHeight}%`,
                                backgroundImage: `URL(${
                                    box.start && !startPickedUp ? panda : box.end && !endPickedUp ? bamboo : ""
                                })`,
                                backgroundColor: box.wall
                                    ? "black"
                                    : box.end || box.path
                                    ? "green"
                                    : box.visited
                                    ? "wheat"
                                    : "transparent",
                                border: `1px solid ${box.wall ? "white" : "transparent"}`,
                            }}
                            onMouseDown={(e) => {
                                mouseDownOnBox(e, box);
                            }}
                            onMouseUp={() => {
                                mouseUpOnBox(box);
                            }}
                            onMouseMove={(e) => {
                                moveMouse(e, box);
                            }}
                            onMouseEnter={() => {
                                moveOnBoxes(box);
                            }}
                        ></div>
                    );
                })}
        </div>
    );
}

export default Grid;
