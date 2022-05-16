import * as React from 'react';
import Link from "next/link";

import MainLayout from "../../layouts/MainLayout";
import Pagination from "../../components/pagination";
import PharmacyItem from "../../components/pharmacy/pharmacyItem";
import SpinnerLoader from "../../components/loader/spinner";
import styles from '../../styles/pharmacy/pharmacyPage.module.scss';
import { getPharmacy } from '../../store/info/actions';
import { connectContext } from '../../store';


const Pharmacy = ({ dispatch, pharmacy, loading }) => {
  const [skip, setSkip] = React.useState(0);

  React.useEffect(() => {
    getPharmacy(dispatch, { skip, limit: 20 });
  }, [skip]);

  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <div className="container">

          <div className="breadcrumb">
            <Link href="/"><a>Главная</a></Link> / Филиалы
          </div>

          <div className={styles.content}>
            <h3>Филиалы</h3>
            <div className={styles.pharmacyWrapper}>
              {/*{loading ? <SpinnerLoader /> : null}*/}
              {pharmacy?.map(item => <PharmacyItem item={item} key={item._id}/>)}
            </div>
          </div>
          <Pagination totalPages={10} changePage={setSkip} currentPage={skip} />
        </div>
      </div>
    </MainLayout>
  );
}

export default connectContext(Pharmacy, ({ info: { pharmacy } }) => ({
  pharmacy: pharmacy.data,
  loading: pharmacy.loading,
}));
