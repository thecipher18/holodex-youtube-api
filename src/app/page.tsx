import Image from "next/image";
import VTuberInfo from "@/component/VTuberInfo";
import SongTable from "@/component/SongTable";

export default function Home() {
  return (
    <div>
      <div className="text-[red] w-full flex justify-center">navbar</div>
      <div className="text-[red] w-full flex justify-center">body / title</div>
      <div className="text-[red] w-full flex justify-center">content</div>
      <div className="text-[red] w-full flex justify-center">footer</div>
      <VTuberInfo name="Kizuna AI" description="Ai vtubeksjhfaskh" />
      <SongTable nameVideo="１周年記念】ダダダダ天使／湊あくあ【歌ってみた】" views= "20000000" thumbnail= "https://i.ytimg.com/vi/DmURJdzr-Cc/mqdefault.jpg" />

      
    </div>
  );
}
