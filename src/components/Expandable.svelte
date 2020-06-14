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

  function expandableAnimation(node, { duration = 500, parent }) {
    const { top, left, height, width } = parent.getBoundingClientRect();

    return {
      duration,
      css: t => {
        const circ = circIn(t);

        return `
        transform-origin: ${left + width / 2}px ${top + height / 2}px;
        transform: scaleX(${Math.min(circ * 4, 1)}) scaleY(${circ});
        opacity: ${t};
        border-radius: ${30 * (1 - circ)}px;
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
