import Image from 'next/image';
import Link from 'next/link';

import MainLayout from "../layouts/MainLayout";
import Image404 from '../public/icons/404.svg';
import styles from '../styles/404/404.module.scss';


function Page404() {
    return (
        <MainLayout>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <h3>Ошибка</h3>
                    <Image src={Image404} alt="404" />
                    <h4>Страница не найдена</h4>
                    <Link href="/">
                        <a>На главную</a>
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
}

export default Page404;
