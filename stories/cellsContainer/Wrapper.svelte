<script>
  import CellsContainer from '../../src/components/CellsContainer/CellsContainer.svelte';

  // export let count = 0;

  let tooltipText = 'Tooltip Text';
  let color = '#6495ED';
  let hoverColor = '#FF7F50';
  let size = 20;
  let count = 30;
  let gap = 2;
  $: getAdditionalRectProps = (i) => ({ tooltipText });

  const inputClass =
    'border-2 focus:shadow-outline duration-200 border-gray-600 px-4 py-1 rounded';
  const inputNumberClass = `${inputClass} w-24 pr-0`;
  const hClass = 'text-center text-lg font-bold mt-4';
</script>

<h2 class={hClass}>Size</h2>
<div class="flex items-center justify-center">
  <input type="range" min={1} max={100} bind:value={size} />
  <p class="ml-4">{size}px</p>
</div>

<h2 class={hClass}>Gap</h2>
<div class="flex items-center justify-center mt-2">
  <input class={inputNumberClass} type="number" bind:value={gap} />
</div>

<h2 class={hClass}>Cell colors</h2>

<div class="flex items-center justify-center mt-2">
  <p class="mr-4">Background:</p>
  <input type="color" bind:value={color} />
</div>

<div class="flex items-center justify-center mt-2">
  <p class="mr-4">Hover:</p>
  <input type="color" bind:value={hoverColor} />
</div>

<h2 class={hClass}>Count</h2>
<div class="flex items-center justify-center mt-2">
  <input type="number" class={inputNumberClass} bind:value={count} />
</div>

<h2 class={hClass}>Tooltip</h2>
<div class="flex items-center justify-center mt-2">
  <input
    class={inputClass}
    type="text"
    placeholder="Tooltip Text"
    bind:value={tooltipText} />
</div>
<CellsContainer
  {color}
  {hoverColor}
  {gap}
  {count}
  {size}
  {getAdditionalRectProps} />
