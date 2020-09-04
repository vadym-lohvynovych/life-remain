<script>
  import { onMount, onDestroy } from 'svelte';
  let ref;

  onMount(() => {
    document.body.appendChild(ref);
  });

  onDestroy(() => {
    document.body.removeChild(ref);
  });
</script>

<style>
  .portal-clone {
    display: none;
  }
</style>

<div class="portal-clone">
  <div bind:this={ref} class="fixed inset-0">
    <slot />
  </div>
</div>
