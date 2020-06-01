<script>
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

<header>
  <h1 class="text-2xl">LifeRemain</h1>
  <Quote />
  <Datepicker {options} value={birthDate.get()} />
</header>
