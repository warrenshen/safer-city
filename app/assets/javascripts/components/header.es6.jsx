class Header extends React.Component {

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <div className="navbar">
        <div className="container">
          <a href={RouteConstants.pages.home}>
            <div className="nav-logo-container nav-hide">
              <img src="/assets/logo.png"/>
            </div>
          </a>
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
      </div>
    );
  }
}
