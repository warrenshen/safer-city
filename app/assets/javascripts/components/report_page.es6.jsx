class ReportPage extends React.Component {

  // --------------------------------------------------
  // Setup
  // --------------------------------------------------
  constructor(props) {
    super(props);
    this.state = { report: {} };
  }

  // --------------------------------------------------
  // Props
  // --------------------------------------------------
  static get propTypes() {
    return {
      id: React.PropTypes.number.isRequired,
    };
  }

  // --------------------------------------------------
  // Lifecycle
  // --------------------------------------------------
  componentDidMount() {
    var resolve = (response) => this.setState({ report: response.report });
    Requester.get(
      ApiConstants.reports.show(this.props.id),
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
        <p>{this.state.report.description}</p>
        <Footer />
      </div>
    );
  }
}
