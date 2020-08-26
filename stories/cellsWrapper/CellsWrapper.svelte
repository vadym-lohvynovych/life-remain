<script>
  import { onMount, onDestroy } from 'svelte';
  import Cell from '../../src/components/Cell/Cell.svelte';

  export let total = 0;
  export let getCellProps = () => void 0;
</script>

<div class="flex items-center justify-around flex-wrap">
  {#each new Array(total) as _, i}
    <svelte:component this={Cell} {total} {...getCellProps(i, total)} />
  {/each}
</div>
