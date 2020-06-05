<script>
  import { onMount } from 'svelte';
  import { circInOut } from 'svelte/easing';

  export let preview = null;
  export let fullScreenComponent = null;

  let parentRef = null;
  let isExpanded = false;
  let isFullVisible = false;

  function animate(node, { duration = 600, parent }) {
    const {
      bottom,
      top,
      right,
      left,
      height,
      width
    } = parent.getBoundingClientRect();

    return {
      duration,
      css: t => {
        const eased = circInOut(t);

        return `
          left: ${left * (1 - t)}px;
          top: ${top * (1 - t)}px;
          right: ${(window.innerWidth - right) * (1 - t)}px;
          bottom: ${window.innerHeight - bottom * (1 - t)}px;
          min-width: ${width}px;
          min-height: ${height}px;
          height: ${100 * t}vh;
          opacity: ${1};
          border-radius: ${10 * (1 - t)}px;          
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
      in:animate={{ parent: parentRef }}
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
