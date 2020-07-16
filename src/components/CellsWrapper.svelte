<script>
  import { onMount, onDestroy } from 'svelte';

  export let total = 0;
  export let getCellProps = null;
  export let component = null;
  export let size = null;

  let cellSize = 0;

  switch (true) {
    case total < 100:
      cellSize = 38;
      break;

    case total < 500:
      cellSize = 18;
      break;

    case total < 1000:
      cellSize = 16;
      break;

    case total < 2000:
      cellSize = 14;
      break;

    default:
      cellSize = 11;
  }
</script>

<div class="flex items-center justify-around flex-wrap">
  {#each new Array(total) as _, i}
    <svelte:component
      this={component}
      size={size || cellSize}
      {total}
      {...getCellProps(i, total)} />
  {/each}
</div>
