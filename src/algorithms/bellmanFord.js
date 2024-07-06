// BellmanFord.js

export default class BellmanFord {
    constructor() {
        this.vertices = [];
        this.edges = [];
        this.distances = {};
        this.parents = {};
    }

    addVertex(vertex) {
        if (!this.vertices.includes(vertex)) {
            this.vertices.push(vertex);
        }
    }

    addEdge(vertex1, vertex2, weight) {
        this.edges.push({ source: vertex1, destination: vertex2, weight: weight });
    }

    initialize(start) {
        for (let vertex of this.vertices) {
            this.distances[vertex] = Infinity;
            this.parents[vertex] = null;
        }
        this.distances[start] = 0;
    }

    relax(edge) {
        let { source, destination, weight } = edge;
        if (this.distances[source] + weight < this.distances[destination]) {
            this.distances[destination] = this.distances[source] + weight;
            this.parents[destination] = source;
            return true; // Relaxation occurred
        }
        return false; // No relaxation
    }

    bellmanFord(start) {
        this.initialize(start);

        // Relax edges |V|-1 times
        for (let i = 0; i < this.vertices.length - 1; i++) {
            for (let edge of this.edges) {
                this.relax(edge);
            }
        }

        // Check for negative weight cycles
        for (let edge of this.edges) {
            if (this.relax(edge)) {
                throw new Error("Graph contains a negative weight cycle");
            }
        }

        return { distances: this.distances, parents: this.parents };
    }
}
