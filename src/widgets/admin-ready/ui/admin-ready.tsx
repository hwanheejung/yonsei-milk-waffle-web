import { TEAM_INFO } from '@/entities/team';
import { Button } from '@/shared/ui';

const AdminReady = () => {
  return (
    <div className="bg-cool-gray-0 z-30 fixed inset-0 flex flex-col gap-6 justify-center items-center my-auto">
      {/* team 들어온 인원 */}
      <div className="flex gap-4">
        {Object.values(TEAM_INFO).map((team) => (
          <TeamCount key={team.name} image={team.character} name={team.name} count={0} />
        ))}
      </div>

      <Button className="text-2xl font-bold px-5 h-12">쉐낏투유 시작!</Button>
    </div>
  );
};

export { AdminReady };

const TeamCount = ({ image, name, count }: TTeamCountProps) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold">{count}명</span>
      <img src={image} alt={name} className="w-[200px] object-contain" />
    </div>
  );
};

type TTeamCountProps = {
  image: string;
  name: string;
  count: number;
};
