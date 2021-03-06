class SearchGraphs extends React.Component {

  constructor() {
    super();
    this.state = {
      time_frame: '',
    };
  }

  // --------------------------------------------------
  // Props
  // --------------------------------------------------
  static get propTypes() {
    return {
      categories: React.PropTypes.array.isRequired,
      reports: React.PropTypes.array.isRequired,
    };
  }

  // --------------------------------------------------
  // Lifecycle
  // --------------------------------------------------
  componentDidUpdate() {
    d3.select("svg").remove();
    d3.select("svg").remove();
    d3.select("svg").remove();
    d3.select("#no-content-label")
      .attr("width", 50)
      .attr("height", 20)
      .text("")
    // PIE CHART

    var w = 200,                        //width
    h = 200,                            //height
    r = 75,                             //radius
    inner = 40,
    color = d3.scale.category20c();     //builtin range of colors
    var totalSum = 0

    var data = []
    if (this.state.time_frame == 'month') {
      var cat_array_length = this.props.categories.length;
      for (var i = 0; i < cat_array_length; i++) {
        if (i % 2 == 0) {
          var element = this.props.categories[i]
          data.push({"label": element.name, "value": element.reports_count});
          totalSum += element.reports_count
        }
      }
    } else if (this.state.time_frame == 'year') {
      var cat_array_length = this.props.categories.length;
      for (var i = 0; i < cat_array_length; i++) {
        if (i % 3 == 0) {
          var element = this.props.categories[i]
          data.push({"label": element.name, "value": element.reports_count});
          totalSum += element.reports_count
        }
      }
    } else {
      var cat_array_length = this.props.categories.length;
      for (var i = 0; i < cat_array_length; i++) {
        var element = this.props.categories[i]
        data.push({"label": element.name, "value": element.reports_count});
        totalSum += element.reports_count
      }
    }

    var vis = d3.select("#d3-pie-chart")
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([data])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + Number(r + 20) + "," + Number(r + 20) + ")")    //move the center of the pie chart from 0, 0 to radius, radius
    var textBottom = vis.append("text")
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .attr("class", "textBottom");
    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .innerRadius(inner)
        .outerRadius(r);
    var arcOver = d3.svg.arc()
        .innerRadius(inner + 5)
        .outerRadius(r + 5);
    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array
    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice")     //allow us to style things in the slices (like text)
                .on("mouseover", function(d) {
                  d3.select(this).select("path").transition()
                    .duration(200)
                    .attr("d", arcOver)
                  textBottom.text((d3.select(this).datum().data.value * 100.0 / totalSum).toFixed(0) + "%");
                })
                .on("mouseout", function(d) {
                    d3.select(this).select("path").transition()
                        .duration(100)
                        .attr("d", arc);
                    textBottom.text("");
                });
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

    var legend = d3.select("#d3-pie-chart").append("svg")
      .attr("class", "legend")
      .attr("width", 300)
      .attr("height", 150)
      .selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 25 + ")"; })
      .attr("style", "width: 50%;");

    legend.append("rect")
      .attr("width", 14)
      .attr("height", 14)
      .attr("fill", function(d, i) { return color(i); });

    legend.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .text(function(d, i) { return data[i].label; });


    d3.select("#pie-chart-label")
      .attr("width", 50)
      .attr("height", 20)
      .text("Crime Categories")
    // BAR GRAPH
    var data = {"regions": [], "institutions": []}

    if (this.state.time_frame == 'month') {
      var dict = this.props.stats.monthly
      for (var key in dict) {
        if (dict.hasOwnProperty(key)) {
          data.regions.push(key)
          data.institutions.push(dict[key])
        }
      }
    } else if (this.state.time_frame == 'year') {
      var dict = this.props.stats.yearly
      for (var key in dict) {
        if (dict.hasOwnProperty(key)) {
          data.regions.push(key)
          data.institutions.push(dict[key])
        }
      }
    } else {
      for (var key in this.props.stats.hourly) {
        var dict = this.props.stats.hourly
        if (dict.hasOwnProperty(key)) {
          data.regions.push(key)
          data.institutions.push(dict[key])
        }
      }
    }



    var margin = {
            "top": 10,
            "right": 10,
            "bottom": 30,
            "left": 50
        },
        width = 400,
        height = 150;

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
      .text("Time distribution")
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
    let charts;
    if (this.props.categories.length > 0) {
      charts = (
        <div>
          <div className="chart pie-chart">
            <label id="pie-chart-label"></label>
            <div id="d3-pie-chart"></div>
          </div>
          <div className="chart bar-graph">
            <label id="bar-graph-label"></label>
            <div id="d3-bar-graph"></div>
          </div>
        </div>
      )
    }
    return (
      <div className="graphs-container">
        <div className="row">
          <div className="col-md-2 col-sm-2"><label className="timeframe-label">Timeframe</label></div>
          <div className="col-md-10 col-sm-10">
            <div className="time-option-container">
              <Clickable
                action={() => this.setState({ time_frame: 'month' })}
                className={`btn time-button time-button-${this.state.time_frame == 'month'}`}
                content="Last month"
                type="h3"/>
              <Clickable
                action={() => this.setState({ time_frame: 'year' })}
                className={`btn time-button time-button-${this.state.time_frame == 'year'}`}
                content="Last year"
                type="h3"/>
              <Clickable
                action={() => this.setState({ time_frame: 'all' })}
                className={`btn time-button time-button-${this.state.time_frame == 'all'}`}
                content="All time"
                type="h3"/>
            </div>
          </div>
        </div>
        <p id="no-content-label"></p>
        {charts}
      </div>
    );
  }
}
