import React, { useState, useEffect } from 'react';
import { oneDriveService } from '../services/oneDriveService';
import LocalStorageConfig from './LocalStorageConfig';

const OneDriveConfig: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [folders, setFolders] = useState<any[]>([]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [storageChoice, setStorageChoice] = useState('local');

  useEffect(() => {
    checkLoginStatus();
    const savedChoice = localStorage.getItem('storageChoice');
    if (savedChoice) {
      setStorageChoice(savedChoice);
    }
  }, []);

  const checkLoginStatus = async () => {
    // Implement actual login status check
    setIsLoggedIn(false);
  };

  const handleLogin = async () => {
    try {
      await oneDriveService.login();
      setIsLoggedIn(true);
      fetchFolders();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const fetchFolders = async () => {
    try {
      const folderList = await oneDriveService.listFolders();
      setFolders(folderList);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  const handleFolderSelect = (folderId: string) => {
    setSelectedFolder(folderId);
    localStorage.setItem('oneDriveStorageFolder', folderId);
  };

  const handleStorageChoiceChange = (choice: string) => {
    setStorageChoice(choice);
    localStorage.setItem('storageChoice', choice);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Storage Configuration</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Choose storage option:</label>
        <select
          value={storageChoice}
          onChange={(e) => handleStorageChoiceChange(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
        >
          <option value="local">Local Storage</option>
          <option value="onedrive">OneDrive</option>
        </select>
      </div>

      {storageChoice === 'local' ? (
        <LocalStorageConfig />
      ) : (
        <div>
          {!isLoggedIn ? (
            <button onClick={handleLogin} className="btn-primary">
              Log in to OneDrive
            </button>
          ) : (
            <div>
              <p className="mb-4">Select a folder for storing case files:</p>
              <select
                value={selectedFolder}
                onChange={(e) => handleFolderSelect(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a folder</option>
                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OneDriveConfig;