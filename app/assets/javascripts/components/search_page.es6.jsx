class SearchPage extends React.Component {

  // --------------------------------------------------
  // Setup
  // --------------------------------------------------
  constructor() {
    super();
    this.state = {
      categories: [],
      reports: [],
    };
  }

  // --------------------------------------------------
  // Lifecycle
  // --------------------------------------------------
  componentDidMount() {
    Mapper.attachListener(
      (lat, lng, c) => this.syncAutocomplete(lat, lng, c),
      'search',
    );
  }

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------
  syncAutocomplete(reports, categories, stats) {
    this.setState({
      categories: categories,
      reports: reports,
      time_stats: stats,
    });
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
            <h2 className="category-title">Statistics by location</h2>
            <SearchGraphs
              categories={this.state.categories}
              reports={this.state.reports} />
            <SearchReports reports={this.state.reports} />
          </div>
        </div>
      </div>
    );
  }
}
