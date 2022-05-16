import * as React from "react";
import Image from "next/image";
import clsn from "classnames";

import DownArrowIcon from '../../public/icons/dropdown-arrow.svg';
import styles from '../../styles/help/helpItem.module.scss';


const HelpItem = ({question, answer}) => {
  const [dropAnswer, setDropAnswer] = React.useState(false);

  const arrowClassnames = React.useCallback(() => clsn({
    [styles.downArrow]: !dropAnswer,
  }), [dropAnswer]);

  return (
    <div className={styles.item} onClick={() => setDropAnswer(!dropAnswer)}>
      <div className={styles.heading}>
        <h3>{question}</h3>
        <div className={arrowClassnames()}>
          <Image src={DownArrowIcon} alt="arrow"/>
        </div>
      </div>
      {dropAnswer ? (
        <div className={styles.answer}>
          <p>{answer}</p>
        </div>
      ) : null}
    </div>
  );
};

export default HelpItem;