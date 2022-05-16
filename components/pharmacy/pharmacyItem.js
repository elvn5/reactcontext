import * as React from 'react';
import Image from "next/image";
import moment from 'moment';
import { useRouter } from "next/router";

import MapRouteIcon from '../../public/icons/route-map.svg'
import styles from '../../styles/pharmacy/pharmacyItem.module.scss';
import { objectToQuery } from "../../utils";


const PharmacyItem = ({ item }) => {
  const timeFrom = moment(item.schedule.from, 'hh:mm:ss');
  const timeTo = moment(item.schedule.to, 'hh:mm:ss');
  const router = useRouter();

  const goToContacts = () => {
    router.push(`/contacts?${objectToQuery({ id: item._id })}`)
  };

  return (
    <div className={styles.item}>
      <div className={styles.imageBlock}>
        <div className={styles.status}>
          {moment().isBetween(timeFrom, timeTo) ?
            <span className={styles.open}>Открыто</span>
            :
            <span className={styles.close}>Закрыто</span>}
        </div>

        <img src={item.image} alt="pharmacy"/>
      </div>
      <div className={styles.itemData}>
        <h4>{item.name || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'}</h4>
        <div>
          <div>
            <div className={styles.dataRow}>
              <span className={styles.graySpan}>Адрес:</span>
              <span className={styles.blackSpan}>{item.address || 'Боконбаева Мира'}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.graySpan}>График работы:</span>
              <span className={styles.blackSpan}>{item.schedule?.from || '9:00'} - {item.schedule?.to || '22:00'}</span>
            </div>
          </div>

          <div>
            <div className={styles.numbers}>
              <span className={styles.graySpan}>Номер телефона:</span>
              {item.contacts?.map(item => (
                <span className={styles.blackSpan} key={item}>
                  {/*TODO pass here real numbers, when they appear*/}
                  +996 (555) 00 00 00
                </span>
                )
              )}
            </div>
            <button className={styles.showMap} onClick={goToContacts}>
              <Image src={MapRouteIcon} alt="route" />
              <span>Показать на карте</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PharmacyItem;
