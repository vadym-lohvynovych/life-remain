import { create, select } from 'd3';
import { get } from 'lodash';
import { getElementOuterInset } from './calculations';

const bgName = 'bg';
const textName = 'text';
const triangleName = 'triangle';

export const keyGetter = (key) => (r) => get(r, key);

export const getId = (name, index) => `${name}-${index}`;

export function setAttributes(el, attributesModel) {
  Object.keys(attributesModel).forEach((attr) => {
    el.attr(attr, attributesModel[attr]);
  });
}

export const createSvg = (width, height) =>
  create('svg').attr('width', width).attr('height', height);

export function createRectsFromData(parent, data) {
  parent
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('rx', 3)
    .attr('ry', 3)
    .style('cursor', 'pointer');
}

export function updateRectsData(parent, data) {
  const rects = parent.selectAll('rect').data(data);
  rects.exit().remove();
  rects
    .enter()
    .append('rect')
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

export function addSelectionEventListeners(selection, eventsModel) {
  Object.keys(eventsModel).forEach((event) => {
    selection.on(event, eventsModel[event]);
  });
}

export function createTooltip(parent, rect, innerWidth, margin) {
  const tooltipBackground = '#4a5568';
  const tooltipColor = 'MintCream';
  const xPadding = 5;
  const yPadding = 2;
  const textY = rect.y - 8;
  const textX = rect.x + xPadding;

  const bgId = getId(bgName, rect.index);
  const textId = getId(textName, rect.index);
  const triangleId = getId(triangleName, rect.index);

  const bg = parent.append('rect');

  const text = parent.append('text').text(rect.tooltipText);

  const triangle = parent.append('path');

  setAttributes(text, {
    id: textId,
    fill: tooltipColor,
    x: textX,
    y: textY,
    'font-size': '12px'
  });

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
    height: height + yPadding * 2,
    id: bgId,
    fill: tooltipBackground,
    rx: 3,
    ry: 3
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

  const { outerLeft, outerRight } = getElementOuterInset(bg, margin);

  if (outerRight > innerWidth + margin.right) {
    //outside right
    const offset = outerRight - innerWidth + xPadding * 2 - margin.right;
    bg.attr('x', bg.attr('x') - offset);
    text.attr('x', text.attr('x') - offset);
  } else if (outerLeft < 0) {
    //outside left
    bg.attr('x', -margin.left);
    text.attr('x', xPadding - margin.left);
  }
}

export function removeTooltip(index) {
  select('#' + getId(bgName, index)).remove();
  select('#' + getId(textName, index)).remove();
  select('#' + getId(triangleName, index)).remove();
}
