import { useEffect, useState } from 'react';
import { Case } from '../types';
import { getCases } from '../services/api';
import CaseItem from './CaseItem';

const CaseList: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await getCases();
        if (response.status === 200) {
          setCases(response.data);
        } else {
          setError(`Error fetching cases: ${response.status} ${response.statusText}`);
        }
      } catch (error: any) {
        setError(error.message || 'An unexpected error occurred.');
        console.error('Error fetching cases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      {cases.map((c) => (
        <CaseItem key={c.id} caseData={c} />
      ))}
    </div>
  );
};

export default CaseList;
