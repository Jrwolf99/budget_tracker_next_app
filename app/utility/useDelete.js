import { useState } from 'react';

function useDelete(endpoint) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleteData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
        {
          method: 'DELETE',
        }
      );
      const json = await res.json();

      if (!res.ok) throw Error(json.message || 'Unexpected error');

      setResponse(json);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return [deleteData, { response, error, isLoading }];
}

export default useDelete;
