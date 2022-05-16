import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import cs from "classnames";
import { useRouter } from "next/router";

import ArrowIcon from '../../public/icons/dropdown-arrow.svg';
import CloseIcon from '../../public/icons/close-modal.svg';
import styles from '../../styles/header/headerMenu.module.scss';
import { objectToQuery } from "../../utils";


const categories = [
  {
    title: 'Витамины',
    subcategories: [
      {
        title: 'Витамин С',
        subcategories: [
          { title: 'Витамин C 900 г' },
          { title: 'Витамин C 1000 г' },
          { title: 'Витамин C 1500 г' },
        ]
      },
      {
        title: 'Витамин B',
        subcategories: [
          { title: 'Витамин B 900 г' },
          { title: 'Витамин B 1000 г' },
          { title: 'Витамин B 1500 г' }
        ]
      }
    ]
  },
  {
    title: 'Сиропы',
    subcategories: [
      {
        title: 'Сироп от кашля',
        subcategories: [
          { title: 'Детский' },
          { title: 'Взрослый' }
        ]
      },
      { title: 'Сироп для детей' }
    ]
  },
  {
    title: 'Лекарственные средства'
  }
];

const HeaderMenu = ({ closeMenu, openModal }) => {
  const [title, setTitle] = React.useState('Меню');
  const [categoryNesting, setCategoryNesting] = React.useState([]);
  const [currentCategory, setCurrentCategory] = React.useState([]);
  const [showMobileCategories, setShowMobileCategories] = React.useState(false);
  const [isClose, setIsClose] = React.useState(false);

  const changeCategory = (index = 0, next = true) => {
    if (next) {
      setCategoryNesting([...categoryNesting, index]);
    } else {
      setCategoryNesting(categoryNesting.slice(0, -1));
    }
  };

  const titleClassnames = React.useCallback(() => cs({
    [styles.title]: true,
    [styles.titleBack]: categoryNesting.length
  }), [categoryNesting.length]);

  const openModals = modalName => {
    closeMenu('');
    openModal(modalName);
  };

  const handleClose = () => {
    setIsClose(true);
    setTimeout(() => {
      closeMenu('');
    }, 500);
  };

  const contentClassnames = React.useCallback(() => {
    return cs({
      [styles.content]: true,
      [styles.closeContent]: isClose,
    })
  }, [isClose]);

  React.useEffect(() => {
    setCurrentCategory(categories);
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'auto';
    }
  }, []);

  React.useEffect(() => {
    if (categoryNesting.length) {
      let currentCategory = {};

      categoryNesting.forEach(item => {
        if (!currentCategory.subcategories?.length) {
          currentCategory = categories[item];
        } else if (currentCategory.subcategories[item]?.subcategories) {
          currentCategory = currentCategory.subcategories[item];
        } else {
          setCategoryNesting(categoryNesting.slice(0, -1));
        }
      });

      setTitle(currentCategory.title);
      setCurrentCategory(currentCategory.subcategories);
      setShowMobileCategories(true);
    } else {

      setTitle('Категории');
      setCurrentCategory(categories);
      setShowMobileCategories(false);
    }
  }, [categoryNesting]);

  return (
    <div className={styles.wrapper}>
      <div className={contentClassnames()}>

        <div className={styles.closeBtn} onClick={handleClose}>
          <Image src={CloseIcon} alt="close" />
        </div>

        <div className={styles.desktopMenu}>
          <div
            className={titleClassnames()}
            onClick={() => changeCategory(0, false)}
          >
            <h4>{title}</h4>
          </div>
          <Menu
            categories={currentCategory}
            changeCategory={changeCategory}
            setTitle={setTitle}
          />
        </div>

        <div className={styles.mobileMenu}>
          <div
            className={titleClassnames()}
            onClick={() => changeCategory(0, false)}
          >
            <h4>Меню</h4>
          </div>
          {showMobileCategories ? (
            <Menu
              categories={currentCategory}
              changeCategory={changeCategory}
              setTitle={setTitle}
              isMobile={true}
              title={title}
            />
          ) : (
            <React.Fragment>
              <div className={styles.mobileNav}>
                <div
                  className={styles.navItem}
                  onClick={() => setShowMobileCategories(true)}
                >
                  <span>Категории</span>
                  <Image src={ArrowIcon} alt="arrow" />
                </div>
                <div className={styles.navItem}>
                  <Link href="about"><a>О нас</a></Link>
                </div>
                <div className={styles.navItem}>
                  <Link href="/help"><a>Помощь</a></Link>
                </div>
                <div className={styles.navItem}>
                  <Link href="/pharmacy"><a>Филиалы</a></Link>
                </div>
                <div className={styles.navItem}>
                  <Link href="/contacts"><a>Контакты</a></Link>
                </div>
              </div>
              <div className={styles.modalsBtn}>
                <button onClick={() => openModals('feedback')}>
                  Обратная связь
                </button>
                <button onClick={() => openModals('wholesalers')}>
                  Оптовикам
                </button>
                <div className={styles.phone}>
                  <Link href="tel:+996000000000">
                    <a>
                      <span>Тел: </span>
                      <span>+996 000 000 000</span>
                    </a>
                  </Link>
                </div>
              </div>
            </React.Fragment>
          )
          }
        </div>
      </div>
    </div>
  );
};

function Menu ({
  categories,
  changeCategory,
  setTitle,
  title,
  isMobile = false,
}) {
  const router = useRouter();
  const handleClick = (e, title, index, next) => {
    e.stopPropagation();
    setTitle(title);
    changeCategory(index, next);
  };

  const handleSearch = title => {
    router.push(`/catalog?${objectToQuery({ category: title })}`)
  };

  return (
    <div className={styles.menu}>
      {isMobile ? <h3>{title || 'Категории'}</h3> : null}
      <ul>
        {categories.map(({ title, subcategories }, idx) => (
          <li key={idx}
            onClick={() => handleSearch(title)}
          >
            <span>{title}</span>
            {subcategories ?
              <Image
                src={ArrowIcon}
                alt="arrow"
                onClick={e => handleClick(e, title, idx, true)}
              /> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(HeaderMenu);
