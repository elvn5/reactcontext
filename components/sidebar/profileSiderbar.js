import * as React from 'react';
import Image from "next/image";
import Link from "next/link";
import clsn from "classnames";
import { useRouter } from "next/router";

import HeartIcon from '../../public/icons/heart-gray.svg';
import UserIcon from '../../public/icons/user-default.svg';
import ClockIcon from '../../public/icons/clock.svg';
import PhoneIcon from '../../public/icons/phone.svg';
import styles from "../../styles/sidebar/sidebar.module.scss";
import { connectContext } from "../../store";
import { logout } from "../../store/user/actions";


const ProfileSidebar = ({ dispatch, user }) => {
  const router = useRouter();

  const linksClasses = React.useCallback(path => clsn({
    [styles.activeLink]: router.pathname === path,
  }), [router.pathname]);

  const handleLogout = () => {
    logout(dispatch);
    router.push('/');
  };

  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <div>
            <Image src={UserIcon} alt="profile" />
            <Link href="/profile">
              <a className={linksClasses('/profile')}>Профиль</a>
            </Link>
          </div>
          <span>{user?.data?.bonus || 0}</span>
        </li>
        <li>
          <div>
            <Image src={HeartIcon} alt="favorite" />
            <Link href="/favorite">
              <a className={linksClasses('/favorite')}>Избранное</a>
            </Link>
          </div>
        </li>
        <li>
          <div>
            <Image src={ClockIcon} alt="order-history" />
            <Link href="/order-history">
              <a className={linksClasses('/order-history')}>История заказов</a>
            </Link>
          </div>
        </li>
        <li>
          <div>
            <Image src={PhoneIcon} alt="phone" />
            <Link href="/change-phone">
              <a className={linksClasses('/change-phone')}>Сменить номер</a>
            </Link>
          </div>
        </li>
      </ul>
      <button onClick={handleLogout} className={styles.logoutBtn}>
        Выйти из аккаунта
      </button>
    </div>
  );
};

export default connectContext(ProfileSidebar, ({ user: { info } }) => ({
  user: info,
}));
