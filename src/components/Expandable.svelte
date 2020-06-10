<script>
  import { onMount } from 'svelte';
  import { expandableAnimation } from '../helpers/helpers';

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
    setTimeout(() => (isExpanded = false));
  }
</script>

<style>
  .expandable {
    transform: translateZ(0);
  }
</style>

<div class="inline-block" bind:this={parentRef}>
  <svelte:component this={preview} {showFullScreenComponent} />

  {#if isExpanded}
    <div
      in:expandableAnimation={{ parent: parentRef }}
      out:expandableAnimation={{ parent: parentRef, duration: 400 }}
      on:introend={() => (isFullVisible = true)}
      class="expandable fixed overflow-hidden opacity-100 inset-0">
      <svelte:component
        this={fullScreenComponent}
        {isFullVisible}
        {hideFullScreenComponent} />
    </div>
  {/if}

</div>
