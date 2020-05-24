<script>
  import { asFlatpickr } from '../../actions/flatpickr'

  export let value = null
  export let options = {}
</script>

<div class="pt-8 text-center">
  <input
    class="field text-center rounded rounded-md block w-full mx-auto"
    use:asFlatpickr={options}
    on:change
    bind:value />
</div>
