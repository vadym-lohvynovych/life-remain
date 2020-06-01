<script>
  import Header from './Header';
  import Slider from './Slider';
  import TestSlide from './TestSlide';
  import Footer from './Footer';
</script>

<style>

</style>

<div class="container mx-auto p-3 sm:py-4">
  <Header />
</div>
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
<div class="container mx-auto p-3 sm:py-4">
  <Footer />
</div>
