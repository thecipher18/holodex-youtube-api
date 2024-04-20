import Image from "next/image";
import VTuberInfo from "@/component/VTuberInfo";

export default function Home() {
  return (
    <div>
      <div className="text-[red] w-full flex justify-center">navbar</div>
      <div className="text-[red] w-full flex justify-center">body / title</div>
      <div className="text-[red] w-full flex justify-center">content</div>
      <div className="text-[red] w-full flex justify-center">footer</div>
      <VTuberInfo name="Kizuna AI" description="Ai vtubeksjhfaskh" />
    </div>
  );
}
