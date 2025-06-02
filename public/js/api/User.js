class User {
  static URL = "/user";

  static setCurrent(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  static unsetCurrent() {
    localStorage.removeItem("user");
  }

  static current() {
    return JSON.parse(localStorage.getItem("user"));
  }

  static fetch(data = {}, callback = (f) => f) {
    const xhr = createRequest(data, "POST", User.URL + "/current");
    xhr.onload = () => {
      const response = JSON.parse(xhr.responseText);
      if (response.success) {
        User.setCurrent(response.user);
      } else {
        User.unsetCurrent();
      }
      callback(response);
    };
    return xhr;
  }

  static login(data = {}, callback = (f) => f) {
    const xhr = createRequest(data, "POST", User.URL + '/user/register');
    xhr.onload = () => {
      const response = JSON.parse(xhr.responseText);
      if (response.success) {
        User.setCurrent(response.user);
      } else {
        alert(response.error);
      }
      callback(response);
    };
    return xhr;
  }

  static register(data = {}, callback = (f) => f) {
    const xhr = createRequest(data, "POST", User.URL + "/register");
    xhr.onload = () => {
      const response = JSON.parse(xhr.responseText);
      if (response.success) {
        let user = { id: response.user.id, name: response.user.name };
        User.setCurrent(user);
      } else {
        // Можно передать ошибку через callback
        if (callback) callback({ success: false, error: response.error });
        // Или оставить так
        // throw response.error; // Не рекомендуется в асинхронных вызовах
      }
      if (callback) callback(response);
    };
    return xhr;
  }

  static logout(data = {}, callback = (f) => f) {
    const xhr = createRequest(data, "POST", User.URL + "/logout");
    xhr.onload = () => {
      const response = JSON.parse(xhr.responseText);
      if (response.success) {
        User.unsetCurrent();
        if (callback) callback(response);
      } else {
        if (callback) callback({ success: false, error: response.error });
      }
    };
    return xhr;
  }
}