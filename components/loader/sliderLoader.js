import * as React from 'react';
import ContentLoader from "react-content-loader";

const SliderLoader = () => {
  return (
    <div>
      <ContentLoader width="100%" height="448px">
        <rect x="0" y="0" rx="16" ry="16" width="100%" height="448px" />
      </ContentLoader>
    </div>
  );
};

export default SliderLoader;
