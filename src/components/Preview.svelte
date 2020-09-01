<script>
  export let lifeItems = [0, 0];
  export let name = '';
  export let showFullScreenComponent = () => void 0;
  export let percent = 0;

  $: gradient = `linear-gradient(0deg, #ff9292 ${percent}%, #a4f0ff ${
    percent + 10
  }%, #a4f0ff 100%)`;
</script>

<style>
  .preview {
    min-width: 200px;
    min-height: 300px;
  }
</style>

<div
  style="background: {gradient}"
  class="preview p-8 text-center mx-5 rounded cursor-pointer border-2
  border-gray-700 hover:border-red-500 duration-200"
  on:click={showFullScreenComponent}>
  <h2 class="font-bold text-3xl">{name}</h2>
  <h3 class="font-bold text-xl">{lifeItems[0]}/{lifeItems[1]}</h3>
</div>
