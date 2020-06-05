<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  export let hideFullScreenComponent = () => {
    console.warn('You should specify "hideFullScreenComponent"');
  };
  export let isFullVisible = false;

  function closeOnEsc(e) {
    if (e.which === 27) {
      hideFullScreenComponent();
    }
  }
  onMount(() => {
    document.body.addEventListener('keydown', closeOnEsc);
  });

  onDestroy(() => {
    document.body.removeEventListener('keydown', closeOnEsc);
  });
</script>

<div class="h-full bg-indigo-200 shadow-outline py-5 px-12">
  {#if isFullVisible}
    <div class="text-right" on:click={hideFullScreenComponent}>
      <span
        in:fade
        class="text-center py-1 px-5 border-2 transition duration-200
        border-blue-800 cursor-pointer hover:border-blue-400 hover:bg-blue-800
        hover:text-white">
        Close me
      </span>
    </div>
    <p
      in:fly={{ duration: 300, y: -30 }}
      out:fade={{ duration: 100 }}
      class="text-center py-5 px-2 font-hairline text-2xl my-12">
      You can see me:)
    </p>
  {/if}

</div>
