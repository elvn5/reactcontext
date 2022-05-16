import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import SuccessIcon from '../../public/icons/success.svg';
import ErrorIcon from '../../public/icons/error.svg';
import styles from '../../styles/modals/successModal.module.scss';


const InfoModal = ({ text, isLink, closeModal, success = true, }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <Image src={success ? SuccessIcon : ErrorIcon} alt="info" />
      </div>
      <p>{text}</p>
      <div className={styles.link}>
        {isLink ?
          <Link href="/"><a>На главную</a></Link>
          :
          <button onClick={closeModal}>
            {success ? 'Хорошо' : 'Закрыть'}
          </button>
        }
      </div>
    </div>
  );
};

export default InfoModal;
