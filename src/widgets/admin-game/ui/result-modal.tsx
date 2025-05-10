const ResultModal = () => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">게임 종료!</h2>
        <p className="text-xl mb-6">최종 점수: 점</p>
      </div>
    </div>
  );
};

export { ResultModal };
