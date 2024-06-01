import { YOUTUBE_OPTION } from 'src/utils/consts/libraryConsts';
import YouTube from 'react-youtube';
import hooks from 'src/hooks/hooks';
import API_PATH from 'src/api/api_path';

const YoutubeNews = () => {
  const { apiData: youtube, loading } = hooks.useGetApiWithNone(
    API_PATH.GET_YOUTUBE,
  );

  if (!youtube || loading) {
    return null;
  }

  return (
    <YouTube
      videoId={youtube.id}
      opts={YOUTUBE_OPTION}
      onEnd={(e) => {
        e.target.stopVideo(0);
      }}
    />
  );
};

export default YoutubeNews;
