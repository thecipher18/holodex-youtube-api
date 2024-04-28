"use client";

import SongTable from "@/component/SongTable";

export default function Home() {

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
