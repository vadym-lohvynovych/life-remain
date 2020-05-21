
import DatePicker from './DatePicker.svelte';

export default { title: 'Date Picker' };

export const Default = () => ({
  Component: DatePicker,
  props: {
    options: {
      onChange: (selectedDates, dateStr, instance) => {
        console.log('options change', dateStr)
      },      
      altInput: true,
      maxDate: new Date()
    }
  },
  on: {
    change(e) {
      console.log('on change', e)
    }
  }
});
