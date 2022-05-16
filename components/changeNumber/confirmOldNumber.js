import * as React from 'react';

import ButtonLoader from "../loader/buttonLoader";
import styles from "../../styles/profile/profile.module.scss";


function ConfirmOldNumber({
  handleCodeChange,
  codeSubmit,
  phone,
  countdown,
  setWrongNumber,
  loading,
}) {
  return (
    <React.Fragment>
      <h3>Смена номера</h3>
      <form action="#" onSubmit={codeSubmit}>
        <p>Вам был отправлен код подтверждения на номер</p>
        <h4>+{phone}</h4>
        <span onClick={() => setWrongNumber('oldNumber')}>
          Неверный номер телефона?
        </span>

        <div className={styles.formItem}>
          {/*{displayErrorName(inputErrors, 'otp', 'Код подтверждения')}*/}
          <input
            className={styles.centerInput}
            name="sms_otp"
            type="text"
            placeholder="Введите код подтверждения"
            onChange={handleCodeChange}
          />
          {/*{displayInputError(inputErrors, 'code')}*/}
        </div>

        <button
          className={styles.formBtn}
          disabled={loading}
        >
          {
            loading ? <ButtonLoader /> : 'Сменить номер'
          }
        </button>
        <button className={styles.cancel}>Отмена</button>
        <p className={styles.centerP}>Не пришло SMS сообщение?</p>
      </form>
      <button className={styles.resend} disabled={countdown > 0}>
        Отправить снова {countdown ? `через 0:${countdown}` : ''}
      </button>
    </React.Fragment>
  );
}

export default ConfirmOldNumber;
