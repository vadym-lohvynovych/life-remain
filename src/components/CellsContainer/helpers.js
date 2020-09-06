import { create, select } from 'd3';
import { get, each, entries } from 'lodash';
import { getTooltipElementsBounding } from './calculations';

const bgName = 'bg';
const textName = 'text';
const triangleName = 'triangle';

export const keyGetter = (key) => (r) => get(r, key);

export const getId = (name, index) => `${name}-${index}`;

export const setAttributes = (el, attrs = {}) => {
  each(entries(attrs), (attr) => el.attr(...attr));
};

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

  const bgEl = parent.append('rect');

  const textEl = parent
    .append('text')
    .text(rect.tooltipText)
    .attr('font-size', '12px');

  const triangleEl = parent.append('path');

  const { width, height } = textEl.node().getBoundingClientRect();

  const { textBounding, bgBounding, trianglePath } = getTooltipElementsBounding(
    {
      innerWidth,
      rect,
      text: {
        width,
        height,
        x: textX,
        y: textY
      },
      xPadding,
      yPadding,
      margin
    }
  );

  setAttributes(textEl, {
    id: textId,
    fill: tooltipColor,
    x: textBounding.x,
    y: textBounding.y
  });

  setAttributes(triangleEl, {
    fill: tooltipBackground,
    id: triangleId,
    d: trianglePath
  });

  setAttributes(bgEl, {
    x: bgBounding.x,
    y: bgBounding.y,
    width: bgBounding.width,
    height: bgBounding.height,
    id: bgId,
    fill: tooltipBackground,
    rx: 3,
    ry: 3
  });
}

export function removeTooltip(index) {
  select('#' + getId(bgName, index)).remove();
  select('#' + getId(textName, index)).remove();
  select('#' + getId(triangleName, index)).remove();
}
