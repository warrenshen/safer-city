class SearchPage extends React.Component {

  // --------------------------------------------------
  // Setup
  // --------------------------------------------------
  constructor() {
    super();
    this.state = {
      pie_data: [],
      bar_data: [],
    };
  }

  componentDidMount() {
    Mapper.attachListener((params) => this.syncAutocomplete(lat, lng));
  }

  syncAutocomplete(lat, lng) {
    var resolve = (response) => console.log(response);
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
