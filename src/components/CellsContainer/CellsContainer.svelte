<script>
  import { onMount, onDestroy } from 'svelte';
  import { select } from 'd3';
  import { createSvg, getId, createRectsData, setAttributes } from './helpers';

  export let count = 2;
  export let size = 100;
  export let gap = 1;
  export let getAdditionalRectProps;
  export let tooltipBackground = '#4a5568';
  export let tooltipColor = 'MintCream';
  export let color = 'SteelBlue';
  export let hoverColor = 'IndianRed';
  export let margin = { top: 20, left: 20, right: 20, bottom: 20 };

  let containerRef = null;
  let svg = null;
  let g = null;
  let data = [...Array(count)];
  let containerWidth = 0;
  let height = 0;
  let innerWidth = 0;

  $: {
    if (containerWidth) {
      innerWidth = containerWidth - margin.left - margin.right;

      const rectSize = size + gap * 2;
      const colsAmount = Math.floor(innerWidth / rectSize);
      const rowsAmount = Math.ceil(count / colsAmount);

      height = rectSize * rowsAmount + margin.top + margin.bottom;

      data = createRectsData({
        containerWidth: innerWidth,
        count,
        size,
        gap,
        getAdditionalRectProps,
        color,
        hoverColor
      });

      updateSvgElementsSizes();
      updateRects();
    }
  }

  const keyGetter = (key) => (r) => r[key];

  onMount(() => {
    svg = createSvg(containerWidth, height);
    g = svg.append('g');

    containerRef.appendChild(svg.node());

    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('rx', 3)
      .attr('ry', 3)
      .style('cursor', 'pointer')
      .on('mouseover', handleRectHover)
      .on('mouseout', handleRectMouseout);
  });

  function updateSvgElementsSizes() {
    svg && svg.attr('width', containerWidth).attr('height', height);
    g && g.style('transform', `translate(${margin.left}px, ${margin.top}px)`);
  }

  function updateRects() {
    if (g) {
      const rects = g.selectAll('rect').data(data);
      rects.exit().remove();
      rects
        .enter()
        .append('rect')
        .on('mouseover', handleRectHover)
        .on('mouseout', handleRectMouseout)
        .merge(rects)
        .attr('fill', keyGetter('color'))
        .attr('rx', 3)
        .attr('ry', 3)
        .attr('x', keyGetter('x'))
        .attr('y', keyGetter('y'))
        .attr('width', keyGetter('size'))
        .attr('height', keyGetter('size'))
        .style('cursor', 'pointer');
    }
  }

  function handleRectHover(e, rect) {
    select(this)
      .transition()
      .attr('fill', keyGetter('hoverColor'))
      .duration(150);

    if (rect.tooltipText) {
      createTooltip(rect);
    }
  }

  function createTooltip(rect) {
    const xPadding = 5;
    const yPadding = 2;
    const textY = rect.y - 8;
    const textX = rect.x + xPadding;

    const [bgId, textId, triangleId] = [
      getId('bg', rect.index),
      getId('text', rect.index),
      getId('triangle', rect.index)
    ];

    const bg = g.append('rect');

    const text = g.append('text').text(rect.tooltipText);

    const triangle = g.append('path');

    setAttributes(text, {
      id: textId,
      fill: tooltipColor,
      x: textX,
      y: textY,
      'font-size': '12px'
    });

    setAttributes(bg, { id: bgId, fill: tooltipBackground, rx: 3, ry: 3 });

    setAttributes(triangle, {
      fill: tooltipBackground,
      id: triangleId,
      d: `M ${rect.x + rect.size / 2} ${rect.y} l 3 -3 l -6 0 z`
    });

    const { width, height } = text.node().getBoundingClientRect();
    const bgWidth = width + xPadding * 2;

    setAttributes(bg, {
      x: rect.x,
      y: textY - height + yPadding,
      width: bgWidth,
      height: height + yPadding * 2
    });

    if (Number(bg.attr('y')) + Number(margin.top) < 0) {
      //outside top
      const margin = rect.y + rect.size + 2;
      bg.attr('y', margin);
      text.attr('y', margin + height - yPadding);
      triangle.attr(
        'd',
        `M ${rect.x + rect.size / 2} ${rect.y + rect.size} l -3 3 l 6 0 z`
      );
    }

    // centrating
    if (bgWidth > rect.size) {
      const offset = (bgWidth - rect.size) / 2;
      bg.attr('x', rect.x - offset);
      text.attr('x', textX - offset);
    } else if (bgWidth < rect.size) {
      const offset = (rect.size - bgWidth) / 2;
      bg.attr('x', rect.x + offset);
      text.attr('x', textX + offset);
    }

    const bgOuterLeft = Number(bg.attr('x')) + Number(margin.left);
    const bgOuterRight = bgOuterLeft + bgWidth - margin.right;

    if (bgOuterRight > innerWidth + margin.right) {
      //outside right
      const offset = bgOuterRight - innerWidth + xPadding * 2 - margin.right;
      bg.attr('x', bg.attr('x') - offset);
      text.attr('x', text.attr('x') - offset);
    } else if (bgOuterLeft < 0) {
      //outside left
      bg.attr('x', -margin.left);
      text.attr('x', xPadding - margin.left);
    }
  }

  function removeTooltip(index) {
    select('#' + getId('text', index)).remove();
    select('#' + getId('bg', index)).remove();
    select('#' + getId('triangle', index)).remove();
  }

  function handleRectMouseout(e, rect) {
    select(this).transition().attr('fill', keyGetter('color')).duration(150);

    if (rect.tooltipText) {
      removeTooltip(rect.index);
    }
  }
</script>

<div bind:clientWidth={containerWidth} bind:this={containerRef} />
