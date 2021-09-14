import { useState, useEffect } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  // in order to fix the bug on edit a Product where we do not get the values populated on the form ==> useForm initial state is an empty object. We need to watch the values with useEffect.

  const initialValues = Object.values(initial).join('');
  // join is just to have a string to check either empty string or values of the product.

  useEffect(() => {
    // this function runs when the thinks we are watching (form values) change
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    // for the files (picture) upload
    if (type === 'file') {
      [value] = e.target.files;
    }
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  // return things we want ot surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
