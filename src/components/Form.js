import React from 'react';
import { useDispatch } from 'react-redux';
import useConditionalLogic from '../hooks/useConditionalLogic';
import useFormValidation from '../hooks/useFormValidation';
import { useSelector } from 'react-redux';
import styles from './Form.module.css'; 

const Form = () => {
  const dispatch = useDispatch();
  const submitted = useSelector(state => state.submitted);

  const handleChange = (field, value) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
    dispatch({ type: 'CLEAR_SUBMITTED_DATA' }); 
  };

  const formData = useSelector(state => state.formData);
  const submittedData = useSelector(state => state.submittedData);
  const companyNameField = useConditionalLogic('companyName', 'employed', 'Yes');
 
  const validationRules = {
    companyName: {
      required: formData.employed === 'Yes'
    }
  };


  const formErrors = useFormValidation(validationRules, submitted);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length === 0) {
      dispatch({ type: 'SUBMIT_FORM' }); 
    }
  };

 
 
  const shouldDisplaySummary = submitted  && Object.keys(formErrors).length === 0;

  const renderSummary = () => {
    return (
      <div className={styles.summary}>
        <h2>Summary</h2>
        <p><strong>Are you employed?</strong> {submittedData.employed}</p>
        {submittedData.employed === 'Yes' && (
          <p><strong>Company Name:</strong> {submittedData.companyName}</p>
        )}
      </div>
    );
  };

  return (
    <div className={`${styles.center}`}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Are you employed?</label>
            <select
              className={styles.input}
              value={formData.employed}
              onChange={(e) => handleChange('employed', e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          {companyNameField && (
            <div className={styles.formGroup}>
              <label className={styles.label}>Company Name</label>
              <input
                className={styles.input}
                type="text"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
              />
            </div>
          )}
          <button className={styles.button} type="submit">
            Submit
          </button>
          {formData.employed === 'Yes' && Object.keys(formErrors).length > 0 && (
            <div className={`${styles.error} ${styles.formGroup}`}>
              {Object.values(formErrors).map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </form>
        {shouldDisplaySummary && renderSummary()}
      </div>
    </div>
  );
};


export default Form;
