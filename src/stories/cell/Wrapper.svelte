<script>
  import Cell from '../../components/Cell/Cell.svelte';
  import PositionButton from './PositionButton';
  import Tooltip from '../../components/Tooltip.svelte';
  export let title = '';
  export let cellProps = {};
  export let total = 1;

  const padding = total < 500 ? 3 : 1;

  let size = 50;
  let color = '#4a5568';
  let popupText = 'Popup text!';
  let activeButtonIndex = 0;

  const buttonClassName =
    'px-5 py-1 mx-1 rounded duration-100 hover:bg-blue-300';

  const cellClassesMap = ['', 'justify-center', 'justify-end'];
  const buttonTextMap = ['left', 'center', 'right'];

  let cellAdditionalClass = cellClassesMap[activeButtonIndex];
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
    {#each new Array(3) as _, i}
      <PositionButton
        index={i}
        text={buttonTextMap[i]}
        {activeButtonIndex}
        {buttonClassName}
        onClick={() => {
          activeButtonIndex = i;
          cellAdditionalClass = cellClassesMap[i];
        }} />
    {/each}
  </div>
</div>

<div class="flex mt-8 {cellAdditionalClass}">
  <Tooltip text={popupText}>
    <Cell
      {...cellProps}
      {size}
      {color}
      {popupText}
      style="padding: {padding}px" />
  </Tooltip>
</div>
