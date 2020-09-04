<script>
  import { onMount, onDestroy } from 'svelte';
  import Portal from '../Portal.svelte';
  import { expandAnimation } from './helpers';

  let parentRef = null;
  let isExpanded = false;
  let isFullVisible = false;

  function showFullScreenComponent() {
    isExpanded = true;
  }

  function hideFullScreenComponent() {
    isFullVisible = false;
    setTimeout(() => (isExpanded = false), 50);
  }

  function endOpening() {
    // Calls before block is fullScreen, need small timeout
    // Because calculations start before block is fullScreen and we can see interface hanging
    setTimeout(() => (isFullVisible = true), 50);
  }

  function closeOnEsc(e) {
    if (e.which === 27 && isFullVisible) {
      hideFullScreenComponent();
    }
  }
  onMount(() => {
    document.body.addEventListener('keydown', closeOnEsc);
  });

  onDestroy(() => {
    document.body.removeEventListener('keydown', closeOnEsc);
  });
</script>

<style>
  .expandable {
    transform: translateZ(0);
  }
</style>

<div class="inline-block" bind:this={parentRef}>
  <slot name="preview" {showFullScreenComponent} />

  {#if isExpanded}
    <Portal>
      <div
        in:expandAnimation={{ parent: parentRef }}
        out:expandAnimation={{ parent: parentRef }}
        on:introend={endOpening}
        class="expandable fixed inset-0 overflow-y-auto overflow-x-hidden">
        <slot
          name="fullScreenComponent"
          {isFullVisible}
          {isExpanded}
          {hideFullScreenComponent} />
      </div>
    </Portal>
  {/if}
</div>
