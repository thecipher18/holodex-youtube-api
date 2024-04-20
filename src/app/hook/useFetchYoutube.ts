import { useState } from 'react'
import useSWR from 'swr'

type useFetchYoutubeProps = {
  youtubeURL: string
  parameters?: {}
}

const YOUTUBE_API_KEY = "AIzaSyApL40LNaSpZNyudDJOzjJsUWa4fkDh9sk";

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

const getParameterQuery = (url: string, parameters: any) => {
  if (!parameters) return url;
  const keys = Object.keys(parameters);
  const keyValuePairs = keys.map(key => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(parameters[key]);
  }); 
  return url + "?" + keyValuePairs.join('&');
}
const useFetchYoutube = (props: useFetchYoutubeProps) => {
  const { youtubeURL, parameters } = props;
  const url = getParameterQuery(youtubeURL, parameters)
  console.log("url", url)
  const { data, error, isLoading } = useSWR(url, fetchYoutube)

  return {
    data,
    error,
    isLoading
  }
}

export default useFetchYoutube