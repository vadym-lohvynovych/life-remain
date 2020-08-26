<script>
  export let showFullScreenComponent = null;
  export let name = '';
</script>

<style>
  div {
    min-height: 60vh;
  }
</style>

<div
  on:click={showFullScreenComponent}
  class="p-5 text-center border border-gray-400 rounded-lg shadow-lg bg-blue-200
  w-64 mx-8">
  <p>{name} preview</p>
</div>
<h2 class="text-lg text-center text-red-400">{name}</h2>
