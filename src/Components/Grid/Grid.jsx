import { useEffect, useState } from "react";
import "./Grid.scss"
import panda from "../../assets/panda.png"
import bamboo from "../../assets/bamboo.png"

function Grid({ rangeVal }) {
    const [gridItems, setGridItems] = useState([])
    const [boxWidth, setBoxWidth] = useState(10)
    const [boxHeight, setBoxHeight] = useState(5)
    useEffect(() => {
        const arr = []
        setBoxWidth(Math.floor(Math.sqrt(rangeVal / 2)) * 2)
        setBoxHeight(Math.floor(Math.sqrt(rangeVal / 2)))
        const startingPos = boxWidth * Math.ceil((boxHeight / 2 - 1)) + Math.floor(boxWidth / 4)
        const endingPos = boxWidth * Math.ceil((boxHeight / 2 - 1)) + Math.floor(boxWidth / 4 * 3)
        for (let i = 0; i < rangeVal; i++) {
            arr.push({
                "id": i,
                "start": i === startingPos ? true : false,
                "end": i === endingPos ? true : false
            })
        }
        setGridItems(arr)
    }, [rangeVal, boxWidth, boxHeight])

    return (
        <div className="grid">
            {
                gridItems && gridItems.map((box, index) => {
                    return <div key={index}
                        className="gridItem"
                        style={{
                            width: `${100 / boxWidth}%`,
                            height: `${100 / boxHeight}%`,
                            backgroundSize: "100% 100%",
                            backgroundImage: `URL(${box.start ? panda : box.end ? bamboo : ""})`
                        }}
                    ></div>
                })
            }
        </div>
    );
}

export default Grid;
