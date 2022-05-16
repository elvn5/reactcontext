import * as React from "react";
import Link from 'next/link';
import Image from 'next/image';
import clsn from 'classnames';
import { useRouter } from "next/router";

import HeaderProfileNav from "./headerProfileNav";
import FeedBack from "../modals/feedBack";
import Wholesalers from "../modals/wholesalers";
import CartModal from "../modals/cartModal";
import ProductModal from "../modals/productModal";
import HeaderMenu from "./headerMenu";


import Logo from '../../public/icons/logo.svg';
import SearchIcon from '../../public/icons/search.svg';
import CancelBlack from '../../public/icons/close-black.svg';
import MobileSearchIcon from '../../public/icons/mobile-search.svg';
import HeartIcon from '../../public/icons/heart-black.svg';
import LoginIcon from '../../public/icons/login.svg';
import CartIcon from '../../public/icons/cart.svg';
import MobileLogo from '../../public/icons/mobile-logo.png';
import UserHeader from '../../public/icons/user-header.svg';
import styles from '../../styles/header/header.module.scss';
import { connectContext } from "../../store";
import { loginByToken, logout } from "../../store/user/actions";
import { debounce, objectToQuery } from "../../utils";
import { getSearchSuggestions } from "../../store/products/actions";


const Header = ({ dispatch, user, isLoggedIn, searchSuggestions }) => {
  const [modal, setModal] = React.useState('');
  const [showUserNav, setShowUserNav] = React.useState(false);
  const [searchWord, setSearchWord] = React.useState('');
  const [showSearch, setShowSearch] = React.useState(false);
  const searchRef = React.useRef(null);

  const router = useRouter();

  const logoutHandler = () => {
    logout(dispatch);
  };

  const searchChange = debounce(({ target: { value } }) => {
    setSearchWord(value);
  });

  const searchHandler = e => {
    e.preventDefault();
    router.push(`/search-result?${objectToQuery({ search: searchWord })}`);
  };

  const goToSearch = (e, search) => {
    e.stopPropagation();
    router.push(`/search-result?${objectToQuery({ search })}`);
  };

  React.useEffect(()=>{
    const outsideClicker = ({ target }) => {
      if(searchRef.current && !searchRef.current.contains(target) && window.innerWidth > 992){
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', outsideClicker);
    return () => {
      document.removeEventListener('mousedown', outsideClicker);
    }
  },[searchRef]);

  React.useEffect(() => {
    if (searchWord.length) {
      getSearchSuggestions(dispatch, { name: searchWord });
    }
  }, [searchWord]);

  React.useEffect(() => {
    if (
      !Object.keys(user).length &&
      router.pathname !== '/login' &&
      router.pathname !== '/register'
    ) {
      loginByToken(dispatch);
    }
  }, [user]);

  const currentModal = () => {
    switch (modal) {
      case 'feedback':
        return (
          <FeedBack
            closeModal={() => setModal('')}
            showModal={modal}
          />
        )
      case 'wholesalers':
        return (
          <Wholesalers
            closeModal={() => setModal('')}
            showModal={modal}
          />
        )
      case 'cart':
        return (
          <CartModal
            closeCart={() => setModal('')}
          />
        )
      case 'menu':
        return (
          <HeaderMenu
            closeMenu={() => setModal('')}
            openModal={setModal}
            showModal={modal}
          />
        )
      case 'notFound':
        return (
          <ProductModal closeModal={() => setModal('')}/>
        )
      default:
        return null
    }
  };

  return (
    <React.Fragment>
      {currentModal()}
      <header className={styles.header}>
        <div className={styles.toplineWrapper}>
          <div className="container">
            <div className={styles.headerTopline}>
              <div className={styles.left}>
                <ul>
                  <li>
                    <Link href="/about">
                      <a>О нас</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/help">
                      <a>Помощь</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/pharmacy">
                      <a>Филиалы</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contacts">
                      <a>Контакты</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={styles.right}>
                <ul>
                  <li>
                    <Link href="tel:+996 000 00 00 00">
                      <a>
                        <span>Тел: </span>
                        +996 000 00 00 00
                      </a>
                    </Link>
                  </li>
                  <li className={styles.line} />
                  <li>
                    <span onClick={() => setModal('wholesalers')}>
                      Оптовикам
                    </span>
                  </li>
                  <li>
                    <button onClick={() => setModal('feedback')}>
                      Обратная связь
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.mobileBurgerLogo}>
              <div
                className={styles.hamburger}
                onClick={() => setModal('menu')}
              />
              <div className={styles.mobileLogo}>
                <img
                  src={MobileLogo.src}
                  alt="logo"
                  onClick={() => router.push('/')}
                />
              </div>
            </div>
            <div>
              <div className={styles.desktopLogo}>
                <Image
                  src={Logo}
                  alt="logo"
                  onClick={() => router.push('/')}
                />
              </div>
            </div>
            <div ref={searchRef} className={styles.headerSearch}>
              <form action="#" onSubmit={searchHandler}>
                <input
                  type="text"
                  placeholder='Поиск'
                  onChange={searchChange}
                  onFocus={() => setShowSearch(true)}
                />
                <button>
                  <Image src={SearchIcon} alt="search" />
                </button>
              </form>
              {
                searchWord.length && showSearch && searchSuggestions.length ? (
                  <div className={styles.searchSuggestion}>
                    <ul className={styles.inner}>
                      {
                        searchSuggestions.map(item => (
                          <li
                            className={styles.suggestion}
                            key={item}
                            onClick={e => goToSearch(e, item)}
                          >
                            {item}
                          </li>
                        ))
                      }
                    </ul>
                    <span
                      className={styles.notFound}
                      onClick={() => {
                        setModal('notFound');
                        setShowSearch(false);
                      }}
                    >
                        Не нашли то, что искали?
                      </span>
                  </div>
                ) : null
              }
            </div>

            <div className={clsn({[styles.actionsWrapper]: true, [styles.actionWrapperLong] : isLoggedIn})}>
              {
                isLoggedIn ? (
                  <div className={clsn(styles.headerActions, styles.favoriteWrapper)}>
                    <Image
                      src={HeartIcon}
                      alt="heart"
                      onClick={() => router.push('/cart')}
                    />
                    <Link href="/favorite">
                      <a>Избранное</a>
                    </Link>
                  </div>
                ) : null
              }
              <div className={styles.line} />
              <div
                className={clsn(styles.headerActions, styles.mobileSearch)}
                onClick={() => setShowSearch(true)}
              >
                <Image src={MobileSearchIcon} alt="icon" />
              </div>
              <div className={styles.headerActions}>
                {user?.data ? (
                  <React.Fragment>
                    <Image
                      src={UserHeader}
                      alt="user"
                      onClick={() => setShowUserNav(!showUserNav)}
                    />
                    <span onClick={() => setShowUserNav(!showUserNav)}>
                      {user.data.firstname}
                    </span>
                    {showUserNav ?
                      <HeaderProfileNav
                        closeNav={() => setShowUserNav(false)}
                        logout={logoutHandler}
                      />
                      : null}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Image
                      src={LoginIcon}
                      alt="icon"
                      onClick={() => router.push('/login')}
                    />
                    <Link href="/login">
                      <a>Войти</a>
                    </Link>
                  </React.Fragment>
                )}
              </div>
              <div className={styles.line} />
              <div
                className={styles.headerActions}
                onClick={() => setModal('cart')}
              >
                <Image src={CartIcon} alt="icon" />
                <span>Корзина</span>
              </div>
            </div>
          </div>
        </div>
        {
          showSearch ? (
            <div className={styles.mobileSearchBlock}>
              <div className="container">
                <form action="#">
                  <img className={styles.searchIconMobile} src={SearchIcon.src} alt="search" />
                  <img
                    className={styles.closeSearchMobile}
                    src={CancelBlack.src}
                    onClick={() => setShowSearch(false)}
                    alt="close"
                  />
                  <input type="text" onChange={searchChange} />
                </form>
                {
                  searchWord.length && searchSuggestions.length ? (
                    <div className={styles.searchSuggestion}>
                      <ul className={styles.inner}>
                        {
                          searchSuggestions.map(item => (
                            <li
                              className={styles.suggestion}
                              key={item}
                              onClick={e => goToSearch(e, item)}
                            >
                              {item}
                            </li>
                          ))
                        }
                      </ul>
                      <span
                        className={styles.notFound}
                        onClick={() => {
                          setModal('notFound');
                          setShowSearch(false);
                        }}
                      >
                        Не нашли то, что искали?
                      </span>
                    </div>
                  ) : null
                }
              </div>
            </div>
          ) : null
        }
      </header>
    </React.Fragment>
  );
};

export default connectContext(Header, ({ user: { info, isLoggedIn }, products: { searchSuggestions } }) => ({
  user: info,
  isLoggedIn,
  searchSuggestions: searchSuggestions.data || [],
}));
