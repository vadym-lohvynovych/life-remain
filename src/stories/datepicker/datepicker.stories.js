import Flatpickr from './Datepicker.svelte'

export default { title: 'Date Picker' }

const change = (selectedDates, dateStr, instance) => {
  console.log('options change', dateStr)
}

const defaultOptions = {
  onChange: change,
  altInput: true,
  maxDate: new Date(),
}

const optionsInline = {
  inline: true,
  static: true,
}

export const DatePickerToggable = () => ({
  Component: Flatpickr,
  props: {
    options: defaultOptions,
    parentClassName: 'px-8',
  },
})

export const DatePickerInlineStatic = () => ({
  Component: Flatpickr,
  props: {
    options: {
      ...defaultOptions,
      ...optionsInline,
    },
  },
})
