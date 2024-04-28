
import useSWR from 'swr'
import useFetchHolo from './useFetchHolo'
import useFetchYoutube from './useFetchYoutube';

const holodexURL = "https://holodex.net/api/v2/videos";
const youtubeURL = "https://www.googleapis.com/youtube/v3/videos";

const useFetchVideoView = () => {
  const {data, error, isLoading} = useFetchHolo({holodexURL: holodexURL, 
    parameters: {
      topic: "minecraft"
    }
  });

  const videoId = data?.map((item: any) => item.id);

  const {data: youtubeViews, error: e, isLoading: is} = useFetchYoutube({youtubeURL: youtubeURL, 
    parameters: {
      part: "statistics,snippet",
      key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
    },
    videoId: videoId
  });

  return {
    data,
    error,
    isLoading,
    youtubeViews,
  }

}

export default useFetchVideoView