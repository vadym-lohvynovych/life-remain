<script>
  import { onMount, onDestroy } from 'svelte';
  export let total;
  export let color = '#c1c1c1';
  export let size = 40;

  let ref = null;
  let visible = false;
  let padding = total < 500 ? 3 : 1;
</script>

<div style="padding: {padding}px">
  <span
    bind:this={ref}
    style="background-color: {color}; width: {size}px; height: {size}px"
    class="block rounded" />
</div>
