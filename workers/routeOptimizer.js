const { parentPort, workerData } = require('worker_threads');

function optimizeRoute(locations) {
  // This is a simple nearest neighbor algorithm
  // In a real-world scenario, you'd use a more sophisticated algorithm
  const optimizedRoute = [locations[0]];
  const unvisited = locations.slice(1);

  while (unvisited.length > 0) {
    const current = optimizedRoute[optimizedRoute.length - 1];
    let nearest = unvisited[0];
    let nearestDistance = distance(current, nearest);
    let nearestIndex = 0;

    for (let i = 1; i < unvisited.length; i++) {
      const d = distance(current, unvisited[i]);
      if (d < nearestDistance) {
        nearest = unvisited[i];
        nearestDistance = d;
        nearestIndex = i;
      }
    }

    optimizedRoute.push(nearest);
    unvisited.splice(nearestIndex, 1);
  }

  return optimizedRoute;
}

function distance(a, b) {
  return Math.sqrt(Math.pow(a.lat - b.lat, 2) + Math.pow(a.lng - b.lng, 2));
}

const optimizedRoute = optimizeRoute(workerData.locations);
parentPort.postMessage(optimizedRoute);

