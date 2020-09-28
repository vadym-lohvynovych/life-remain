<script>
  import { onMount } from 'svelte';
  import { select, axisLeft, scalePoint } from 'd3';
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
    getRectTableSize,
    createDomain,
    createRange
  } from './calculations';

  export let count = 2;
  export let size = 100;
  export let gap = 1;
  export let getAdditionalRectProps;

  export let color = 'SteelBlue';
  export let hoverColor = 'DarkGoldenRod';
  export let margin = { top: 20, left: 35, right: 35, bottom: 20 };

  let containerRef = null;
  let svg = null;
  let g = null;
  let axis = null;
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
      const { rowsAmount, colsAmount } = getRectTableSize(
        rectSize,
        innerWidth,
        count
      );

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

      if (svg && g && axis) {
        setAttributes(svg, { width: containerWidth, height });
        g.style('transform', `translate(${margin.left}px, ${margin.top}px)`);

        updateRectsData(g, data);

        const axisData = scalePoint()
          .domain(createDomain(rowsAmount, colsAmount))
          .range(createRange(height, margin, rectSize));

        axis.call(axisLeft(axisData));

        addSelectionEventListeners(g.selectAll('rect'), rectEventsModel);
      }
    }
  }

  onMount(() => {
    svg = createSvg(containerWidth, height);
    g = svg.append('g');
    axis = svg.append('g');

    axis.attr('transform', 'translate(30,0)');

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
