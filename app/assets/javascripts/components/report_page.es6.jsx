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
      lng: ''
    };
  }

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------
  submitForm() {
    var attributes = {
      title: this.state.title,
      description: this.state.description,
      date: this.state.date,
      time: this.state.time,
      category: this.state.category,
      lat: this.state.lat,
      lng: this.state.lng
    };
    var params = { subscription: attributes };
    Requester.post(
      ApiConstants.submissions.create,
      params,
      resolve,
    );
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
              <input id="pac-input"
                     className="controls"
                     type="text"
                     placeholder="Search Box" />
              <div id="map" style={{height: "100"}}></div>
            </div>
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
