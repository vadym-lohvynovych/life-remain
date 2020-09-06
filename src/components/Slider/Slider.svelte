<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { spring } from 'svelte/motion';
  import { asSlider } from '../../actions/slider';
  import {
    createSlidesXPoints,
    getIncreasedSlideIndex,
    getDecreasedSlideIndex
  } from './helpers';
  import { setWidthToElement } from '../../helpers/common';

  const x = spring(0, {
    stiffness: 0.07,
    damping: 0.35
  });

  let slider;
  let sliderContent;
  let slidesCount;
  let xOnSlideStart;
  let yOnSlideStart;
  let slidesXPoints;
  let activeSlideIndex = 0;
  const yInfelicity = 50;
  const xInfelicity = 50;
  // to calculate x on slidemove
  let currentTranslateX = 0;

  onMount(() => {
    window.addEventListener('resize', updateXPoints);

    slidesCount = sliderContent.children.length;

    setWidthToElement(`${80 * slidesCount}%`)(sliderContent);

    updateXPoints();

    Array.from(sliderContent.children).forEach(
      setWidthToElement(`${100 / slidesCount}%`)
    );
  });

  onDestroy(() => {
    window.removeEventListener('resize', updateXPoints);
  });

  function updateXPoints() {
    slidesXPoints =
      createSlidesXPoints(slider, sliderContent, slidesCount) || slidesXPoints;

    slidesXPoints.length && setX(slidesXPoints[activeSlideIndex]);
  }

  function setX(value) {
    $x = value;
    currentTranslateX = value;
  }

  function slideStart(e) {
    xOnSlideStart = e.detail.x;
    yOnSlideStart = e.detail.y;
  }

  function slideMove(e) {
    if (e.detail.dy < yInfelicity && e.detail.dy > -yInfelicity) {
      x.update(($x) => currentTranslateX + e.detail.dx);
    } else {
      setX(currentTranslateX);
    }
  }

  function slideEnd(e) {
    if (
      Math.abs(xOnSlideStart - e.detail.x) < xInfelicity ||
      Math.abs(yOnSlideStart - e.detail.y) > yInfelicity
    ) {
      // side scroll is small or y scroll is too big
      setX(currentTranslateX);
    } else if (xOnSlideStart > e.detail.x) {
      moveSlide(getIncreasedSlideIndex(activeSlideIndex, slidesCount));
    } else if (xOnSlideStart < e.detail.x) {
      moveSlide(getDecreasedSlideIndex(activeSlideIndex));
    }
  }

  function moveSlide(index) {
    activeSlideIndex = index;
    setX(slidesXPoints[activeSlideIndex]);
  }
</script>

<div
  class="slider overflow-x-hidden overflow-y-visible w-full"
  bind:this={slider}>
  <div
    class="slider-content cursor-pointer flex select-none"
    bind:this={sliderContent}
    use:asSlider
    on:slideStart={slideStart}
    on:slideMove={slideMove}
    on:slideEnd={slideEnd}
    style="transform: translateX({$x}px)">
    <slot />
  </div>
</div>
