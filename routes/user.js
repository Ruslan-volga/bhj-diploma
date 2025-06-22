class User {
    static URL = '/user';

    static setCurrent(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    static unsetCurrent() {
        localStorage.removeItem('user');
    }

    static current() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    static fetch(callback = (f) => f) {
        return createRequest({
            url: this.URL + '/current',
            method: 'GET',
            responseType: 'json',
            callback: (err, response) => {
                if (response && response.user) {
                    this.setCurrent(response.user);
                }
                callback(err, response);
            }
        });
    }

    static login(data = {}, callback = (f) => f) {
        return createRequest({
            url: this.URL + '/login',
            method: 'POST',
            responseType: 'json',
            data: data,
            callback: (err, response) => {
                if (response && response.user) {
                    this.setCurrent(response.user);
                }
                callback(err, response);
            }
        });
    }

    static register(data = {}, callback = (f) => f) {
        return createRequest({
            url: this.URL + '/register',
            method: 'POST',
            responseType: 'json',
            data: data,
            callback: (err, response) => {
                if (response && response.user) {
                    this.setCurrent(response.user);
                }
                callback(err, response);
            }
        });
    }

    static logout(callback = (f) => f) {
        return createRequest({
            url: this.URL + '/logout',
            method: 'POST',
            responseType: 'json',
            callback: (err, response) => {
                if (!err) {
                    this.unsetCurrent();
                }
                callback(err, response);
            }
        });
    }
  }