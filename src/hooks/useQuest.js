import { useEffect, useState } from 'react';
import API from 'src/config/api';
import API_PATH from 'src/api/api_path';

export const useGetNpc = () => {
  const [npc, setNpc] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(API_PATH.GET_NPC);
        const responseData = response.data.data;
        setNpc(responseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching npc data:', error);
        setLoading(false);
      }
    };

    if (npc === null) {
      fetchData();
    }
  }, [npc]);

  return { npc, loading };
};
