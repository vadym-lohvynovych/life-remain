<script>
  import { fly } from 'svelte/transition';

  export let total = 1;
  export let color = '#c1c1c1';
  export let size = null;
  export let additionalClassName = '';
  export let popupText = '';

  let padding = total < 500 ? 3 : 1;
  let isPopupVisible = false;

  if (!size) {
    switch (true) {
      case total < 100:
        size = 38;
        break;

      case total < 500:
        size = 18;
        break;

      case total < 1000:
        size = 16;
        break;

      case total < 2000:
        size = 14;
        break;

      default:
        size = 11;
    }
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
    on:mouseenter={() => (isPopupVisible = true)}
    on:mouseleave={() => (isPopupVisible = false)}
    style="background-color: {color}; width: {size}px; height: {size}px"
    class="block cursor-pointer rounded transition-shadow duration-100
    hover:shadow-outline relative {additionalClassName}">
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
