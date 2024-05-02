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

export const useGetAllQuest = () => {
  const [allQuest, setAllQuest] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(API_PATH.GET_ALL_QUEST);
        const responseData = response.data.data;
        setAllQuest(responseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching npc data:', error);
        setLoading(false);
      }
    };

    if (allQuest === null) {
      fetchData();
    }
  }, [allQuest]);

  return { allQuest, loading };
};

export const useGetQuest = (questId) => {
  const [quest, setQuest] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(API_PATH.GET_QUEST + questId);
        const responseData = response.data.data;
        setQuest(responseData);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching quest data:', error);
        setLoading(false);
      }
    };

    if (quest === null) {
      fetchData();
    }
  }, [quest]);

  return { quest, loading };
};
