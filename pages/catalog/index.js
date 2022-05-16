import * as React from 'react';
import Link from "next/link";
import { useRouter } from "next/router";

import MainLayout from "../../layouts/MainLayout";
import SortBar from "../../components/sortBar";
import ProductItem from "../../components/product/productItem";
import Pagination from "../../components/pagination";
import NoResult from "../../components/emptyResults";
import ProductModal from "../../components/modals/productModal";
import { connectContext } from "../../store";
import { getCatalogProducts } from "../../store/products/actions";

import styles from '../../styles/catalog/catalog.module.scss';


const Catalog = ({ dispatch, products }) => {
  const [inline, setInline] = React.useState(false);
  const [sortState, setSortState] = React.useState({});
  const [skip, setSkip] = React.useState(0);
  const [isModal, setModal] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const { heading, ...query } = router.query;
    getCatalogProducts(dispatch, {
      ...sortState,
      ...query,
      limit: 15,
      skip,
    });
  }, [sortState, skip, router.query]);

  return (
    <MainLayout>
      <div className={styles.wrapper}>

        {isModal && <ProductModal closeModal={() => setModal(false)} />}

        <div className="container">
          <div className="breadcrumb">
            <Link href="/"><a>Главная</a></Link> / Каталог
          </div>

          <div className={styles.content}>
            <h3>{router.query.category || router.query.heading}</h3>
            {
              products.length ? (
                <React.Fragment>
                  <SortBar
                    sortState={sortState}
                    setSortState={setSortState}
                    setDisplayInline={setInline}
                    displayInline={inline}
                  />

                  <div className={styles.productsWrapper}>
                    {
                      products.map(item => <ProductItem key={item._id} item={item} inline={inline}/>)
                    }
                  </div>

                  <Pagination
                    currentPage={skip}
                    changePage={setSkip}
                    totalPages={10}
                  />
                </React.Fragment>
              ) : <NoResult setModal={setModal} />
            }

          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default connectContext(Catalog, ({ products: { catalog } }) => ({
  products: catalog.data || [],
}));