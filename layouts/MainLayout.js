import * as React from 'react';

import Header from "../components/header/header";
import Footer from "../components/footer/footer";


function MainLayout({ children }) {
    return (
        <React.Fragment>
            <Header />
            {children}
            <Footer />
        </React.Fragment>
    );
}

export default MainLayout;
