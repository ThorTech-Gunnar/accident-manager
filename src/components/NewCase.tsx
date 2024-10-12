import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const NewCase: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    location: '',
    witnesses: '',
    employees: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const caseId = uuidv4();
      const storageChoice = localStorage.getItem('storageChoice') || 'local';
      
      let fileUrl = '';
      if (selectedFile) {
        fileUrl = await storeFile(caseId, selectedFile, storageChoice);
      }

      const newCase = {
        id: caseId,
        ...formData,
        status: 'Open',
        fileUrl,
      };

      // Simulate storing the case data
      const cases = JSON.parse(localStorage.getItem('cases') || '[]');
      cases.push(newCase);
      localStorage.setItem('cases', JSON.stringify(cases));

      console.log('New case created:', newCase);
      navigate('/cases');
    } catch (error) {
      console.error('Error creating case:', error);
      // TODO: Show error message to user
    }
  };

  const storeFile = async (caseId: string, file: File, storageChoice: string): Promise<string> => {
    if (storageChoice === 'onedrive') {
      // Simulate OneDrive file storage
      return `onedrive://${caseId}/${file.name}`;
    } else {
      // Simulate local file storage
      const localPath = localStorage.getItem('localStoragePath') || '/default/path';
      return `${localPath}/${caseId}/${file.name}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate(-1)} className="btn-secondary">
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Create New Case</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="label">Case Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="input"
            />
          </div>
          <div>
            <label htmlFor="date" className="label">Incident Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="input"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="label">Incident Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="input"
          ></textarea>
        </div>
        
        <div>
          <label htmlFor="location" className="label">Specific Location in Park</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="witnesses" className="label">Witness Names</label>
            <input
              type="text"
              id="witnesses"
              name="witnesses"
              value={formData.witnesses}
              onChange={handleInputChange}
              className="input"
            />
          </div>
          <div>
            <label htmlFor="employees" className="label">Employee(s) Involved</label>
            <input
              type="text"
              id="employees"
              name="employees"
              value={formData.employees}
              onChange={handleInputChange}
              className="input"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="file" className="label">Upload File</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="input"
          />
        </div>
        
        <button type="submit" className="btn-primary flex items-center">
          <Save size={20} className="mr-2" />
          Create Case
        </button>
      </form>
    </div>
  );
};

export default NewCase;