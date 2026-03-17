const HomeBackgroundDecor = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden">
      <div className="absolute left-1/2 top-28 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-amber-300/20 blur-3xl" />
      <div className="absolute right-[-8rem] top-[22rem] h-[20rem] w-[20rem] rounded-full bg-orange-200/20 blur-3xl" />
      <div className="absolute bottom-[-8rem] left-[-6rem] h-[18rem] w-[18rem] rounded-full bg-yellow-200/20 blur-3xl" />
    </div>
  );
};

export default HomeBackgroundDecor;
