/**
 * Класс RegisterForm управляет формой регистрации
 * Наследуется от AsyncForm
 */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации:
   * - сбрасывает форму
   * - закрывает окно регистрации
   * - устанавливает состояние App.setState('user-logged')
   * При ошибке показывает сообщение об ошибке
   */
  onSubmit(data) {
    User.register(data, (err, response) => {
      if (err) {
        console.error('Ошибка регистрации:', err);
        // Показываем пользователю сообщение об ошибке сети
        App.getModal('register').setMessage('Ошибка сети. Пожалуйста, попробуйте позже.');
        return;
      }

      if (response && response.success) {
        // Успешная регистрация
        this.element.reset();
        App.getModal('register').close();
        App.setState('user-logged');

        // Можно показать уведомление об успехе
        App.showNotification('Регистрация прошла успешно!');
      } else {
        // Ошибка регистрации (например, email занят)
        const errorMessage = response.error || 'Ошибка регистрации';
        console.error('Ошибка регистрации:', errorMessage);
        App.getModal('register').setMessage(errorMessage);
      }
    });
  }
}