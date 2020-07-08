<script>
  import { onMount, onDestroy } from 'svelte';
  export let total;
  export let color = '#c1c1c1';

  let ref = null;
  let visible = false;
  let padding = total < 500 ? 3 : 1;

  function makeSquareFromCell() {
    if (ref) {
      ref.style.height = ref.clientWidth + 'px';
    }
  }

  function showOnlyOnScreen(e) {
    const { top, bottom } = ref.getBoundingClientRect();

    if (window.innerHeight - top > 0 && bottom > 0) {
      visible = true;
      makeSquareFromCell();
    } else {
      visible = false;
    }
  }

  onMount(() => {
    // makeSquareFromCell();
    // window.addEventListener('resize', makeSquareFromCell);
    // window.addEventListener('scroll', showOnlyOnScreen);
  });

  onDestroy(() => {
    // window.removeEventListener('resize', makeSquareFromCell);
    // window.removeEventListener('scroll', showOnlyOnScreen);
  });
</script>

<div style="padding: {padding}px">
  <span
    bind:this={ref}
    style="background-color: {color}"
    class="block w-full h-3 rounded border border-black" />
</div>
