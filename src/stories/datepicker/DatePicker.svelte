<script>
  import Flatpickr from 'svelte-flatpickr'
  import 'flatpickr/dist/flatpickr.css'

  export let options = {}
  export let date = null
  export let placeholder = 'Select Date...'
</script>

<div class="px-6">
  <Flatpickr
    class="py-1 px-5 border-2 border-gray-300 block mx-auto mt-5 text-center
    md:text-left outline-none focus:border-gray-400 focus:shadow-lg
    transition-all duration-200 flex items-center w-full sm:w-auto"
    {options}
    on:change
    bind:value={date}
    {placeholder} />
</div>
