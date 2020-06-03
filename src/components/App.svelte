<script>
  import Slider from './Slider';
  import TestSlide from './TestSlide';
  import Datepicker from './Datepicker';
  import Quote from './Quote';

  import { birthDate } from '../stores/birthDate';

  const change = (selectedDates, dateStr, instance) => {
    birthDate.set(dateStr);
  };
  const options = {
    onChange: change,
    maxDate: new Date(),
    altInput: true
  };
</script>

<style>

</style>

<header>
  <div class="container mx-auto p-3 sm:py-4 xl:py-5">
    <h1 class="text-2xl">LifeRemain</h1>
    <Quote />
    <Datepicker {options} value={birthDate.get()} />
  </div>
</header>
<main>
  <div class="lg:hidden py-8">
    <Slider>
      {#each [1, 2, 3] as number (number)}
        <TestSlide {number} />
      {/each}
    </Slider>
  </div>
  <div class="hidden lg:flex items-center py-8">
    {#each [1, 2, 3] as number (number)}
      <TestSlide {number} />
    {/each}
  </div>
</main>
<footer>
  <div class="container mx-auto p-3 sm:py-4 xl:py-5">
    <p class="text-sm md:text-base text-gray-700">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam non
      provident quae officiis ex, a iusto vitae iure ea similique laudantium
      repellendus sed laborum dolorem soluta nemo velit expedita? Id quasi
      corporis illo aut nam minus, cupiditate facilis, minima consequatur eius
      totam rerum eos reiciendis tenetur non repellat beatae ipsum.
    </p>
  </div>
</footer>
