import * as yup from "yup";
import { parsePhoneNumber } from "libphonenumber-js";


const useValidate = phoneCountry => {
  const displayInputError = (errors, inputName) => {
    if (errors.some(err => err.path === inputName)) {
      return (
        <p className="error-text">
          {errors.find(err => err.path === inputName)?.message}
        </p>
      );
    }
    return null;
  };

  const displayErrorName = (errors, inputName, inputNameText) => {
    if (errors.some(error => error.path === inputName)) {
      return <p className="error-text">{inputNameText}</p>;
    }
    return null;
  };

  const inputErrorClassname = (errors, inputName) => {
    return errors.some(err => err.path === inputName) ? 'input-error' : '';
  };

  yup.setLocale({
    string: {
      email: 'Неправильно введен e-mail',
    },
  });

  yup.addMethod(yup.string, 'validatePhone', function (errorMessage) {
    return this.test('checkPhone', errorMessage, function (phone) {
      const { path, createError } = this;
      const phoneNumber = parsePhoneNumber(
        phone && phone.length > 1 ? phone : '+99600',
        phoneCountry.toUpperCase(),
      );

      return (
        phoneNumber.isValid() ||
        createError({ path, message: errorMessage })
      );
    });
  });

  const loginSchema = data => (
    yup.object().shape({
      phone: yup.string().validatePhone('Неправильно введен номер'),
    })
      .validate(data, {abortEarly: false})
      .then(() => [])
      .catch(error => error.inner)
  );

  const registerSchema = data => (
    yup.object().shape({
      firstname: yup.string().required('Введите имя'),
      lastname: yup.string().required('Введите фамилию'),
      date_of_birth: yup.date().required('Введите дату рождения'),
      phone: yup.string().validatePhone('Неправильно введен номер'),
    })
      .validate(data, {abortEarly: false})
      .then(() => [])
      .catch(error => error.inner)
  );

  const productModalSchema = data => (
    yup.object().shape({
      name: yup.string().required('Введите имя'),
      phone: yup.string().validatePhone('Неправильно введен номер'),
      product: yup.string().required('Укажите товар'),
    })
      .validate(data, { abortEarly: false })
      .then(() => [])
      .catch(error => error.inner)
  );

  const feedBackSchema = data => (
    yup.object().shape({
      name: yup.string().required('Введите имя'),
      phone: yup.string().validatePhone('Неправильно введен номер'),
      email: yup.string().email().required('Введите e-mail'),
      body: yup.string().required('Напишите комментарий'),
      title: yup.string().required('Напишите тему'),
    })
      .validate(data, { abortEarly: false })
      .then(() => [])
      .catch(error => error.inner)
  );

  const requestCallSchema = data => (
    yup.object().shape({
      name: yup.string().required('Введите имя'),
      phone: yup.string().validatePhone('Неправильно введен номер'),
    })
      .validate(data, { abortEarly: false })
      .then(() => [])
      .catch(error => error.inner)
  );

  const wholesalersSchema = data => (
    yup.object().shape({
      name: yup.string().required('Введите имя'),
      phone: yup.string().validatePhone('Неправильно введен номер'),
      license: yup.mixed().required('Прикрепите файл'),
    })
      .validate(data, { abortEarly: false })
      .then(() => [])
      .catch(error => error.inner)
  );

  return {
    loginSchema,
    registerSchema,
    displayInputError,
    displayErrorName,
    inputErrorClassname,
    productModalSchema,
    feedBackSchema,
    requestCallSchema,
    wholesalersSchema,
  };
};

export default useValidate;
