import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img
            className="h-36 inline p-6 transition-[filter] duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]"
            src={viteLogo}
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="h-36 inline p-6 transition-[filter] duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] animate-[spin_infinite_20s_linear]"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="text-[3.2rem] leading-[1.1] font-bold my-[2.15rem]">
        Vite + React
      </h1>
      <div className="p-8">
        <button
          className="rounded-lg text-base leading-tight font-medium font-[inherit] border border-solid border-transparent py-[0.6rem] px-[1.2rem] bg-[#1a1a1a] cursor-pointer
          transition-[border-color] 
          hover:border-[#646cff]
          focus:outline-4 focus:outline-style-[auto] focus:outline-[-webkit-focus-ring-color]
          focus-visible:outline-4 focus-visible:outline-style-[auto] focus-visible:outline-[-webkit-focus-ring-color]"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="my-4">
          Edit <code className="text-[0.813rem] font-mono">src/App.tsx</code>{" "}
          and save to test HMR
        </p>
      </div>
      <p className="my-4 text-[#888]">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
