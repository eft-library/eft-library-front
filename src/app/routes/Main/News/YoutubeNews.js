import { YOUTUBE_OPTION } from 'src/utils/consts/libraryConsts';
import YouTube from 'react-youtube';
import YoutubeSkeleton from '../News/YoutubeSkeleton';
import hooks from 'src/hooks/hooks';

const YoutubeNews = () => {
  const { youtube, loading } = hooks.useGetYoutube();

  if (!youtube || loading) {
    return <YoutubeSkeleton />;
  }

  return (
    <YouTube
      videoId={youtube.youtube_id}
      opts={YOUTUBE_OPTION}
      onEnd={(e) => {
        e.target.stopVideo(0);
      }}
    />
  );
};

export default YoutubeNews;
