function createRequest(options = {}) {
  const xhr = new XMLHttpRequest();
  const method = (options.method || 'GET').toUpperCase();
  let url = options.url || '';

  // Обработка GET-параметров
  if (method === 'GET' && options.data) {
    const params = new URLSearchParams();
    Object.entries(options.data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value);
      }
    });
    url += (url.includes('?') ? '&' : '?') + params.toString();
  }

  // Всегда используем асинхронные запросы (синхронные deprecated в XHR)
  const async = true;
  xhr.open(method, url, async);

  // Устанавливаем responseType если передан, иначе по умолчанию 'json'
  xhr.responseType = options.responseType || 'json';

  // Обработчики событий
  xhr.onload = function() {
    if (options.callback) {
      let response;
      try {
        response = this.responseType === 'json' ? this.response : JSON.parse(this.responseText);
      } catch (e) {
        response = this.responseText;
      }
      options.callback(null, response);
    }
  };

  xhr.onerror = function() {
    if (options.callback) {
      options.callback('Network Error', null);
    }
  };

  // Отправка данных
  try {
    if (method !== 'GET' && options.data) {
      if (options.data instanceof FormData) {
        xhr.send(options.data);
      } else {
        // Для тестовой проверки FormData
        const formData = new FormData();
        Object.entries(options.data).forEach(([key, value]) => {
          formData.append(key, value);
        });
        xhr.send(formData);
      }
    } else {
      xhr.send();
    }
  } catch (e) {
    if (options.callback) {
      options.callback(`Request Error: ${e.message}`, null);
    }
  }

  return xhr;
}