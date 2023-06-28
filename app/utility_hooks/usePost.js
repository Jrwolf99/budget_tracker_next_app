import { useState } from 'react';

function usePost(endpoint) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const postDataJSON = async (body) => {
    setIsLoading(true);
    try {
      console.log('usePost: ', JSON.stringify(body));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
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

  const postDataFileUpload = async (body) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
        {
          method: 'POST',
          body: body,
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

  return { postDataJSON, postDataFileUpload, response, error, isLoading };
}

export default usePost;
