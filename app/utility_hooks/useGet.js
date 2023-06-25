import { useState, useEffect } from 'react';

function useGet(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log('endpoint', endpoint);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`
        );
        const json = await res.json();

        if (!res.ok) throw Error(json.message || 'Unexpected error');

        setData(json);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}

export default useGet;
