<script>
  import { getCellDefaultProps } from './helpers';

  export let gap = 2;
  export let color = '#c1c1c1';
  export let size = 20;
  export let additionalClassName = '';
</script>

<div style="padding: {gap}px">
  123
  <div {...getCellDefaultProps(color, size, additionalClassName)} />
</div>
