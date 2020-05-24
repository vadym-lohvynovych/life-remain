<script>
  import { asFlatpickr } from '../../actions/flatpickr'

  export let value = null
  export let options = {}
  export let parentClassName = ''
  export let inputClass = ''
</script>

<div class="pt-8 text-center {parentClassName}">
  <input
    class="field text-center rounded rounded-md block mx-auto"
    use:asFlatpickr={options}
    on:change
    bind:value />
</div>
