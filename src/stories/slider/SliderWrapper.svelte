<script>
  import Slider from './Slider.svelte';
</script>

<style>
  p {
    height: 500px;
  }
</style>

<div class="py-5">
  <Slider>
    <p
      class="p-5 text-center rounded rounded-lg shadow-xl border-4
      border-indigo-300 shadow-xl bg-gray-300 text-blue-500 mx-3">
      Slide #1
    </p>
    <p
      class="p-5 text-center rounded rounded-lg shadow-xl border-4
      border-indigo-300 shadow-xl bg-gray-300 text-blue-500 mx-3">
      Slide #2
    </p>
    <p
      class="p-5 text-center rounded rounded-lg shadow-xl border-4
      border-indigo-300 shadow-xl bg-gray-300 text-blue-500 mx-3">
      Slide #3
    </p>
    <p
      class="p-5 text-center rounded rounded-lg shadow-xl border-4
      border-indigo-300 shadow-xl bg-gray-300 text-blue-500 mx-3">
      Slide #4
    </p>
  </Slider>
</div>
