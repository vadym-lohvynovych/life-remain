<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import arrow from '../../assets/images/arrow-black.svg';

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

<style>
  img {
    max-width: 100%;
    max-height: 100%;
  }
</style>

<div class="h-full bg-indigo-200 shadow-outline p-5">
  {#if isFullVisible}
    <div class="text-left" on:click={hideFullScreenComponent}>
      <button
        class="w-10 h-10 p-2 cursor-pointer"
        in:fade={{ duration: 200 }}
        out:fade={{ duration: 200 }}>
        <img src={arrow} alt="go back" />
      </button>
    </div>
    <p
      in:fly={{ duration: 300, y: -30 }}
      out:fade={{ duration: 100 }}
      class="text-center py-5 px-2 font-hairline text-2xl my-12">
      You can see me:)
    </p>
  {/if}

</div>
