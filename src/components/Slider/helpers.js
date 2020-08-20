import { getPercent } from '../../helpers/common';

export function createSlidesXPoints(
  sliderContainer,
  sliderContent,
  slidesCount
) {
  //prevent console errors
  if (!sliderContainer || !sliderContent) return null;

  return Array(slidesCount)
    .fill()
    .map((_, i) => {
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
