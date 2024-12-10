function tsp_ls(distance_matrix) {
    const n = distance_matrix.length;
    
    function calculateTotalDistance(route) {
        let totalDistance = 0;
        for (let i = 0; i < route.length - 1; i++) {
            totalDistance += distance_matrix[route[i]][route[i + 1]];
        }
        return totalDistance;
    }

    let route = [];
    for (let i = 0; i < n; i++) {
        route.push(i);
    }
    route = route.sort(() => Math.random() - 0.5);

    function twoOptSwap(route, i, k) {
        const newRoute = [...route];
        while (i < k) {
            [newRoute[i], newRoute[k]] = [newRoute[k], newRoute[i]]; // Swap cities
            i++;
            k--;
        }
        return newRoute;
    }


    const maxIterations = 1000;
    let bestRoute = route;
    let bestDistance = calculateTotalDistance(route);
    let iterationsWithoutImprovement = 0;

    for (let iteration = 0; iteration < maxIterations; iteration++) {
        let improved = false;

        for (let i = 0; i < n - 1; i++) {
            for (let k = i + 1; k < n; k++) {
                let newRoute = twoOptSwap(bestRoute, i, k);
                let newDistance = calculateTotalDistance(newRoute);
                
                if (newDistance < bestDistance) {
                    bestRoute = newRoute;
                    bestDistance = newDistance;
                    improved = true;
                }
            }
        }

        if (!improved) {
            iterationsWithoutImprovement++;
        } else {
            iterationsWithoutImprovement = 0;
        }

        if (iterationsWithoutImprovement > 100) {
            break;
        }
    }
    return bestDistance;
}
