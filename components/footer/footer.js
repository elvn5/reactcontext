import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import AppStoreIcon from '../../public/icons/appstore.svg';
import GooglePlayIcon from '../../public/icons/googleplay.svg';
import VK from '../../public/icons/vk.svg';
import Facebook from '../../public/icons/facebook.svg';
import OK from '../../public/icons/ok.svg';
import Instagram from '../../public/icons/instagram.svg';
import MailIcon from '../../public/icons/mail.svg';
import PhoneIcon from '../../public/icons/phone.svg';
import styles from '../../styles/footer/footer.module.scss';


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topContent}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.column}>
              <h3>Покупателям</h3>
              <ul>
                <li>
                  <Link href="/help">
                    <a>Как сделать заказ</a>
                  </Link>
                </li>
                <li>
                  <Link href="/help">
                    <a>Способы оплаты</a>
                  </Link>
                </li>
                <li>
                  <Link href="/help">
                    <a>Доставка</a>
                  </Link>
                </li>
                <li>
                  <Link href="/help">
                    <a>Возврат товара</a>
                  </Link>
                </li>
                <li>
                  <Link href="/help">
                    <a>Вопросы и ответы</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.column}>
              <h3>Компания</h3>
              <ul>
                <li>
                  <Link href="/about">
                    <a>О нас</a>
                  </Link>
                </li>
                <li>
                  <Link href="/contacts">
                    <a>Контакты</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.column}>
              <h3>Мы в соц сетях</h3>
              <ul>
                <li>
                  <Link href="#">
                    <a><Image src={VK} alt="vk" />Вконтакте</a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a><Image src={Facebook} alt="facebook" />Facebook</a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a><Image src={OK} alt="ok" />Одноклассники</a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a><Image src={Instagram} alt="instagram" />Instagram</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.column}>
              <h3>Свяжитесь с нами</h3>
              <ul>
                <li>
                  <Link href="mailto:mail@bimed.kg">
                    <div>
                      <Image src={MailIcon} alt="mail" />
                      mail@bimed.kg
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="tel:+996555555555">
                    <div>
                      <Image src={PhoneIcon} alt="phone" />
                      +996555 55 55 55
                    </div>
                  </Link>
                </li>
                <li>
                  <div><Image src={AppStoreIcon} alt="appstore" /></div>
                  <div><Image src={GooglePlayIcon} alt="google play" /></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>Разработка сайтов и мобильных приложений</span>
        <Link href="https://sunrisestudio.pro">
          <a>www.sunrisestudio.pro {new Date().getFullYear()}</a>
        </Link>
      </div>
    </footer>
  );
};

export default React.memo(Footer);