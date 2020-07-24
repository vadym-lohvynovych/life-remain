<script>
  import { getCellSize, getCellDefaultProps } from '../helpers/cell.js';

  export let total = 1;
  export let color = '#c1c1c1';
  export let size = null;
  export let additionalClassName = '';

  const padding = total < 500 ? 3 : 1;

  if (!size) {
    size = getCellSize(total);
  }
</script>

<div style="padding: {padding}px">
  <div {...getCellDefaultProps(color, size, additionalClassName)} />
</div>
