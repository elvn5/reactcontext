import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import MainLayout from "../../layouts/MainLayout";
import ProfileSidebar from "../../components/sidebar/profileSiderbar";
import InfoModal from "../../components/modals/infoModal";
import OldNumber from "../../components/changeNumber/oldNumber";
import ConfirmOldNumber from "../../components/changeNumber/confirmOldNumber";
import NewNumber from "../../components/changeNumber/newNumber";
import ConfirmNewNumber from "../../components/changeNumber/confirmNewNumber";
import { connectContext } from "../../store";
import { changeUserData, confirmNumber, sendNumber } from "../../store/user/actions";

import styles from '../../styles/profile/profile.module.scss';


const ChangeNumber = ({ dispatch, user }) => {
  const [currentForm, setCurrentForm] = React.useState('oldNumber');
  const [countdown, setCountdown] = React.useState(0);
  const [phoneCounty, setPhoneCountry] = React.useState('');
  const [inputData, setInputData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handlePhoneChange = (phone, country) => {
    setInputData({
      ...inputData,
      phone,
    });
    setPhoneCountry(country.countryCode);
  };

  const handleCodeChange = ({ target: { value } }) => {
    setInputData({
      ...inputData,
      sms_otp: value
    });
  };

  const handleOldNumberSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const res = await sendNumber(inputData);
    if (res.success) {

      setInputData({
        ...inputData,
        sms_otp_old_id: res.sms_otp_id,
      });

      setCurrentForm('confirmOld');
    } else {
      setCurrentForm('error');
    }
    setLoading(false);
  };

  const handleNewNumberSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const res = await sendNumber(inputData);
    if (res.success) {

      setInputData({
        ...inputData,
        sms_otp_new_id: res.sms_otp_id,
      });

      setCurrentForm('confirmNew');
    } else {
      setCurrentForm('error');
    }
    setLoading(false);
  };

  const oldNumberConfirm = async e => {
    e.preventDefault();
    setLoading(true);

    const res = await confirmNumber(inputData);

    if (res.success) {
      setCurrentForm('newNumber');
    } else {
      setCurrentForm('error');
    }
    setLoading(false);
  };

  const handleChangeUser = async e => {
    e.preventDefault();
    setLoading(true);

    const otpRes = await confirmNumber(inputData);

    if (otpRes.success) {

      delete inputData.sms_otp;

      const changeRes = await changeUserData(dispatch, {
        id: user._id,
        ...inputData,
      });

      if (changeRes.success) {
        setCurrentForm('success');
      } else {
        setCurrentForm('error');
      }
    }
    setLoading(false);
  };

  React.useEffect(() => {
    const timer = countdown > 0 && setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  React.useEffect(() => {
    if (router && router.query) {
      setInputData(router.query);
    }
  }, [router]);

  const showCurrentForm = () => {
    switch (currentForm) {
      case 'oldNumber':
        return (
          <OldNumber
            handlePhoneChange={handlePhoneChange}
            numberSubmit={handleOldNumberSubmit}
            loading={loading}
          />
        )
      case 'confirmOld':
        return (
            <ConfirmOldNumber
              handleCodeChange={handleCodeChange}
              codeSubmit={oldNumberConfirm}
              countdown={countdown}
              phone={inputData.phone}
              setWrongNumber={setCurrentForm}
              loading={loading}
            />
        )
      case 'newNumber':
        return (
          <NewNumber
            numberSubmit={handleNewNumberSubmit}
            handlePhoneChange={handlePhoneChange}
            loading={loading}
          />
        )
      case 'confirmNew':
        return (
         <ConfirmNewNumber
           handleCodeChange={handleCodeChange}
           changeNumber={handleChangeUser}
           phone={inputData.phone}
           countdown={countdown}
           resendOtp={handleNewNumberSubmit}
           loading={loading}
         />
        )
      case 'success' :
        return (
          <div className={styles.modalWrapper}>
            <InfoModal
            closeModal={() => setCurrentForm('oldNumber')}
              text={'Номер успешно изменен'}
            />
          </div>
        )
      case 'error':
        return (
          <div className={styles.modalWrapper}>
            <InfoModal
              closeModal={() => setCurrentForm('oldNumber')}
              text={'Ошибка'}
              success={false}
            />
          </div>
        )
      default:
        return (
          <OldNumber
            handlePhoneChange={handlePhoneChange}
            numberSubmit={handleOldNumberSubmit}
          />
        )
    }
  };

  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <div className="container">
          <div className="breadcrumb"><Link href="/"><a>Главная</a></Link> / Смена номера</div>
          <div className={styles.content}>

            <ProfileSidebar/>

            <div className={styles.profileWrapper}>
              {showCurrentForm()}
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default connectContext(ChangeNumber, ({ user: { info } }) => ({
  user: info.data || {},
}));
