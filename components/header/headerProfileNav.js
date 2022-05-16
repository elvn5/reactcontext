import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import UserIcon from "../../public/icons/user-default.svg";
import HeartGrayIcon from "../../public/icons/heart-gray.svg";
import ClockIcon from "../../public/icons/clock.svg";
import PhoneIcon from "../../public/icons/phone.svg";
import styles from '../../styles/header/header.module.scss';
import { connectContext } from "../../store";


const HeaderProfileNav = ({ closeNav, logout, user }) => {
  const router = useRouter();

  React.useEffect(() => {
    document.addEventListener('click', closeNav);

    return () => {
      document.removeEventListener('click', closeNav);
    }
  }, []);

  return (
    <div className={styles.profileActions}>
      <ul>
        <li onClick={() => router.push('/profile')}>
          <div>
            <Image src={UserIcon} alt="user" />
            <span>Профиль</span>
          </div>
          <p className={styles.bonus}>{user?.data?.bonus || 0}</p>
        </li>
        <li onClick={() => router.push('/favorite')}>
          <div>
            <Image src={HeartGrayIcon} alt="heart" />
            <span>Избранное</span>
          </div>
        </li>
        <li onClick={() => router.push('/order-history')}>
          <div>
            <Image src={ClockIcon} alt="clock" />
            <span>История заказов</span>
          </div>
        </li>
        <li onClick={() => router.push('/change-phone')}>
          <div>
            <Image src={PhoneIcon} alt="phone" />
            <span>Сменить номер</span>
          </div>
        </li>
        <li className={styles.profileLine} />
        <span className={styles.logout} onClick={logout}>
          Выйти из аккаунта
        </span>
      </ul>
    </div>
  );
};

export default connectContext(HeaderProfileNav, ({ user: { info } }) => ({
  user: info
}));
