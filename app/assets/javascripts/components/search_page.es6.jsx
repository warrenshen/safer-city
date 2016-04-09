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
    return (
      <div className="search-page">
        <Header />
        <div className="search-grid">
          <SearchMap />
          <SearchGraphs />
        </div>
      </div>
    );
  }
}
