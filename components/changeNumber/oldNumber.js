import * as React from 'react';
import PhoneField from "../phoneInput";
import ButtonLoader from "../loader/buttonLoader";
import styles from "../../styles/profile/profile.module.scss";


function OldNumber({ handlePhoneChange, numberSubmit, loading }) {
  return (
    <React.Fragment>
      <h3>Смена номера</h3>
      <form action="#" onSubmit={numberSubmit}>
        <p>Введите свой номер телефона чтобы получить код подтверждения</p>
        <div className={styles.formItem}>
          {/*{displayErrorName(inputErrors, 'phone', 'Номер')}*/}
          <PhoneField
            handleChange={handlePhoneChange}
            isError={false} />
          {/*{displayInputError(inputErrors, 'phone')}*/}
        </div>
        <button
          className={styles.formBtn}
          disabled={loading}
        >
          {
            loading ? <ButtonLoader /> : 'Далее'
          }
        </button>
      </form>
    </React.Fragment>
  );
}

export default OldNumber;
