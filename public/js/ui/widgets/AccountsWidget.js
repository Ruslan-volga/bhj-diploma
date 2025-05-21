/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Пустой элемент');
    }

    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {    
    const parent = document.querySelector('.accounts-panel');

    parent.addEventListener('click', e => {
      if (e.target.classList.contains('create-account')) {
        App.getModal('createAccount').open();
      }

      if (e.target.closest('.account')) {
        this.onSelectAccount(e.target.closest('.account'))
      }      
    })    
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    let user = User.current();

    if (user) {
      Account.list(user.id, (err, response) => {
        if (response.success) {
          this.clear();          
          this.renderItem(response.data);          
        }
      });
    }    
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    let accounts = Array.from(this.element.querySelectorAll('.account'));

    for (let i = 0; i < accounts.length; i++) {      
      accounts[i].remove();      
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {    
    const activeAccount = this.element.querySelector('.active');
    
    if (activeAccount) {
      activeAccount.classList.remove('active');
    }

    element.classList.add('active');
    
    App.showPage('transactions', {account_id: element.dataset['id']});    
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    const li = document.createElement('li');
    li.classList.add('account');
    li.dataset.id = item.id;

    li.insertAdjacentHTML('afterbegin', `<a href="#">
      <span>${item.name}</span> /
      <span>${item.sum} ₽</span>
      </a>`)
      
    return li;    
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    const accountsPanel = document.querySelector('.accounts-panel');
    
    if (data.length > 0) {
      data.forEach(item => {
        const items = this.getAccountHTML(item);
        accountsPanel.insertAdjacentElement('beforeend', items);
      })
    }
  }
}