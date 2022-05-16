import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import Link from "next/link";
import styles from "../../styles/sales/salesPage.module.scss";
import SalesItem from "../../components/sales/salesItem";
import Pagination from "../../components/pagination";
import { getSalesProducts } from "../../store/products/actions";
import { connectContext } from "../../store";


const Sales = ({dispatch, sales, loading}) => {
  const [skip, setSkip] = React.useState(0);

  React.useEffect(() => {
    getSalesProducts(dispatch);
  }, [skip]);

  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <div className="container">

          <div className="breadcrumb">
            <Link href="/"><a>Главная</a></Link> / Акции
          </div>

          <div className={styles.sales}>
            <h3>Акции</h3>

            <div className={styles.itemsWrapper}>
              {sales?.map((item, index) =>
                <div className={styles.itemWrapper} key={index}>
                  <SalesItem item={item} />
                </div>
              )}
            </div>

            <Pagination
              currentPage={skip}
              changePage={setSkip}
              totalPages={10}
            />
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default connectContext(Sales, ({ products: { sales } }) => ({
  sales: sales.data || [],
  loading: sales.loading,
}));
