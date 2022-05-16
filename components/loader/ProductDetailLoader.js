import * as React from 'react';
import ContentLoader from "react-content-loader";
import styles from '../../styles/loader/ProductDetailLoader.module.scss';


const ProductDetailLoader = () => {
  const [mobile, setMobile] = React.useState(false);

  const handleResize = () => {
    setMobile(window.innerWidth < 768);
  };

  React.useEffect(() => {
    window.addEventListener("resize",handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        <ContentLoader viewBox="0 0 468 384" width={'100%'}>
          {!mobile &&
          <React.Fragment>
            <rect x="0" y="42" rx="8" ry="8" width="52" height="52"/>
            <rect x="0" y="104" rx="8" ry="8" width="52" height="52"/>
            <rect x="0" y="166" rx="8" ry="8" width="52" height="52"/>
            <rect x="0" y="228" rx="8" ry="8" width="52" height="52"/>
            <rect x="0" y="290" rx="8" ry="8" width="52" height="52"/>
          </React.Fragment>
          }
          <rect x={mobile ? '0' : '76'} y="0" rx="8" ry="8" width={mobile ? '468' : '384'} height="384"/>
        </ContentLoader>
      </div>

      <div className={styles.description}>
        <ContentLoader viewBox="0 0 556 480" width={'100%'}>
          <rect x="0" y="0" rx="6" ry="6" width="320" height="18"/>

          <rect x="0" y="48" rx="8" ry="8" width="80" height="10"/>
          <rect x="0" y="77" rx="8" ry="8" width="530" height="10"/>
          <rect x="0" y="97" rx="8" ry="8" width="450" height="10"/>

          <rect x="0" y="147" rx="8" ry="8" width="530" height="10"/>
          <rect x="0" y="167" rx="8" ry="8" width="530" height="10"/>
          <rect x="0" y="187" rx="8" ry="8" width="350" height="10"/>

          <rect x="0" y="287" rx="8" ry="8" width="120" height="15"/>

          <rect x="0" y="333" rx="8" ry="8" width="56" height="56"/>
          <rect x="68" y="333" rx="8" ry="8" width="220" height="56"/>

          <rect x="0" y="440" rx="8" ry="8" width="40" height="40"/>
          <rect x="55" y="440" rx="8" ry="8" width="40" height="40"/>
          <rect x="110" y="440" rx="8" ry="8" width="40" height="40"/>
          <rect x="165" y="440" rx="8" ry="8" width="40" height="40"/>
        </ContentLoader>
      </div>

      <div className={styles.description}>
        <ContentLoader viewBox="0 0 556 480" width={'100%'}>
          <rect x="0" y="0" rx="6" ry="6" width="200" height="18"/>

          <rect x="0" y="39" rx="8" ry="8" width="260" height="10"/>
          <rect x="0" y="67" rx="8" ry="8" width="360" height="10"/>
          <rect x="0" y="95" rx="8" ry="8" width="220" height="10"/>
          <rect x="0" y="123" rx="8" ry="8" width="250" height="10"/>

          <rect x="0" y="230" rx="6" ry="6" width="200" height="18"/>

          <rect x="0" y="270" rx="8" ry="8" width="540" height="10"/>
          <rect x="0" y="290" rx="8" ry="8" width="540" height="10"/>
          <rect x="0" y="310" rx="8" ry="8" width="540" height="10"/>
          <rect x="0" y="330" rx="8" ry="8" width="540" height="10"/>
          <rect x="0" y="350" rx="8" ry="8" width="420" height="10"/>

          <rect x="0" y="400" rx="8" ry="8" width="120" height="12"/>
        </ContentLoader>
      </div>
    </div>
  );
};

export default ProductDetailLoader;
