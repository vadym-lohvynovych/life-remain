<script>
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion';
  import { asSlider } from '../../actions/slider';

  const x = spring(0, {
    stiffness: 0.06,
    damping: 0.3
  });

  let slider;
  let sliderContent;
  let slidesCount;
  let xOnSlideStart;
  let sliderPoints;
  let activeSlideIndex = 1;
  // to calculate x on slidemove
  let currentTranslateX = 0;

  onMount(() => {
    window.addEventListener('resize', () => {
      sliderPoints = createSliderPoints();

      setX(sliderPoints[activeSlideIndex]);
    });

    slidesCount = sliderContent.children.length;

    sliderContent.style.width = 80 * slidesCount + '%';

    sliderPoints = createSliderPoints();

    setX(sliderPoints[activeSlideIndex]);

    sliderContent.children.forEach(child => {
      child.style.width = 100 / slidesCount + '%';
    });
  });

  function setX(value) {
    $x = value;
    currentTranslateX = value;
  }

  function createSliderPoints() {
    //prevent console errors
    if (!slider || !sliderContent) return sliderPoints;
    let points = [];
    for (let i = 0; i < slidesCount; i++) {
      const offset = (slider.offsetWidth / 100) * 10;
      points[i] = (sliderContent.offsetWidth / slidesCount) * -i + offset;
    }
    return points;
  }

  function slideStart(e) {
    xOnSlideStart = e.detail.x;
  }

  function slideMove(e) {
    x.update($x => currentTranslateX + e.detail.dx);
  }

  function slideEnd(e) {
    if (Math.abs(xOnSlideStart - e.detail.x) < 30) {
      //do not move
      $x = currentTranslateX;
    } else if (xOnSlideStart > e.detail.x) {
      // move to next slide
      activeSlideIndex =
        activeSlideIndex === slidesCount - 1
          ? activeSlideIndex
          : activeSlideIndex + 1;

      setX(sliderPoints[activeSlideIndex]);
    } else if (xOnSlideStart < e.detail.x) {
      // move to previous slide
      activeSlideIndex = activeSlideIndex === 0 ? 0 : activeSlideIndex - 1;
      setX(sliderPoints[activeSlideIndex]);
    }
  }
</script>

<style>
  .slider {
    width: 100%;
    overflow: hidden;
  }
  .slider-content {
    user-select: none;
  }
</style>

<div class="slider" bind:this={slider}>
  <div
    class="slider-content cursor-pointer flex py-5"
    bind:this={sliderContent}
    use:asSlider
    on:slideStart={slideStart}
    on:slideMove={slideMove}
    on:slideEnd={slideEnd}
    style="transform: translateX({$x}px)">
    <slot />
  </div>
</div>
