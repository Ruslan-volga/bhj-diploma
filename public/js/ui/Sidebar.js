
/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    let elemSidebarToggle = document.querySelector(".sidebar-toggle");
    let elemBody = document.querySelector("body");
    elemSidebarToggle.onclick = () => {
      elemBody.classList.toggle("sidebar-open");
      elemBody.classList.toggle("sidebar-collapse");
    };
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    let elemMenuItemLogin = document.querySelector(".menu-item_login"); //элемент кнопки входа
    let elemMenuItemLogout = document.querySelector(".menu-item_logout"); //элемент кнопки выхода
    let elemMenuItemRegister = document.querySelector(".menu-item_register"); //элемент кнопки регистрации
    elemMenuItemLogin.onclick = () => {
      App.getModal("login").open(); 
    };
    elemMenuItemRegister.onclick = () => {
      App.getModal("register").open();
    };
    elemMenuItemLogout.onclick = () => {
      let data = User.current();
      User.logout(data, (response) => {
        if ((response.success)) {
          App.setState("init");
        }
      });
    };
  };
};