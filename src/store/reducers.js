const initialState = {
    formData: {
      employed: '',
      companyName: '',
    },
    submittedData: null,
    submitted: false, 
  };
  
  
  const formReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_FIELD':
        return {
          ...state,
          formData: {
            ...state.formData,
            [action.field]: action.value,
          },
        };
      case 'TOGGLE_FIELD_VISIBILITY':
        return {
          ...state,
          formData: {
            ...state.formData,
            [action.field]: '',
          },
        };
        case 'SUBMIT_FORM':
            return {
              ...state,
              submitted: true,
              submittedData: state.formData, 
             
            };
        case 'CLEAR_SUBMITTED_DATA':
             return {
                  ...state,
                  submittedData: null,
                  submitted: false,
                };    

      default:
        return state;
    }
  };
  
  export default formReducer;
  