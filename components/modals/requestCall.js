import * as React from "react";
import Image from "next/image";
import cs from "classnames";
import PhoneField from "../phoneInput";
import ButtonLoader from "../loader/buttonLoader";
import InfoModal from "./infoModal";
import PhoneIcon from "../../public/icons/phone-green.svg";
import styles from "../../styles/modals/modal.module.scss";
import { modalsRequest, useValidate } from "../../utils";


const RequestCall = ({ showModal, setModal }) => {
  const [inputData, setInputData] = React.useState({});
  const [phoneCountry, setPhoneCountry] = React.useState('');
  const [inputErrors, setInputErrors] = React.useState([]);
  const [resSuccess, setResSuccess] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const {
    displayInputError,
    displayErrorName,
    inputErrorClassname,
    requestCallSchema,
  } = useValidate(phoneCountry);

  const handleSubmit = async e => {
    e.preventDefault();
    const validateError = await requestCallSchema(inputData);
    setInputErrors(validateError)
    if (!validateError.length) {
      setLoading(true);
      const res = await modalsRequest('/api/callOrder', inputData);

      setResSuccess(res);
      setLoading(false);
    }
  };

  const handlePhoneChange = (phone, country) => {
    setInputData({ ...inputData, phone });
    setPhoneCountry(country.countryCode);
  };

  const handleChange = ({ target: { name, value } }) => {
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const wrapperClasses = React.useCallback(() => {
    return cs({
      [styles.wrapper]: true,
      [styles.activeWrapper]: showModal === 'requestCall',
    })
  }, [showModal]);

  return (
    <div className={wrapperClasses()}>
      {
        showModal === 'requestCall' ? (
          <div className={styles.content}>
            {
              !Object.keys(resSuccess).length ? (
                  <React.Fragment>
                    <h4>Заказать звонок</h4>
                    <p className={styles.text}>Lorem ipsum dolor sit amet, consecrated advising elite</p>
                    <form action="#" onSubmit={handleSubmit}>
                      <div className={styles.formItem}>
                        {displayErrorName(inputErrors, 'name', 'Имя')}
                        <input
                          className={inputErrorClassname(inputErrors, 'name')}
                          type="text"
                          name="name"
                          placeholder="Как к Вам обращаться?"
                          onChange={handleChange}
                        />
                        {displayInputError(inputErrors, 'name')}
                      </div>
                      <div className={styles.formItem}>
                        {displayErrorName(inputErrors, 'phone', 'Номер телефона')}
                        <PhoneField
                          handleChange={handlePhoneChange}
                          isError={inputErrors.some(err => err.path === 'phone')}
                        />
                        {displayInputError(inputErrors, 'phone')}
                      </div>
                      <button>{ loading ? <ButtonLoader /> : 'Заказать звонок' }</button>
                    </form>
                    <button className={styles.close} onClick={() => setModal(false)}>
                      Закрыть
                    </button>
                  </React.Fragment>
                )
                :
                (
                  <InfoModal
                    success={resSuccess.success}
                    text={resSuccess.success ? 'Успешно' : 'Произошла ошибка!'}
                    isLink={false}
                    closeModal={() => setModal(false)}
                  />
                )
            }
          </div>
        ) : (
          <div className={styles.phoneIcon}>
            <Image src={PhoneIcon} alt="phone" onClick={() => setModal('requestCall')}/>
          </div>
        )
      }
    </div>
  );
}

export default RequestCall;
