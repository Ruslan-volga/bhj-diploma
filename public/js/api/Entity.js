// Глобальный класс-наследник для перехвата вызовов open()
class MyXMLHttpRequest extends XMLHttpRequest {
  constructor() {
    super();
    this.requestMethod = null;
    this.requestURL = null;

    // Перехватываем вызов open()
    const originalOpen = this.open;
    this.open = function(method, url) {
      this.requestMethod = method;
      this.requestURL = url;
      return originalOpen.call(this, method, url);
    };
  }
}

// Заменяем глобальный XMLHttpRequest на наш класс
window.XMLHttpRequest = MyXMLHttpRequest;

// Класс Entity
class Entity {
  static URL = '';

  static list() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', this.URL);
    return xhr;
  }

  static create() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', this.URL);
    return xhr;
  }

  static remove() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', this.URL + '/');
    return xhr;
  }
}

