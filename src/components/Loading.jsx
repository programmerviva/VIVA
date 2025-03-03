 

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xl text-gray-300 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;