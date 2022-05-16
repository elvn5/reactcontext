import * as React from "react";
import cs from "classnames";
import PhoneField from "../phoneInput";
import InfoModal from "./infoModal";
import ButtonLoader from "../loader/buttonLoader";
import styles from '../../styles/modals/modal.module.scss';
import { modalsRequest, useValidate } from "../../utils";


const FeedBack = ({ showModal, closeModal }) => {
  const [inputData, setInputData] = React.useState({});
  const [inputErrors, setInputErrors] = React.useState([]);
  const [phoneCountry, setPhoneCountry] = React.useState('');
  const [resSuccess, setResSuccess] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const {
    displayInputError,
    displayErrorName,
    inputErrorClassname,
    feedBackSchema,
  } = useValidate(phoneCountry);

  const handlePhoneChange = (phone, country) => {
    setInputData({...inputData, phone});
    setPhoneCountry(country.countryCode);
  };

  const handleChange = ({ target: { name, value } }) => {
    setInputData({
      ...inputData,
      [name]: value,
    })
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const validateError = await feedBackSchema(inputData);

    setInputErrors(validateError);

    if (!validateError.length) {
      setLoading(true);
      const res  = await modalsRequest('/api/feedback', inputData);

      setResSuccess(res);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'auto';
    }
  }, []);

  const wrapperClasses = React.useCallback(() => {
    return cs({
      [styles.wrapper]: true,
      [styles.activeWrapper]: showModal === 'feedback',
    })
  }, [showModal]);

  return (
    <div className={wrapperClasses()}>
      <div className={styles.content}>
        {
          !Object.keys(resSuccess).length ? (
              <React.Fragment>
                <h4>Обратная связь</h4>
                <p className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <form action="#" onSubmit={handleSubmit}>
                  <div className={styles.formItem}>
                    {displayErrorName(inputErrors, 'name', 'Имя')}
                    <input
                      className={inputErrorClassname(inputErrors, 'name')}
                      type="text"
                      placeholder="Имя"
                      name="name"
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
                  <div className={styles.formItem}>
                    {displayErrorName(inputErrors, 'email', 'E-mail')}
                    <input
                      className={inputErrorClassname(inputErrors, 'email')}
                      type="text"
                      placeholder="e-mail"
                      name="email"
                      onChange={handleChange}
                    />
                    {displayInputError(inputErrors, 'email')}
                  </div>
                  <div className={styles.formItem}>
                    {displayErrorName(inputErrors, 'title', 'Тема')}
                    <input
                      className={inputErrorClassname(inputErrors, 'title')}
                      type="text"
                      placeholder="Тема"
                      name="title"
                      onChange={handleChange}
                    />
                    {displayInputError(inputErrors, 'title')}
                  </div>
                  <div className={styles.formItem}>
                    {displayErrorName(inputErrors, 'body', 'Комментарий')}
                    <textarea
                      className={inputErrorClassname(inputErrors, 'body')}
                      placeholder="Комментарий"
                      rows={5}
                      name="body"
                      onChange={handleChange}
                    />
                    {displayInputError(inputErrors, 'body')}
                  </div>
                  <button>{ loading ? <ButtonLoader /> : 'Отправить' }</button>
                </form>
                <button className={styles.close} onClick={closeModal}>Закрыть</button>
              </React.Fragment>
            )
            :
            (
              <InfoModal
                success={resSuccess.success}
                text={resSuccess.success ? 'Успешно' : 'Произошла ошибка'}
                closeModal={closeModal}
                isLink={false}
              />
            )
        }
      </div>
    </div>
  );
};

export default FeedBack;
