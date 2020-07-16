<script>
  export let total = 1;
  export let index = 0;
  export let color = '#c1c1c1';
  export let size = 40;

  let padding = total < 500 ? 3 : 1;
</script>

<div style="padding: {padding}px">
  <span
    on:click={() => console.log(index)}
    style="background-color: {color}; width: {size}px; height: {size}px"
    class="block cursor-pointer rounded duration-100 hover:shadow-outline" />
</div>
