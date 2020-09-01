<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import Tooltip from './Tooltip.svelte';
  import Cell from './Cell/Cell.svelte';
  import { getCellProps } from './Cell/helpers';
  import arrow from '../../assets/images/arrow-black.svg';

  export let widthClass = '';
  export let lifeItems = [0, 0];
  export let isFullVisible = false;
  export let name = '';
  export let hideFullScreenComponent = () => void 0;

  const cellProps = [...Array(lifeItems[1])].map((c, i) => ({
    ...getCellProps(i, lifeItems)
  }));
</script>

<div class="p-3 sm:p-5 bg-gray-300 h-full flex flex-col items-center">
  {#if isFullVisible}
    <div in:fade out:fade={{ duration: 20 }}>
      <button
        class="w-10 h-10 p-2 arrow cursor-pointer mb-3"
        on:click={hideFullScreenComponent}>
        <img src={arrow} alt="go back" />
      </button>
      <h2 class="text-center">{lifeItems[0]}/{lifeItems[1]} {name}</h2>
      <div class="flex flex-wrap justify-center {widthClass}">
        {#each cellProps as props, i}
          {#if props.tooltipText}
            <Tooltip text={props.tooltipText}>
              <svelte:component
                this={Cell}
                gap={props.gap}
                color={props.color}
                size={props.size}
                additionalClassName={props.additionalClassName} />
            </Tooltip>
          {:else}
            <svelte:component
              this={Cell}
              gap={props.gap}
              color={props.color}
              size={props.size}
              additionalClassName={props.additionalClassName} />
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</div>
