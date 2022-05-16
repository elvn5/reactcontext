import * as React from 'react';
import Link from "next/link";

import AboutSidebar from "../../components/sidebar/aboutSidebar";
import HelpItem from "../../components/help/helpItem";
import styles from '../../styles/help/help.module.scss';
import MainLayout from "../../layouts/MainLayout";
import { getFaq } from "../../store/info/actions";
import { connectContext } from '../../store';


const HelpPage = ({ dispatch, faq, loading }) => {
  React.useEffect(() => {
    getFaq(dispatch);
  }, []);

  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/"><a>Главная /</a></Link> Помощь
          </div>

          <div className={styles.content}>
            <AboutSidebar />

            <div className={styles.faqWrapper}>
              <h3>Помощь</h3>
              {faq.map(item => (
                <HelpItem
                  question={item.title}
                  answer={item.body}
                  key={item._id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default connectContext(HelpPage, ({ info: { faq } }) => ({
  faq: faq.data || [],
  loading: faq.loading,
}));
