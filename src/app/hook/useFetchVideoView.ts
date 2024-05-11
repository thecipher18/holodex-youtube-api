
import useSWR from 'swr'
import useFetchHolo from './useFetchHolo'
import useFetchYoutube from './useFetchYoutube';

const holodexURL = "https://holodex.net/api/v2/videos";
const youtubeURL = "https://www.googleapis.com/youtube/v3/videos";

const useFetchVideoView = () => {
  const {data, error, isLoading} = useFetchHolo({holodexURL: holodexURL, 
    parameters: {
      org: "Hololive",
      limit: 50,
      status: "past",
      topic: "Music_Cover",
      include: "mentions"
    }
  });

  const videoId = data?.map((item: any) => item.id);

  const assignVideoData = (videoList: any) => {
    let videoObject = {};
    data?.forEach((item: any) => {
      if (item.mentions)
    {
      let nameList = [];
      for (let i = 0; i < item.mentions.length; i++ ) {
        nameList.push(item.mentions[i].english_name)
      }
      videoObject[item.id] = nameList;
    } else {
      videoObject[item.id] = [item.channel.english_name];
    }
    });
    return videoList?.map((item:any) => {
      return {...item, mentions:videoObject[item.id]}
    });
   }
  

  const {data: youtubeViews, error: e, isLoading: isFetching} = useFetchYoutube({youtubeURL: youtubeURL, 
    parameters: {
      part: "statistics,snippet,id",
      key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
    },
    videoId: videoId
  });

  console.log(assignVideoData(youtubeViews?.items));

  return {
    data,
    error,
    isLoading,
    videos: assignVideoData(youtubeViews?.items),
    isFetching
  }

}

export default useFetchVideoView