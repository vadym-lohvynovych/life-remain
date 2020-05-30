<script>
  import { asFlatpickr } from '../../actions/flatpickr';

  export let options = {};
  export let value = null;
  export let parentClass = '';
  export let additionalClass = '';
</script>

<div class="pt-8 text-center {parentClass}">
  <input
    class="field {additionalClass}"
    use:asFlatpickr={options}
    on:change
    bind:value />
</div>
