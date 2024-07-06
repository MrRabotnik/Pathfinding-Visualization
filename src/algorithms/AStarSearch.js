export default class AStar {
    constructor() {
        this.vertices = [];
        this.adjacencyList = {};
        this.parents = {};
        this.distances = {};
        this.visited = new Set();
        this.path = [];
        this.end = null;
    }

    addVertex(vertex) {
        this.vertices.push(vertex);
        this.adjacencyList[vertex] = {};
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1][vertex2] = weight;
    }

    changeWeight(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1][vertex2] = weight;
    }

    heuristic(a, b, width) {
        // Manhattan distance
        const x1 = a % width;
        const y1 = Math.floor(a / width);
        const x2 = b % width;
        const y2 = Math.floor(b / width);
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }

    aStarAlgorithm([start, end], width) {
        this.end = end;
        const openSet = new Set([start]);
        const gScore = {};
        const fScore = {};

        for (let vertex of this.vertices) {
            gScore[vertex] = Infinity;
            fScore[vertex] = Infinity;
            this.parents[vertex] = null;
        }
        gScore[start] = 0;
        fScore[start] = this.heuristic(start, end, width);

        while (openSet.size > 0) {
            let currVertex = null;
            let currFScore = Infinity;
            for (let vertex of openSet) {
                if (fScore[vertex] < currFScore) {
                    currFScore = fScore[vertex];
                    currVertex = vertex;
                }
            }

            if (parseInt(currVertex) === end) {
                break;
            }

            openSet.delete(currVertex);
            this.visited.add(currVertex);

            let distance = gScore[currVertex];
            let neighbors = this.adjacencyList[currVertex];
            for (let neighbor in neighbors) {
                if (this.visited.has(neighbor)) continue;
                let tentativeGScore = distance + neighbors[neighbor];
                if (tentativeGScore < gScore[neighbor]) {
                    gScore[neighbor] = tentativeGScore;
                    fScore[neighbor] = tentativeGScore + this.heuristic(neighbor, end, width);
                    this.parents[neighbor] = currVertex;
                    openSet.add(neighbor);
                }
            }
        }
    }

    drawShortestPath() {
        let currentNode = this.end;
        while (this.parents[currentNode] !== null) {
            this.path.push(+currentNode);
            currentNode = this.parents[currentNode];
        }
        this.path.push(+currentNode);
        return this.path;
    }

    drawVisitedNodes() {
        return this.visited;
    }
}
