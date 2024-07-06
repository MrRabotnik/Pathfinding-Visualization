export default class BidirectionalSearch {
    constructor() {
        this.vertices = [];
        this.adjacencyList = {};
        this.startParents = {};
        this.endParents = {};
        this.startVisited = new Set();
        this.endVisited = new Set();
        this.path = [];
        this.start = null;
        this.end = null;
        this.meetingNode = null;
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

    bfs(queue, visited, otherVisited, parents) {
        let currVertex = queue.shift();
        let neighbors = this.adjacencyList[currVertex];
        for (let neighbor in neighbors) {
            if (!visited.has(neighbor)) {
                queue.push(neighbor);
                visited.add(neighbor);
                parents[neighbor] = currVertex;
                if (otherVisited.has(neighbor)) {
                    this.meetingNode = neighbor;
                    return true;
                }
            }
        }
        return false;
    }

    bidirectionalSearch([start, end]) {
        this.start = start;
        this.end = end;

        const queueStart = [start];
        const queueEnd = [end];
        this.startVisited.add(start);
        this.endVisited.add(end);

        while (queueStart.length > 0 && queueEnd.length > 0) {
            if (
                this.bfs(queueStart, this.startVisited, this.endVisited, this.startParents) ||
                this.bfs(queueEnd, this.endVisited, this.startVisited, this.endParents)
            ) {
                return true;
            }
        }
        return false;
    }

    drawShortestPath() {
        if (this.meetingNode === null) {
            return [];
        }

        let pathStart = [];
        let pathEnd = [];
        let currentNode = this.meetingNode;

        while (currentNode !== this.start) {
            pathStart.push(parseInt(currentNode));
            currentNode = this.startParents[currentNode];
        }
        pathStart.push(this.start);
        pathStart.reverse();

        currentNode = this.meetingNode;
        while (currentNode !== this.end) {
            pathEnd.push(parseInt(currentNode));
            currentNode = this.endParents[currentNode];
        }
        pathEnd.push(this.end);

        this.path = pathStart.concat(pathEnd.slice(1));
        return this.path;
    }

    drawVisitedNodes() {
        return new Set([...this.startVisited, ...this.endVisited]);
    }
}
