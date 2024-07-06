export default class FloydWarshall {
    constructor() {
        this.vertices = [];
        this.adjacencyMatrix = [];
        this.distances = {};
        this.next = {};
    }

    addVertex(vertex) {
        this.vertices.push(vertex);
        const index = this.vertices.indexOf(vertex);
        // Initialize adjacency matrix with Infinity (representing no direct path)
        for (let i = 0; i < this.vertices.length; i++) {
            if (!this.adjacencyMatrix[i]) this.adjacencyMatrix[i] = [];
            this.adjacencyMatrix[i][index] = Infinity;
            this.adjacencyMatrix[index][i] = Infinity;
        }
        this.adjacencyMatrix[index][index] = 0; // Distance to itself is 0
    }

    addEdge(vertex1, vertex2, weight) {
        const idx1 = this.vertices.indexOf(vertex1);
        const idx2 = this.vertices.indexOf(vertex2);
        this.adjacencyMatrix[idx1][idx2] = weight;
        this.adjacencyMatrix[idx2][idx1] = weight; // Assuming undirected graph
    }

    floydWarshallAlgorithm() {
        const n = this.vertices.length;
        // Initialize distances and next matrix
        for (let i = 0; i < n; i++) {
            this.distances[i] = {};
            this.next[i] = {};
            for (let j = 0; j < n; j++) {
                this.distances[i][j] = this.adjacencyMatrix[i][j];
                if (this.adjacencyMatrix[i][j] !== Infinity) {
                    this.next[i][j] = j;
                } else {
                    this.next[i][j] = null;
                }
            }
        }

        // Floyd-Warshall algorithm
        for (let k = 0; k < n; k++) {
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (this.distances[i][j] > this.distances[i][k] + this.distances[k][j]) {
                        this.distances[i][j] = this.distances[i][k] + this.distances[k][j];
                        this.next[i][j] = this.next[i][k];
                    }
                }
            }
        }
    }

    reconstructPath(start, end) {
        const path = [];
        if (this.distances[this.vertices.indexOf(start)][this.vertices.indexOf(end)] === Infinity) {
            return null; // No path exists
        }
        let at = start;
        for (; at !== end; at = this.next[this.vertices.indexOf(at)][this.vertices.indexOf(end)]) {
            if (at === null) return null; // No path exists
            path.push(at);
        }
        if (this.next[this.vertices.indexOf(at)][this.vertices.indexOf(end)] === null) return null; // No path exists
        path.push(end);
        return path;
    }

    getDistance(start, end) {
        return this.distances[this.vertices.indexOf(start)][this.vertices.indexOf(end)];
    }
}
