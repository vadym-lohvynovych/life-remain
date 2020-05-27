<script>
  import { asFlatpickr } from '../../actions/flatpickr'

  export let options = {}
  export let value = null
  export let parentClassName = ''
</script>

<div class="pt-8 text-center {parentClassName}">
  <input
    class="field text-center rounded rounded-md block mx-auto mt-5"
    use:asFlatpickr={options}
    on:change
    bind:value />
</div>
