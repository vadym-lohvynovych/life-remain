<script>
  export let activeButtonIndex = null;
  export let index = null;
  export let buttonClassName = '';
  export let text = '';
  export let onClick = () => {};
</script>

<button
  on:click={onClick}
  class="{buttonClassName}
  {activeButtonIndex === index ? 'bg-red-300' : 'bg-blue-400'}">
  {text}
</button>
