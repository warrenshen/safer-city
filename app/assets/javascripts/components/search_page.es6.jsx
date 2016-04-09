class SearchPage extends React.Component {

  // --------------------------------------------------
  // Setup
  // --------------------------------------------------
  constructor() {
    super();
    this.state = {
      reports: [],
    };
  }

  componentDidMount() {
    Mapper.attachListener((lat, lng) => this.syncAutocomplete(lat, lng));
  }

  syncAutocomplete(lat, lng) {
    var resolve = (response) => this.setState({ reports: response.reports });
    Requester.get(
      ApiConstants.reports.search(lat, lng),
      resolve,
    );
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    console.log(this.state);
    return (
      <div className="search-page">
        <Header />
        <div className="page-container">
          <SearchMap />
          <div className="data-container">
            <h2 className="category-title">Statistics</h2>
            <SearchGraphs reports={this.state.reports} />
            <h2 className="category-title">Recent Reports</h2>
            <SearchReports reports={this.state.reports} />
          </div>
        </div>
      </div>
    );
  }
}
