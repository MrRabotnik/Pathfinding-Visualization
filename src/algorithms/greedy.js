export default class GreedyBestFirst {
    constructor() {
        this.vertices = [];
        this.adjacencyList = {};
        this.parents = {};
        this.heuristics = {};
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
        const x1 = a % width;
        const y1 = Math.floor(a / width);
        const x2 = b % width;
        const y2 = Math.floor(b / width);
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }

    greedyBestFirstAlgorithm([start, end], width) {
        this.end = end;
        const openSet = new Set([start]);

        for (let vertex of this.vertices) {
            this.heuristics[vertex] = this.heuristic(vertex, end, width);
            this.parents[vertex] = null;
        }

        while (openSet.size > 0) {
            let currVertex = null;
            let currHeuristic = Infinity;
            for (let vertex of openSet) {
                if (this.heuristics[vertex] < currHeuristic) {
                    currHeuristic = this.heuristics[vertex];
                    currVertex = vertex;
                }
            }

            if (parseInt(currVertex) === end) break; // Stop once the end vertex is reached

            openSet.delete(currVertex);
            this.visited.add(currVertex);

            let neighbors = this.adjacencyList[currVertex];
            for (let neighbor in neighbors) {
                if (this.visited.has(neighbor)) continue;
                if (!openSet.has(neighbor)) {
                    openSet.add(neighbor);
                    this.parents[neighbor] = currVertex;
                }
            }
        }
    }

    drawShortestPath() {
        let currentNode = this.end;
        while (this.parents[currentNode] !== null) {
            const parsedNode = parseInt(currentNode);
            if (isNaN(parsedNode)) {
                console.error(`Invalid node value: ${currentNode}`);
                break;
            }
            this.path.push(parsedNode);
            currentNode = this.parents[currentNode];
        }
        const parsedEndNode = parseInt(currentNode);
        if (!isNaN(parsedEndNode)) {
            this.path.push(parsedEndNode);
        }
        return this.path;
    }

    drawVisitedNodes() {
        return this.visited;
    }
}
