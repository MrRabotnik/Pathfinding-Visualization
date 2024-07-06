export default class ThetaStar {
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

    lineOfSight(nodeA, nodeB, array, width) {
        // Implement your line-of-sight logic here
    }

    thetaStarAlgorithm(startEndArr, array, width) {
        const start = startEndArr[0];
        const end = startEndArr[1];
        this.end = end;

        const openSet = new BinaryHeap((node) => this.distances[node]);
        openSet.push(start);
        this.distances[start] = 0;

        while (!openSet.isEmpty()) {
            const currentNode = openSet.pop();

            if (currentNode === end) break;

            this.visited.add(currentNode);

            const neighbors = Object.keys(this.adjacencyList[currentNode]);
            for (let neighbor of neighbors) {
                const newCost = this.distances[currentNode] + this.adjacencyList[currentNode][neighbor];

                if (!(neighbor in this.distances) || newCost < this.distances[neighbor]) {
                    this.distances[neighbor] = newCost;
                    this.parents[neighbor] = currentNode;

                    if (openSet.content.includes(neighbor)) {
                        openSet.update(neighbor);
                    } else {
                        openSet.push(neighbor);
                    }
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

class BinaryHeap {
    constructor(scoreFunction) {
        this.content = [];
        this.scoreFunction = scoreFunction;
    }

    push(element) {
        this.content.push(element);
        this.bubbleUp(this.content.length - 1);
    }

    pop() {
        const result = this.content[0];
        const end = this.content.pop();
        if (this.content.length > 0) {
            this.content[0] = end;
            this.sinkDown(0);
        }
        return result;
    }

    update(element) {
        for (let i = 0; i < this.content.length; i++) {
            if (this.content[i] === element) {
                this.bubbleUp(i);
                break;
            }
        }
    }

    isEmpty() {
        return this.content.length === 0;
    }

    bubbleUp(n) {
        const element = this.content[n];
        const score = this.scoreFunction(element);
        while (n > 0) {
            const parentN = Math.floor((n + 1) / 2) - 1;
            const parent = this.content[parentN];
            if (score >= this.scoreFunction(parent)) break;
            this.content[parentN] = element;
            this.content[n] = parent;
            n = parentN;
        }
    }

    sinkDown(n) {
        const length = this.content.length;
        const element = this.content[n];
        const elemScore = this.scoreFunction(element);

        while (true) {
            const child2N = (n + 1) * 2;
            const child1N = child2N - 1;
            let swap = null;

            if (child1N < length) {
                const child1 = this.content[child1N];
                const child1Score = this.scoreFunction(child1);
                if (child1Score < elemScore) {
                    swap = child1N;
                }
            }

            if (child2N < length) {
                const child2 = this.content[child2N];
                const child2Score = this.scoreFunction(child2);
                if (child2Score < (swap === null ? elemScore : this.scoreFunction(this.content[swap]))) {
                    swap = child2N;
                }
            }

            if (swap === null) break;

            this.content[n] = this.content[swap];
            this.content[swap] = element;
            n = swap;
        }
    }
}
