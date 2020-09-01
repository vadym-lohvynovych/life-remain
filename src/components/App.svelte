<script>
  import Slider from './Slider/Slider.svelte';
  import Datepicker from './Datepicker';
  import Quote from './Quote';
  import Slides from './Slides.svelte';
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

<header>
  <div class="container mx-auto p-3 sm:py-4 xl:py-5">
    <h1 class="text-2xl">LifeRemain</h1>
    <Quote />
    <Datepicker {options} value={birthDate.get()} />
  </div>
</header>

{#if $birthDate && $birthDate !== 'null'}
  <main>
    <div class="md:hidden py-8">
      <Slider>
        <Slides />
      </Slider>
    </div>
    <div class="hidden md:flex items-center justify-center py-8">
      <Slides />
    </div>
  </main>
{:else}
  <h2 class="px-5 py-2 text-2xl text-center">Please, choose date.</h2>
{/if}

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
