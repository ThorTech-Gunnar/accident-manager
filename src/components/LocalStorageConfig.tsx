import React, { useState, useEffect } from 'react';

const LocalStorageConfig: React.FC = () => {
  const [localPath, setLocalPath] = useState('');

  useEffect(() => {
    const savedPath = localStorage.getItem('localStoragePath');
    if (savedPath) {
      setLocalPath(savedPath);
    }
  }, []);

  const handlePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPath = e.target.value;
    setLocalPath(newPath);
    localStorage.setItem('localStoragePath', newPath);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Local Storage Configuration</h2>
      <p className="mb-4">Enter a local path for storing case files:</p>
      <input
        type="text"
        value={localPath}
        onChange={handlePathChange}
        placeholder="Enter local storage path"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <p className="mt-2 text-sm text-gray-600">
        Note: This path will be used to organize files within the app's storage.
        Actual file storage will be handled by the app's backend.
      </p>
    </div>
  );
};

export default LocalStorageConfig;