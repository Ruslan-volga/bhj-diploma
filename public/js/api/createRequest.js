/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';

    let url = options.url;
    let formData = new FormData();

    if (options.method === 'GET') {
        url += '?';
        
        for (let key in options.data) {
            url += `${key}=${options.data[key]}&`
            url = url.slice(0, -1);
        }        
    } else {
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
    }
    
    try {
        xhr.open(options.method, url);
        xhr.send(formData);       
    } catch (err) {
        options.callback(err, null);
    }

    xhr.addEventListener('load', function() {
        options.callback(null, xhr.response);        
    });
}
