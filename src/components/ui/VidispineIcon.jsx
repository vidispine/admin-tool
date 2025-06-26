import SvgIcon from '@material-ui/core/SvgIcon';
// import { ReactComponent as headerLogo } from '../../assets/header-logo.svg';

function VidispineIcon(props) {
  return (
    // <SvgIcon {...props} component={headerLogo} viewBox="0 0 76.64 76.21">
    <SvgIcon {...props} data-name="Layer 1" viewBox="0 0 747.77 839.9">
      <defs>
        <style>
          {`.cls-1 {
        fill: url(#linear-gradient);
      }`}
        </style>
        <linearGradient
          id="linear-gradient"
          x1="0"
          y1="419.95"
          x2="747.77"
          y2="419.95"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#c4198b" />
          <stop offset=".34" stopColor="#ef4066" />
          <stop offset=".71" stopColor="#f68b1f" />
          <stop offset=".99" stopColor="#ffe300" />
        </linearGradient>
      </defs>
      <path
        className="cls-1"
        d="M192.89,835.33c-1.8,2.9-2.86,4.58-2.86,4.58,182.5-84.01,267.11-105.29,288.23-123.53,11.25-9.72,17.67-22.73,24.63-35.55,25.49-46.91,50.58-94.03,75.87-141.05l165.21-307.15c6.53-12.14,4.52-27.09-4.98-37.08L562.32,9.91c-16.27-17.09-44.82-11.2-52.99,10.93l-192.13,519.88h0c-28.57,77.31-57.14,154.63-85.72,231.94-8.21,22.21-19.81,50.91-38.59,62.67ZM248.33,635.62c-13.78,39.77-27.2,79.69-41.33,119.33-6.03,16.91-12.18,39.24-30.67,46.37-50.01,19.3-72.54-70.95-80.93-102.72C63.6,578.22,31.8,457.84,0,337.46c-.03-7.13,6.32-13.05,13.81-11.91l212.9,32.27c4.05.61,7.5,3.22,9.17,6.96,7.88,17.59,32.26,71.76,60.52,132.03-16.03,46.27-32.05,92.54-48.08,138.81Z"
      />
    </SvgIcon>
  );
}

export default VidispineIcon;
