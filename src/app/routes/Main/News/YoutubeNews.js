import { useEffect, useState } from 'react';
import { YOUTUBE_OPTION } from 'src/utils/consts/libraryConsts';
import YouTube from 'react-youtube';
import API from 'src/config/api';
import API_PATH from 'src/api/api_path';
import YoutubeSkeleton from '../News/YoutubeSkeleton';

const YoutubeNews = () => {
  const [youtubeInfo, setYoutubeInfo] = useState(null);

  useEffect(() => {
    const getYoutube = async () => {
      try {
        const response = await API.get(API_PATH.GET_YOUTUBE);
        const responseData = response.data.data;
        setYoutubeInfo(responseData);
      } catch (e) {
        console.log(e);
      }
    };

    getYoutube();
  }, []);

  if (!youtubeInfo) {
    return <YoutubeSkeleton />;
  }

  return (
    <YouTube
      videoId={youtubeInfo.youtube_id}
      opts={YOUTUBE_OPTION}
      onEnd={(e) => {
        e.target.stopVideo(0);
      }}
    />
  );
};

export default YoutubeNews;
