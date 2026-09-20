import Image from "next/image";

export default function SearchingPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 h-full ">
<Image
  src="/images/search.png"
  alt="Loading..."
  width={150}
  height={150}
  className="animate-wiggle"
/>
<h3 className="text-3xl font-bold">در حال جستجو</h3>
<span className="text-3xl font-bold">...</span>
    </div>
  )
}
