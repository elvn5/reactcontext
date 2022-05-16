import * as React from 'react';
import Link from 'next/link';
import Image from "next/image";
import Slider from 'react-slick';
import AboutSlide from '../../public/about.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import MainLayout from "../../layouts/MainLayout";
import AboutSidebar from "../../components/sidebar/aboutSidebar";
import styles from '../../styles/about/about.module.scss';
import { getAbout } from '../../store/info/actions';
import { connectContext } from '../../store';


const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  autoplaySpeed: 4000,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true
}

const AboutUs = ({ dispatch, about, loading }) => {
  React.useEffect(() => {
    getAbout(dispatch);
  }, []);

  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">
              <a>Главная</a></Link> / О нас
          </div>
          <div className={styles.content}>
            <AboutSidebar />

            <div className={styles.about}>
              <h3>О нас</h3>

              <Slider {...settings}>
                {about[0]?.gallery.map(item => <img src={item.url} alt="about slide" />)}
              </Slider>

              <p>{about[0]?.body}</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default connectContext(AboutUs, ({ info: { about } }) => ({
  about: about.data || {},
  loading: about.loading,
}));
