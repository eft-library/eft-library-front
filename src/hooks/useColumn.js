import { useEffect, useState } from 'react';
import API from 'src/config/api';

export const useGetColumn = (colummApi) => {
  const [column, setColumn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(colummApi);
        const responseData = response.data.data;
        setColumn(responseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching column data:', error);
        setLoading(false);
      }
    };

    if (column === null) {
      fetchData();
    }
  }, []);

  return { column, loading };
};
