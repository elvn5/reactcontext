import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cs from 'classnames';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import MainLayout from '../../layouts/MainLayout';
import ProductItem from '../../components/product/productItem';
import ProductPageInfo from '../../components/product/productPageInfo';
import NotFound from '../../public/icons/noproduct.svg'
import ArrowIcon from '../../public/icons/arrow-next.svg';
import styles from '../../styles/product/productPage.module.scss';
import { getProductsById } from '../../store/products/actions';
import ProductDetailLoader from "../../components/loader/ProductDetailLoader";


const leftSliderSettings = {
  dots: false,
  arrows: true,
  infinite: false,
  slidesToShow: 5,
  slidesToScroll: 1,
  vertical: true,
  verticalSwiping: true,
  centerMode: true,
  focusOnSelect: true,
};

const productSliderSettings = {
  dots: false,
  arrows: false,
  slidesToShow: 2.15,
  infinite: false,
  vertical: false,
  slidesToScroll: 1,
};

const ProductPage = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [product, setProduct] = React.useState({});
  const [slides, setSlides] = React.useState([]);
  const [textSwitch, setCurrentText] = React.useState(true);
  const [showComposition, setShowComposition] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const leftSliderRef = React.useRef();

  const handleSlideClick = index => {
    setCurrentSlide(index);
  };

  const rightSliderArrows = (next = false) => {
    if (next) {
      leftSliderRef.current.slickNext();

      if (currentSlide === slides.length - 1) {
        setCurrentSlide(0);
      } else {
        setCurrentSlide(prev => prev + 1);
      }

    } else {
      leftSliderRef.current.slickPrev();

      if (currentSlide === 0) {
        setCurrentSlide(slides.length - 1);
      } else {
        setCurrentSlide(prev => prev - 1);
      }
    }
  };

  const textToggleClassnames = React.useCallback(bool => cs({
    [styles.activeToggle]: textSwitch === bool,
    [styles.defaultToggle]: textSwitch !== bool,
  }), [textSwitch]);

  const onGetProduct = async () => {
    setLoading(true);
    const id = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
    const { data, success } = await getProductsById(id);

    if (success) {
      setSlides(data.gallery);
      setProduct(data);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    onGetProduct();
  }, []);

  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/"><a>Главная</a></Link> / Страница товара
          </div>
          {loading ? <ProductDetailLoader /> : null}
          {!loading ? (
            <div className={styles.content}>
              <div className={styles.flexContent}>
                <div className={styles.productData}>
                  <div className={styles.productPhoto}>
                    <div className={styles.leftSlider}>
                      <button
                        onClick={leftSliderRef.current?.slickPrev}
                        className={styles.topArrow}
                      >
                        <Image src={ArrowIcon} alt="arrow" />
                      </button>
                      <Slider ref={leftSliderRef} {...leftSliderSettings}>
                        {slides.map((slide, index) => (
                          <img
                            onClick={() => handleSlideClick(index)}
                            key={index}
                            src={slide.x_1C.url}
                          />
                        ))}
                      </Slider>
                      <button
                        onClick={leftSliderRef.current?.slickNext}
                        className={styles.bottomArrow}
                      >
                        <Image src={ArrowIcon} alt="arrow" />
                      </button>
                    </div>
                    <div className={styles.rightSlider}>
                      <button
                        onClick={rightSliderArrows}
                        className={styles.rightSliderArrowPrev}
                      >
                        <Image src={ArrowIcon} alt="arrow" />
                      </button>
                      <div className={styles.currentSlide}>
                        <img
                          src={
                            product.gallery?.length ?
                              product.gallery[currentSlide].x_1C.url
                              : NotFound.src
                          }
                          alt="product"
                        />
                      </div>
                      <button
                        onClick={() => rightSliderArrows(true)}
                        className={styles.rightSliderArrowNext}
                      >
                        <Image src={ArrowIcon} alt="arrow" />
                      </button>
                    </div>
                  </div>
                  <div className={styles.productRightMobile}>
                    <ProductPageInfo product={product} />
                  </div>
                  <div className={styles.productInfo}>
                    <div className={styles.toggleText}>
                    <span
                      className={textToggleClassnames(true)}
                      onClick={() => setCurrentText(true)}
                    >
                      Информация о товаре
                    </span>
                      <span
                        className={textToggleClassnames(false)}
                        onClick={() => setCurrentText(false)}
                      >
                      Инструкция
                    </span>
                    </div>
                    <div className={styles.characteristic}>
                      {
                        textSwitch ? (
                          <React.Fragment>
                            <h3>Характеристики</h3>
                            <div>
                              <div className={styles.characteristicItem}>
                                <span>Страна производителя:</span>
                                <span>{product.country}</span>
                              </div>

                              <div className={styles.characteristicItem}>
                                <span>Производитель:</span>
                                <span>{product.company}</span>
                              </div>

                              <div className={styles.characteristicItem}>
                                <span>Бренд:</span>
                                <span>{product.brand}</span>
                              </div>

                              <div className={styles.characteristicItem}>
                                <span>Форма выпуска:</span>
                                <span>{product.relizeForm}</span>
                              </div>

                              <span className={styles.warning}>Беречь от детей</span>

                            </div>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <h3>Инструкция</h3>
                            <div className={styles.productComposition}>
                              <p>{product.instructions}</p>
                            </div>
                          </React.Fragment>
                        )
                      }
                    </div>
                  </div>
                </div>
                <div className={styles.desktopRight}>
                  <ProductPageInfo product={product} />
                </div>
              </div>
              <div className={styles.productComposition}>
                <h3>Состав</h3>
                <p className={!showComposition ? styles.hideText : ''}>
                  {product.composition}
                </p>
                <span onClick={() => setShowComposition(!showComposition)}>
                {showComposition ? 'Скрыть' : 'Развернуть'}
              </span>
              </div>
            </div>
          ) : null}
        </div>

        <div className={styles.offersWrapper}>
          <div className="container">
            <div className={styles.offersContent}>
              <h3>С этим товаром покупают</h3>
              <div className={styles.buyWith}>
                <div>
                  {/*<ProductItem item={product} />*/}
                  {/*<ProductItem item={product} />*/}
                  {/*<ProductItem item={product} />*/}
                  {/*<ProductItem item={product} />*/}
                  {/*<ProductItem item={product} />*/}
                </div>
                <Slider {...productSliderSettings}>
                  {/*<ProductItem item={product} />*/}
                  {/*<ProductItem item={product} />*/}
                  {/*<ProductItem item={product} />*/}
                  {/*<ProductItem item={product} />*/}
                  {/*<ProductItem item={product} />*/}
                </Slider>
              </div>
              <h3>Похожие товары</h3>
              <div className={styles.similarOffers}>
                <div>
                  {/*<ProductItem item={product} />*/}
                  {/*<ProductItem item={product} />*/}
                  {/*<ProductItem item={product} />*/}
                  {/*<ProductItem item={product} />*/}
                  {/*<ProductItem item={product} />*/}
                </div>
                <Slider {...productSliderSettings}>
                  {/*<ProductItem item={product} />*/}
                  {/*<ProductItem item={product} />*/}
                  {/*<ProductItem item={product} />*/}
                  {/*<ProductItem item={product} />*/}
                  {/*<ProductItem item={product} />*/}
                </Slider>
              </div>
            </div>
          </div>
        </div>

      </div>
    </MainLayout>
  );
};

export default ProductPage;