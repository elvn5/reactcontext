import * as React from 'react';
import Image from "next/image";
import Link from "next/link";
import clsn from "classnames";
import { useRouter } from "next/router";

import InfoIcon from "../../public/icons/info.svg";
import PhoneIcon from "../../public/icons/phone.svg";
import QuestionIcon from "../../public/icons/question.svg";
import styles from "../../styles/sidebar/sidebar.module.scss";


const Sidebar = () => {
  const router = useRouter();

  const linksClasses = React.useCallback(path => clsn({
    [styles.activeLink]: router.pathname === path,
  }), [router.pathname]);

  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <div>
            <Image src={InfoIcon} alt="about" />
            <Link href="/about">
              <a className={linksClasses('/about')}>О нас</a>
            </Link>
          </div>
        </li>
        <li>
          <div>
            <Image src={PhoneIcon} alt="phone" />
            <Link href="/contacts">
              <a className={linksClasses('/contacts')}>Контакты</a>
            </Link>
          </div>
        </li>
        <li>
          <div>
            <Image src={QuestionIcon} alt="question" />
            <Link href="/help">
              <a className={linksClasses('/help')}>Помощь</a>
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default React.memo(Sidebar);
