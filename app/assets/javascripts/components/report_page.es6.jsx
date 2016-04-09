class ReportPage extends React.Component {

  // --------------------------------------------------
  // Setup
  // --------------------------------------------------
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      date: '',
      time: '',
      category: '',
      lat: '',
      lng: '',
      name: '',
      phone_number: '',
      email: '',
    };
  }

  // --------------------------------------------------
  // Lifecycle
  // --------------------------------------------------
  componentDidMount() {
    Mapper.attachListener(
      (lat, lng) => this.syncAutocomplete(lat, lng),
      'form',
    );
  }

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------
  submitForm() {
    var attributes = {
      category: this.state.category,
      date: this.state.date,
      description: this.state.description,
      lat: this.state.lat,
      lng: this.state.lng,
      time: this.state.time,
      title: this.state.title,
    };
    if (this.state.name != '') {
      attributes[name] = this.state.name
    }
    if (this.state.phone_number != '') {
      attributes[phone_number] = this.state.phone_number
    }
    if (this.state.email != '') {
      attributes[email] = this.state.email
    }
    var params = { subscription: attributes };
    Requester.post(
      ApiConstants.submissions.create,
      params,
      resolve,
    );
  }

  syncAutocomplete(lat, lng) {
    this.setState({ lat: lat, lng: lng });
  }


  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <div className="report-page">
        <Header />
        <div className="container form-container">
          <h1 className="page-title">Submit</h1>
          <p className="description">Submit a report and help spread awareness.</p>
          <form className="report-form">
            <FormQuestion
              action={(event) => this.setState({ title: event.target.value })}
              label="Title"
              value={this.state.title}
              type="title" />
            <FormQuestion
              action={(event) => this.setState({ description: event.target.value })}
              label="Description"
              value={this.state.description}
              type="textarea" />
            <FormQuestion
              action={(event) => this.setState({ date: event.target.value })}
              label="Date"
              value={this.state.date}
              type="date" />
            <FormQuestion
              action={(event) => this.setState({ time: event.target.value })}
              label="Time"
              value={this.state.time}
              type="time" />
            <FormQuestion
              action={(event) => this.setState({ category: event.target.value })}
              label="Category"
              value={this.state.category}
              type="select" />
            <p>Location</p>
            <div className="map-container">
              <input
                className="controls"
                id="pac-input"
                placeholder="Search" />
              <div id="map" style={{height: "100"}}></div>
            </div>
            <p>Optional</p>
            <FormQuestion
              action={(event) => this.setState({ title: event.target.value })}
              label="Full Name"
              value={this.state.title}
              type="text" />
            <FormQuestion
              action={(event) => this.setState({ phone_number: event.target.value })}
              label="Phone number"
              value={this.state.phone_number}
              type="tel" />
            <FormQuestion
              action={(event) => this.setState({ email: event.target.value })}
              label="Email"
              value={this.state.email}
              type="email" />
            <Clickable
              action={() => this.submitForm()}
              className="btn--solid submit-btn"
              content="Submit"
              type="none" />
          </form>
        </div>
      </div>
    );
  }
}
