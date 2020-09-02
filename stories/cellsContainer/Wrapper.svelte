<script>
  import CellsContainer from '../../src/components/CellsContainer/CellsContainer.svelte';

  export let count = 0;

  let tooltipText = 'Tooltip Text';
  let color = '#6495ED';
  let hoverColor = '#FF7F50';
  let size = 20;
  $: getAdditionalRectProps = (i) => ({ tooltipText });
</script>

<h2 class="text-center text-lg font-bold">Size</h2>
<div class="flex items-center justify-center">
  <input type="range" min={1} max={100} bind:value={size} />
  <p class="ml-4">{size}px</p>
</div>

<h2 class="text-center text-lg font-bold">Cell colors</h2>
<div class="flex items-center justify-center mt-2">
  <p class="mr-4">Background:</p>
  <input type="color" bind:value={color} />
</div>
<div class="flex items-center justify-center mt-2">
  <p class="mr-4">Hover:</p>
  <input type="color" bind:value={hoverColor} />
</div>

<div class="flex items-center justify-center mt-2">
  <input
    class="border-2 focus:shadow-outline duration-200 border-gray-600 px-4 py-1
    mt-5 rounded"
    type="text"
    bind:value={tooltipText} />
</div>
<CellsContainer {color} {hoverColor} {count} {size} {getAdditionalRectProps} />
