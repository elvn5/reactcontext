import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import PhoneIcon from '/public/icons/phone.svg';
import MailIcon from '/public/icons/mail.svg';
import FacebookIcon from '/public/icons/facebook.svg';
import InstagramIcon from '/public/icons/instagram.svg';
import VkontakteIcon from '/public/icons/vk.svg';
import OkIcon from '/public/icons/ok.svg';
import MapMarkIcon from '/public/icons/map-mark-icon.svg';
import styles from '../../styles/contacts/contacts.module.scss';
import AboutSidebar from "../../components/sidebar/aboutSidebar";
import MainLayout from "../../layouts/MainLayout";
import MapComponent from "../../components/map";
import PhoneField from "../../components/phoneInput";
import { modalsRequest, useValidate } from "../../utils";
import { getContacts, getPharmacy, getPharmacyById } from "../../store/info/actions";
import { connectContext } from '../../store';


const Contacts = ({ dispatch, contactData, loading, pharmacy }) => {
  const [inputData, setInputData] = React.useState({});
  const [inputErrors, setInputErrors] = React.useState([]);
  const [phoneCountry, setPhoneCountry] = React.useState('');
  const [selectedPharmacy, setSelectedPharmacy] = React.useState({});
  const [selectLoading, setSelectLoading] = React.useState(false);
  const router = useRouter();

  const {
    feedBackSchema,
    displayInputError,
    displayErrorName,
    inputErrorClassname,
  } = useValidate(phoneCountry);

  const handleChange = ({ target: { value, name } }) => {
    setInputData({ ...inputData, [name]: value });
  };

  const handlePhoneChange = (phone, country) => {
    setInputData({ ...inputData, phone });
    setPhoneCountry(country.countryCode);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const validateError = await feedBackSchema(inputData);
    setInputErrors(validateError);
    if (!validateError.length) {
      const { success } = await modalsRequest('/api/feedback', inputData);
      if (success) {
        setInputData({});
      }
    }
  };

  const fetchPharmacyById = async (id) => {
    setSelectLoading(true);

    const res = await getPharmacyById(dispatch, id);
    setSelectedPharmacy(res.data || {});

    setSelectLoading(false);
  };

  React.useEffect( () => {
    getContacts(dispatch);
    getPharmacy(dispatch);

    const { id } = router.query;

    if (id) {
      router.push('#mapWrapper');
      fetchPharmacyById(id);
    }
  }, []);

  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">
              <a>Главная</a></Link> / <Link href="#"><a>Контакты</a>
            </Link>
          </div>

          <div className={styles.content}>
            <AboutSidebar />

            <div className={styles.contentRight}>
              <div className={styles.contacts}>
                <h3>Контакты</h3>

                <div className={styles.contactsWrapper}>
                  <div className={styles.contactsItem}>
                    <h4>Наши телефоны</h4>
                    <ul>
                      <li>
                        <Link href="tel:+996555555555">
                          <a>
                            <Image src={PhoneIcon} alt="phone" />
                            <span>+996(555)555555</span>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="tel:+996555555555">
                          <a>
                            <Image src={PhoneIcon} alt="phone" />
                            <span>+996(555)555555</span>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="tel:+996555555555">
                          <a>
                            <Image src={PhoneIcon} alt="phone" />
                            <span>+996(555)555555</span>
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.line} />
                  <div className={styles.contactsItem}>
                    <h4>Email:</h4>
                    <ul>
                      <li>
                        <Link href="mailto:qwerty123@gmail.com">
                          <a>
                            <Image src={MailIcon} alt="mail" />
                            <span>qwerty123@gmail.com</span>
                          </a>
                        </Link>
                      </li>
                    </ul>
                    <h4>Наш адрес:</h4>
                    <ul>
                      <li>
                        <Image src={MapMarkIcon} alt="address" />
                        <span>г. Бишкек, пр-т Манаса, д. 5</span>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.line} />
                  <div className={styles.contactsItem}>
                    <h4>Мы в социальных сетях:</h4>
                    <ul>
                      <li>
                        <Image src={FacebookIcon} alt="facebook" />
                        <span>Facebook</span>
                      </li>
                      <li>
                        <Image src={VkontakteIcon} alt="vk" />
                        <span>VKontakte</span>
                      </li>
                      <li>
                        <Image src={InstagramIcon} alt="instagram" />
                        <span>Instagram</span>
                      </li>
                      <li>
                        <Image src={OkIcon} alt="ok" />
                        <span>Odnoklassniki</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.mapWrapper} id="mapWrapper">
                <MapComponent
                  pharmacy={pharmacy}
                  selected={selectedPharmacy}
                  fetchPharmacyById={fetchPharmacyById}
                  setSelected={setSelectedPharmacy}
                  loading={selectLoading}
                />
              </div>

              <div className={styles.feedBack}>
                <div className={styles.title}>
                  <h3>Обратная связь</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit Lorem ipsum dolor sit amet,
                    consectetur adipiscing elitLorem ipsum dolor sit</p>
                </div>

                <form action="#" onSubmit={handleSubmit}>
                  <div className={styles.formBody}>
                    <div className={styles.formDiv}>
                      <div className={styles.formItem}>
                        {displayErrorName(inputErrors, 'name', 'Имя')}
                        <input
                          className={inputErrorClassname(inputErrors, 'name')}
                          type="text"
                          placeholder="Имя*"
                          name="name"
                          onChange={handleChange}
                          value={inputData.name}
                        />
                        {displayInputError(inputErrors, 'name')}
                      </div>
                      <div className={styles.formItem}>
                        {displayErrorName(inputErrors, 'phone', 'Номер')}
                        <PhoneField
                          handleChange={handlePhoneChange}
                          isError={inputErrors.some(el => el.path === 'phone')}
                        />
                        {displayInputError(inputErrors, 'phone')}
                      </div>
                      <div className={styles.formItem}>
                        {displayErrorName(inputErrors, 'email', 'E-mail')}
                        <input
                          className={inputErrorClassname(inputErrors, 'email')}
                          type="text"
                          placeholder="e-mail*"
                          name="email"
                          value={inputData.email}
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
                          value={inputData.title}
                          onChange={handleChange}
                        />
                        {displayInputError(inputErrors, 'title')}
                      </div>
                    </div>

                    <div className={styles.formDiv}>
                      {displayErrorName(inputErrors, 'body', 'Комментарий')}
                      <textarea
                        className={inputErrorClassname(inputErrors, 'body')}
                        placeholder="Комментарий"
                        name="body"
                        value={inputData.body}
                        onChange={handleChange}
                      />
                      {displayInputError(inputErrors, 'body')}
                    </div>
                  </div>

                  <div className={styles.formSubmit}>
                    <button>Отправить</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default connectContext(Contacts, ({ info: { contacts, pharmacy } }) => ({
  contactData: contacts.data || [],
  pharmacy: pharmacy.data || [],
  loading: contacts.loading,
}));
