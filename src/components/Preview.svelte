<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import { expandAnimation } from '../helpers/helpers';

  import svg from '../images/arrow-black.svg';

  export let preview = null;
  export let lessThan = 0;

  let parentRef = null;
  let isExpanded = false;
  let isFullVisible = false;
  let showPreview = false;
  let timeout = null;

  onMount(() => {
    document.body.addEventListener('keydown', closeOnEsc);
    window.addEventListener('resize', calculatePreviewVisibility);

    calculatePreviewVisibility();
  });

  function showFullScreenComponent() {
    isExpanded = true;
  }

  function hideFullScreenComponent() {
    isFullVisible = false;
    setTimeout(() => (isExpanded = false));
  }

  function closeOnEsc(e) {
    if (e.which === 27) {
      hideFullScreenComponent();
    }
  }

  function calculatePreviewVisibility() {
    clearTimeout(timeout);
    showPreview = false;
    timeout = setTimeout(() => {
      if (lessThan < parentRef.clientWidth) {
        showPreview = true;
      } else {
        showPreview = false;
      }
    }, 20);
  }

  onDestroy(() => {
    document.body.removeEventListener('keydown', closeOnEsc);
    window.removeEventListener('resize', calculatePreviewVisibility);
  });
</script>

<style>
  .full-content-wrapper {
    transform: translateZ(0);
  }
  .close {
    z-index: 9999;
    left: 15px;
    top: 20px;
  }
  img {
    width: 100%;
    height: 100%;
  }
</style>

<div class="inline-block" bind:this={parentRef}>
  <div class="expandable">
    {#if showPreview}
      <div on:click={showFullScreenComponent}>
        <svelte:component this={preview} class="my-6" />
      </div>
    {:else}
      <slot>YOU MUST PROVIDE SMTH.</slot>
    {/if}
    {#if isExpanded}
      <div
        in:expandAnimation={{ parent: parentRef }}
        out:expandAnimation={{ parent: parentRef }}
        on:introend={() => (isFullVisible = true)}
        class="full-content-wrapper fixed inset-0 flex flex-col items-center
        justify-center overflow-hidden bg-gray-300">
        {#if isFullVisible}
          <button
            in:fade={{ duration: 200 }}
            on:click={hideFullScreenComponent}
            class="close absolute rounded-full w-8 h-8 p-1 flex items-center
            justify-center">
            <img src={svg} alt="go back" />
          </button>
        {/if}
        <slot>YOU MUST PROVIDE SMTH.</slot>
      </div>
    {/if}
  </div>
</div>
