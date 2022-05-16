import * as React from 'react';
import ContentLoader from "react-content-loader";


const NewsLoader = ({ width = 25 }) => {

    let styles = {
        width: `calc(${width}% - 30px)`,
        borderRadius: '16px',
        margin: '14px 4px 0 4px',
        backgroundColor: '#fff',
    }
    return (
        <div style={styles}>
            <ContentLoader viewBox="0 0 286 300">
                <rect x="0" y="0" rx="8" ry="8" width="286" height="180"/>
                <rect x="10" y="195" rx="3" ry="3" width="246" height="10"/>
                <rect x="10" y="215" rx="3" ry="3" width="266" height="10"/>
                <rect x="10" y="235" rx="3" ry="3" width="220" height="10"/>
                <rect x="10" y="265" rx="5" ry="5" width="90" height="12"/>
            </ContentLoader>
        </div>
    );
};

export default NewsLoader;
