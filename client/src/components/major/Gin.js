import React from 'react'

const Gin = ({used, dimension}) => {
  const isUsed = (used) => {
    return used ? "#4CA64C" : "#a9a9a9";
  };
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={dimension}
      height={dimension}
      viewBox="0 0 2048.0 2048.0"
    >
      {" "}
      <g id="document" transform="matrix(1,0,0,1,1024.0,1024.0)">
        {" "}
        <path
          d="M-1.13687e-13,-619.716 L-1.13687e-13,-774.645 C-427.604,-774.645 -774.645,-427.604 -774.645,-5.68434e-14 L-619.716,-5.68434e-14 C-619.716,-342.393 -342.393,-619.716 -1.13687e-13,-619.716 Z "
          fill={isUsed(used)}
          fill-opacity="1.00"
        />{" "}
        <path
          d="M1.13687e-12,-619.716 L1.13687e-12,-774.645 C427.604,-774.645 774.645,-427.604 774.645,5.68434e-14 L619.716,5.68434e-14 C619.716,-342.393 342.393,-619.716 1.13687e-12,-619.716 Z "
          fill={isUsed(used)}
          fill-opacity="1.00"
        />{" "}
        <path
          d="M1.13687e-12,619.716 L1.35443e-05,774.645 C427.604,774.645 774.645,427.604 774.645,1.25056e-12 L619.716,1.35443e-05 C619.716,342.393 342.393,619.716 1.13687e-12,619.716 Z "
          fill={isUsed(used)}
          fill-opacity="1.00"
        />{" "}
        <path
          d="M-2.27374e-13,619.716 L-1.35443e-05,774.645 C-427.604,774.645 -774.645,427.604 -774.645,1.3074e-12 L-619.716,1.35443e-05 C-619.716,342.393 -342.393,619.716 -2.27374e-13,619.716 Z "
          fill={isUsed(used)}
          fill-opacity="1.00"
        />{" "}
        <path
          d="M342.584,-82.7514 C342.584,-91.946 338.37,-96.5433 329.942,-96.5433 L8.13106,-96.5433 C-0.297316,-96.5433 -4.51151,-91.946 -4.51151,-82.7514 L-4.51151,78.1541 C-4.51151,87.3487 -0.297316,91.946 8.13106,91.946 L110.421,91.946 L110.421,189.639 C104.291,191.171 95.2882,192.32 83.4118,193.087 C71.5355,193.853 59.0844,194.236 46.0588,194.236 C11.579,194.236 -19.8358,189.255 -48.1858,179.295 C-76.5358,169.334 -100.863,155.35 -121.168,137.344 C-141.473,119.338 -157.18,97.501 -168.29,71.8328 C-179.4,46.1645 -184.955,17.623 -184.955,-13.7919 C-184.955,-47.5054 -178.826,-76.6216 -166.566,-101.141 C-154.307,-125.659 -137.45,-145.773 -115.996,-161.48 C-94.5419,-177.188 -70.023,-188.872 -42.4392,-196.534 C-14.8554,-204.197 14.6439,-208.028 46.0588,-208.028 C95.8628,-208.028 136.472,-204.58 167.887,-197.684 C199.302,-190.788 226.503,-182.743 249.489,-173.548 C253.32,-172.016 257.151,-172.016 260.982,-173.548 C264.814,-175.08 267.495,-177.762 269.028,-181.593 L312.702,-345.947 C314.234,-353.609 311.936,-358.972 305.806,-362.037 C282.82,-372.764 249.681,-382.534 206.39,-391.345 C163.098,-400.156 111.953,-404.562 52.9547,-404.562 C-16.0048,-404.562 -79.9838,-395.751 -138.982,-378.128 C-197.981,-360.505 -249.126,-334.453 -292.417,-299.974 C-335.709,-265.494 -369.805,-222.777 -394.707,-171.824 C-419.609,-120.871 -432.06,-62.0635 -432.06,4.5973 C-432.06,57.4662 -422.674,106.696 -403.902,152.285 C-385.129,197.875 -356.971,238.293 -319.426,273.539 C-281.116,310.318 -232.844,338.476 -174.612,358.015 C-116.379,377.553 -45.121,387.322 39.1628,387.322 C67.5128,387.322 95.6713,385.79 123.638,382.725 C151.605,379.66 178.614,375.638 204.666,370.657 C230.717,365.677 254.853,360.313 277.073,354.567 C299.293,348.82 318.449,343.265 334.539,337.901 C339.903,336.369 342.584,332.538 342.584,326.408 L342.584,-82.7514 Z "
          fill={isUsed(used)}
          fill-opacity="1.00"
        />{" "}
      </g>{" "}
    </svg>
  );
}

export default Gin