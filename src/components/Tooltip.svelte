<script>
  // parent block has to have position: relative styles
  import { fly, fade } from 'svelte/transition';
  import { circIn } from 'svelte/easing';
  import { onMount } from 'svelte';

  export let text = '';

  const INSET = {
    left: '50%',
    right: 'auto',
    translateX: '-50%',
    bottom: 0
  };

  const commonAnimationSettings = { duration: 300 };
  const flyAnimationSettings = { ...commonAnimationSettings, y: -5 };

  let tooltipExists = false;
  let isTooltipVisible = false;
  let tooltipInset = INSET;
  let parentRef = null;
  let tooltipRef = null;
  let tooltipStyle = null;
  let tooltipArrowStyle = null;

  $: {
    tooltipStyle = `
    left: ${tooltipInset.left};
    right: ${tooltipInset.right};
    bottom: calc(${tooltipInset.bottom + 2}px);
    transform: translateX(${tooltipInset.translateX});
    `;

    tooltipArrowStyle = `bottom: calc(${tooltipInset.bottom - 4}px)`;
  }

  onMount(() => {
    if (parentRef.children.length !== 1) {
      throw new Error('Tooltip must wrap only one child');
    }
  });

  function createVisibleTooltipInset() {
    if (isTooltipVisible) {
      return tooltipInset;
    }

    const { left, right } = tooltipRef.getBoundingClientRect();
    const bottom = parentRef.children[0]
      ? parentRef.children[0].offsetHeight
      : 0;
    let newInset;

    switch (true) {
      case left < 0:
        newInset = { ...tooltipInset, left: 0, translateX: 0, bottom };
        break;

      case right > window.innerWidth:
        newInset = { right: 0, left: 'auto', translateX: 0, bottom };
        break;

      default:
        newInset = { ...INSET, bottom };
    }

    return newInset;
  }

  function showTooltip() {
    tooltipInset = createVisibleTooltipInset();
    isTooltipVisible = true;
  }

  function hideTooltip() {
    tooltipInset = INSET;
    isTooltipVisible = false;
  }
</script>

<style>
  .tooltip {
    text-align: center;
    font-size: 0.7em;
    background-color: #4a5568;
  }
  .tooltip-arrow {
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
  on:mouseenter={text ? () => (tooltipExists = true) : null}
  on:mouseleave={text ? () => (tooltipExists = false) : null}>

  <slot />
  {#if String(text).trim() && tooltipExists}
    <div>
      <div
        class="tooltip absolute px-3 py-1 rounded bg-gray-700 text-white"
        bind:this={tooltipRef}
        style={tooltipStyle}
        on:introstart={showTooltip}
        on:outroend={hideTooltip}
        in:fade={commonAnimationSettings}
        out:fly={flyAnimationSettings}>
        <p class="whitespace-no-wrap">{text}</p>
      </div>
      <span
        class="tooltip-arrow"
        style={tooltipArrowStyle}
        in:fade={commonAnimationSettings}
        out:fly={flyAnimationSettings} />
    </div>
  {/if}
</div>
