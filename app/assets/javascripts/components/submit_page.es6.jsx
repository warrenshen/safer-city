class SubmitPage extends React.Component {

  // --------------------------------------------------
  // Setup
  // --------------------------------------------------
  constructor() {
    super();
    this.state = {
      creationCategories: [],
      date: '',
      description: '',
      lat: null,
      lng: null,
      location: '',
      time: '',
      title: '',
    };
  }

  // --------------------------------------------------
  // Props
  // --------------------------------------------------
  static get propTypes() {
    return {
      locationsCount: React.PropTypes.number.isRequired,
      reportsCount: React.PropTypes.number.isRequired,
    };
  }

  // --------------------------------------------------
  // Lifecycle
  // --------------------------------------------------
  componentDidMount() {
    Mapper.attachListener(
      (location, lat, lng) => this.syncAutocomplete(location, lat, lng),
      'form',
    );
    var categories = [
      'Catcalls/Whistles',
      'Commenting',
      'Sexual Invites',
      'Ogling/Facial Expressions/Staring',
      'Taking Pictures',
      'Indecent Exposure',
      'Touching/Groping',
      'Stalking',
      'Rape / Sexual Assault',
      'Poor / No Street Lighting',
      'Chain Snatching',
      'North East India Report',
      'Others',
      'VERBAL ABUSE',
      'NON-VERBAL ABUSE',
      'PHYSICAL ABUSE',
      'SERIOUS PHYSICAL ABUSE',
      'OTHER ABUSE',
    ];
    categories.map((category) => {
      var node = ReactDOM.findDOMNode(this.refs[category]);
      node.onchange = (event) => {
        var value = event.target.value;
        var creationCategories = this.state.creationCategories;
        if (event.target.checked) {
          if (creationCategories.indexOf(value) === -1) {
            creationCategories.push(value);
            this.setState({ creationCategories: creationCategories });
          }
        } else {
          creationCategories = creationCategories.filter((category) => category !== value);
          this.setState({ creationCategories: creationCategories });
        }
      }
    });
  }

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------
  submitForm() {
    var attributes = {
      creation_categories: this.state.creationCategories,
      date: this.state.date,
      description: this.state.description,
      latitude: this.state.lat,
      location: this.state.location,
      longitude: this.state.lng,
      time: this.state.time,
      title: this.state.title,
    };
    console.log(attributes);
    var params = { report: attributes };
    var resolve = (response) => window.location = RouteConstants.pages.submitSuccess;
    Requester.post(
      ApiConstants.reports.create,
      params,
      resolve,
    );
  }

  syncAutocomplete(location, lat, lng) {
    this.setState({ location: location, lat: lat, lng: lng });
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  renderCategory(category, index) {
    return (
      <div className="checkbox-container" key={index}>
        <label>{category}</label>
        <input
          ref={category}
          type="checkbox"
          value={category} />
      </div>
    );
  }

  renderCategories() {
    var categories = [
      'Catcalls/Whistles',
      'Commenting',
      'Sexual Invites',
      'Ogling/Facial Expressions/Staring',
      'Taking Pictures',
      'Indecent Exposure',
      'Touching/Groping',
      'Stalking',
      'Rape / Sexual Assault',
      'Poor / No Street Lighting',
      'Chain Snatching',
      'North East India Report',
      'Others',
      'VERBAL ABUSE',
      'NON-VERBAL ABUSE',
      'PHYSICAL ABUSE',
      'SERIOUS PHYSICAL ABUSE',
      'OTHER ABUSE',
    ];
    return categories.map((category, index) => this.renderCategory(category, index));
  }

  render() {
    console.log(this.state.creationCategories);
    return (
      <div className="report-page">
        <Header />
        <div className="container form-container">
          <h1 className="page-title">Submit a report</h1>
          <p className="description">Help spread awareness and keep your neighborhood safe. Please try to include as much detail as possible!</p>
          <div className="submit-stats-container">
            <div className="stat">
              <h1>{this.props.locationsCount}</h1>
              <h3>Total distinct locations</h3>
            </div>
            <div className="stat">
              <h1>{this.props.reportsCount}</h1>
              <h3>Total reports</h3>
            </div>
          </div>
          <form className="report-form">
            <label className="form-label">Location</label>
            <div className="map-container">
              <input
                className="controls"
                id="pac-input"
                placeholder="Search" />
              <div id="map" style={{height: "512"}}></div>
            </div>
            <FormQuestion
              action={(event) => this.setState({ title: event.target.value })}
              label="Title"
              value={this.state.title}
              type="title" />
            <FormQuestion
              action={(event) => this.setState({ description: event.target.value })}
              label="Description"
              value={this.state.description}
              style="textarea"
              type="textarea" />
            <div className="row">
              <div className="col-md-6">
                <FormQuestion
                  action={(event) => this.setState({ date: event.target.value })}
                  label="Date"
                  value={this.state.date}
                  type="date" />
              </div>
              <div className="col-md-6">
                <FormQuestion
                  action={(event) => this.setState({ time: event.target.value })}
                  label="Time"
                  value={this.state.time}
                  type="time" />
              </div>
            </div>
            <label>Category</label>
            {this.renderCategories()}
            <Clickable
              action={() => this.submitForm()}
              className="btn--solid submit-btn"
              content="Submit"
              type="none" />
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}
