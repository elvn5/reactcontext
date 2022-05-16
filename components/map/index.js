import * as React from 'react';
import { YMaps, Map, Placemark } from "react-yandex-maps";

import MapModalLoader from "../loader/mapModalLoader";
import PlaceMarkIcon from '../../public/icons/placemark.svg';
import PlaceMarkActiveIcon from '../../public/icons/placemark-active.svg';
import styles from '../../styles/map/map.module.scss';


function MapComponent({ pharmacy, fetchPharmacyById, setSelected, loading, selected = {} }) {

  const clearSelected = () => {
    setSelected({});
  };

  React.useEffect(() => {
    if (Object.keys(selected).length) {
      document.addEventListener('click', clearSelected);
    } else {
      document.removeEventListener('click', clearSelected);
    }
  }, [selected]);

  return (
    <div className={styles.map}>
      {
        loading || Object.keys(selected).length ? (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              {
                Object.keys(selected).length ? (
                    <React.Fragment>
                      <div className={styles.address}>
                        <span className={styles.greyText}>Адрес:</span>
                        <span className={styles.blackText}>{selected.address}</span>
                      </div>
                      <div className={styles.schedule}>
                        <span className={styles.greyText}>График работы:</span>
                        <span className={styles.blackText}>{selected.schedule.from} - {selected.schedule.to}</span>
                      </div>
                      <div className={styles.numbers}>
                        {selected.contacts.map(item => <span key={item} className={styles.blackText}>blyat</span>)}
                      </div>
                      <button className={styles.closeModal}>Закрыть</button>
                    </React.Fragment>
                ) : <MapModalLoader />
              }
            </div>
          </div>
        ) : null
      }
      <YMaps>
        <Map
          width={'100%'}
          defaultState={{
            center: [42.877226, 74.588012],
            zoom: 13,
          }}
        >
          {
            pharmacy?.map(item => (
              <Placemark
                options={{
                  iconLayout: 'default#image',
                  iconImageHref: selected._id === item._id ? PlaceMarkActiveIcon.src : PlaceMarkIcon.src,
                  iconImageSize: [41, 41]
                }}
                onClick={() => fetchPharmacyById(item._id)}
                key={item._id}
                geometry={[item.coordinates.latitude, item.coordinates.longitude]}
              />
            ))
          }
        </Map>
      </YMaps>
    </div>
  );
}

export default React.memo(MapComponent);
