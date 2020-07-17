<script>
  import { onMount, onDestroy } from 'svelte';
  import SimpleCell from './SimpleCell.svelte';

  export let total = 0;
  export let getCellProps = null;
</script>

<div class="flex items-center justify-around flex-wrap">
  {#each new Array(total) as _, i}
    <svelte:component this={SimpleCell} {total} {...getCellProps(i, total)} />
  {/each}
</div>
