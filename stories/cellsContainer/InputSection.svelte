<script>
  export let header = '';
  export let infoText = '';
</script>

{#if header}
  <h2 class="text-center text-lg font-bold mt-4">{header}</h2>
{/if}

<div class="flex items-center justify-center mt-2">
  {#if infoText}
    <p class="mr-4">{infoText}</p>
  {/if}
  <slot />
</div>
