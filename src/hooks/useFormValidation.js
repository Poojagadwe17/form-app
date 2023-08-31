import { useSelector } from 'react-redux';

const useFormValidation = (rules, isSubmitted) => {
  const formData = useSelector(state => state.formData);

  const errors = {};

  if (isSubmitted) {
    for (const field in rules) {
      const rule = rules[field];
      if (rule.required && !formData[field]) {
        errors[field] = 'This field is required';
      }
    }
  }

  return errors;
};

export default useFormValidation;
