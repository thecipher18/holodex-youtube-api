
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

  let strOfficialChannelList = ["UCJFZiqLMntJufDCHc6bQixg", "UCfrWoRGlawPQDQxxeIDRP0Q", "UCotXwY6s8pWmuWd_snKYjhg", //HoloMain, HoloIdMain, HoloENMain, DevisMain, StarJPMain, StarENMain) 
                                  "UC10wVt6hoQiwySRhz7RdOUA", "UCWsfcksUUpoEvhia0_ut0bA", "UCJxZpzx4wHzEYD-eCiZPikg"]//Check if this is one of the six official group channels

  const assignVideoData = (videoList: any) => {
    let videoObject = {};
    data?.forEach((item: any) => {
      let nameList = [];
      if (strOfficialChannelList.includes(item.channel.id)) { //If it is the official channel: ignore channel, only uses mentions
          console.log("This an official channel: " + item.channel.name) //Check 
          if (item.mentions) {
              console.log(item.mentions)
              for (let i = 0; i < item.mentions.length; i++ ) {
                if (!strOfficialChannelList.includes(item.mentions[i].id)) { //If an official channel is in mention, ignore
                  nameList.push(item.mentions[i].english_name)
                } 
              }
              videoObject[item.id] = nameList; 
            } else {
              
              videoObject[item.id] = [item.channel.name];
            }
          
      } else {
          if (item.mentions) {
            nameList.push(item.channel.english_name)
            
            for (let i = 0; i < item.mentions.length; i++ ) {
              if (!strOfficialChannelList.includes(item.mentions[i].id)) { //If an official channel is in mention, ignore
                
                nameList.push(item.mentions[i].english_name)
              } 
            }

            videoObject[item.id] = nameList; 

            } else {
              
            videoObject[item.id] = [item.channel.english_name];

            }
          
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