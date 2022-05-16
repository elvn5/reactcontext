import * as React from "react";
import Link from "next/link";

import MainLayout from "../../layouts/MainLayout";
import ProfileSidebar from "../../components/sidebar/profileSiderbar";
import ProductItem from "../../components/product/productItem";
import styles from '../../styles/favorite/favorite.module.scss';
import { connectContext } from "../../store";
import { getProductsById } from "../../store/products/actions";


const FavoritePage = ({ favorites }) => {
  const [products, setProducts] = React.useState([]);

  const onGetProduct = async id => {
    const { data, success } = await getProductsById(id);

    if (success) {
      return data;
    }

    return {};
  }

  React.useEffect(() => {
    Promise.all(favorites.map(x => onGetProduct(x)))
      .then(res => {
        setProducts(res);
      });
  }, [favorites]);

  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/"><a>Главная</a></Link> / Избранное
          </div>
          <div className={styles.content}>
            <ProfileSidebar />
            <div className={styles.favorites}>
              <h3>Избранное</h3>
              <div className={styles.itemsWrapper}>
                {products.map(item =>
                    <ProductItem item={item} key={item._id} isFav={true} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default connectContext(FavoritePage, ({ user: { info } }) => ({
  favorites: info.data?.favorite_medicines || [],
}));
