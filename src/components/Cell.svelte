<script>
  import { getCellSize, getCellDefaultProps } from '../helpers/cell.js';
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';

  export let total = 1;
  export let color = '#c1c1c1';
  export let size = null;
  export let additionalClassName = '';
  export let popupText = '';

  let padding = total < 500 ? 3 : 1;
  let isPopupVisible = false;

  if (!size) {
    size = getCellSize(total);
  }
</script>

<style>
  .popup {
    bottom: calc(100% + 4px);
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 0.7em;
    background-color: #4a5568;
  }
  .popup:after {
    display: block;
    position: absolute;
    content: '';
    left: 50%;
    top: 100%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top: 5px solid #4a5568;
  }
</style>

<div class="relative" style="padding: {padding}px">
  <div
    on:mouseenter={popupText ? () => (isPopupVisible = true) : null}
    on:mouseleave={popupText ? () => (isPopupVisible = false) : null}
    {...getCellDefaultProps(color, size, additionalClassName)}>
    {#if String(popupText).trim() && isPopupVisible}
      <div
        class="popup absolute px-3 py-1 rounded bg-gray-700 text-white"
        in:fly={{ duration: 300, y: 5 }}
        out:fly={{ duration: 300, y: -5 }}>
        <p class="whitespace-no-wrap">{popupText}</p>
      </div>
    {/if}
  </div>
</div>
