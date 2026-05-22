import React from 'react';

function ConnectorIcon({ type }) {
  const commonProps = {
    width: 32,
    height: 32,
    viewBox: '0 0 32 32',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  };

  switch (type) {
    case 'gmail':
      return (
        <svg {...commonProps}>
          <rect x="3" y="6" width="26" height="20" rx="6" fill="rgba(255,255,255,0.92)" />
          <path d="M6 10L16 18L26 10" stroke="#EA4335" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 24V10L11 14" stroke="#34A853" strokeWidth="3" strokeLinecap="round" />
          <path d="M26 24V10L21 14" stroke="#4285F4" strokeWidth="3" strokeLinecap="round" />
          <path d="M6 24H26" stroke="#FBBC05" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'slack':
      return (
        <svg {...commonProps}>
          <rect x="6" y="2" width="7" height="12" rx="3.5" fill="#36C5F0" />
          <rect x="11" y="6" width="12" height="7" rx="3.5" fill="#2EB67D" />
          <rect x="19" y="11" width="7" height="12" rx="3.5" fill="#ECB22E" />
          <rect x="9" y="19" width="12" height="7" rx="3.5" fill="#E01E5A" />
        </svg>
      );
    case 'drive':
      return (
        <svg {...commonProps}>
          <path d="M12 5H20L27 17H19L12 5Z" fill="#0F9D58" />
          <path d="M5 17L12 5L16 11L9 23L5 17Z" fill="#F4B400" />
          <path d="M9 23L16 11H27L20 23H9Z" fill="#4285F4" />
        </svg>
      );
    case 'notion':
      return (
        <svg {...commonProps}>
          <rect x="5" y="5" width="22" height="22" rx="4" fill="#F7F7F5" />
          <path d="M11 10.5L20 10L22 11.5V22H20L13 14.5V22H10V11.5L11 10.5Z" fill="#111111" />
        </svg>
      );
    case 'github':
      return (
        <svg {...commonProps}>
          <circle cx="16" cy="16" r="13" fill="#F5F7FB" />
          <path d="M12 24C12 21.5 12 20.5 11 20C8 19 7 16.5 7 16.5C6 14.5 5 14 5 14C6.5 14 7.5 15.5 7.5 15.5C8.8 17.8 11 17.1 12 16.7C12.2 15.8 12.6 15.1 13 14.7C10.4 14.4 7.5 13.4 7.5 9C7.5 7.8 7.9 6.8 8.7 6C8.6 5.6 8.2 4.3 8.8 2.7C8.8 2.7 9.8 2.4 12 4C13 3.7 14 3.6 15 3.6C16 3.6 17 3.7 18 4C20.2 2.4 21.2 2.7 21.2 2.7C21.8 4.3 21.4 5.6 21.3 6C22.1 6.8 22.5 7.8 22.5 9C22.5 13.4 19.6 14.4 17 14.7C17.5 15.2 18 16 18 17.3V24" stroke="#121826" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg {...commonProps}>
          <path d="M16 4C9.4 4 4 9.2 4 15.7C4 18.1 4.8 20.4 6.1 22.2L4.8 27L9.8 25.7C11.5 26.9 13.6 27.5 16 27.5C22.6 27.5 28 22.3 28 15.7C28 9.2 22.6 4 16 4Z" fill="#25D366" />
          <path d="M12.7 10.9C12.3 10 11.9 10 11.5 10C11.1 10 10.7 10 10.4 10.4C10 10.8 9.1 11.6 9.1 13.3C9.1 15 10.5 16.8 10.7 17.1C10.9 17.4 13.2 21 17 22.4C20.2 23.6 20.9 23.3 21.6 23.2C22.3 23.1 23.8 22.4 24.1 21.6C24.4 20.8 24.4 20.1 24.3 19.9C24.2 19.7 23.9 19.6 23.4 19.4C22.9 19.1 20.8 18.1 20.4 17.9C20 17.8 19.7 17.7 19.4 18.1C19.1 18.6 18.4 19.4 18.1 19.7C17.8 20 17.5 20.1 17 19.8C16.5 19.6 14.8 19 13.1 17.5C11.8 16.4 10.9 15 10.6 14.5C10.3 14 10.5 13.8 10.8 13.5C11 13.3 11.3 12.9 11.5 12.6C11.7 12.3 11.8 12.1 11.9 11.8C12 11.5 11.9 11.3 11.8 11.1C11.7 10.9 11.2 9.7 12.7 10.9Z" fill="white" />
        </svg>
      );
    case 'stripe':
      return (
        <svg {...commonProps}>
          <rect x="4" y="6" width="24" height="20" rx="7" fill="#635BFF" />
          <path d="M20.8 12.5C19.7 11.9 18.2 11.6 16.5 11.6C13.3 11.6 11.2 13.1 11.2 15.4C11.2 19.2 16.7 18.5 16.7 20.2C16.7 20.8 16.1 21 15.2 21C13.9 21 12.6 20.6 11.4 20V22.6C12.5 23.1 13.9 23.4 15.2 23.4C18.6 23.4 20.9 21.8 20.9 19.4C20.9 15.3 15.4 16.1 15.4 14.5C15.4 13.9 15.9 13.6 16.9 13.6C18 13.6 19.1 13.8 20.8 14.5V12.5Z" fill="white" />
        </svg>
      );
    default:
      return (
        <svg {...commonProps}>
          <circle cx="16" cy="16" r="12" fill="rgba(255,255,255,0.88)" />
        </svg>
      );
  }
}

export default ConnectorIcon;
