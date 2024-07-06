export default class DepthFirstSearch {
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

    dfsAlgorithm([start, end]) {
        this.end = end;
        this.visited.clear();
        this.path = [];
        this.parents = {};

        const stack = [start];
        this.visited.add(start);
        this.parents[start] = null;

        while (stack.length > 0) {
            let currVertex = stack.pop();

            if (parseInt(currVertex) === end) break;

            let neighbors = this.adjacencyList[currVertex];
            for (let neighbor in neighbors) {
                if (!this.visited.has(neighbor)) {
                    stack.push(neighbor);
                    this.visited.add(neighbor);
                    this.parents[neighbor] = currVertex;
                }
            }
        }
    }

    drawShortestPath() {
        let currentNode = this.end;
        while (currentNode !== null) {
            this.path.push(parseInt(currentNode));
            currentNode = this.parents[currentNode];
        }
        this.path.reverse();
        return this.path;
    }

    drawVisitedNodes() {
        return this.visited;
    }
}
