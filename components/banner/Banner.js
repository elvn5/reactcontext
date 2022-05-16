import * as React from 'react';
import Slider from 'react-slick';
import styles from '../../styles/banner/banner.module.scss';
import { getBanners } from '../../store/info/actions';
import { connectContext } from '../../store';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SliderLoader from "../loader/sliderLoader";


const settings = {
  dots: true,
  infinite: true,
  autoplaySpeed: 4000,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
  className: styles.sliderWrapper,
}

function Banner({ dispatch, banners, loading }) {
  React.useEffect(() => {
    getBanners(dispatch, {});
  }, []);

  return (
    <div className={styles.bannerWrapper}>
      <div className="container">
        {loading ? <SliderLoader /> : null}
        <Slider {...settings}>
          {banners?.map((item, idx) =>
            <div key={idx} className={styles.slideItem}>
              <img alt={item.title} src={item.banner?.url} key={item._id} />
            </div>
          )}
        </Slider>
      </div>
    </div>
  );
}

export default connectContext(Banner, ({ info: { banners } }) => ({
  banners: banners.data || [],
  loading: banners.loading,
}));
