class ApiConstants {

  get reports() {
    return {
      search: (lat, lng) => {
        return `/reports?lat=${lat}&lng=${lng}`;
      },
    };
  }
}

window.ApiConstants = new ApiConstants();
