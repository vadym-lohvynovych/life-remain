<script>
  import { onMount } from 'svelte';
  import { circIn } from 'svelte/easing';

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

        const windowWidth = window.visualViewport
          ? window.visualViewport.width
          : window.innerWidth;

        const absoluteRight = windowWidth - right;
        const absoluteBottom = windowWidth - bottom;

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
      in:expand={{ parent: parentRef }}
      out:expand={{ parent: parentRef, duration: 400 }}
      on:introend={() => (isFullVisible = true)}
      class="expandable fixed overflow-hidden opacity-100 inset-0">
      <svelte:component
        this={fullScreenComponent}
        {isFullVisible}
        {hideFullScreenComponent} />
    </div>
  {/if}

</div>
