import { useEffect, useState } from 'react';
import API from 'src/config/api';
import API_PATH from 'src/api/api_path';

export const useGetAllWeapon = () => {
  const [weapon, setWeapon] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(API_PATH.GET_ALL_WEAPON);
        const responseData = response.data.data;
        setWeapon(responseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weapon data:', error);
        setLoading(false);
      }
    };

    if (weapon === null) {
      fetchData();
    }
  }, []);

  return { weapon, loading };
};
