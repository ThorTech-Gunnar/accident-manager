import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Upload, Info, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { CaseDetails } from '../types';
import { format } from 'date-fns';

const CaseFile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [caseDetails, setCaseDetails] = useState<CaseDetails | null>(null);
  const [showDewarpingInfo, setShowDewarpingInfo] = useState(false);
  const [showNVRInfo, setShowNVRInfo] = useState(false);

  useEffect(() => {
    const fetchCaseDetails = () => {
      const cases = JSON.parse(localStorage.getItem('cases') || '[]');
      const caseData = cases.find((c: CaseDetails) => c.id === id);
      if (caseData) {
        setCaseDetails(caseData);
      }
    };

    fetchCaseDetails();
  }, [id]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && caseDetails) {
      try {
        const storageChoice = localStorage.getItem('storageChoice') || 'local';
        const fileUrl = await storeFile(caseDetails.id, file, storageChoice);
        
        // Update case details with new file
        const updatedCase = {
          ...caseDetails,
          fileUrl,
        };
        updateCaseInStorage(updatedCase);
        setCaseDetails(updatedCase);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
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

  const updateCaseInStorage = (updatedCase: CaseDetails) => {
    const cases = JSON.parse(localStorage.getItem('cases') || '[]');
    const updatedCases = cases.map((c: CaseDetails) => 
      c.id === updatedCase.id ? updatedCase : c
    );
    localStorage.setItem('cases', JSON.stringify(updatedCases));
  };

  if (!caseDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/cases" className="btn-secondary flex items-center">
          <ArrowLeft size={20} className="mr-2" />
          Back to Cases
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{caseDetails.title}</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Case Details</h2>
          <p><strong>Date:</strong> {format(new Date(caseDetails.date), 'MMMM d, yyyy')}</p>
          <p><strong>Status:</strong> {caseDetails.status}</p>
          <p><strong>Location:</strong> {caseDetails.location}</p>
          <p><strong>Description:</strong> {caseDetails.description}</p>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Involved Parties</h2>
          <p><strong>Witnesses:</strong> {caseDetails.witnesses}</p>
          <p><strong>Employees:</strong> {caseDetails.employees}</p>
        </div>
      </div>
      
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Documents and Videos</h2>
        {caseDetails.fileUrl && (
          <div className="mb-4">
            <p><strong>Uploaded File:</strong> {caseDetails.fileUrl.split('/').pop()}</p>
          </div>
        )}
        <input
          type="file"
          onChange={handleFileUpload}
          className="hidden"
          id="fileUpload"
        />
        <label htmlFor="fileUpload" className="btn-secondary flex items-center w-max cursor-pointer">
          <Upload size={20} className="mr-2" />
          Upload File
        </label>
      </div>
      
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Video Information</h2>
        <div className="space-y-4">
          <button
            onClick={() => setShowDewarpingInfo(!showDewarpingInfo)}
            className="btn-secondary flex items-center"
          >
            {showDewarpingInfo ? <ChevronUp size={20} className="mr-2" /> : <ChevronDown size={20} className="mr-2" />}
            {showDewarpingInfo ? 'Hide' : 'Show'} Dewarping Info
          </button>
          {showDewarpingInfo && (
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Video Dewarping Process Explanation</h3>
              <p>Video dewarping is a crucial process in forensic video analysis, particularly for footage captured by wide-angle or fisheye lenses commonly used in surveillance systems. This process involves:</p>
              <ol className="list-decimal list-inside mt-2">
                <li>Correction of optical distortions caused by the camera lens, which can make straight lines appear curved.</li>
                <li>Transformation of the distorted image to a rectilinear projection, where straight lines in the real world appear straight in the image.</li>
                <li>Potential adjustment of perspective to provide a more natural view of the scene.</li>
                <li>Preservation of the original pixel data to maintain the integrity and admissibility of the evidence.</li>
              </ol>
              <p className="mt-2">This process is essential for accurate interpretation of the video evidence, as it allows for proper spatial relationships and measurements within the scene. The dewarped video maintains a clear chain of custody and is accompanied by documentation of the dewarping process to ensure its validity in legal proceedings.</p>
            </div>
          )}
          
          <button
            onClick={() => setShowNVRInfo(!showNVRInfo)}
            className="btn-secondary flex items-center"
          >
            {showNVRInfo ? <ChevronUp size={20} className="mr-2" /> : <ChevronDown size={20} className="mr-2" />}
            {showNVRInfo ? 'Hide' : 'Show'} NVR Info
          </button>
          {showNVRInfo && (
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Video Recording System Information</h3>
              <p>Our video surveillance system utilizes the following components:</p>
              <ul className="list-disc list-inside mt-2">
                <li>Network Video Recorder (NVR): Sibell NVR-SB32C-P4K</li>
                <li>Video Management Software: NVMS 2.0 Lite</li>
              </ul>
              <p className="mt-2">The Sibell NVR-SB32C-P4K is a high-performance network video recorder capable of recording and managing multiple IP cameras. NVMS 2.0 Lite is used to retrieve and export video footage from the NVR, ensuring a secure and auditable process for handling video evidence.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Chain of Custody</h2>
        <ul className="space-y-2">
          <li>Case Created: {format(new Date(), 'MMMM d, yyyy HH:mm:ss')}</li>
          {/* Add more chain of custody entries here */}
        </ul>
      </div>
      
      <button className="btn-primary flex items-center">
        <FileText size={20} className="mr-2" />
        Export for Court Submission
      </button>
    </div>
  );
};

export default CaseFile;