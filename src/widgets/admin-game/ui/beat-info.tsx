interface BeatInfoProps {
  songLength: number;
  beatCount: number;
}

export function BeatInfo({ songLength, beatCount }: BeatInfoProps) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">비트 정보</h2>
      <p>노래 길이: {songLength}초</p>
      <p>비트 개수: {beatCount}개</p>
    </div>
  );
}
