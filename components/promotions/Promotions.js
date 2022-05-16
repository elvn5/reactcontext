import * as React from 'react';
import clsn from 'classnames';
import Link from "next/link";
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from "next/router";

import SaleImage from '../../public/saleImage.png'
import MapIMG from '../../public/map.png';
import OrderIMG from '../../public/order.png';
import DeliveryIMG from '../../public/delivery.png';
import styles from '../../styles/promotions/promotion.module.scss';
import { NextArrow, PrevArrow } from "./Arrows";
import { connectContext } from '../../store';
import { getSalesProducts } from '../../store/products/actions';


const settings = {
  dots: true,
  infinite: true,
  autoplaySpeed: 4500,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: true,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  className: clsn(styles.slider, 'promotions-slider'),
};

const mobileSliderSettings = {
  dots: true,
  infinite: true,
  autoplaySpeed: 4500,
  speed: 500,
  slidesToShow: 1.15,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
  className: styles.mobileSlider,
  centerMode: true,
};

const Promotions = ({ dispatch, sales, loading }) => {
  const router = useRouter();

  const goToPromotion = id => {
    router.push(`/product/${id}`);
  };

  const goToSeeAll = () => {
    router.push('/sales');
  };

  React.useEffect(() => {
    getSalesProducts(dispatch);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.sliderWrapper}>
            <h3>Акции</h3>

            <Slider {...settings}>
              {sales?.map((item, index) => (
                <div className={styles.sliderItem} key={index}>
                  <div onClick={() => goToPromotion(item._id)}>
                    <img src={item.url} />
                  </div>
                </div>
              ))}
            </Slider>

            <Slider {...mobileSliderSettings}>
              {sales?.map((item, index) => (
                <div className={styles.sliderItem} key={index}>
                  <div onClick={() => goToPromotion(item._id)}>
                    <img src={SaleImage.src} />
                  </div>
                </div>
              ))}
            </Slider>

            <button className={styles.seeAll} onClick={goToSeeAll}>Посмотреть все</button>
          </div>

          <div className={styles.questionsWrapper}>
            <Link href="/help">
              <div>
                <Image src={MapIMG} alt="map" />
              </div>
            </Link>
            <Link href="/help">
              <div>
                <Image src={OrderIMG} alt="order" />
              </div>
            </Link>
            <Link href="/help">
              <div>
                <Image src={DeliveryIMG} alt="delivery" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connectContext(Promotions,  ({ products: { sales } }) => ({
  sales: sales.data || [],
  loading: sales.loading,
}));
