import { useEffect, useState } from 'react';
import { YOUTUBE_OPTION } from 'src/utils/libraryConstants';
import YouTube from 'react-youtube';
import API from 'src/config/api';
import YoutubeSkeleton from 'src/components/Main/News/YoutubeSkeleton';

const YoutubeNews = () => {
  const [youtubeInfo, setYoutubeInfo] = useState(null);

  useEffect(() => {
    const getYoutube = async () => {
      try {
        const response = await API.get('/api/news/youtube');
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
