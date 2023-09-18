import usePost from '@/app/utility/usePost';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authedPostCSV } from '@/app/utility/common';
import { currentUserId } from '@/app/utility/localStorage';
import CardContainer from '@/app/components/general/CardContainer';

const UploadCSVBox = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const router = useRouter();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const postCSV = (formData) => {
    authedPostCSV('/spend_accounts/upload_spends_through_CSV', formData, {
      params: {
        user_id: currentUserId(),
      },
    });
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      postCSV(formData);
    }
  };

  return (
    <CardContainer customClassNames="flex-1 min-w-[300px] max-w-[400px]">
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
    </CardContainer>
  );
};

export default UploadCSVBox;
