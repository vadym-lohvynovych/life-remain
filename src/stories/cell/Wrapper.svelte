<script>
  import Cell from '../../components/Cell.svelte';
  export let title = '';
  export let cellProps = {};

  let size = 50;
  let color = '#4a5568';
  let popupText = 'Popup text!';
  let activeButtonIndex = 0;
  let cellAdditionalClass = 'mr-auto';

  const buttonClassName =
    'px-5 py-1 mx-1 rounded duration-200 hover:bg-blue-300';
</script>

<h2 class="text-xl text-center my-2 text-gray-900 font-bold">{title}</h2>

<div class="px-5">
  <div class="flex items-center">
    <input
      class="block my-4 w-64"
      type="range"
      bind:value={size}
      min={5}
      max={200}
      step={1} />
    <p class="text-center whitespace-no-wrap pl-2">Size: {size}px</p>
  </div>

  <input
    placeholder="Popup text"
    class="block border-2 border-gray-700 rounded px-4 py-1 max-w-xs"
    type="text"
    bind:value={popupText} />

  <div class="flex items-center mt-3">
    <p class="font-bold">Color:</p>
    <input class="mx-2" type="color" bind:value={color} />
    <input
      placeholder="Color"
      class="block border-2 border-gray-700 rounded px-4 max-w-xs text-sm"
      type="text"
      bind:value={color} />
  </div>

  <p class="mt-5 text-center font-bold">Position:</p>
  <div class="flex items-center justify-center mt-3">
    <button
      on:click={() => {
        activeButtonIndex = 0;
        cellAdditionalClass = 'mr-auto';
      }}
      class="{buttonClassName}
      {activeButtonIndex === 0 ? 'bg-red-300' : 'bg-blue-400'}">
      Left
    </button>
    <button
      on:click={() => {
        activeButtonIndex = 1;
        cellAdditionalClass = 'mx-auto';
      }}
      class="{buttonClassName}
      {activeButtonIndex === 1 ? 'bg-red-300' : 'bg-blue-400'}">
      Center
    </button>
    <button
      on:click={() => {
        activeButtonIndex = 2;
        cellAdditionalClass = 'ml-auto';
      }}
      class="{buttonClassName}
      {activeButtonIndex === 2 ? 'bg-red-300' : 'bg-blue-400'}">
      Right
    </button>
  </div>
</div>

<Cell
  {...cellProps}
  {size}
  {color}
  {popupText}
  additionalClassName="mt-12 {cellAdditionalClass}" />
