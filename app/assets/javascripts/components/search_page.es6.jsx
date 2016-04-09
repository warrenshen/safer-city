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

  syncAutocomplete(stats_dict) {
    this.setState({ stats_dict: stats_dict });
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <div className="search-page">
        <Header />
        <div className="page-container">
          <SearchMap />
          <div className="data-container">
            <SearchGraphs reports={this.state.reports} />
            <SearchReports reports={this.state.reports} />
          </div>
        </div>
      </div>
    );
  }
}
