import PhoneField from "../phoneInput";
import styles from "../../styles/auth/auth.module.scss";
import { useValidate } from "../../utils";
import ButtonLoader from "../loader/buttonLoader";


function LoginSendNumber({
  handleSubmit,
  handlePhoneChange,
  phoneCountry,
  inputErrors,
  loading,
}) {
  const { displayErrorName, displayInputError } = useValidate(phoneCountry);

  return (
    <form action="#" onSubmit={handleSubmit}>
      <h3>Вход</h3>
      {displayErrorName(inputErrors, 'phone', 'Номер')}
      <PhoneField
        handleChange={handlePhoneChange}
        isError={inputErrors.some(err => err.path === 'phone')}
      />
      {displayInputError(inputErrors, 'phone')}
      <button className={styles.formBtn}>
        {loading ? <ButtonLoader /> : 'Войти'}
      </button>
    </form>
  );
}

export default LoginSendNumber;
