import React from 'react';

// Componentes de ícones SVG com gradientes SEBRAE (azul #004b8d → amarelo #ffd200)

export const HomeIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="homeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#004b8d', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#ffd200', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.5Z" stroke="url(#homeGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M9 21V12H15V21" stroke="url(#homeGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const PlusIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="plusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#004b8d', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#ffd200', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="9" stroke="url(#plusGrad)" strokeWidth="2" fill="none"/>
    <path d="M12 8V16M8 12H16" stroke="url(#plusGrad)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const ChartIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="chartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#004b8d', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#ffd200', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <path d="M3 3V21H21" stroke="url(#chartGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 16L12 11L16 15L21 10" stroke="url(#chartGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 6V10H17" stroke="url(#chartGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const UsersIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="usersGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#004b8d', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#ffd200', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <circle cx="9" cy="7" r="3" stroke="url(#usersGrad)" strokeWidth="2" fill="none"/>
    <path d="M3 21V19C3 16.7909 4.79086 15 7 15H11C13.2091 15 15 16.7909 15 19V21" stroke="url(#usersGrad)" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="17" cy="7" r="2" stroke="url(#usersGrad)" strokeWidth="2" fill="none"/>
    <path d="M21 21V19.5C21 18.1193 19.8807 17 18.5 17H18" stroke="url(#usersGrad)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const DocumentIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="docGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#004b8d', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#ffd200', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="url(#docGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M14 2V8H20" stroke="url(#docGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 13H16M8 17H16" stroke="url(#docGrad)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const KeyIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="keyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#004b8d', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#ffd200', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <circle cx="15.5" cy="8.5" r="5.5" stroke="url(#keyGrad)" strokeWidth="2" fill="none"/>
    <path d="M12 11L3 20L5 22L7 20L8 21L10 19L11 20L13 18L12 11Z" stroke="url(#keyGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export const SearchIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="searchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#004b8d', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#ffd200', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <circle cx="11" cy="11" r="8" stroke="url(#searchGrad)" strokeWidth="2" fill="none"/>
    <path d="M21 21L16.65 16.65" stroke="url(#searchGrad)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const BellIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#004b8d', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#ffd200', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="url(#bellGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="url(#bellGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const UserIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="userGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#004b8d', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#ffd200', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <circle cx="12" cy="8" r="4" stroke="url(#userGrad)" strokeWidth="2" fill="none"/>
    <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21" stroke="url(#userGrad)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const ManagerIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="managerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#004b8d', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#ffd200', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <circle cx="12" cy="8" r="4" stroke="url(#managerGrad)" strokeWidth="2" fill="none"/>
    <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21" stroke="url(#managerGrad)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 10L10 12L16 6" stroke="url(#managerGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const EditIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="editGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#004b8d', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#ffd200', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <path d="M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42555 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z" stroke="url(#editGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export const TrashIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="trashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#004b8d', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#ffd200', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <path d="M3 6H5H21" stroke="url(#trashGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="url(#trashGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export const MoonIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#004b8d', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#ffd200', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <path d="M21 12.79C20.8427 14.4922 20.2039 16.1144 19.1583 17.4668C18.1127 18.8192 16.7035 19.8458 15.0957 20.4265C13.4879 21.0073 11.748 21.1181 10.0795 20.7461C8.41104 20.3741 6.88302 19.5345 5.67425 18.3258C4.46548 17.117 3.62596 15.589 3.25393 13.9205C2.8819 12.252 2.99274 10.5121 3.57348 8.9043C4.15423 7.29651 5.18085 5.88737 6.53324 4.84175C7.88562 3.79614 9.50782 3.15731 11.21 3C10.2134 4.34827 9.73387 6.00945 9.85856 7.68141C9.98324 9.35338 10.7039 10.9251 11.8894 12.1106C13.0749 13.2961 14.6466 14.0168 16.3186 14.1414C17.9906 14.2661 19.6517 13.7866 21 12.79Z" stroke="url(#moonGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export const SunIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#004b8d', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#ffd200', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="5" stroke="url(#sunGrad)" strokeWidth="2" fill="none"/>
    <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="url(#sunGrad)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const LightBulbIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bulbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#004b8d', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#ffd200', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <path d="M9 18H15M10 21H14M12 3C8.68629 3 6 5.68629 6 9C6 10.2537 6.41103 11.4125 7.10999 12.3404C7.48393 12.8456 7.67089 13.0982 7.76806 13.3214C7.86398 13.5426 7.90422 13.7296 7.92892 14.0041C7.95379 14.2813 7.95379 14.5766 7.95379 15.1671V16C7.95379 16.9319 7.95379 17.3978 8.16968 17.7654C8.34685 18.0761 8.62002 18.3493 8.93071 18.5265C9.29831 18.7424 9.76421 18.7424 10.696 18.7424H13.304C14.2358 18.7424 14.7017 18.7424 15.0693 18.5265C15.38 18.3493 15.6531 18.0761 15.8303 17.7654C16.0462 17.3978 16.0462 16.9319 16.0462 16V15.1671C16.0462 14.5766 16.0462 14.2813 16.0711 14.0041C16.0958 13.7296 16.136 13.5426 16.2319 13.3214C16.3291 13.0982 16.5161 12.8456 16.89 12.3404C17.589 11.4125 18 10.2537 18 9C18 5.68629 15.3137 3 12 3Z" stroke="url(#bulbGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export const LogoutIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#004b8d', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#ffd200', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15M10 17L15 12M15 12L10 7M15 12H3" stroke="url(#logoutGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CheckIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="checkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#004b8d', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#00a99d', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <path d="M20 6L9 17L4 12" stroke="url(#checkGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ClockIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="clockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#004b8d', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#00a99d', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="9" stroke="url(#clockGrad)" strokeWidth="2" fill="none"/>
    <path d="M12 6V12L16 14" stroke="url(#clockGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CalendarIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="calendarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#004b8d', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#ffd200', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="url(#calendarGrad)" strokeWidth="2" fill="none"/>
    <path d="M16 2V6M8 2V6M3 10H21" stroke="url(#calendarGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
