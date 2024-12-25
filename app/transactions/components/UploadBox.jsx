import React, { useState } from "react";
import { authedPostDOC } from "@/app/utility/common";
import { currentUserId } from "@/app/utility/localStorage";
import CardContainer from "@/app/components/general/CardContainer";
import { LoaderIcon } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const UploadBox = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const postDOC = (formData) => {
    authedPostDOC("/spend_accounts/upload_spends", formData, setIsLoading, {
      params: {
        user_id: currentUserId(),
      },
    });
  };

  // TODO: Make sure you somehow come up with a way to handle the user closing the
  // window before the upload is complete. This is bug where you could actually duplicate
  // transactions if it does not fully upload.

  const handleUpload = () => {
    if (selectedFile) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      postDOC(formData);
    }
  };

  return (
    <CardContainer customClassNames="flex-1 min-w-[300px] max-w-[400px]">
      {isLoading ? (
        <div className="flex flex-col items-center space-y-4 p-4">
          <div className="text-center text-sm font-medium text-gray-700">
            <p className="mb-1">Uploading...</p>
            <p className="text-xs text-gray-500">
              Large files could take a few minutes to load. Please do not close
              the window. reuploading when it is still processing in the
              background could result in duplicate transactions. Wait at least 5
              minutes before reuploading.
            </p>
          </div>
          <div>
            <LoadingSpinner height="32px" width="32px" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          <label
            htmlFor="csvFile"
            className="text-sm font-semibold text-gray-600"
          >
            Upload QBO file
          </label>
          <input
            type="file"
            id="csvFile"
            accept=".qbo"
            className="py-2 px-4 text-sm text-primaryText bg-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleFileChange}
          />
          <button
            className="py-2 px-4 text-sm text-white bg-primary rounded hover:bg-primary focus:outline-none transition-transform transform hover:translate-y-[-2px] hover:shadow-lg"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      )}
    </CardContainer>
  );
};

export default UploadBox;
