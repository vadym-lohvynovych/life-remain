<script>
  import { onMount, onDestroy } from 'svelte';
  import Portal from '../Portal.svelte';
  import { expandAnimation } from './helpers';

  let parentRef = null;
  let isExpanded = false;
  let isFullVisible = false;
  let fullComponentRef = null;

  function showFullScreenComponent() {
    isExpanded = true;
  }

  function hideFullScreenComponent() {
    isFullVisible = false;
    isExpanded = false;
  }

  function closeOnEsc(e) {
    if (e.which === 27) {
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
  <div class:opacity-0={isExpanded} class="duration-500">
    <slot name="preview" {showFullScreenComponent} />
  </div>

  {#if isExpanded}
    <Portal>
      <div
        in:expandAnimation={{ parent: parentRef }}
        out:expandAnimation={{ parent: parentRef }}
        on:introend={() => (isFullVisible = true)}
        class="expandable fixed overflow-hidden inset-0">
        <slot
          name="fullScreenComponent"
          {isFullVisible}
          {isExpanded}
          {hideFullScreenComponent} />
      </div>
    </Portal>
  {/if}
</div>
