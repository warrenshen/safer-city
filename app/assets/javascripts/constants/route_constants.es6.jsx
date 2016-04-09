class RouteConstants {

  get pages() {
    return {
      home: '/',
      report: '/report',
      search: '/search',
      subscribe: '/subscribe',
    };
  }
}

window.RouteConstants = new RouteConstants();
