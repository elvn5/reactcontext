import * as React from 'react';
import ContentLoader from "react-content-loader";


const ProductLoader = () => {
    let styles = {
        width: "100%",
        borderRadius: '5px',
        backgroundColor: '#fff'
    }

    return (
        <div style={styles}>
            <ContentLoader viewBox="0 0 224 390">
                <rect x="0" y="0" rx="8" ry="8" width="224" height="216"/>
                <rect x="10" y="250" rx="3" ry="3" width="204" height="10"/>
                <rect x="40" y="270" rx="3" ry="3" width="144" height="10"/>
                <rect x="40" y="302" rx="5" ry="5" width="60" height="15"/>
                <rect x="110" y="302" rx="5" ry="5" width="60" height="15"/>

                <rect x="8" y="337" rx="10" ry="10" width="40" height="40"/>
                <rect x="100" y="337" rx="10" ry="10" width="100" height="40"/>
            </ContentLoader>
        </div>
    );
};

export default ProductLoader;
