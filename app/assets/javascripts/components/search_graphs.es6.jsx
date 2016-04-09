class SearchGraphs extends React.Component {

  // --------------------------------------------------
  // Lifecycle
  // --------------------------------------------------
  componentDidMount() {
    var margin = {top: 100, right: 100, bottom: 100, left: 100},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.time.scale()
        .domain([new Date, new Date])
        .nice(d3.time.week)
        .range([0, width]);

    var svg = d3.select("#d3").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .call(d3.svg.axis().scale(x).orient("bottom"));
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    // TODO(Sameera): Place any d3 component inside the divs below.
    return (
      <div className="d3-graph" id="d3">
      </div>
    );
  }
}
