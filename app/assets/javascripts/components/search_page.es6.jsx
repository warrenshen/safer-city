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
      (lat, lng) => this.syncAutocomplete(lat, lng),
      'search',
    );
  }

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------
  syncAutocomplete(reports, categories) {
    this.setState({
      categories: categories,
      reports: reports,
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
            <h2 className="category-title">Statistics</h2>
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
