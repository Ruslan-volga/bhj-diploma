function createRequest(options = {}) {
  const xhr = new XMLHttpRequest();

  // Устанавливаем responseType, если указано
  if (options.responseType) {
    try {
      xhr.responseType = options.responseType;
    } catch (e) {
      console.warn('Ошибка при установке responseType:', e);
    }
  }

  // Формируем базовый URL
  let url = options.url || '';
  const method = (options.method || 'POST').toUpperCase();

  // Для GET-запросов добавляем параметры к URL
  if (method === 'GET' && options.data) {
    const params = new URLSearchParams();
    Object.keys(options.data).forEach(key => params.append(key, options.data[key]));
    const separator = url.includes('?') ? '&' : '?';
    url += separator + params.toString();
  }

  
  xhr.requestURL = url;

  // Открываем соединение
  xhr.open(method, url);

  xhr.requestMethod = method;

  // Обработка успешного завершения
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      if (options.callback) {
        options.callback(null, xhr.response);
      }
    } else {
      if (options.callback) {
        options.callback(`HTTP Error: ${xhr.status}`, null);
      }
    }
  };

  // Обработка ошибок сети
  xhr.onerror = () => {
    if (options.callback) {
      options.callback('Network error', null);
    }
  };

  // Отправка данных
  try {
    if (method === 'GET') {
      xhr.send();
    } else {
      if (options.data instanceof FormData) {
        xhr.send(options.data);
      } else if (options.data && typeof options.data === 'object') {
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify(options.data));
      } else if (options.data !== undefined) {
        xhr.send(options.data);
      } else {
        xhr.send();
      }
    }
  } catch(e) {
    if (options.callback) {
      options.callback(e.message || e.toString(), null);
    }
  }

  return xhr;
}