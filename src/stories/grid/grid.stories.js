import { addParameters } from '@storybook/svelte';

import Grid from './Grid.svelte';

import '../../styles/global.css';

addParameters({
  viewport: {
    viewports: {
      mobile: {
        name: 'Mobile',
        styles: {
          width: '320px',
          height: '568px',
        },
      },
      tablet: {
        name: 'Tablet',
        styles: {
          width: '768px',
          height: '1024px',
        },
      },
      laptop: {
        name: 'Laptop',
        styles: {
          width: '1200px',
          height: '1024px',
        },
      },
      desktop: {
        name: 'Desktop',
        styles: {
          width: '1366px',
          height: '1024px',
        },
      },
      fullHD: {
        name: 'FullHD',
        styles: {
          width: '1920px',
          height: '1080px',
        },
      },
    },
  },
});

export default { title: 'Grid' };

export const Default = () => ({
  Component: Grid,
});
