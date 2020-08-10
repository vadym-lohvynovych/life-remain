import Datepicker from '../../components/Datepicker.svelte';
import { birthDate } from '../../stores/birthDate';

export default { title: 'Date Picker' };

const change = (selectedDates, dateStr, instance) => {
  birthDate.set(dateStr);
};

const inputFieldClass = 'text-center mx-auto mt-5 shadow-lg';

const defaultOptions = {
  onChange: change,
  altInput: true,
  maxDate: new Date()
};

const optionsInline = {
  inline: true,
  static: true
};

export const DatePickerToggable = () => ({
  Component: Datepicker,
  props: {
    options: defaultOptions,
    inputFieldClass,
    containerClass: 'px-8',
    value: birthDate.get()
  }
});

export const DatePickerInlineStatic = () => ({
  Component: Datepicker,
  props: {
    options: {
      ...defaultOptions,
      ...optionsInline
    },
    containerClass: 'text-center',
    inputFieldClass,
    value: birthDate.get()
  }
});
