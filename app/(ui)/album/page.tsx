import Album from "@/components/album/album";

export default function AlbumPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="grid grid-cols-1 px-4 lg:px-6">
        <Album />
      </div>
      <div className="px-4 lg:px-6 "></div>
      <div className="gap-4 px-4  lg:px-6"></div>
    </div>
  );
}