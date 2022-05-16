import * as React from 'react';
import styles from '../../styles/share/share.module.scss';
import { SOCIALS } from "../../utils";

import VkWhite from "../../public/icons/vk-white.svg";
import VkIcon from "../../public/icons/vk.svg";
import FaceBookWhite from "../../public/icons/facebook-white.svg";
import FaceBookIcon from "../../public/icons/facebook.svg";
import OkWhite from "../../public/icons/ok-white.svg";
import OkIcon from "../../public/icons/ok.svg";
import WhatsappWhite from "../../public/icons/whatApp-white.svg";
import WhatsappIcon from "../../public/icons/whatsapp-gray.svg";


const ShareButtons = () => {
  const [buttonImages, setButtonImages] = React.useState({
    vk: VkIcon.src,
    fb: FaceBookIcon.src,
    ok: OkIcon.src,
    wp: WhatsappIcon.src,
  });

  const handleShare = type => async () => {
    window.open(SOCIALS[type] + window.location);
  };

  const changeColor = (type, newSrc) => () => {
    setButtonImages({
      ...buttonImages,
      [type]: newSrc,
    });
  };

  return (
    <div className={styles.share}>
      <span>Поделиться</span>
      <button
        onClick={handleShare('vk')}
        onMouseOver={changeColor('vk', VkWhite.src)}
        onMouseOut={changeColor('vk', VkIcon.src)}
      >
        <img src={buttonImages.vk} alt="vk" />
      </button>
      <button
        onClick={handleShare('fb')}
        onMouseOver={changeColor('fb', FaceBookWhite.src)}
        onMouseOut={changeColor('fb', FaceBookIcon.src)}
      >
        <img src={buttonImages.fb} alt="facebook" />
      </button>
      <button
        onClick={handleShare('ok')}
        onMouseOver={changeColor('ok', OkWhite.src)}
        onMouseOut={changeColor('ok', OkIcon.src)}
      >
        <img src={buttonImages.ok} alt="ok" />
      </button>
      <button
        onClick={handleShare('wp')}
        onMouseOver={changeColor('wp', WhatsappWhite.src)}
        onMouseOut={changeColor('wp', WhatsappIcon.src)}
      >
        <img src={buttonImages.wp} alt="whatsapp" />
      </button>
    </div>
  )
};

export default ShareButtons;
