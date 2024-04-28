"use client";

import Image from "next/image";
import SongTable from "@/component/SongTable";
import useFetchHolo from "./hook/useFetchHolo";
import useFetchYoutube from "./hook/useFetchYoutube";

export default function Home() {

  const { data, error, isLoading } = useFetchHolo({holodexURL: "https://holodex.net/api/v2/videos", 
    parameters: {
      topic: "minecraft",
    }
  })

  const { data: data2, error: error2, isLoading: isLoading2 } = useFetchYoutube({youtubeURL: "https://youtube.googleapis.com/youtube/v3/search", 
    parameters: {
      key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      part: "snippet",
      channelId: "UC1opHUrw8rvnsadT-iGp7Cg",
      maxResults:20,
      order: "videoCount"
    }
  })

  console.log("data", data)
  console.log("data2", data2)

  return (
    <div>
      <div className="text-[red] w-full flex justify-center">navbar</div>
      <div className="text-[red] w-full flex justify-center">body / title</div>
      <div>
        <h1 className="text-[red] w-full flex justify-center">
            content
        </h1>
        <SongTable/>
        
        </div>
      <div className="text-[red] w-full flex justify-center">footer</div>
      

      
    </div>
  );
}
