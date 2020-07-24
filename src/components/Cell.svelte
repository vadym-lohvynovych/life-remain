<script>
  import { getCellSize, getCellDefaultProps } from '../helpers/cell.js';
  import { fly, fade } from 'svelte/transition';
  import { circIn } from 'svelte/easing';
  import { onMount } from 'svelte';

  export let total = 1;
  export let color = '#c1c1c1';
  export let size = null;
  export let additionalClassName = '';
  export let popupText = '';

  const padding = total < 500 ? 3 : 1;
  const defaultPopupInset = {
    left: '50%',
    right: 'auto',
    translateX: '-50%'
  };

  let popupExists = false;
  let popupInset = defaultPopupInset;
  let isPopupVisible = false;
  let popupRef = null;

  if (!size) {
    size = getCellSize(total);
  }

  function getPopupInset() {
    if (isPopupVisible) {
      return popupInset;
    }

    const { left, right } = popupRef.getBoundingClientRect();

    if (left < 0) {
      return {
        ...popupInset,
        left: 0,
        translateX: 0
      };
    } else if (right > window.innerWidth) {
      return {
        right: 0,
        left: 'auto',
        translateX: 0
      };
    } else {
      return defaultPopupInset;
    }
  }

  function showPopup() {
    popupInset = getPopupInset();
    isPopupVisible = true;
  }

  function hidePopup() {
    popupInset = defaultPopupInset;
    isPopupVisible = false;
  }
</script>

<style>
  .popup {
    bottom: calc(100% + 4px);
    text-align: center;
    font-size: 0.7em;
    background-color: #4a5568;
  }
  .popup-arrow {
    display: block;
    position: absolute;
    left: 50%;
    bottom: calc(100% - 2px);
    transform: translateX(-50%);
    border: 3px solid transparent;
    border-top: 3px solid #4a5568;
  }
</style>

<div class="relative" style="padding: {padding}px">
  <div
    on:mouseenter={popupText ? () => (popupExists = true) : null}
    on:mouseleave={popupText ? () => (popupExists = false) : null}
    {...getCellDefaultProps(color, size, additionalClassName)}>
    {#if String(popupText).trim() && popupExists}
      <div
        bind:this={popupRef}
        style="left: {popupInset.left}; right: {popupInset.right}; transform:
        translateX({popupInset.translateX})"
        on:introstart={showPopup}
        on:outroend={hidePopup}
        class="popup absolute px-3 py-1 rounded bg-gray-700 text-white"
        in:fade={{ duration: 300, y: 5 }}
        out:fly={{ duration: 300, y: -5 }}>
        <p class="whitespace-no-wrap">{popupText}</p>
      </div>
      <span
        class="popup-arrow"
        in:fade={{ duration: 300, y: 5 }}
        out:fly={{ duration: 300, y: -5 }} />
    {/if}
  </div>
</div>
