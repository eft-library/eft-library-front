import { useEffect, useState } from 'react';
import API from 'src/config/api';

export const useGetApiWithNone = (apiPath) => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(apiPath);
        const responseData = response.data.data;
        setApiData(responseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching API data:', error);
        setLoading(false);
      }
    };

    if (apiData === null) {
      fetchData();
    }
  }, []);

  return { apiData, loading };
};

export const useGetApiWithParam = (apiPath, param) => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`${apiPath}/${param}`);
        const responseData = response.data.data;
        setApiData(responseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching API data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [param]);

  return { apiData, loading };
};
