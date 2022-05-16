import * as React from "react";
import Link from 'next/link';
import { useRouter } from "next/router";

import NoResult from "../../components/emptyResults";
import SortBar from "../../components/sortBar";
import MainLayout from "../../layouts/MainLayout";
import Pagination from "../../components/pagination";
import ProductModal from "../../components/modals/productModal";
import styles from '../../styles/searchResult/searchResult.module.scss'
import ProductItem from "../../components/product/productItem";
import { connectContext } from "../../store";
import { getCatalogProducts } from "../../store/products/actions";


const SearchResult = ({ searchResult, dispatch, products }) => {
  const [sortState, setSortState] = React.useState({});
  const [displayInline, setDisplayInline] = React.useState(false);
  const [skip, setSkip] = React.useState(0);
  const [isModal, setModal] = React.useState(false);
  const router = useRouter();

  const fetchSearch = () => {
    const { search } = router.query;
    getCatalogProducts(dispatch, {
      ...sortState,
      ...(search ? { name: search } : {}),
      limit: 15,
      skip,
    });
  };

  React.useEffect(() => {
    if (router.query.search) {
      fetchSearch();
    }
  }, [sortState, skip, router.query]);

  return (
    <MainLayout>
      <div className={styles.wrapper}>

        {isModal && <ProductModal closeModal={() => setModal(false)} />}

        <div className="container">

          <div className="breadcrumb">
            <Link href="/"><a>Главная</a></Link> / Результаты поиска
          </div>

          <div className={styles.content}>
            <h3>Результаты поиска (2356)</h3>
            {
              searchResult.length ? (
                <React.Fragment>
                  <SortBar
                    sortState={sortState}
                    setSortState={setSortState}
                    displayInline={displayInline}
                    setDisplayInline={setDisplayInline}
                  />

                  <div className={styles.productsWrapper}>
                    {
                      searchResult.map(item => <ProductItem item={item} key={item._id}/>)
                    }
                  </div>

                  <Pagination
                    currentPage={skip}
                    changePage={setSkip}
                    totalPages={10}
                  />
                </React.Fragment>
              ) : <NoResult setModal={setModal}/>
            }
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default connectContext(SearchResult, ({ products: { catalog }, products }) => ({
  loading: catalog.loading,
  searchResult: catalog.data || [],
  products,
}));
