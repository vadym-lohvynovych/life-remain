<script>
  import { onMount, onDestroy } from 'svelte';

  export let total = 0;
  export let getCellProps = null;
  export let component = null;

  let size = 0;
  let columns = 0;

  switch (true) {
    case total < 100:
      size = 38;
      break;

    case total < 500:
      size = 18;
      break;

    case total < 1000:
      size = 16;
      break;

    case total < 2000:
      size = 14;
      break;

    default:
      size = 11;
  }
</script>

<div class="flex items-center justify-around flex-wrap">
  {#each new Array(total) as _, i}
    <svelte:component
      this={component}
      {...getCellProps(i, total)}
      {size}
      {total} />
  {/each}
</div>
