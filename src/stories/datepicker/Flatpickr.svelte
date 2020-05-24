<script>
  import { asFlatpickr } from '../../actions/flatpickr'

  export let value = null
  export let options = {}
</script>

<div class="px-8">
  <input class="field w-full" use:asFlatpickr={options} on:change bind:value />
</div>
