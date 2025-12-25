import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

// Your RGB: 67,56,202 → hex #4338CA
const customPrimaryHex = '#4338CA';

// Define a full token-based preset
export const customPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e0e0fc',
      100: '#c2c1fa',
      200: '#a3a2f8',
      300: '#857df5',
      400: '#6859f2',
      500: customPrimaryHex, // main
      600: '#3b33b8',
      700: '#2b2690',
      800: '#1c1a67',
      900: '#0d0c3f',
      950: '#040218',
    },
    colorScheme: {
      light: {
        primary: {
          color: customPrimaryHex,
          inverseColor: '#ffffff',
          hoverColor: '#352fcf',
          activeColor: '#2a26b5',
        },
        highlight: {
          background: '#302ecc',
          focusBackground: '#2a26b5',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
      },
      dark: {
        primary: {
          color: '#e0e0fc',
          inverseColor: '#4338CA',
          hoverColor: '#c2c1fa',
          activeColor: '#a3a2f8',
        },
        highlight: {
          background: 'rgba(250, 250, 250, 0.16)',
          focusBackground: 'rgba(250, 250, 250, 0.24)',
          color: 'rgba(255,255,255,0.87)',
          focusColor: 'rgba(255,255,255,0.87)',
        },
      },
    },
  },
});
