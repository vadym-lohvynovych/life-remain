<script>
  import { onMount, onDestroy } from 'svelte';
  import Cell from '../../src/components/Cell/Cell.svelte';

  export let lifeItems = [0, 0];
  export let getCellProps = () => void 0;

  const cellProps = [...Array(lifeItems[1])].map((c, i) => ({
    ...getCellProps(i, lifeItems)
  }));

  console.log('-->', lifeItems);
</script>

<div class="flex items-center justify-around flex-wrap">
  {#each cellProps as props, i}
    <svelte:component
      this={Cell}
      gap={props.gap}
      color={props.color}
      size={props.size}
      additionalClassName={props.additionalClassName} />
  {/each}
</div>
