<script>
  // parent block has to have position: relative styles
  import { fly, fade } from 'svelte/transition';
  import { circIn } from 'svelte/easing';
  import { onMount } from 'svelte';

  export let text = '';

  const defaultPopupInset = {
    left: '50%',
    right: 'auto',
    translateX: '-50%',
    bottom: 0
  };

  const commonAnimationSettings = { duration: 300 };
  const flyAnimationSettings = { ...commonAnimationSettings, y: -5 };

  let popupExists = false;
  let isPopupVisible = false;
  let popupInset = defaultPopupInset;
  let parentRef = null;
  let popupRef = null;

  onMount(() => {
    if (parentRef.children.length > 1) {
      throw new Error('Tooltip must wrap only one child');
    }
  });

  function getTooltipInset() {
    if (isPopupVisible) {
      return popupInset;
    }

    const { left, right } = popupRef.getBoundingClientRect();
    const bottom = parentRef.children[0]
      ? parentRef.children[0].offsetHeight
      : 0;

    if (left < 0) {
      return {
        ...popupInset,
        left: 0,
        translateX: 0,
        bottom
      };
    } else if (right > window.innerWidth) {
      return {
        right: 0,
        left: 'auto',
        translateX: 0,
        bottom
      };
    } else {
      return { ...defaultPopupInset, bottom };
    }
  }

  function showPopup() {
    popupInset = getTooltipInset();
    isPopupVisible = true;
  }

  function hidePopup() {
    popupInset = defaultPopupInset;
    isPopupVisible = false;
  }
</script>

<style>
  .popup {
    text-align: center;
    font-size: 0.7em;
    background-color: #4a5568;
  }
  .popup-arrow {
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border: 3px solid transparent;
    border-top: 3px solid #4a5568;
  }
</style>

<div
  class="inline-block relative"
  bind:this={parentRef}
  on:mouseenter={text ? () => (popupExists = true) : null}
  on:mouseleave={text ? () => (popupExists = false) : null}>

  <slot />
  {#if String(text).trim() && popupExists}
    <div
      class="popup absolute px-3 py-1 rounded bg-gray-700 text-white"
      bind:this={popupRef}
      style="left: {popupInset.left}; right: {popupInset.right}; bottom: calc({popupInset.bottom + 6}px);
      transform: translateX({popupInset.translateX})"
      on:introstart={showPopup}
      on:outroend={hidePopup}
      in:fade={commonAnimationSettings}
      out:fly={flyAnimationSettings}>
      <p class="whitespace-no-wrap">{text}</p>
    </div>
    <span
      class="popup-arrow"
      style="bottom: calc({popupInset.bottom}px)"
      in:fade={commonAnimationSettings}
      out:fly={flyAnimationSettings} />
  {/if}
</div>
