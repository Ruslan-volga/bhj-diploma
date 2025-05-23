/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
    static URL = "/user";
    /**
     * Устанавливает текущего пользователя в
     * локальном хранилище.
     * */
    static setCurrent(user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  
    /**
     * Удаляет информацию об авторизованном
     * пользователе из локального хранилища.
     * */
    static unsetCurrent() {
      localStorage.removeItem("user");
    }
  
    /**
     * Возвращает текущего авторизованного пользователя
     * из локального хранилища
     * */
    static current() {
      return JSON.parse(localStorage.getItem("user"));
    }
  
    /**
     * Получает информацию о текущем
     * авторизованном пользователе.
     * */
    static fetch(data, callback = (f) => f) {
      createRequest(data, "GET", User.URL + "/current", (err, response) => {
        if (response === null) {
          alert("response User.Fetch равен noll");
          return;
        }
        if (response.success) {
          User.setCurrent(response.user);
        } else {
          User.unsetCurrent();
        }
        callback(response); //Вызываю callback который находится в методе App.initUser
      });
    }
  
    /**
     * Производит попытку авторизации.
     * После успешной авторизации необходимо
     * сохранить пользователя через метод
     * User.setCurrent.
     * */
    static login(data, callback = (f) => f) {
        function createRequest(options) {
            options.callback = options.callback || function() {};
            // остальной код
          }
        createRequest({
          data: data,
          method: "POST",
          url: User.URL + "/login",
          callback: (err, response) => {
            if (response.success) {
              User.setCurrent(response.user);
            } else {
              alert(response.error);
            }
            callback(response);
          }
        });
      }
  
    /**
     * Производит попытку регистрации пользователя.
     * После успешной авторизации необходимо
     * сохранить пользователя через метод
     * User.setCurrent.
     * */
    static register(data, callback) {
      //data = {name: 'Vlad', email: 'test@test.ru', password: 'abracadabra'}
      createRequest(data, "POST", User.URL + "/register", (err, response) => {
        if (response.success) {
          let user = {
            id: response.user.id,
            name: response.user.name,
          };
          User.setCurrent(user);
          callback(response);
        } else {
          throw response.error;
        }
      });
    }
  
    /**
     * Производит выход из приложения. После успешного
     * выхода необходимо вызвать метод User.unsetCurrent
     * */
    static logout(data, callback = (f) => f) {
      let xhr = createRequest(
        data,
        "POST",
        User.URL + "/logout",
        (err, response) => {
          if (response.success) {
            User.unsetCurrent();
            callback(response);
          }
        }
      );
    }
  }