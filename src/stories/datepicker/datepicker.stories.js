import Datepicker from './Datepicker.svelte'

export default { title: 'Date Picker' }
import { date } from '../../stores'

const change = (selectedDates, dateStr, instance) => {
  date.set(dateStr)
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
  Component: Datepicker,
  props: {
    options: defaultOptions,
    parentClassName: 'px-8',
  },
})

export const DatePickerInlineStatic = () => ({
  Component: Datepicker,
  props: {
    options: {
      ...defaultOptions,
      ...optionsInline,
    },
  }
})
