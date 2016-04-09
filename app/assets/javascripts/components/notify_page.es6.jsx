class NotifyPage extends React.Component {

  // --------------------------------------------------
  // Setup
  // --------------------------------------------------
  constructor() {
    super();
    this.state = {
      email: '',
      phone_number: '',
    };
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <div className="notify-page">
        <Header />
        <div className="container form-container">
          <h1 className="page-title">Notifications</h1>
          <p className="description">Receive a notification whenever there is a report near your location.</p>
          <form className="notify-form">
            <FormQuestion
              action={(event) => this.setState({ email: event.target.value })}
              label="Email"
              value={this.state.email}
              type="email" />
            <FormQuestion
              action={(event) => this.setState({ email: event.target.value })}
              label="Phone Number"
              value={this.state.phone_number}
              type="tel" />
            <input className="btn--solid submit-btn" type="submit" value="Submit"/>
          </form>
        </div>
      </div>
    );
  }
}
