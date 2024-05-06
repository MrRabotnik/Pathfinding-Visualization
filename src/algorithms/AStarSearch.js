export default class Graph {
    constructor() {
        this.vertices = [];
        this.adjacencyList = {};
        this.parents = {};
        this.distances = {};
        this.manhattanDistances = {};
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

    vertexWithMinDistance(distances, visited) {
        let minDistance = Infinity,
            minVertex = null;
        for (let vertex in distances) {
            let distance = distances[vertex];
            if (distance < minDistance && !visited.has(vertex)) {
                minDistance = distance;
                minVertex = vertex;
            }
        }
        return minVertex;
    }

    calcManhattanDistance(currentNode) {
        return Math.abs(this.end - currentNode);
    }

    dijkstrasAlgorithm = ([start, end]) => {
        console.log(this.vertices);
        this.end = end;
        for (let i = 0; i < this.vertices.length; i++) {
            if (this.vertices[i] === start) {
                this.distances[start] = 0;
                this.manhattanDistances[start] = this.calcManhattanDistance(start);
            } else {
                this.distances[this.vertices[i]] = Infinity;
                this.manhattanDistances[this.vertices[i]] = this.calcManhattanDistance(this.vertices[i]);
            }
            this.parents[this.vertices[i]] = null;
        }

        let currVertex = this.vertexWithMinDistance(this.distances, this.visited);

        while (currVertex !== null) {
            if (+currVertex === end) break;
            let distance = this.distances[currVertex],
                neighbors = this.adjacencyList[currVertex];
            for (let neighbor in neighbors) {
                let newDistance = distance + neighbors[neighbor];
                if (this.distances[neighbor] > newDistance) {
                    this.distances[neighbor] = newDistance;
                    this.parents[neighbor] = currVertex;
                }
            }
            this.visited.add(currVertex);
            currVertex = this.vertexWithMinDistance(this.distances, this.visited);
        }

        console.log("Parents");
        console.log(this.parents);

        console.log("Distances");
        console.log(this.distances);

        console.log("Visited");
        console.log(this.visited);

        console.log("Adjacent List");
        console.log(this.adjacencyList);
    };

    drawShortestPath = () => {
        let currentNode = this.end;
        while (this.parents[currentNode] !== null) {
            this.path.push(+currentNode);
            currentNode = this.parents[currentNode];
        }
        this.path.push(+currentNode);
        return this.path;
    };

    drawVisitedNodes = () => {
        return this.visited;
    };
}
