function generateFakeData(steps) {
    var points = [];
    var v = .025 + .2 * Math.pow(Math.random(), 3);
    var sign = Math.random() < .5 ? 1 : -1;
    var m = 20 * Math.random() / steps;
    var b = .3 * Math.random();
    for (var x = 0; x <= steps; x += 1) {
        var y = b + (1 - b - .2) * Math.exp(-m * x) + v * Math.random();
        if (sign == -1) {
            y = 1 - y;
        }
        points.push([x, y]);
    }
    return points;
}
