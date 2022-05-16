import * as React from "react";
import Link from "next/link";
import Image from 'next/image';
import classNames from "classnames";
import 'react-phone-input-2/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css';

import RegisterCreateForm from "../../components/auth/registerCreateForm";
import RegisterOtp from "../../components/auth/registerOtp";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Logo from '../../public/icons/logo-white.svg';
import styles from '../../styles/auth/auth.module.scss';
import { connectContext } from '../../store';
import { getOtp } from "../../store/user/actions";
import { useValidate } from "../../utils";


const Register = ({ dispatch }) => {
  const [inputData, setInputData] = React.useState({});
  const [phoneCountry, setPhoneCountry] = React.useState('');
  const [counter, setCounter] = React.useState(0);
  const [inputErrors, setInputErrors] = React.useState([]);
  const [otpSuccess, setOtpSuccess] = React.useState(false)

  const { registerSchema } = useValidate();

  const handlePhoneChange = (phone, country) => {
    setInputData({ ...inputData, phone });
    setPhoneCountry(country.countryCode);
  };

  const handlePhoneSend = async e => {
    e.preventDefault();
    const validateError = await registerSchema(inputData);

    setInputErrors(validateError);
    if (!validateError?.length) {
      const { success } = await getOtp(dispatch, {
        phone: inputData.phone,
        sms_otp_type: 'CREATE_USER',
      });

      setOtpSuccess(success);
      if (success) {
        setCounter(59);
      }
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

      <div className={classNames(styles.wrapper, styles.register)}>
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
              <RegisterCreateForm
                counter={counter}
                inputData={inputData}
                setInputData={setInputData}
                handleSubmit={handlePhoneSend}
                handlePhoneChange={handlePhoneChange}
                phoneCountry={phoneCountry}
                inputErrors={inputErrors}
              />
            ) : (
              <RegisterOtp
                inputData={inputData}
                setInputData={setInputData}
                handlePhoneSend={handlePhoneSend}
                counter={counter}
              />
            )}
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default connectContext(Register);
