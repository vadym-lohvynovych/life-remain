<script>
  import { onMount, onDestroy } from 'svelte';
  import { select } from 'd3';
  import {
    createSvg,
    createTooltip,
    removeTooltip,
    createRectsFromData,
    addSelectionEventListeners,
    setAttributes,
    updateRectsData,
    keyGetter
  } from './helpers';
  import {
    calculateSvgHeight,
    createRectsData,
    getRectTableSize
  } from './calculations';

  export let count = 2;
  export let size = 100;
  export let gap = 1;
  export let getAdditionalRectProps;

  export let color = 'SteelBlue';
  export let hoverColor = 'DarkGoldenRod';
  export let margin = { top: 20, left: 20, right: 20, bottom: 20 };

  let containerRef = null;
  let svg = null;
  let g = null;
  let data = [...Array(count)];
  let containerWidth = 0;
  let height = 0;
  let innerWidth = 0;

  const rectEventsModel = {
    mouseover: handleRectMouseover,
    mouseout: handleRectMouseout
  };

  $: {
    if (containerWidth) {
      innerWidth = containerWidth - margin.left - margin.right;

      const rectSize = size + gap * 2;
      const { rowsAmount } = getRectTableSize(rectSize, innerWidth, count);

      height = calculateSvgHeight(rectSize, rowsAmount, margin);

      data = createRectsData({
        containerWidth: innerWidth,
        count,
        size,
        gap,
        getAdditionalRectProps,
        color,
        hoverColor
      });

      if (svg && g) {
        setAttributes(svg, { width: containerWidth, height });
        g.style('transform', `translate(${margin.left}px, ${margin.top}px)`);

        updateRectsData(g, data);

        addSelectionEventListeners(g.selectAll('rect'), rectEventsModel);
      }
    }
  }

  onMount(() => {
    svg = createSvg(containerWidth, height);
    g = svg.append('g');

    containerRef.appendChild(svg.node());

    createRectsFromData(g, data);

    addSelectionEventListeners(g.selectAll('rect'), rectEventsModel);
  });

  function handleRectMouseover(e, rect) {
    select(e.target)
      .transition()
      .attr('fill', keyGetter('hoverColor'))
      .duration(150);

    if (rect.tooltipText) {
      createTooltip(g, rect, innerWidth, margin);
    }
  }

  function handleRectMouseout(e, rect) {
    select(e.target)
      .transition()
      .attr('fill', keyGetter('color'))
      .duration(150);

    if (rect.tooltipText) {
      removeTooltip(rect.index);
    }
  }
</script>

<div bind:clientWidth={containerWidth} bind:this={containerRef} />
