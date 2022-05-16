import * as React from "react";
import Link from "next/link";
import clsn from "classnames";
import moment from "moment";
import { useRouter } from "next/router";

import InfoModal from "../../components/modals/infoModal";
import MainLayout from "../../layouts/MainLayout";
import CartItem from "../../components/cart/cartItem";
import PhoneField from "../../components/phoneInput";
import styles from '../../styles/cart/cart.module.scss';
import { getItems } from "../../store/bucket/actions";
import { connectContext } from "../../store";
import { calculatePrice } from "../../utils";


const Cart = ({ bucket, loading, isLoggedIn, dispatch, user }) => {
  const [isOrder, setOrder] = React.useState(false);
  const [form, setForm] = React.useState({});
  const [prices, setPrices] = React.useState({});
  const timeFrom = moment('9:00', 'hh:mm:ss');
  const timeTo = moment('22:00', 'hh:mm:ss');
  const router = useRouter();

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleChangePhone = phone => {
    setForm({ ...form, phone });
  };

  const labelClassNames = (stateSection, value) => clsn({
    [styles.activeLabel]: form[stateSection] === value,
    [styles.defaultLabel]: form[stateSection] !== value,
  });

  const handleOrderSubmit = e => {
    e.preventDefault();
    createOrder(dispatch, form);
  };

  React.useEffect(() => {
    getItems(dispatch);
  }, []);

  React.useEffect(() => {
    setPrices(calculatePrice(bucket, isLoggedIn ? 0.02 : 0, user.account_type));
  }, [bucket]);

  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/"><a>Главная</a></Link> / Корзина
          </div>
          <div className={styles.content}>
            {!moment().isBetween(timeFrom, timeTo) ? (
              <div className={styles.modalWrapper}>
                <InfoModal
                  success={false}
                  isLink={true}
                  text={'Вы можете совершать заказы каждый день с 9:00 до 22:00'}
                />
              </div>
            ) : null}
            {bucket.length ? (
              <React.Fragment>
                <div className={styles.cart}>
                  <div className={styles.cartHeading}>
                    <h3>Корзина <span>({bucket.length} товаров)</span></h3>
                    <span onClick={() => router.push('/help')}>Условия доставки</span>
                  </div>
                  {bucket.map(item => <CartItem key={item._id} item={item} />)}
                </div>

                <div className={styles.right}>
                  <form action="#" onSubmit={handleOrderSubmit}>
                    {
                      isOrder ? (
                      <div className={styles.order}>
                        <h4>Оформление заказа</h4>

                        <input type="text" placeholder="Имя *" />
                        <input type="email" placeholder="e-mail" />
                        <PhoneField handleChange={handleChangePhone} />
                        <div className={styles.whatsApp}>
                          <input type="tel" placeholder="Номер WhatsApp" />
                        </div>
                        <input type="text" placeholder="Адрес доставки *" />
                        <textarea placeholder="Комментарий" rows="5" />

                        <span>Выбор оплаты</span>
                        <label
                          className={labelClassNames('payment', 'cash')}
                          htmlFor="cash"
                        >
                          Наличный
                        </label>
                        <input
                          type="radio"
                          name="payment"
                          id="cash"
                          value="cash"
                          onChange={handleChange}
                        />
                        <label
                          className={labelClassNames('payment', 'cashless')}
                          htmlFor="cashless"
                        >
                          Безналичный
                        </label>
                        <input
                          type="radio"
                          name="payment"
                          id="cashless"
                          value="cashless"
                          onChange={handleChange}
                        />
                        <label
                          className={labelClassNames('payment', 'pos')}
                          htmlFor="pos"
                        >
                          POS - терминал
                        </label>
                        <input
                          type="radio"
                          name="payment"
                          id="pos"
                          value="pos"
                          onChange={handleChange}
                        />

                        {
                          isLoggedIn ? (
                            <div className={styles.pointsPayment}>
                              <div>
                                <label
                                  className={form.payPoints
                                    ? styles.activeCheckbox
                                    : styles.defaultCheckbox
                                  }
                                  htmlFor="payPoints"
                                >
                                  Оплата баллами
                                </label>
                                <input
                                  type="checkbox"
                                  name="payPoint"
                                  id="payPoints"
                                  onChange={({ target: { checked } }) => setForm({
                                    ...form,
                                    payPoints: checked,
                                  })}
                                />
                                <p>
                                  На вашем счету Кол-во бонусов,
                                  доступно к списанию {user.bonus} баллов
                                </p>

                              </div>
                              <span className={styles.points}>{user.bonus}</span>
                            </div>
                          ) : null
                        }

                      </div>
                    ) : null
                    }

                    <div className={styles.total}>
                      <h4>Итого</h4>
                      <div className={styles.totalInfo}>
                        <span>Товаров в корзине:</span>
                        <span>{bucket.length}</span>
                      </div>
                      {
                        isLoggedIn ? (
                          <React.Fragment>
                            <div className={styles.totalInfo}>
                              <span>Сумма без скидки:</span>
                              <span>{prices.totalNoDiscount}</span>
                            </div>
                            <div className={styles.totalInfo}>
                              <span>Сумма со скидкой:</span>
                              {/*TODO pass here user's discount percent when it done*/}
                              <span>{prices.total}</span>
                            </div>
                            <div className={styles.totalInfo}>
                              <span className={styles.yellow}>Добавлено баллов:</span>
                              {/*TODO pass here user's bonus percent when it done*/}
                              <span>{Math.round(prices.total * 0.02)}</span>
                            </div>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <div className={styles.totalInfo}>
                              <span>Общая сумма:</span>
                              <span>{prices.totalNoDiscount}</span>
                            </div>
                          </React.Fragment>
                        )
                      }

                      {
                        isOrder ? (
                          <div className={styles.aboutDelivery}>
                            <p>
                              Оплата за доставку оплачивается отдельно
                            </p>
                            <Link href="/help">
                              <a>Подробнее</a>
                            </Link>
                          </div>
                        ) : null
                      }

                      {!isOrder ? (
                        <span
                          className={styles.orderSpan}
                          onClick={() => setOrder(true)}
                        >
                          Оформить заказ
                        </span>
                      ) : (
                        <div className={styles.orderButtons}>
                          <button type="submit">Заказать</button>
                          <button className={styles.cancel} onClick={() => setOrder(false)}>
                            Отменить оформление заказа
                          </button>
                        </div>
                      )}

                      {!isLoggedIn ? (
                        <React.Fragment>
                          <p className={styles.aboutLoginBonus}>
                            Если Вы авторизуетесь, то получите
                            <span> {Math.round(prices.total * 0.02)} баллов </span>
                            при покупке
                          </p>
                          <Link href="/login">
                            <a>Авторизоваться</a>
                          </Link>
                        </React.Fragment>
                      ) : null}
                    </div>
                  </form>

                </div>
              </React.Fragment>
            ) : (
              <div className={styles.emptyWrapper}>
                <p>В корзине пока нет товаров</p>
                <Link href="/"><a>На главную</a></Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default connectContext(Cart, ({bucket, user: { isLoggedIn, info } }) => ({
  user: info.data || {},
  bucket: bucket || [],
  isLoggedIn,
}));
