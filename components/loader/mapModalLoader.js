import * as React from 'react';
import ContentLoader from "react-content-loader";

const MapModalLoader = () => {
  return (
    <div>
      <ContentLoader>
        <rect x="0" y="0" rx="8" ry="8" width="70px" height="18px" />
        <rect x="0" y="25" rx="8" ry="8" width="100px" height="18x" />
        <rect x="0" y="60" rx="8" ry="8" width="200px" height="18px" />
        <rect x="0" y="90" rx="8" ry="8" width="100px" height="14px" />
        <rect x="0" y="112" rx="8" ry="8" width="80px" height="14px" />
        <rect x="0" y="134" rx="8" ry="8" width="80px" height="14px" />
        <rect x="0" y="150" rx="8" ry="8" width="80px" height="14px" />
      </ContentLoader>
    </div>
  );
};

export default MapModalLoader;
