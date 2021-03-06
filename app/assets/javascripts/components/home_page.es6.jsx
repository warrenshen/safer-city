class HomePage extends React.Component {

  // --------------------------------------------------
  // Setup
  // --------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      scrollState: false,
      secondCount: 1,
      secondPercentage: 0,
    };
  }

  loop(r) {
    var rand = Math.round(Math.random() * (500));
    setTimeout(function() {
      r.incrementSecond(r);
      r.loop(r);
    }, rand);
  }

  incrementSecond(r) {
    var t = Number(r.state.secondCount) + 0.08;
    var d = t % 1;
    var time = t;
    r.setState({
      secondCount: time,
      secondPercentage: d
    });
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
    });

    this.loop(this);
    var resolve = (response) => this.setState({ reports: response.reports });
    Requester.get(
      ApiConstants.reports.recent,
      resolve,
    );
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
                <img src="/assets/logo.png"/>
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
                  content="Route Me"
                  route={RouteConstants.pages.navigation}
                  type="none" />
              </li>
              <li className="link">
                <Clickable
                  className="btn btn--solid"
                  content="New Report"
                  route={RouteConstants.pages.submit}
                  type="none" />
              </li>
            </ul>
          </div>
        </nav>
        <div className="container home-grid">
          <div className="home-search">
            <div className="logo-container">
              <img src="/assets/logo.png"/>
            </div>
            <SearchBar />
          </div>
          <div className="home-stats-container">
            <h1 className="stats-title">Sexual harassment is serious</h1>
            <div className="row">
              <div className="col-md-4 col-sm-4 col-xs-6">
                <h2 className="number">{Math.floor(this.state.secondCount)}
                  <div className="bar-chart-background">
                    <div className="bar-chart" style={{height: 55 * this.state.secondPercentage + "px"}}></div>
                  </div>
                </h2>
                <p className="stat-label">cases since you arrived on this page</p>
              </div>
              <div className="col-md-4 col-sm-4 col-xs-6">
                <h2 className="number">848</h2>
                <p className="stat-label">reports of sexual abuse per day</p>
              </div>
              <div className="col-md-4 col-sm-4 col-xs-12">
                <h2 className="number stat-arrow">50%</h2>
                <p className="stat-label">increase in cases since 2013</p>
              </div>
            </div>
          </div>
          <div className="home-reports-container">
            <h1 className="stats-title">Recent reports</h1>
            <ReportsGrid reports={this.state.reports} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
