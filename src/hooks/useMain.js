import { useEffect, useState } from 'react';
import API from 'src/config/api';
import API_PATH from 'src/api/api_path';

export const useGetYoutube = () => {
  const [youtube, setYoutube] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(API_PATH.GET_YOUTUBE);
        const responseData = response.data.data;
        setYoutube(responseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching youtube data:', error);
        setLoading(false);
      }
    };

    if (youtube === null) {
      fetchData();
    }
  }, []);

  return { youtube, loading };
};

export const useGetSearch = () => {
  const [searchList, setSearchList] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(API_PATH.GET_SEARCH);
        const responseData = response.data.data;
        setSearchList(responseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search data:', error);
        setLoading(false);
      }
    };

    if (searchList === null) {
      fetchData();
    }
  }, []);

  return { searchList, loading };
};
