import usePost from '@/app/utility_hooks/usePost';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const UploadCSVBox = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const router = useRouter();

  const { postDataFileUpload: postCSV, response: response } = usePost(
    '/transactions/upload'
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      postCSV(formData);
    }
    router.push('/transactions');
  };

  return (
    <div className="p-8 shadow-lg rounded-lg bg-white w-96 m-4">
      <div className="flex flex-col space-y-4">
        <label
          htmlFor="csvFile"
          className="text-sm font-semibold text-gray-600"
        >
          Upload Bank Transaction CSV File
        </label>
        <input
          type="file"
          id="csvFile"
          accept=".csv"
          className="py-2 px-4 text-sm text-primaryText bg-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleFileChange}
        />
        <button
          className="py-2 px-4 text-sm text-white bg-primaryButton rounded hover:bg-primaryButtonHover focus:outline-none transition-transform transform hover:translate-y-[-2px] hover:shadow-lg"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
      {response && (
        <div className="text-sm text-gray-600 mt-4">{response.message}</div>
      )}
    </div>
  );
};

export default UploadCSVBox;
