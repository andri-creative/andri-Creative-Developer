// components/chat/profile-chat.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileChat({
  name,
  email,
  avatar,
  members,
  totalMessages,
}: {
  name: string;
  email: string;
  avatar: string;
  totalMessages: number;
  members: { name: string; email: string; avatar: string }[];
}) {
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-neutral-900 to-neutral-800 rounded-xl border border-neutral-700 shadow-lg overflow-hidden">
      {/* HEADER - Fixed */}
      <div className="relative h-44 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 flex items-end p-6 flex-shrink-0">
        <div className="absolute inset-0 bg-black/20"></div>
        <Avatar className="w-24 h-24 border bg-gray-200 border-white shadow-2xl absolute -bottom-12 left-6 z-10">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-blue-500 text-white text-xl font-bold">
            {name[0]}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* PROFILE INFO - Fixed */}
      <div className="pt-16 px-6 pb-6 border-b border-neutral-700 bg-neutral-900/50 flex-shrink-0">
        <h1 className="text-white text-xl font-bold truncate">{name}</h1>
        <p className="text-gray-300 text-sm mt-1 truncate">{email}</p>
        <div className="flex gap-6 mt-4">
          <div className="flex flex-col items-center">
            <span className="text-white font-bold text-lg">
              {totalMessages}
            </span>
            <span className="text-gray-400 text-xs">Pesan</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white font-bold text-lg">
              {members.length}
            </span>
            <span className="text-gray-400 text-xs">Anggota</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 bg-neutral-900/30">
        <h2 className="text-gray-300 font-semibold text-sm tracking-wide uppercase mb-3 px-2 sticky top-0 bg-neutral-900/80 backdrop-blur-sm py-2 z-10">
          Daftar Anggota
        </h2>
        <div className="max-h-70 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-neutral-800 pr-2">
          <div className="space-y-2">
            {members.map((member, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800/50 transition-all duration-200 cursor-pointer group border border-transparent hover:border-neutral-700"
              >
                <Avatar className="w-10 h-10 ring-2 ring-neutral-600 group-hover:ring-blue-500 transition-all flex-shrink-0">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-neutral-600 text-white">
                    {member.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {member.name}
                  </p>
                  <p className="text-gray-400 text-xs truncate">
                    {member.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info jumlah anggota */}
        <div className="px-3 py-2 mt-2">
          <p className="text-gray-500 text-xs italic text-center bg-neutral-800/50 rounded-lg py-2">
            Total {members.length} anggota
          </p>
        </div>
      </div>
    </div>
  );
}
