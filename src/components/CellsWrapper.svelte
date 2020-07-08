<script>
  import { onMount, onDestroy } from 'svelte';
  export let total = 0;
  export let getCellProps = null;
  export let component = null;

  let columns = '';

  switch (true) {
    case total < 100:
      columns = 9;
      break;

    case total < 200:
      columns = 10;
      break;

    case total < 300:
      columns = 12;
      break;

    case total < 400:
      columns = 14;
      break;

    case total < 600:
      columns = 18;
      break;

    case total < 800:
      columns = 19;
      break;

    case total < 2000:
      columns = 24;
      break;

    case total < 5000:
      columns = 32;
      break;

    default:
      columns = 36;
  }

  // columns = Math.round(total / 50);
</script>

<div class="grid" style="grid-template-columns: repeat({columns}, 1fr)">
  {#each new Array(total) as _, i}
    <svelte:component this={component} {...getCellProps(i, total)} />
  {/each}
</div>
