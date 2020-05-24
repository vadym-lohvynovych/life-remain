import { addParameters } from '@storybook/svelte';

import '../styles/global.css';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/light.css';

addParameters({
  viewport: {
    viewports: {
      mobileSmall: {
        name: '320',
        styles: {
          width: '320px',
          height: '85vh',
        },
      },
      mobile: {
        name: '400',
        styles: {
          width: '400px',
          height: '85vh',
        },
      },
      tablet: {
        name: '768',
        styles: {
          width: '768px',
          height: '85vh',
        },
      },
      laptop: {
        name: '1200',
        styles: {
          width: '1200px',
          height: '85vh',
        },
      },
      desktop: {
        name: '1366',
        styles: {
          width: '1366px',
          height: '85vh',
        },
      },
      fullHD: {
        name: '1920',
        styles: {
          width: '1920px',
          height: '85vh',
        },
      },
    },
    defaultViewport: 'mobile'
  },
});
