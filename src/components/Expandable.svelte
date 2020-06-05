<script>
  import { onMount } from 'svelte';
  import { circIn } from 'svelte/easing';

  export let preview = null;
  export let fullScreenComponent = null;

  let parentRef = null;
  let isExpanded = false;
  let isFullVisible = false;

  function animate(node, { duration = 600, parent }) {
    const { top, left, height, width } = parent.getBoundingClientRect();

    return {
      duration,
      css: t => {
        const eased = circIn(t);

        return `
          transform-origin: ${left + width / 2}px ${top + height / 2}px;
          transform: scaleX(${Math.min(eased * 3, 1)}) scaleY(${eased});
          opacity: ${t};
          border-radius: ${30 * (1 - eased)}px;
        `;
      }
    };
  }

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
      in:animate={{ parent: parentRef, duration: 600 }}
      out:animate={{ parent: parentRef, duration: 400 }}
      on:introend={() => (isFullVisible = true)}
      class="expandable fixed overflow-hidden opacity-100 inset-0">
      <svelte:component
        this={fullScreenComponent}
        {isFullVisible}
        {hideFullScreenComponent} />
    </div>
  {/if}

</div>
