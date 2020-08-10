<script>
  import { asFlatpickr } from '../actions/flatpickr';

  export let options = {};
  export let value = null;
  export let containerClass = '';
  export let inputFieldClass = '';
</script>

<style>
  input {
    box-shadow: 0 0 7px #d2d2d2, 0 0 4px #c3d1ea inset;
    background: #f5fffd;
  }
  input:focus {
    box-shadow: 0 0 10px #cecece, 0 0 4px #c3d1ea inset;
  }
</style>

<div class={containerClass}>
  <input
    class="field {inputFieldClass}"
    use:asFlatpickr={options}
    on:change
    bind:value />
</div>
