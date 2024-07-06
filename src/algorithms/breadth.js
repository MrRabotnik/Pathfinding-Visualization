export default class BreadthFirstSearch {
    constructor() {
        this.vertices = [];
        this.adjacencyList = {};
        this.parents = {};
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

    bfsAlgorithm([start, end]) {
        this.end = end;
        const queue = [start];
        this.visited.add(start);
        this.parents[start] = null;

        while (queue.length > 0) {
            let currVertex = queue.shift();

            if (parseInt(currVertex) === end) break;

            let neighbors = this.adjacencyList[currVertex];
            for (let neighbor in neighbors) {
                if (!this.visited.has(neighbor)) {
                    queue.push(neighbor);
                    this.visited.add(neighbor);
                    this.parents[neighbor] = currVertex;
                }
            }
        }
    }

    drawShortestPath() {
        let currentNode = this.end;
        while (this.parents[currentNode] !== null) {
            this.path.push(parseInt(currentNode));
            currentNode = this.parents[currentNode];
        }
        this.path.push(parseInt(currentNode));
        return this.path.reverse();
    }
    drawVisitedNodes() {
        return this.visited;
    }
}
