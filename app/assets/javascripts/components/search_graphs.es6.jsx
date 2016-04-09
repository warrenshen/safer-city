class SearchGraphs extends React.Component {

  // --------------------------------------------------
  // Props
  // --------------------------------------------------
  static get propTypes() {
    return {
      reports: React.PropTypes.array.isRequired,
    };
  }

  // --------------------------------------------------
  // Lifecycle
  // --------------------------------------------------
  componentDidUpdate() {
    d3.select("svg").remove();
    d3.select("svg").remove();
    d3.select("#no-content-label")
      .attr("width", 50)
      .attr("height", 20)
      .text("")
    // PIE CHART

    var w = 300,                        //width
    h = 300,                            //height
    r = 100,                            //radius
    color = d3.scale.category20c();     //builtin range of colors
    data = [{"label":"one", "value":20}, 
            {"label":"two", "value":50}, 
            {"label":"three", "value":30}];
    var vis = d3.select("#d3-pie-chart")
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([data])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius
    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r);
    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array
    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");    //allow us to style things in the slices (like text)
        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function
        arcs.append("svg:text")                                     //add a label to each slice
                .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                //we have to make sure to set these before calling arc.centroid
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
            })
            .attr("text-anchor", "middle")                          //center the text on it's origin
            .text(function(d, i) { return data[i].label; });        //get the label from our original data array

    d3.select("#pie-chart-label")
      .attr("width", 50)
      .attr("height", 20)
      .text("Pie chart label")
    // BAR GRAPH
    var data = {
    "regions": ["Federal", "Tigray", "Afar", "Amhara", "Oromia", "Gambella", "Addis Ababa", "Dire Dawa", "Harar", "Benishangul-Gumuz", "Somali", "SNNPR "],
    "institutions": [0, 0, 34, 421, 738, 0, 218, 22, 22, 109, 0, 456]
    }

    var margin = {
            "top": 10,
            "right": 10,
            "bottom": 30,
            "left": 50
        },
        width = 700,
        height = 300;

    var x = d3.scale.ordinal()
        .domain(data.regions.map(function(d) {
            return d.substring(0, 2);}))
        .rangeRoundBands([0, width], 0);


    var y = d3.scale.linear()
        .domain([0, d3.max(data.institutions)])
        .range([height, 0]);

    var xAxis = d3.svg.axis().scale(x).orient("bottom");

    var yAxis = d3.svg.axis().scale(y).orient("left");

    var svgContainer = d3.select("#d3-bar-graph").append("svg")
        .attr("class", "chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom).append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.right + ")");

    svgContainer.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate( 0," + height + ")")
        .call(xAxis);

    svgContainer.append("g")
        .attr("class", "y axis").call(yAxis)
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Institutions");

    svgContainer.selectAll(".bar").data(data.institutions).enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d, i) {
            return i * x.rangeBand();
        })
        .attr("y", function(d) {
            return y(d);
        })
        .attr("width", function(){
            return x.rangeBand();
        })
        .attr("height", function(d) {
            return height -y(d);
        });

    d3.select("#bar-graph-label")
      .attr("width", 50)
      .attr("height", 20)
      .text("Bar graph label")
  }


  componentDidMount() {
    d3.select("#no-content-label")
      .attr("width", 50)
      .attr("height", 20)
      .text("Please pick a location.")
  }


  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <div className="graphs-container">
        <Clickable
          action={() => this.setState({ time_frame: 'month' })}
          className="time-button" 
          content="Last month"
          type="h3"/>
        <Clickable
          action={() => this.setState({ time_frame: 'year' })}
          className="time-button" 
          content="Last year"
          type="h3"/>
        <Clickable
          action={() => this.setState({ time_frame: 'all' })}
          className="time-button" 
          content="All time"
          type="h3"/>
        <p id="no-content-label"></p>
        <p id="pie-chart-label"></p>
        <div id="d3-pie-chart"></div>
        <p id="bar-graph-label"></p>
        <div id="d3-bar-graph"></div>
      </div>
    );
  }
}
