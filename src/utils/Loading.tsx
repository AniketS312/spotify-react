import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
     <div className="spotify-gray-bg w-full h-auto m-5 p-5 rounded-lg flex flex-col items-center justify-center gap-10">     
        <AiOutlineLoading3Quarters size={200} className="animate-spin"/>
        <h3 className="text-2xl">Loading...</h3>
    </div>
  )
}