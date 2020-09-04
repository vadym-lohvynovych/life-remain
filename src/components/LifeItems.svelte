<script>
  import { fade, fly } from 'svelte/transition';
  import ExpandableSlots from './Expandable/ExpandableSlots.svelte';
  import { birthDate } from '../stores/birthDate';
  import { getLifeCount } from '../helpers/calculations';
  import Preview from './Preview.svelte';
  import CellsContainer from './CellsContainer/CellsContainer.svelte';
  import { getCellSize, getCellProps } from './CellsContainer/calculations';
  import arrow from '../../assets/images/arrow-black.svg';
  import { toCapitalize } from '../helpers/common';

  export let name = 'years';

  const widthMap = {
    weeks: 'max-w-6xl',
    months: 'max-w-5xl',
    years: 'max-w-2xl'
  };

  let liveCount, lifeItems, lived, total, size;

  $: {
    if ($birthDate) {
      liveCount = getLifeCount(new Date($birthDate));
      lifeItems = liveCount[name];
      [lived, total] = liveCount[name];
      size = getCellSize(total);
    }
  }
</script>

<style>
  .head > * {
    flex: 1 1;
  }
</style>

<ExpandableSlots
  let:isFullVisible
  let:showFullScreenComponent
  let:hideFullScreenComponent>
  <div slot="preview">
    <Preview
      {showFullScreenComponent}
      {lifeItems}
      name={toCapitalize(name)}
      percent={liveCount.percent} />
  </div>

  <div slot="fullScreenComponent" class="bg-gray-300 shadow-lg min-h-full">
    <div
      class="head sticky top-0 flex items-center justify-between py-3 sm:py-5
      px-4 sm:px-6 bg-gray-300 z-50 shadow-sm">
      {#if isFullVisible}
        <button
          in:fly={{ x: -20 }}
          out:fade
          title="Close"
          class="arrow w-6 sm:w-8 h-6 sm:h-8 cursor-pointer"
          on:click={hideFullScreenComponent}>
          <img src={arrow} alt="go back" />
        </button>
        <h2
          in:fly={{ y: 20 }}
          out:fade
          class="font-bold text-center text-lg sm:text-2xl">
          {toCapitalize(name)}
        </h2>
        <p
          in:fly={{ x: 20 }}
          out:fade
          class="font-bold text-right text-sm sm:text-xl">
          {lived}/{total}
        </p>
      {/if}
    </div>
    {#if isFullVisible}
      <div
        in:fly={{ y: 50 }}
        out:fade={{ duration: 50 }}
        class="{widthMap[name]} mx-auto">

        <CellsContainer
          {size}
          count={total}
          getAdditionalRectProps={(index) => getCellProps(index, lifeItems)} />
      </div>
    {/if}
  </div>
</ExpandableSlots>
