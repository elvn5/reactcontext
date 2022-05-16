import * as React from 'react';
import moment from "moment";
import { useRouter } from "next/router";

import styles from "../../styles/auth/auth.module.scss";
import { connectContext } from '../../store';
import { registration } from "../../store/user/actions";


function RegisterOtp({
  inputData,
  counter,
  handlePhoneSend,
  dispatch,
  wrongNumber,
}) {
  const [sms_otp, setSmsOtp] = React.useState('');
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    if (!!sms_otp) {
      const { success } = await registration(dispatch, {
        ...inputData,
        date_of_birth: moment(inputData.date_of_birth).format('x'),
        sms_otp,
      });

      if (success) {
        router.push('/');
      }
    }
  };

  return (
    <form action="#" onSubmit={handleSubmit}>
      <h3>Подтверждение номера телефона</h3>
      <div className={styles.phoneVerify}>
        <span>+{inputData.phone}</span>
        <p onClick={wrongNumber}>Неверный номер телефона?</p>
      </div>
      <input
        type="text"
        placeholder="Введите код подтверждения"
        name="sms_otp"
        onChange={({ target: { value } }) => setSmsOtp(value)}
      />
      <button className={styles.formBtn}>Подтвердить</button>
      <div className={styles.resend}>
        <span>Не пришло SMS сообщение?</span>
        <button onClick={handlePhoneSend} disabled={counter}>
          Отправить снова {counter ? `через 0:${counter}` : ''}
        </button>
      </div>
    </form>
  );
};

export default connectContext(RegisterOtp, ({ user: { isLoggedIn } }) => ({
  isLoggedIn,
}));
