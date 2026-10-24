import { useContext } from "react";
import { DynamicIslandContext } from "../context/DynamicIslandContext";

function Home() {
  const { expandDynamicIsland } = useContext(DynamicIslandContext);

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="text-center space-y-8 animate-fadeIn">
        <div className="space-y-4">
          <h1
            className="text-8xl font-bold text-white tracking-tight
                                             bg-clip-text text-transparent bg-gradient-to-r 
                                             from-white via-gray-200 to-white
                                             animate-shimmer"
          >
            N👀DLES
          </h1>
          <div
            className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-white to-transparent
                                                opacity-50 animate-pulse"
          />
        </div>

        <p
          className="text-sm text-gray-300 font-light tracking-wide
                                        animate-fadeIn animation-delay-300"
        >
          Get Important Topics
          <br />
          Notes just by uploading pyqs
        </p>

        <div className="pt-8 animate-fadeIn animation-delay-600">
          <div
            onClick={expandDynamicIsland}
            className="inline-flex items-center gap-2 px-6 py-3 
                                                bg-white/5 backdrop-blur-sm rounded-full 
                                                border border-white/10
                                                cursor-pointer hover:bg-white/10 hover:border-white/20 hover:scale-105
                                                transition-all duration-300"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-sm text-neutral-300">Click Start to begin</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
