import { useState } from 'react'
import useSWR from 'swr'

type useFetchHoloProps = {
  holodexURL: string
  parameters?: {}
}

const HOLODEX_API_KEY = "f7f92ba3-301f-4c95-b8ba-cdf095a27c7d";
const YOUTUBE_API_KEY = "AIzaSyApL40LNaSpZNyudDJOzjJsUWa4fkDh9sk";

const fetchHolo = async (url: string) => {
  const myHeaders = new Headers();
  myHeaders.append("X-APIKEY", HOLODEX_API_KEY as string);
  
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
const useFetchHolo = (props: useFetchHoloProps) => {
  const { holodexURL, parameters } = props;
  const url = getParameterQuery(holodexURL, parameters)
  const { data, error, isLoading } = useSWR(url, fetchHolo)

  return {
    data,
    error,
    isLoading
  }
}

export default useFetchHolo