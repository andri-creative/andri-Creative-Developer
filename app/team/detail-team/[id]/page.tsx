import { TeamData } from "@/app/api/team/route";
import DetailTeam from "@/components/team/detail-team";

export default function TeamDetailPage({ params }: { params: { id: string } }) {
  const member = TeamData.find((m) => m.id === Number(params.id));

  if (!member) {
    return <div>Member not found</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <DetailTeam member={member} />
    </div>
  );
}
