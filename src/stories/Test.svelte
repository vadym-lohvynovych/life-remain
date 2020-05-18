<script>
  export let type = 'blue';
  export let text = 'Tailwind!!!';

  const bgClass =
    type === 'blue' ? 'bg-blue-300' : type === 'red' ? 'bg-red-300' : '';

  const bgHoverClass =
    type === 'blue'
      ? 'hover:bg-blue-400'
      : type === 'red'
      ? 'hover:bg-red-400'
      : '';
</script>

<style>

</style>

<div
  class="border-2 border-gray-600 rounded text-center px-2 py-5 $ {bgClass}
  {bgHoverClass} shadow-xl hover:shadow-2xl my-8 w-1/2 mx-auto font-bold
  cursor-pointer transition duration-200 ease-in-out">
  {text}
</div>
