import ExpandableWrapper from './ExpandableWrapper.svelte';
import ExpandablePreviewWrapper from './ExpandablePreviewWrapper.svelte';

export default { title: 'Expandable' };

export const FirstRealization = () => ({
  Component: ExpandableWrapper
});

export const Advanced = () => ({
  Component: ExpandablePreviewWrapper
});
