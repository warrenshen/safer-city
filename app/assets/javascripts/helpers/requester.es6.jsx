class Requester {

  get(route, resolve, reject) {
    var request = this.initialize('GET', route);
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200 && resolve) {
          resolve(JSON.parse(request.response));
        }
      }
    };
    request.send();
  }

  initialize(type, route, content='application/json') {
    var request = new XMLHttpRequest();
    request.open(type, route);
    request.setRequestHeader('Accept', content);
    request.setRequestHeader('Content-Type', content);
    request.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
    return request;
  }

  post(route, params, resolve, reject) {
    var request = this.initialize('POST', route);
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if ((request.status === 200 || request.status === 201) && resolve) {
          resolve(JSON.parse(request.response));
        } else if (reject) {
          reject(JSON.parse(request.response));
        }
      }
    };
    request.send(JSON.stringify(params));
  }
}

window.Requester = new Requester();
