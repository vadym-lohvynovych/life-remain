import Datepicker from './Datepicker.svelte'

export default { title: 'Date Picker' }
import { birthDate } from '../../stores/birthDate'
import { get } from 'svelte/store';


let date = get(birthDate)
const change = (selectedDates, dateStr, instance) => {
  birthDate.set(dateStr)
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
    value: date
  },
})

export const DatePickerInlineStatic = () => ({
  Component: Datepicker,
  props: {
    options: {
      ...defaultOptions,
      ...optionsInline,
    },
    value: date
  }
})
