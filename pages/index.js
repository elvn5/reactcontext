import * as React from "react";

import Banner from "../components/banner/Banner";
import Bestsellers from "../components/bestsellers/Bestsellers";
import MainLayout from "../layouts/MainLayout";
import NewsWrapper from "../components/news/newsWrapper";
import Promotions from "../components/promotions/Promotions";
import RequestCall from "../components/modals/requestCall";


function Home() {
  const [modal, setModal] = React.useState(false);
    return (
      <>
        <RequestCall setModal={setModal} showModal={modal}/>
        <MainLayout>
            <Banner />
            <Bestsellers />
            <Promotions />
            <NewsWrapper />
        </MainLayout>
        </>
    );
}

export default Home;
