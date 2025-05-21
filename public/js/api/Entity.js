/**
* Класс Entity - базовый для взаимодействия с сервером.
* Имеет свойство URL, равно пустой строке.
* */
class Entity {
    static URL = '';
    /**
    * Запрашивает с сервера список данных.
    * Это могут быть счета или доходы/расходы
    * (в зависимости от того, что наследуется от Entity)
    * */
    static list(data, callback) {
        createRequest({
            url: this.URL,
            data,
            method: 'GET',
            callback: ( err, response ) => {
                /*
                при успешном выполнении err = null, response содержит данные ответа
                */

                if (response && response.success === true) {
                    callback(err, response);
                } else {
                    console.log( err );
                }
            }
        });
    }

    /**
    * Создаёт счёт или доход/расход с помощью запроса
    * на сервер. (в зависимости от того,
    * что наследуется от Entity)
    * */
    static create(data, callback) {
        createRequest({
            url: this.URL,
            data: JSON.stringify(data), // сериализация данных
            method: 'POST', // обычно POST для создания
            headers: {
                'Content-Type': 'application/json'
            },
            callback: (err, response) => {
                if (err) {
                    callback(err);
                    return;
                }
                if (response && response.success === true) {
                    callback(null, response);
                } else {
                    // Можно передать ошибку или ответ
                    callback(new Error('Response unsuccessful'), response);
                }
            }
        });
    }

    /**
    * Удаляет информацию о счёте или доходе/расходе
    * (в зависимости от того, что наследуется от Entity)
    * */
    static remove(data, callback ) {
        createRequest({
            url: this.URL,
            data,
            method: 'DELETE',
            callback: ( err, response ) => {
                /*
                при успешном выполнении err = null, response содержит данные ответа
                */

                if (response && response.success === true) {
                    callback(err, response);
                } else {
                    console.log( err );
                }
            }
        });
    }
}