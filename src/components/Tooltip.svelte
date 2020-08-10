<script>
  // parent block has to have position: relative styles
  import { fly, fade } from 'svelte/transition';
  import { circIn } from 'svelte/easing';
  import { onMount } from 'svelte';

  export let text = '';

  const defaultTooltipInset = {
    left: '50%',
    right: 'auto',
    translateX: '-50%',
    bottom: 0
  };

  const commonAnimationSettings = { duration: 300 };
  const flyAnimationSettings = { ...commonAnimationSettings, y: -5 };

  let tooltipExists = false;
  let isTooltipVisible = false;
  let tooltipInset = defaultTooltipInset;
  let parentRef = null;
  let tooltipRef = null;

  onMount(() => {
    if (parentRef.children.length > 1) {
      throw new Error('Tooltip must wrap only one child');
    }
  });

  function getTooltipInset() {
    if (isTooltipVisible) {
      return tooltipInset;
    }

    const { left, right } = tooltipRef.getBoundingClientRect();
    const bottom = parentRef.children[0]
      ? parentRef.children[0].offsetHeight
      : 0;

    if (left < 0) {
      return {
        ...tooltipInset,
        left: 0,
        translateX: 0,
        bottom
      };
    } else if (right > window.innerWidth) {
      return {
        right: 0,
        left: 'auto',
        translateX: 0,
        bottom
      };
    } else {
      return { ...defaultTooltipInset, bottom };
    }
  }

  function showTooltip() {
    tooltipInset = getTooltipInset();
    isTooltipVisible = true;
  }

  function hideTooltip() {
    tooltipInset = defaultTooltipInset;
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
        style="left: {tooltipInset.left}; right: {tooltipInset.right}; bottom:
        calc({tooltipInset.bottom + 2}px); transform: translateX({tooltipInset.translateX})"
        on:introstart={showTooltip}
        on:outroend={hideTooltip}
        in:fade={commonAnimationSettings}
        out:fly={flyAnimationSettings}>
        <p class="whitespace-no-wrap">{text}</p>
      </div>
      <span
        class="tooltip-arrow"
        style="bottom: calc({tooltipInset.bottom - 4}px)"
        in:fade={commonAnimationSettings}
        out:fly={flyAnimationSettings} />
    </div>
  {/if}
</div>
