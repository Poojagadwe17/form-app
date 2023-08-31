import { useSelector } from 'react-redux';

const useConditionalLogic = (field, conditionField, conditionValue) => {
  const formData = useSelector(state => state.formData);

  return formData[conditionField] === conditionValue ? field : null;
};

export default useConditionalLogic;
