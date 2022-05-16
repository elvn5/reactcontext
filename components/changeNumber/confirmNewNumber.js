import * as React from 'react';

import ButtonLoader from "../loader/buttonLoader";
import styles from "../../styles/profile/profile.module.scss";


function ConfirmNewNumber({
  phone,
  changeNumber,
  handleCodeChange,
  countdown,
  resendOtp,
  setWrongNumber,
  loading,
}) {
  return (
    <React.Fragment>
      <h3>Подтвердите номер</h3>

      <form action="#" onSubmit={changeNumber}>
        <p>Вам был отправлен код подтверждения на номер</p>
        <h4>+{phone}</h4>
        <span onClick={() => setWrongNumber('')}>
          Неверный номер телефона?
        </span>
        <div className={styles.formItem}>
          {/*{displayErrorName(inputErrors, 'code', 'Код подтверждения')}*/}
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
        <span className={styles.cancel}>Отмена</span>
        <p className={styles.centerP}>Не пришло SMS сообщение?</p>
      </form>

      <button
        onClick={e => resendOtp(e, 'confirmNew')}
        className={styles.resend}
        disabled={countdown}
      >
        Отправить снова {countdown ? `через 0:${countdown}` : null}
      </button>
    </React.Fragment>
  );
}

export default ConfirmNewNumber;
