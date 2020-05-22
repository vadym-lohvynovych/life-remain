
import Flatpickr from './Flatpickr.svelte';

export default { title: 'Date Picker' };

const options = {
  onChange: (selectedDates, dateStr, instance) => {
    console.log('options change', dateStr)
  },      
  altInput: true,
  maxDate: new Date()
}

function change(e) {
  console.log('on change', e)
}

export const FlatpickrAction = () => ({
  Component: Flatpickr,
  props: {
    options,
  },
  on: {
    change
  }
})
