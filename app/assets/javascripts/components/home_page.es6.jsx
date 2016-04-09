class HomePage extends React.Component {

  constructor(props) {
      super(props);
      this.state = { srollState: false };
  }

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------
  generateReports() {
    return [
      {
        first_name: 'Kira',
        last_name: 'Klapper',
        title: 'Lorem ipsum dolor sit amet',
        id: 1,
        severity: 3,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero quaerat quibusdam praesentium quisquam, nisi quia rem facere odit harum atque.',
      },
      {
        first_name: 'Eric',
        last_name: 'Liang',
        title: 'Lorem ipsum dolor sit amet',
        id: 2,
        severity: 2,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt quia quaerat ea obcaecati amet magni vitae. Aliquid sit quia, debitis at provident, sequi, quas facere impedit dolorum fugiat accusamus? Praesentium!',
      },
      {
        first_name: 'Alice',
        last_name: 'Deng',
        title: 'Lorem ipsum dolor sit amet',
        id: 3,
        severity: 3,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi iusto repudiandae laborum sapiente aliquam cumque, dolores, voluptate consectetur corrupti asperiores. Blanditiis, sint iure.',
      },
      {
        first_name: 'Howard',
        last_name: 'Chen',
        title: 'Lorem ipsum dolor sit amet',
        id: 4,
        severity: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur et eos molestias, laudantium, fugit est!',
      },
      {
        first_name: 'Kira',
        last_name: 'Klapper',
        title: 'Lorem ipsum dolor sit amet',
        id: 5,
        severity: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam quaerat voluptatem inventore ab nisi cumque ducimus minus natus. Eos!',
      },
      {
        first_name: 'Eric',
        last_name: 'Liang',
        title: 'Lorem ipsum dolor sit amet',
        id: 6,
        severity: 2,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, architecto. Iure odio in neque. Magni cum, harum!',
      },
      {
        first_name: 'Alice',
        last_name: 'Deng',
        title: 'Lorem ipsum dolor sit amet',
        id: 7,
        severity: 3,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore iste amet, veritatis alias magnam quam minima eveniet illo. Eligendi unde, ipsum quasi esse.',
      },
      {
        first_name: 'Howard',
        last_name: 'Chen',
        title: 'Lorem ipsum dolor sit amet',
        id: 8,
        severity: 3,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ex earum, sapiente, ipsum adipisci quo vel! Error facilis, in voluptatem molestiae recusandae illo necessitatibus dolor repellat at incidunt veritatis facere officia a, libero quibusdam fugit non iste, amet earum. Quidem.',
      },
    ];
  }

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
            <ReportsGrid
              reports={this.generateReports()} />
          </div>
        </div>
      </div>
    );
  }
}
