import React from 'react';
import { Case } from '../types';

interface CaseItemProps {
  caseData: Case;
}

const CaseItem: React.FC<CaseItemProps> = ({ caseData }) => {
  return (
    <div>
      <h3>{caseData.title}</h3>
      <p>{caseData.description}</p>
      {/* Add other case details as needed */}
    </div>
  );
};

export default CaseItem;
