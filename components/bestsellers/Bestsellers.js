import * as React from "react";
import { useRouter } from "next/router";

import ProductLoader from "../loader/ProductLoader";
import ProductItem from "../product/productItem";
import styles from '../../styles/bestsellers/bestsellers.module.scss';
import { connectContext } from '../../store';
import { getTopProducts } from '../../store/products/actions';
import { getItems } from "../../store/bucket/actions";


const Bestsellers = ({ dispatch, bestsellers, loading }) => {
  const router = useRouter();

  const goToSeeAll = () => {
    router.push('/catalog?heading=Хит%20продаж&topSelling=true');
  };

  React.useEffect(() => {
    getItems(dispatch);
    getTopProducts(dispatch, { limit: 10 });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <h3>Хиты продаж</h3>
        <div className={styles.content}>
          {loading ?
            [...Array(10).keys()].map(item => (
              <div className={styles.loaderWrapper} key={item} >
                <ProductLoader />
              </div>
            )) : null}
          {bestsellers?.map(item => <ProductItem item={item} key={item._id} />)}
        </div>
        <button className={styles.seeAll} onClick={goToSeeAll}>Посмотреть все</button>
      </div>
    </div>
  );
};

export default connectContext(Bestsellers, ({ products: { top } }) => ({
  bestsellers: top.data || [],
  loading: top.loading,
}));
