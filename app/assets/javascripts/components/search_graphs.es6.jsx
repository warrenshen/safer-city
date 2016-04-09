class SearchGraphs extends React.Component {

  // --------------------------------------------------
  // Lifecycle
  // --------------------------------------------------
  componentDidMount() {

    // PIE CHART
    var dataset = [
      { label: 'Abulia', count: 10 },
      { label: 'Betelgeuse', count: 20 },
      { label: 'Cantaloupe', count: 30 },
      { label: 'Dijkstra', count: 40 }
    ];

    var width = 360;
    var height = 360;
    var radius = Math.min(width, height) / 2;

    var color = d3.scale.category20b();

    var svg = d3.select('#d3-pie-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

    var arc = d3.svg.arc()
      .outerRadius(radius);

    var pie = d3.layout.pie()
      .value(function(d) { return d.count; })
      .sort(null);

    var path = svg.selectAll('path')
      .data(pie(dataset))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d, i) {
        return color(d.data.label);
      });


    // BAR GRAPH
    var data = [4, 8, 15, 16, 23, 42];

    var x = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, 420]);

    d3.select("#d3-bar-graph")
    .selectAll("div")
    .data(data)
    .enter().append("div")
    .style("width", function(d) { return x(d) + "px"; })
    .text(function(d) { return d; });
  }


  componentDidUpdate() {

  }


  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    // TODO(Sameera): Place any d3 component inside the divs below.
    return (
      <div>
        <div id="d3-pie-chart"></div>
        <div id="d3-bar-graph"></div>
      </div>
    );
  }
}
