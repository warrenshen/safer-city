class ApiConstants {

  get reports() {
    return {
      search: (lat, lng) => {
        return `/reports?lat=${lat}&lng=${lng}`;
      },
    };
  }

  get categories() {
    return {
      search: (lat, lng) => {
        return `/categories?lat=${lat}&lng=${lng}`;
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
