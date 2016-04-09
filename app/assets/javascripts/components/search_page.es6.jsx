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

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <div className="search-page">
        <Header />
        <div className="page-container">
          <SearchMap />
          <SearchGraphs />
        </div>
      </div>
    );
  }
}
