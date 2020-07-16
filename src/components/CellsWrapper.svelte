<script>
  import { onMount, onDestroy } from 'svelte';

  export let total = 0;
  export let getCellProps = null;
  export let component = null;
</script>

<div class="flex items-center justify-around flex-wrap">
  {#each new Array(total) as _, i}
    <svelte:component this={component} {total} {...getCellProps(i, total)} />
  {/each}
</div>
