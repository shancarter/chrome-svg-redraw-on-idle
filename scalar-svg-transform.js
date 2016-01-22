var ScalarSVGTransform = (function () {
    function ScalarSVGTransform(containerNode) {
        var _this = this;
        this.renderWidth = 1000;
        this.renderHeight = 1000;
        this.xIndex = 0;
        this.yIndex = 1;
        this.x = d3.scale.linear();
        this.y = d3.scale.linear();
        this.line = d3.svg.line()
            .x(function (d) { return _this.x(d[_this.xIndex]); })
            .y(function (d) { return _this.y(d[_this.yIndex]); });
        this.xAxis = d3.svg.axis()
            .scale(this.x)
            .ticks(5)
            .orient("bottom");
        this.yAxis = d3.svg.axis()
            .scale(this.y)
            .orient("right");
        this.container = d3.select(containerNode);
        this.svg = this.container.append("svg");
        this.stage = this.svg.append("g");
        this.xAxisContainer = this.stage.append("g")
            .attr("class", "x axis");
        this.yAxisContainer = this.stage.append("g")
            .attr("class", "y axis");
    }
    ScalarSVGTransform.prototype.setData = function (d) {
        var _this = this;
        this.data = d;
        this.run = this.stage.selectAll(".run")
            .data(this.data)
            .enter().append("g")
            .attr("class", "run")
            .classed("primary", function (d) { return d.primary; });
        this.path = this.run.append("path")
            .attr("class", "path")
            .attr("vector-effect", "non-scaling-stroke")
            .style("stroke", function (d) { return d.color; });
        this.path.datum(function (d) { return d.data; });
        this.x
            .domain(d3.extent(this.data[0].data, function (d) { return d[_this.xIndex]; }))
            .range([0, this.renderWidth]);
        this.y
            .domain(d3.extent(this.data[0].data, function (d) { return d[_this.yIndex]; }))
            .range([this.renderHeight, 0]);
        this.path.attr("d", this.line);
    };
    ScalarSVGTransform.prototype.setSize = function (w, h) {
        this.margin = { top: 20, right: 60, bottom: 20, left: 0 };
        this.width = w - this.margin.left - this.margin.right;
        this.height = h - this.margin.top - this.margin.bottom;
        this.x.range([0, this.width]);
        this.y.range([this.height, 0]);
        this.xAxis.ticks(Math.round(w / 70));
        this.yAxis.ticks(Math.round(h / 40));
        this.container
            .style("width", this.width + this.margin.left + this.margin.right + "px")
            .style("height", this.height + this.margin.top + this.margin.bottom + "px");
        this.svg
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom);
        this.stage
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
        this.path
            .attr("transform", "scale(" + (this.width / this.renderWidth) + "," + (this.height / this.renderHeight) + ")");
        this.xAxisContainer
            .attr("transform", "translate(0," + this.height + ")");
        this.yAxisContainer
            .attr("transform", "translate(" + this.width + ", 0)");
    };
    ScalarSVGTransform.prototype.render = function () {
        this.xAxisContainer.call(this.xAxis);
        this.yAxisContainer.call(this.yAxis);
    };
    return ScalarSVGTransform;
}());
