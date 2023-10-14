import { useCallback, useEffect, useState } from "react";
import "./Grid.scss"
import panda from "../../assets/panda.png"
import bamboo from "../../assets/bamboo.png"

function Grid({ rangeVal }) {
    const [gridItems, setGridItems] = useState([])
    const [boxWidth, setBoxWidth] = useState(10)
    const [boxHeight, setBoxHeight] = useState(5)
    const [startNodePos, setStartNodePos] = useState(null)
    const [endNodePos, setEndNodePos] = useState(null)
    const [startPickedUp, setStartPickedUp] = useState(false)
    const [endPickedUp, setEndPickedUp] = useState(false)
    const [mouseX, setMouseX] = useState(0)
    const [mouseY, setMouseY] = useState(0)
    const [visibility, setVisibility] = useState("hidden")
    const [movingNodeImage, setMovingNodeImage] = useState("")

    const initGrid = useCallback(() => {
        const arr = []
        const walls = [6, 11, 12, 13, 16, 18, 21, 23, 26, 28, 31, 33, 36, 37, 38, 43]
        setBoxWidth(Math.floor(Math.sqrt(rangeVal / 2)) * 2)
        setBoxHeight(Math.floor(Math.sqrt(rangeVal / 2)))
        const startingPos = boxWidth * Math.ceil((boxHeight / 2 - 1)) + Math.floor(boxWidth / 4)
        const endingPos = boxWidth * Math.ceil((boxHeight / 2 - 1)) + Math.floor(boxWidth / 4 * 3)
        setStartNodePos(startingPos)
        setEndNodePos(endingPos)
        for (let i = 0; i < rangeVal; i++) {
            arr.push({
                "id": i,
                "start": i === startingPos ? true : false,
                "end": i === endingPos ? true : false,
                "wall": walls.includes(i) ? true : false
            })
        }
        setGridItems(arr)
    }, [boxHeight, boxWidth, rangeVal])

    const mouseDownOnBox = (e, box) => {
        e.preventDefault();
        setMouseX(e.clientX)
        setMouseY(e.clientY)
        setVisibility("visible")
        if (box.start) {
            setStartPickedUp(true)
            setMovingNodeImage(panda)
        }
        else if (box.end) {
            setEndPickedUp(true)
            setMovingNodeImage(bamboo)
        }
        else return
    }

    const mouseUpOnBox = (box) => {
        if (box.wall) {
            checkIfThereIsAWallOnMouseDown(startPickedUp, endPickedUp)
            return
        }
        if (startPickedUp) {
            const arr = gridItems.map(item => {
                if (!item.end && item.id === box.id) {
                    setStartNodePos(item.id)
                    return {
                        ...item,
                        "start": true
                    }
                }
                return {
                    ...item,
                    "start": false
                }
            })
            setGridItems(arr)
        } else if (endPickedUp) {
            const arr = gridItems.map(item => {
                if (!item.start && item.id === box.id) {
                    setEndNodePos(item.id)
                    return {
                        ...item,
                        "end": true
                    }
                }
                return {
                    ...item,
                    "end": false
                }
            })
            setGridItems(arr)
        }
        setStartPickedUp(false)
        setEndPickedUp(false)
        setMovingNodeImage(null)
    }

    const checkIfThereIsAWallOnMouseDown = (startPickedUp, endPickedUp) => {
        if (startPickedUp) {
            const arr = gridItems.map(item => {
                if (item.id === startNodePos) {
                    return {
                        ...item,
                        "start": true
                    }
                }
                return {
                    ...item,
                    "start": false,
                }
            })
            setGridItems(arr)

        } else if (endPickedUp) {
            const arr = gridItems.map(item => {
                if (item.id === endNodePos) {
                    return {
                        ...item,
                        "end": true
                    }
                }
                return {
                    ...item,
                    "end": false,
                }
            })
            setGridItems(arr)
        }
        setStartPickedUp(false)
        setEndPickedUp(false)
        setMovingNodeImage(null)
    }

    const moveMouse = (e) => {
        if (startPickedUp || endPickedUp) {
            setMouseX(e.clientX)
            setMouseY(e.clientY)
        }
    }

    // const changeWalls = (e, box) => {
    //     const arr = gridItems.map(item => {
    //         if (!item.start && !item.start && item.id === box.id) {
    //             if (box.wall) return { ...item, "wall": false }
    //             else return { ...item, "wall": true }
    //         }
    //         return item
    //     })

    //     setGridItems(arr)
    // }


    useEffect(() => {
        initGrid()
    }, [initGrid])

    return (
        <div className="grid">
            <div className="pickedUpItem" style={{
                left: `${mouseX}px`,
                top: `${mouseY}px`,
                visibility: `${visibility}`,
                backgroundImage: `URL(${movingNodeImage})`,
            }}></div>
            {
                gridItems && gridItems.map((box, index) => {
                    return <div key={index}
                        className="gridItem"
                        style={{
                            width: `${100 / boxWidth}%`,
                            height: `${100 / boxHeight}%`,
                            backgroundSize: "100% 100%",
                            backgroundImage: `URL(${box?.start && !startPickedUp ? panda : box?.end && !endPickedUp ? bamboo : ""})`,
                            backgroundColor: box?.wall ? "black" : "transparent",
                            // border: `1px solid ${box.wall ? "white" : "black"}`
                        }}
                        onMouseDown={(e) => { mouseDownOnBox(e, box) }}
                        onMouseUp={() => { mouseUpOnBox(box) }}
                        onMouseMove={(e) => { moveMouse(e) }}
                    ></div>
                })
            }
        </div >
    );
}

export default Grid;
