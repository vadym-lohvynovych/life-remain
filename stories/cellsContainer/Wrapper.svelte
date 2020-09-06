<script>
  import CellsContainer from '../../src/components/CellsContainer/CellsContainer.svelte';
  import InputSection from './InputSection.svelte';

  let tooltipText = 'Tooltip Text';
  let color = '#6495ED';
  let hoverColor = '#FF7F50';
  let size = 20;
  let count = 30;
  let gap = 2;
  $: getAdditionalRectProps = () => ({ tooltipText });

  const inputClass =
    'border-2 focus:shadow-outline duration-200 border-gray-600 px-4 py-1 rounded';
  const inputNumberClass = `${inputClass} w-24 pr-0`;
  const hClass = 'text-center text-lg font-bold mt-4';
  const containerClass = 'flex items-center justify-center mt-2';

  const colorContainerClass =
    'text-center px-4 py-2 border border-teal-500 rounded';
</script>

<InputSection header="Size" infoText="{size}px">
  <input type="range" min={1} max={100} bind:value={size} />
</InputSection>

<InputSection header="Gap">
  <input class={inputNumberClass} type="number" bind:value={gap} />
</InputSection>

<h2 class={hClass}>Cell colors</h2>

<div class={containerClass} />

<InputSection header="Cell colors">
  <div class="{colorContainerClass} mr-4">
    <p class="mb-2">Background</p>
    <input type="color" bind:value={color} />
  </div>
  <div class={colorContainerClass}>
    <p class="mb-2">Hover</p>
    <input type="color" bind:value={hoverColor} />
  </div>
</InputSection>

<InputSection header="Count">
  <input type="number" class={inputNumberClass} bind:value={count} />
</InputSection>

<InputSection header="Tooltip">
  <input
    class={inputClass}
    type="text"
    placeholder="Tooltip Text"
    bind:value={tooltipText} />
</InputSection>

<div class="max-w-xl mx-auto">
  <CellsContainer
    {color}
    {hoverColor}
    {gap}
    {count}
    {size}
    {getAdditionalRectProps} />
</div>
