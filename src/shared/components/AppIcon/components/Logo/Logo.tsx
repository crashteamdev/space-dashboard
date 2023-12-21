import React from "react";

type Props = {
    className?: string;
    color?: string;
};

export const Logo: React.FC<Props> = ({ className = "", color = "#252129"}) => (
    <svg className={className} width="148" height="27" viewBox="0 0 148 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_225_327)">
            <path opacity="0.3" d="M14.7823 5.62542L18.8463 12.7624L22.9205 5.60772C23.3188 4.90492 24.2035 4.66264 24.8965 5.0665C25.1332 5.20441 25.3171 5.39973 25.4404 5.62542C28.99 11.8591 32.5387 18.0855 36.0887 24.3194C36.4902 25.0222 36.2536 25.9218 35.5606 26.3286C35.3312 26.4634 35.0809 26.5271 34.8336 26.5269V26.5301C20.232 26.5301 17.4605 26.5301 2.85887 26.5301C2.05616 26.5301 1.40527 25.8702 1.40527 25.0563C1.40527 24.7514 1.49644 24.4679 1.65324 24.2329C5.1889 18.024 8.72676 11.8166 12.2622 5.60772C12.6606 4.90492 13.5454 4.66264 14.2384 5.0665C14.475 5.20441 14.6588 5.39973 14.7823 5.62542Z" fill={color}/>
            <path d="M120.885 8.44629H127.006C129.12 8.44629 130.881 9.1981 132.291 10.701C133.714 12.1895 134.427 14.0424 134.427 16.2602C134.427 18.4776 133.714 20.3305 132.291 21.819C130.881 23.3223 129.12 24.0737 127.006 24.0737H120.885V8.44629ZM123.923 21.1269H127.006C128.342 21.1269 129.428 20.6805 130.265 19.7874C131.101 18.8645 131.52 17.6887 131.52 16.2602C131.52 14.8162 131.101 13.6482 130.265 12.7551C129.428 11.8473 128.342 11.3932 127.006 11.3932H123.923V21.1269ZM145.898 15.9698C147.249 16.7586 147.924 17.9493 147.924 19.542C147.924 20.8663 147.461 21.953 146.537 22.8012C145.612 23.6496 144.474 24.0737 143.124 24.0737H136.584V8.44629H142.661C143.968 8.44629 145.076 8.8632 145.986 9.69646C146.896 10.5299 147.352 11.5793 147.352 12.8442C147.352 14.1391 146.867 15.1809 145.898 15.9698ZM142.661 11.3263H139.623V14.7644H142.661C143.131 14.7644 143.524 14.6006 143.839 14.2731C144.155 13.9457 144.313 13.5364 144.313 13.0455C144.313 12.5542 144.159 12.145 143.85 11.8175C143.542 11.4901 143.146 11.3263 142.661 11.3263ZM139.623 21.1938H143.124C143.638 21.1938 144.063 21.019 144.401 20.6691C144.738 20.3195 144.907 19.8767 144.907 19.3411C144.907 18.82 144.738 18.3846 144.401 18.035C144.063 17.6852 143.638 17.5104 143.124 17.5104H139.623V21.1938Z" fill={color}/>
            <path d="M43.0242 14.4289C43.0242 14.95 42.841 15.3963 42.4737 15.7685C42.1068 16.1405 41.6664 16.3267 41.1527 16.3267C40.6389 16.3267 40.1985 16.1405 39.8314 15.7685C39.4645 15.3963 39.2812 14.95 39.2812 14.4289C39.2812 13.9081 39.4645 13.4616 39.8314 13.0894C40.1985 12.7174 40.6389 12.5312 41.1527 12.5312C41.6664 12.5312 42.1068 12.7174 42.4737 13.0894C42.841 13.4616 43.0242 13.9081 43.0242 14.4289ZM43.0242 22.4213C43.0242 22.9424 42.841 23.3888 42.4737 23.7608C42.1068 24.1327 41.6664 24.3189 41.1527 24.3189C40.6389 24.3189 40.1985 24.1327 39.8314 23.7608C39.4645 23.3888 39.2812 22.9424 39.2812 22.4213C39.2812 21.9002 39.4645 21.4539 39.8314 21.0819C40.1985 20.7097 40.6389 20.5235 41.1527 20.5235C41.6664 20.5235 42.1068 20.7097 42.4737 21.0819C42.841 21.4539 43.0242 21.9002 43.0242 22.4213Z" fill={color}/>
            <path d="M14.7823 5.62539L18.8463 12.7626L22.9203 5.6075C23.3188 4.90507 24.2035 4.6626 24.8967 5.06647C25.1332 5.20438 25.3171 5.39988 25.4404 5.62539L25.4648 5.66788L21.166 13.2175L21.1662 13.2289C21.1662 13.8762 20.9063 14.4638 20.4866 14.8893L20.4839 14.8922C20.064 15.3177 19.485 15.5811 18.8463 15.5811C18.2077 15.5811 17.6283 15.3177 17.2087 14.8922L17.2057 14.8893C16.7863 14.4638 16.5263 13.8762 16.5263 13.2289L16.5265 13.2173L13.6316 8.13299L13.5192 8.13634L13.4079 8.13318L3.85367 24.9068L3.89209 25.0404C3.9419 25.2359 3.96874 25.4344 3.96874 25.6318C3.96874 25.9497 3.90606 26.2531 3.79246 26.5301H2.85887C2.05597 26.5301 1.40527 25.8701 1.40527 25.0563C1.40527 24.7514 1.49644 24.4679 1.65324 24.2329C5.1889 18.024 8.72676 11.8166 12.2624 5.6075C12.6604 4.90507 13.5454 4.6626 14.2384 5.06647C14.475 5.20438 14.6588 5.39988 14.7823 5.62539Z" fill={color}/>
            <path fillRule="evenodd" clipRule="evenodd" d="M26.1468 2.96054C26.9872 2.92848 27.6589 2.2378 27.6589 1.36764C27.6589 0.497482 26.9551 -0.226562 26.0866 -0.226562C25.2182 -0.226562 24.5144 0.754672 24.5144 1.36764C24.5144 1.98061 24.6228 2.03279 24.807 2.2939L19.4248 11.7462C19.2456 11.6744 19.0503 11.6349 18.8459 11.6349C18.6415 11.6349 18.4463 11.6744 18.2673 11.7462L15.0581 6.11037C15.0796 6.00507 15.091 5.89586 15.091 5.78422C15.091 4.90381 14.3872 4.19002 13.5188 4.19002C12.6505 4.19002 11.9465 4.90381 11.9465 5.78422C11.9465 5.89418 11.9577 6.00172 11.9787 6.10534C8.57352 12.0846 5.16671 18.0628 1.76156 24.0421C1.72406 24.0393 1.68638 24.0378 1.64852 24.0378C0.779995 24.0378 0.0761719 24.7514 0.0761719 25.6318C0.0761719 26.5124 0.779995 27.226 1.64852 27.226C2.51685 27.226 3.22067 26.5124 3.22067 25.6318C3.22067 25.3498 3.14844 25.0848 3.0216 24.855L13.0227 7.29717C13.1786 7.34973 13.3453 7.37824 13.5188 7.37824C13.6922 7.37824 13.8591 7.34973 14.0148 7.29736L17.2846 13.04C17.2775 13.1018 17.2738 13.165 17.2738 13.2289C17.2738 14.1093 17.9776 14.8231 18.8459 14.8231C19.7143 14.8231 20.4183 14.1093 20.4183 13.2289C20.4183 13.165 20.4144 13.102 20.4073 13.04L26.1468 2.96054Z" fill={color}/>
            <path d="M59.2135 12.599C60.4761 12.599 61.4854 13.0159 62.2413 13.849C62.9971 14.6824 63.375 15.7987 63.375 17.1978V24.0736H60.5347V17.3987C60.5347 16.7291 60.3732 16.208 60.0506 15.8358C59.7274 15.4638 59.2723 15.2777 58.6852 15.2777C58.0395 15.2777 57.5364 15.4937 57.1768 15.9251C56.8175 16.3566 56.6375 16.9818 56.6375 17.8005V24.0736H53.797V17.3987C53.797 16.7291 53.6355 16.208 53.3125 15.8358C52.9899 15.4638 52.5348 15.2777 51.9475 15.2777C51.3165 15.2777 50.8134 15.4972 50.4391 15.9363C50.0649 16.3752 49.8778 16.9969 49.8778 17.8005V24.0736H47.0371V12.9111H49.8778V14.0948C50.538 13.0975 51.5584 12.599 52.9381 12.599C54.3033 12.599 55.3017 13.1344 55.933 14.2062C56.6522 13.1344 57.7459 12.599 59.2135 12.599ZM71.0377 12.599C67.8272 12.599 65.2247 15.2374 65.2247 18.4925C65.2247 21.7477 67.8272 24.3863 71.0377 24.3863C72.1238 24.3863 73.1401 24.0838 74.0101 23.5581V24.0736H76.8504V18.4925V12.9111H74.0101V13.427C73.1401 12.9013 72.1238 12.599 71.0377 12.599ZM67.9331 18.4925C67.9331 16.7541 69.3229 15.3446 71.0377 15.3446C72.7519 15.3446 74.1421 16.7541 74.1421 18.4925C74.1421 20.231 72.7519 21.6401 71.0377 21.6401C69.3229 21.6401 67.9331 20.231 67.9331 18.4925ZM82.4213 12.9111V14.8313C82.6709 14.1319 83.0968 13.5996 83.6986 13.2352C84.3 12.8703 84.9901 12.6881 85.7683 12.6881V15.9027C84.9024 15.7838 84.1241 15.9624 83.4341 16.4387C82.7591 16.9 82.4213 17.6667 82.4213 18.7384V24.0736H79.5808V12.9111H82.4213ZM93.0124 18.4254L97.5701 24.0736H94.2675L90.2596 19.006V24.0736H87.4193V8.44629H90.2596V17.8229L94.0471 12.9111H97.4381L93.0124 18.4254ZM108.888 19.676H100.586C100.954 21.0749 101.989 21.7741 103.691 21.7741C104.777 21.7741 105.6 21.4023 106.157 20.6581L108.447 21.9974C107.361 23.5901 105.761 24.3863 103.647 24.3863C101.827 24.3863 100.366 23.8283 99.2656 22.7118C98.1647 21.5958 97.614 20.1894 97.614 18.4925C97.614 16.8256 98.157 15.4268 99.2433 14.2955C100.315 13.1642 101.709 12.599 103.427 12.599C105.056 12.599 106.385 13.1642 107.412 14.2955C108.469 15.4268 108.998 16.8256 108.998 18.4925C108.998 18.8053 108.961 19.1994 108.888 19.676ZM100.543 17.4435H106.157C105.996 16.7138 105.669 16.1556 105.177 15.7689C104.686 15.3818 104.102 15.1884 103.427 15.1884C102.664 15.1884 102.032 15.3856 101.533 15.7801C101.034 16.1743 100.704 16.7291 100.543 17.4435ZM116.946 12.9111V15.6795H114.459V20.3232C114.459 20.7103 114.554 20.9929 114.745 21.1714C114.936 21.3501 115.215 21.4506 115.581 21.473C115.948 21.4951 116.404 21.4918 116.946 21.462V24.0736C115.024 24.297 113.655 24.1147 112.84 23.5269C112.025 22.9389 111.618 21.871 111.618 20.3232V15.6795H109.703V12.9111H111.618V10.6566L114.459 9.78591V12.9111H116.946Z" fill={color}/>
        </g>
        <defs>
            <clipPath id="clip0_225_327">
                <rect width="148" height="27" fill={color}/>
            </clipPath>
        </defs>
    </svg>  
);