class ApiConstants {

  get reports() {
    return {
      create: '/reports',
      search: (lat, lng) => {
        return `/reports?lat=${lat}&lng=${lng}`;
      },
    };
  }

  get subscriptions() {
    return {
      create: '/subscriptions',
    };
  }
}

window.ApiConstants = new ApiConstants();
