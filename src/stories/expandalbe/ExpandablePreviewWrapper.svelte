<script>
  import Preview from '../../components/Preview.svelte';
  import TestPreview from './TestPreview.svelte';
</script>

<style>
  .wide {
    width: 45vw;
  }
</style>

<h3 class="text-center mt-5 text-lg">lessThan = 500</h3>
<div class="mt-8 flex justify-center">
  <Preview lessThan={500} preview={TestPreview}>
    <div
      class="w-64 h-64 border-2 border-red-200 shadow-outline rounded-lg
      bg-teal-400 text-center py-5 px-2">
      CONTENT
    </div>
  </Preview>
</div>

<h3 class="text-center mt-5 text-lg">lessThan = 200</h3>
<div class="mt-8 flex justify-center">
  <Preview lessThan={200} preview={TestPreview}>
    <div
      class="w-64 h-64 border-2 border-red-200 shadow-outline rounded-lg
      bg-teal-400 text-center py-5 px-2">
      CONTENT
    </div>
  </Preview>
</div>

<h3 class="text-center mt-5 text-lg">lessThan = 200; contentWidth: 45vw;</h3>
<div class="mt-8 flex justify-center">
  <Preview lessThan={200} preview={TestPreview}>
    <div
      class="wide h-64 border-2 border-red-200 shadow-outline rounded-lg
      bg-teal-400 text-center py-5 px-2">
      CONTENT
    </div>
  </Preview>
</div>
