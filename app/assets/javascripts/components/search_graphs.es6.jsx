window.initAutocomplete = function() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

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

    var ages = [30, 22, 33, 45];
    var totalWidth = 500;
    var totalHeight = 200;
    var scale = {
      y: d3.scale.linear()
    };
    scale.y.domain([0, 100]);
    scale.y.range([0, 200]);
    var chart = d3.select('#d3-pbar-graph')
    .attr({
        'width': totalWidth,
        'height': totalHeight
    });

    var bars = chart
        .selectAll('g')
        .data(ages)
        .enter()
        .append('g');
  }


  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    // TODO(Sameera): Place any d3 component inside the divs below.
    return (
      <div>
        <input id="pac-input" className="controls" type="text" placeholder="Search Box" />
        <div id="map"></div>
        <div id="d3-pie-chart"></div>
      </div>
    );
  }
}
