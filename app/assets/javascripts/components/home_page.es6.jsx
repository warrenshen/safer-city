class HomePage extends React.Component {

  // --------------------------------------------------
  // Setup
  // --------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      srollState: false,
    };
  }

  // --------------------------------------------------
  // Props
  // --------------------------------------------------
  static get propTypes() {
    return {
      reports: React.PropTypes.array.isRequired,
    };
  }

  // --------------------------------------------------
  // Lifecycle
  // --------------------------------------------------
  componentDidMount() {
    var react = this;

    $(window).scroll(function() {
      var search = $(".search-bar").offset().top;
      react.setState({ scrollState: false });

      if (search > 270) {
        react.setState({ scrollState: true })
      }
    })
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <div className="home-page">
        <nav className="navbar">
          <div className="container">
            <a href={RouteConstants.pages.home}>
              <div className={`nav-logo-container nav-hide nav-scroll-${this.state.scrollState}`}>
                <img src="/assets/logo.jpg"/>
              </div>
            </a>
            <div className={`nav-search-container nav-hide nav-scroll-${this.state.scrollState}`}>
              <SearchBar/>
            </div>
            <ul className="nav-links">
              <li className="link">
                <Clickable
                  content="Search"
                  route={RouteConstants.pages.search}
                  type="none" />
              </li>
              <li className="link">
                <Clickable
                  content="Subscribe"
                  route={RouteConstants.pages.subscribe}
                  type="none" />
              </li>
              <li className="link">
                <Clickable
                  className="btn btn--solid"
                  content="New Report"
                  route={RouteConstants.pages.report}
                  type="none" />
              </li>
            </ul>
          </div>
        </nav>
        <div className="container home-grid">
          <div className="home-search">
            <div className="logo-container">
              <img src="/assets/logo.jpg"/>
            </div>
            <SearchBar />
          </div>
          <div className="home-reports-container">
            <ReportsGrid reports={this.props.reports} />
          </div>
        </div>
      </div>
    );
  }
}
