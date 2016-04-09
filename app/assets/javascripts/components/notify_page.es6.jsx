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
        <form className="notify-form">
          <FormQuestion
            action={(event) => this.setState({ email: evewnt.target.value })}
            label="Email"
            value={this.state.email} />
          <FormQuestion
            action={(event) => this.setState({ phone_number: event.target.value })}
            label="Phone Number"
            value={this.state.phone_number} />
        </form>
      </div>
    );
  }
}
