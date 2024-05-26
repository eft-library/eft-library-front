import { useEffect, useState } from 'react';
import API from 'src/config/api';
import API_PATH from 'src/api/api_path';

export const useGetMapOfTarkov = (map_id) => {
  const [mapOfTarkov, setMapOfTarkov] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(
          `${API_PATH.GET_MAP_OF_TARKOV}/${map_id}`,
        );
        const responseData = response.data.data;
        setMapOfTarkov(responseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching navigation data:', error);
        setLoading(false);
      }
    };

    if (mapOfTarkov === null) {
      fetchData();
    }
  }, [mapOfTarkov]);

  return { mapOfTarkov, loading };
};
