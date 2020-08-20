<script>
  import { onMount, onDestroy } from 'svelte';
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
  let slidesXPoints;
  let activeSlideIndex = 0;
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
  }

  function slideMove(e) {
    x.update(($x) => currentTranslateX + e.detail.dx);
  }

  function slideEnd(e) {
    if (Math.abs(xOnSlideStart - e.detail.x) < 30) {
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

<style>
  .slider {
    width: 100%;
    overflow-x: hidden;
  }
  .slider-content {
    user-select: none;
  }
</style>

<div class="slider" bind:this={slider}>
  <div
    class="slider-content cursor-pointer flex"
    bind:this={sliderContent}
    use:asSlider
    on:slideStart={slideStart}
    on:slideMove={slideMove}
    on:slideEnd={slideEnd}
    style="transform: translateX({$x}px)">
    <slot />
  </div>
</div>
