import YouTube from 'react-youtube';

const YoutubeNews = () => {
  const opts = {
    height: '280',
    width: '480',
    playerVars: {
      autoplay: 0,
    },
  };
  return (
    <YouTube
      videoId="MKYOspIJiWE"
      opts={opts}
      onEnd={(e) => {
        e.target.stopVideo(0);
      }}
    />
  );
};

export default YoutubeNews;
