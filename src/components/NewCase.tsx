import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCase } from '../services/api';

interface NewCaseProps {
  // Add any necessary props here
}

const NewCase: React.FC<NewCaseProps> = () => {
  const [caseData, setCaseData] = useState({
    // Define caseData structure
    title: '',
    description: '',
    // ... other fields
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCaseData({ ...caseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await createCase(caseData);
      navigate('/cases'); // Redirect to case list after successful creation
    } catch (error: any) {
      // More robust error handling
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred while creating the case.');
      }
      console.error('Error creating case:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form elements for case data */}
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={caseData.title} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={caseData.description} onChange={handleChange} />
      </div>
      {/* ... other form elements */}
      <button type="submit">Create Case</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default NewCase;
