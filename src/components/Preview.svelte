<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import { expandableAnimation } from '../helpers/helpers';

  export let preview = null;
  export let lessThan = 0;

  let parentRef = null;
  let isExpanded = false;
  let isFullVisible = false;
  let showPreview = false;

  onMount(() => {
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
    background: rgba(0, 0, 0, 0.5);
  }
  .close {
    right: 20px;
    top: 20px;
  }
</style>

<div class="inline-block" bind:this={parentRef}>
  {#if showPreview}
    <div on:click={showFullScreenComponent}>
      <svelte:component this={preview} />
    </div>
  {:else}
    <slot>YOU MUST PROVIDE SMTH.</slot>
  {/if}
  {#if isExpanded}
    <div
      in:expandableAnimation={{ parent: parentRef }}
      out:expandableAnimation={{ parent: parentRef, duration: 400 }}
      on:introend={() => (isFullVisible = true)}
      class="expandable fixed overflow-hidden opacity-100 inset-0 flex flex-col
      items-center justify-center">
      <div
        class="close inline-block absolute bg-black rounded border-red-400
        text-white px-3 py-1 cursor-pointer"
        on:click={hideFullScreenComponent}>
        X
      </div>
      {#if isFullVisible}
        <div in:fade={{ duration: 200 }}>
          <slot>YOU MUST PROVIDE SMTH.</slot>
        </div>
      {/if}
    </div>
  {/if}
</div>
