export default class AntColonyOptimization {
    constructor() {
        this.vertices = [];
        this.adjacencyList = {};
        this.pheromones = {}; // Pheromone levels on edges
        this.antPositions = {}; // Current positions of ants
        this.path = [];
        this.end = null;
        this.alpha = 1.0; // Pheromone importance
        this.beta = 1.0; // Distance (heuristic) importance
        this.q0 = 0.5; // Exploration rate
        this.rho = 0.1; // Pheromone evaporation rate
    }

    addVertex(vertex) {
        this.vertices.push(vertex);
        this.adjacencyList[vertex] = {};
        this.pheromones[vertex] = {};
        this.antPositions[vertex] = 0; // Initialize ant positions
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1][vertex2] = weight;
        this.pheromones[vertex1][vertex2] = 1.0; // Initial pheromone level
    }

    // Helper method to calculate probabilities based on pheromone levels and heuristic information
    calculateProbabilities(currVertex) {
        let probabilities = {};
        let neighbors = this.adjacencyList[currVertex];

        let total = 0;
        for (let neighbor in neighbors) {
            if (this.antPositions[neighbor] === 0) {
                // Only consider unvisited neighbors
                let pheromone = this.pheromones[currVertex][neighbor];
                let heuristic = 1.0 / neighbors[neighbor]; // Simple heuristic for now
                let value = Math.pow(pheromone, this.alpha) * Math.pow(heuristic, this.beta);
                probabilities[neighbor] = value;
                total += value;
            }
        }

        // Normalize probabilities
        for (let neighbor in probabilities) {
            probabilities[neighbor] /= total;
        }

        return probabilities;
    }

    // Ant movement based on probabilities
    moveAnt(currVertex) {
        let probabilities = this.calculateProbabilities(currVertex);
        let maxProbability = 0;
        let nextVertex = null;

        for (let neighbor in probabilities) {
            if (probabilities[neighbor] > maxProbability) {
                maxProbability = probabilities[neighbor];
                nextVertex = neighbor;
            }
        }

        // Exploration vs exploitation using q0
        if (Math.random() < this.q0) {
            nextVertex = Object.keys(probabilities)[Math.floor(Math.random() * Object.keys(probabilities).length)];
        }

        this.antPositions[currVertex] = 0;
        this.antPositions[nextVertex] = 1;

        return nextVertex;
    }

    acoAlgorithm(startEndArr) {
        let [end] = startEndArr;
        this.end = end;
        const maxIterations = 100; // Maximum number of iterations
        let iteration = 0;

        while (iteration < maxIterations && !this.antPositions[end]) {
            for (let vertex of this.vertices) {
                if (this.antPositions[vertex] === 1) {
                    let nextVertex = this.moveAnt(vertex);
                    // Update pheromone level
                    this.pheromones[vertex][nextVertex] =
                        (1 - this.rho) * this.pheromones[vertex][nextVertex] + this.rho;
                }
            }
            iteration++;
        }
    }

    drawPath() {
        let currentNode = this.end;
        while (currentNode !== null) {
            this.path.push(parseInt(currentNode));
            currentNode = this.antPositions[currentNode] === 1 ? null : currentNode; // Stop if ant position reached
        }
        this.path.reverse();
        return this.path;
    }
}
