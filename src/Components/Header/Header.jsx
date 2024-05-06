import "./Header.scss";

function Header({ changeRange, changeSpeed, changeAlgorithm, clearWalls, visualize, generateNewGridWithMaze }) {
    return (
        <header className="header">
            <select
                className="algorithmsSelect"
                name="Algorithms"
                defaultValue={"Algorithms"}
                onChange={(e) => changeAlgorithm(e.target.value)}
            >
                <option
                    value=""
                    disabled
                >
                    Algorithms
                </option>
                <option value="Dij">Dijkstra’s Algorithm</option>
                <option value="A*">A* Search</option>
                <option value="Greedy">Greedy Best-First Search</option>
                <option value="Swarm">Swarm Algorithm</option>
                <option value="Convergent">Convergent Swarm Algorithm</option>
                <option value="Bidirectional">Bidirectional Swarm Algorithm</option>
                <option value="Breadth">Breadth-First Search</option>
                <option value="Depth">Depth-First Search</option>
            </select>
            <select
                className="sizeSelect"
                name="Size"
                onChange={(e) => changeRange(e.target.value)}
                defaultValue={"50"}
            >
                <option value="50">10x5</option>
                <option value="450">30x15</option>
                <option value="1250">50x25</option>
                <option value="2450">70x35</option>
            </select>
            <button
                className="visualizeBtn"
                onClick={() => {
                    visualize(undefined);
                }}
            >
                Visualize
            </button>
            <button
                className="generateBtn"
                onClick={generateNewGridWithMaze}
            >
                Generate
            </button>
            <button
                className="clearBtn"
                onClick={clearWalls}
            >
                Clear
            </button>
            <select
                name="Speed"
                className="speedSelect"
                defaultValue={"fast"}
                onChange={(e) => {
                    changeSpeed(e.target.value);
                }}
            >
                <option disabled>Speed</option>
                <option value="true">Instant</option>
                <option value="fast">Fast</option>
                <option value="middle">Middle</option>
                <option value="slow">Slow</option>
            </select>
        </header>
    );
}

export default Header;
