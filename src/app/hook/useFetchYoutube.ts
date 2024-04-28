import { useState } from 'react'
import useSWR from 'swr'

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

const getParameterQuery = (url: string, videoId: string[], parameters: any) => {
  
  // if (!parameters) return url;
  const keys = Object.keys(parameters);
  const keyValuePairs = keys.map(key => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(parameters[key]);
  }); 
  const parameteredURL = url + "?" + keyValuePairs.join('&');
  const videoIdString = videoId?.join("&id=");
  return parameteredURL + "&id=" + videoIdString;
}
const useFetchYoutube = (props: useFetchYoutubeProps) => {
  const { youtubeURL, parameters, videoId } = props;
  const url = getParameterQuery(youtubeURL, videoId, parameters)
  const { data, error, isLoading } = useSWR(videoId ? url : null, fetchYoutube)

  return {
    data,
    error,
    isLoading
  }
}

export default useFetchYoutube