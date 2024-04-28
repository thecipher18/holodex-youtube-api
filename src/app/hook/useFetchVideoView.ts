
import useSWR from 'swr'

const holodexURL = "https://holodex.net/api/v2/videos";
const youtubeURL = "https://www.googleapis.com/youtube/v3/videos";

type useFetchHoloProps = {
  holodexURL: string
  parameters?: {}
}

const fetchHolo = async (url: string) => {
  const myHeaders = new Headers();
  myHeaders.append("X-APIKEY", process.env.NEXT_PUBLIC_HOLODEX_API_KEY as string);
  
  const requestOptions: any= {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  
  const response = await fetch(url, requestOptions)
    
  return response.json();
}

const getParameterQuery = (url: string, parameters: any) => {
  if (!parameters) return url;
  const keys = Object.keys(parameters);
  const keyValuePairs = keys.map(key => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(parameters[key]);
  }); 
  return url + "?" + keyValuePairs.join('&');
}

type useFetchYoutubeProps = {
  youtubeURL: string
  parameters?: {},
  videoId: string[]
}

const fetchYoutube = async (url: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  const requestOptions: any = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  const response = await fetch(url, requestOptions)
  return response.json();

}

const getYoutubeParameterQuery = (url: string, videoId: string[], parameters: any) => {
  
  let parameteredURL = url + "?";
  if (parameters) {
    const keys = Object.keys(parameters);
    const keyValuePairs = keys.map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(parameters[key]);
    }); 
    parameteredURL = parameteredURL + keyValuePairs.join('&');
  }
  
  const videoIdString = videoId?.join("&id=");
  return parameteredURL + "&id=" + videoIdString;
}

const useFetchVideoView = () => {
  const holodexParams = {
    topic: "minecraft",
  }
  const url = getParameterQuery(holodexURL, holodexParams)
  const { data, error, isLoading } = useSWR(url, fetchHolo)

  const videoId = data?.map((item: any) => item.id);

  const youtubeParams = {
    part: "statistics,snippet",
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  }

  const youtubeurl = getYoutubeParameterQuery(youtubeURL, videoId, youtubeParams);
  const { data: youtubeViews, error: e, isLoading: is } = useSWR(videoId ? youtubeurl : null, fetchYoutube)

  return {
    data,
    error,
    isLoading,
    youtubeViews,
  }

}

export default useFetchVideoView