import * as React from 'react';
import ru from 'react-phone-input-2/lang/ru.json';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';


const PhoneField = ({ handleChange, isError }) => {
  return (
    <PhoneInput
      localization={ru}
      country="kg"
      placeholder="Введите номер телефона"
      inputClass={isError ? 'input-error' : ''}
      onChange={handleChange}
    />
  );
}

export default React.memo(PhoneField);
