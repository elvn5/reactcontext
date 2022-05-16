import * as React from "react";
import Link from 'next/link';
import Image from "next/image";
import classNames from "classnames";
import {useRouter} from "next/router";

import LoginSendNumber from "../../components/auth/loginSendNumber";
import LoginSendOtp from "../../components/auth/loginSendOtp";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Logo from "../../public/icons/logo-white.svg";
import styles from '../../styles/auth/auth.module.scss';
import { useValidate } from "../../utils";
import { getOtp, login } from "../../store/user/actions";
import { connectContext } from "../../store";


const LoginPage = ({ dispatch, otpLoading, loginLoading }) => {
  const [inputData, setInputData] = React.useState({});
  const [phoneCountry, setPhoneCountry] = React.useState('');
  const [counter, setCounter] = React.useState(0);
  const [inputErrors, setInputErrors] = React.useState([]);
  const [otpSuccess, setOtpSuccess] = React.useState(false);
  const router = useRouter();

  const { loginSchema } = useValidate(phoneCountry);

  const handlePhoneChange = (phone, country) => {
    setInputData({ ...inputData, phone });
    setPhoneCountry(country.countryCode);
  };

  const handleOtpChange = ({ target: { value } }) => {
    setInputData({ ...inputData, sms_otp: value });
  };

  const handlePhoneSend = async e => {
    e.preventDefault();
    const validateError = await loginSchema(inputData);
    setInputErrors(validateError);

    if (!validateError?.length) {
      const res = await getOtp(dispatch, { phone: inputData.phone, sms_otp_type: 'LOGIN' });

      setOtpSuccess(res.success);
      if (res.success) {
        setCounter(59);
      }
    }
  };

  const handleSmsSend = async e => {
    e.preventDefault();
    const { success } = await login(dispatch, inputData);
    if (success) {
      router.push('/');
    }
  };

  React.useEffect(() => {
    const timer = counter > 0 && setInterval(() => {
      setCounter(counter - 1);
    }, 1000);

    if (counter === 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <React.Fragment>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={classNames(styles.wrapper, styles.login)}>
        <div className={styles.logo}>
          <Image src={Logo} alt="logo" />
        </div>
        <div className={styles.content}>
          <div className={styles.mainLink}>
            <Link href="/">
              <a>На главную</a>
            </Link>
          </div>
          <div>
            {!otpSuccess ? (
              <LoginSendNumber
                handlePhoneChange={handlePhoneChange}
                handleSubmit={handlePhoneSend}
                phoneCountry={phoneCountry}
                inputErrors={inputErrors}
                loading={otpLoading}
              />
            ) : (
              <LoginSendOtp
                handleOtpChange={handleOtpChange}
                handleLogin={handleSmsSend}
                handleResendOtp={handlePhoneSend}
                inputData={inputData}
                counter={counter}
                wrongNumber={() => setOtpSuccess(false)}
                loading={loginLoading}
              />
            )}
            <p className={styles.orText}>или</p>
            <Link href="/register">
              <a className={styles.registerLink}>Зарегистрироваться</a>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default connectContext(LoginPage, ({ user: { info, otp } }) => ({
  loginLoading: info.loading || false,
  otpLoading: otp.loading || false,
}));
