class RouteConstants {

  get pages() {
    return {
      home: '/',
      report: '/report',
      reportSuccess: '/report/success',
      search: '/search',
      subscribe: '/subscribe',
      subscribeSuccess: '/subscribe/success',
    };
  }
}

window.RouteConstants = new RouteConstants();
