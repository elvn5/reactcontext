import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import ru from "date-fns/locale/ru";
import DatePicker, { registerLocale } from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import { months, useValidate } from "../../utils";

import PhoneField from "../phoneInput";
import ArrowIcon from "../../public/icons/arrow-white.svg";
import styles from "../../styles/auth/auth.module.scss";


function RegisterCreateForm({
  inputErrors,
  inputData,
  setInputData,
  phoneCountry,
  handlePhoneChange,
  handleSubmit,
}) {
  const {
    inputErrorClassname,
    displayInputError,
    displayErrorName,
  } = useValidate(phoneCountry);

  const handleChange = ({ target: { name, value } }) => {
    setInputData({ ...inputData, [name]: value });
  };

  const years = (start, end) => {
    const yearsArray = [];

    for (let i = end; i > start; i--) {
      yearsArray.push(i);
    }

    return yearsArray;
  };

  React.useEffect(() => {
    registerLocale("ru", Object.assign(ru, {
      options: { ...ru.options, weekStartsOn: 1 }
    }));
  }, []);

  return (
    <form action="#" onSubmit={handleSubmit}>
      <h3>Регистрация</h3>
      <div className={styles.toLogin}>
        Есть аккаунт?
        <Link href="/login"><a>Войти</a></Link></div>

      <div className={styles.formItem}>
        {displayErrorName(inputErrors, 'firstname', 'Имя')}
        <input
          className={inputErrorClassname(inputErrors, 'firstname')}
          type="text"
          placeholder="Имя"
          name="firstname"
          value={inputData.firstname || ''}
          onChange={handleChange}
        />
        {displayInputError(inputErrors, 'firstname')}
      </div>

      <div className={styles.formItem}>
        {displayErrorName(inputErrors, 'lastname', 'Фамилия')}
        <input
          className={inputErrorClassname(inputErrors, 'lastname')}
          type="text"
          placeholder="Фамилия"
          name="lastname"
          value={inputData.lastname || ''}
          onChange={handleChange}
        />
        {displayInputError(inputErrors, 'lastname')}
      </div>

      <div className={styles.formItem}>
        {displayErrorName(inputErrors, 'date_of_birth', 'Дата')}
        <div className={styles.dateInputWrapper}>
          <DatePicker
            selected={inputData.date_of_birth}
            onChange={date_of_birth => setInputData({
              ...inputData,
              date_of_birth
            })}
            locale={'ru'}
            placeholderText="Дата рождения"
            className={inputErrorClassname(inputErrors, 'date_of_birth')}
            dropdownMode={'select'}
            renderCustomHeader={(
              {
                date, changeYear, changeMonth,
                decreaseMonth, increaseMonth,
                prevMonthDisabled,
                nextMonthDisabled
              }
            ) => (
              <div>
                <div className={styles.dateHeader}>
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthDisabled}
                  >
                    <Image src={ArrowIcon} alt="arrow" />
                  </button>
                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {years(1940, new Date().getFullYear()).map((year, i) => (
                      <option value={year} key={i}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <select
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                  >
                    {months.map((month, i) => (
                      <option value={month} key={i}>{month}</option>
                    ))}
                  </select>
                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthDisabled}
                  >
                    <Image src={ArrowIcon} alt="arrow" />
                  </button>
                </div>
              </div>
            )}
          />
        </div>
        {displayInputError(inputErrors, 'date_of_birth')}
      </div>
      <div className={styles.formItem}>
        {displayErrorName(inputErrors, 'phone', 'Номер')}
        <PhoneField
          handleChange={handlePhoneChange}
          isError={inputErrors.some(el => el.path === 'phone')}
        />
        {displayInputError(inputErrors, 'phone')}
      </div>
      <button className={styles.formBtn}>Далее</button>
    </form>
  );
}

export default RegisterCreateForm;
