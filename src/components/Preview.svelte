<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import { circIn } from 'svelte/easing';
  import svg from '../images/left-arrow-black.svg';

  export let preview = null;
  export let lessThan = 0;

  let parentRef = null;
  let isExpanded = false;
  let isFullVisible = false;
  let showPreview = false;

  function expand(node, { duration = 400, parent }) {
    const {
      top,
      right,
      left,
      bottom,
      height,
      width
    } = parent.getBoundingClientRect();

    return {
      duration,
      css: t => {
        const circ = circIn(t);

        const absoluteRight = window.innerWidth - right;
        const absoluteBottom = window.innerHeight - bottom;

        const coef = 3.5; // how fast sides of block will touch sides of screen

        let finalLeft = left - left * circ * coef;
        let finalRight = absoluteRight - absoluteRight * circ * coef;

        return `
          top: ${top - top * circ}px;
          left: ${finalLeft < 0 ? 0 : finalLeft}px;
          right: ${finalRight < 0 ? 0 : finalRight}px;
          bottom: ${absoluteBottom - absoluteBottom * circ}px;
          transform-origin: ${left + width / 2}px ${top + height / 2}px;
          opacity: ${t};
          border-radius: ${20 * (1 - circ)}px;
        `;
      }
    };
  }

  onMount(() => {
    document.body.addEventListener('keydown', closeOnEsc);

    if (lessThan < parentRef.clientWidth) {
      showPreview = true;
    }
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

  onDestroy(() => {
    document.body.removeEventListener('keydown', closeOnEsc);
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
        in:expand={{ parent: parentRef }}
        out:expand={{ parent: parentRef }}
        on:introend={() => (isFullVisible = true)}
        class="full-content-wrapper absolute inset-0 flex flex-col items-center
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
