import { getPercent } from '../../helpers/common';
import { map } from 'lodash';

export function createSlidesXPoints(
  sliderContainer,
  sliderContent,
  slidesCount
) {
  //prevent console errors
  if (!sliderContainer || !sliderContent) return null;

  return map(Array(slidesCount), (_, i) => {
    const offset = getPercent(sliderContainer.offsetWidth, 10);
    return (sliderContent.offsetWidth / slidesCount) * -i + offset;
  });
}

export function getIncreasedSlideIndex(activeSlideIndex, slidesCount) {
  return activeSlideIndex === slidesCount - 1
    ? activeSlideIndex
    : activeSlideIndex + 1;
}

export function getDecreasedSlideIndex(activeSlideIndex) {
  return activeSlideIndex === 0 ? 0 : activeSlideIndex - 1;
}
