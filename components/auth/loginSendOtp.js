import * as React from 'react';

import { connectContext } from "../../store";
import styles from "../../styles/auth/auth.module.scss";
import ButtonLoader from "../loader/buttonLoader";

function LoginSendOtp({
  handleLogin,
  handleResendOtp,
  handleOtpChange,
  inputData,
  counter,
  wrongNumber,
  loading,
}) {

  return (
    <React.Fragment>
      <form action="#" onSubmit={handleLogin}>
        <h3>Подтверждение номера телефона</h3>
        <div className={styles.phoneVerify}>
          <span>+{inputData.phone}</span>
          <p onClick={wrongNumber}>Неверный номер телефона?</p>
        </div>
        <input
          type="text"
          placeholder="Введите код подтверждения"
          name="sms_otp"
          onChange={handleOtpChange}
        />
        <button className={styles.formBtn}>
          {loading ? <ButtonLoader /> : 'Подтвердить'}
        </button>
      </form>
      <div className={styles.resend}>
        <span>Не пришло SMS сообщение?</span>
        <button
          disabled={counter}
          onClick={handleResendOtp}
        >
          Отправить снова {counter ? `через 0:${counter}` : null}
        </button>
      </div>
    </React.Fragment>
  );
}

export default connectContext(LoginSendOtp, ({ user: { isLoggedIn } }) => ({
  isLoggedIn,
}));
