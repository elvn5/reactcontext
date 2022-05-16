import * as React from "react";

import PhoneField from "../phoneInput";
import styles from '../../styles/modals/modal.module.scss';
import {modalsRequest, useValidate} from "../../utils";
import InfoModal from "./infoModal";
import ButtonLoader from "../loader/buttonLoader";


const ProductModal = ({ closeModal }) => {
  const [inputData, setInputData] = React.useState({});
  const [phoneCountry, setPhoneCountry] = React.useState('');
  const [inputErrors, setInputErrors] = React.useState([]);
  const [resSuccess, setResSuccess] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const {
    productModalSchema,
    displayInputError,
    displayErrorName,
  } = useValidate(phoneCountry);

  const handleChange = ({ target: { name, value }}) => {
    setInputData({ ...inputData, [name]: value });
  };

  const handlePhoneChange = (phone, country) => {
    setInputData({ ...inputData, phone });
    setPhoneCountry(country.countryCode);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validateErrors = await productModalSchema(inputData);

    if (!validateErrors.length) {
      setLoading(true);
      const res = await modalsRequest('/api/nfpr', inputData);

      setResSuccess(res);
      setLoading(false);
    } else {
      setInputErrors(validateErrors);
    }
  };

  React.useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'auto';
    }
  }, []);

  return (
    <div className={styles.activeWrapper}>
      <div className={styles.content}>
        {
          !Object.keys(resSuccess).length ? (
            <React.Fragment>
              <h4>Форма для заполения</h4>
              <p className={styles.text}>Оставьте нам заявку, и мы привезем нужный товар</p>
              <form action="#" onSubmit={handleSubmit}>
                {displayErrorName(inputErrors, 'name', 'Имя')}
                <input
                  type="text"
                  placeholder="Имя"
                  name="name"
                  onChange={handleChange}
                />
                {displayInputError(inputErrors, 'name')}

                {displayErrorName(inputErrors, 'phone', 'Номер телефона')}
                <PhoneField
                  handleChange={handlePhoneChange}
                  isError={inputErrors.some(err => err.path === 'phone')}
                />
                {displayInputError(inputErrors, 'phone')}

                {displayErrorName(inputErrors, 'product', 'Название товара')}
                <input
                  type="text"
                  placeholder="Название товара"
                  name="product"
                  onChange={handleChange}
                />
                {displayInputError(inputErrors, 'product')}
                <button>
                  {loading ? <ButtonLoader /> : 'Отправить'}
                </button>
              </form>
              <button className={styles.close} onClick={closeModal}>Закрыть</button>
            </React.Fragment>
          ) : (
            <InfoModal
              success={resSuccess.success}
              isLink={false}
              text={resSuccess.success ? 'Успешно' : 'Ошибка'}
              closeModal={closeModal}
            />
          )
        }
      </div>
    </div>
  );
};

export default ProductModal;
