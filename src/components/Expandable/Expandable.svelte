<script>
  import { onMount } from 'svelte';
  import { expandAnimation } from './helpers';

  export let preview = null;
  export let fullScreenComponent = null;

  let parentRef = null;
  let isExpanded = false;
  let isFullVisible = false;

  function showFullScreenComponent() {
    isExpanded = true;
  }

  function hideFullScreenComponent() {
    isFullVisible = false;
    isExpanded = false;
  }
</script>

<style>
  .expandable {
    transform: translateZ(0);
  }
</style>

<div class="inline-block" bind:this={parentRef}>
  <div class:opacity-0={isExpanded} class="duration-500">
    <svelte:component this={preview} {showFullScreenComponent} />
  </div>

  {#if isExpanded}
    <div
      in:expandAnimation={{ parent: parentRef }}
      out:expandAnimation={{ parent: parentRef }}
      on:introend={() => (isFullVisible = true)}
      class="expandable fixed overflow-hidden inset-0">
      <svelte:component
        this={fullScreenComponent}
        {isFullVisible}
        {hideFullScreenComponent} />
    </div>
  {/if}

</div>
