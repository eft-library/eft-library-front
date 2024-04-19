import { useEffect, useState } from 'react';
import API from 'src/config/api';
import API_PATH from 'src/api/api_path';

export const useGetNavi = () => {
  const [navi, setNavi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(API_PATH.GET_NAVI_MENU);
        const responseData = response.data.data;
        setNavi(responseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching navigation data:', error);
        setLoading(false);
      }
    };

    // navi가 null일 때만 데이터를 가져오도록 설정
    if (navi === null) {
      fetchData();
    }
  }, [navi]); // navi가 변경될 때만 useEffect 재실행

  const infoMenu = navi
    ? [
        ...navi.filter(
          (menu) =>
            menu.main_menu_value !== 'ITEM' &&
            menu.main_menu_value !== 'INFO' &&
            menu.main_menu_value !== 'MAP',
        ),
        ...(navi.find((menu) => menu.main_menu_value === 'ITEM')?.sub_menus ||
          []),
        ...(navi.find((menu) => menu.main_menu_value === 'INFO')?.sub_menus ||
          []),
      ]
    : [];

  return { navi, loading, infoMenu };
};
