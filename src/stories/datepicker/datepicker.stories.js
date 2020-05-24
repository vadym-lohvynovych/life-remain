import Flatpickr from './Datepicker.svelte'

export default { title: 'Date Picker' }

const options = {
  onChange: (selectedDates, dateStr, instance) => {
    console.log('options change', dateStr)
  },
  altInput: true,
  inline: true,
  maxDate: new Date(),
  static: true,
}

export const DatePicker = () => ({
  Component: Flatpickr,
  props: {
    options
  }
})
