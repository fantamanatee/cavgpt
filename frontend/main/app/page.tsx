const InfoCard = (
  <div className="flex flex-col items-center justify-center p-8 rounded w-full max-h-[85%] overflow-hidden">
    <img
      src="/images/cavgpt-logo.png"
      className="w-50 h-40 md:w-30 md:h-40"
    />
  </div>
);

export default function Home() {
  return (
    <>
    {InfoCard}
    <div className="p-4 md:p-8 rounded bg-[#25252d] w-full max-h-[85%] overflow-hidden">
      <h1 className="text-3xl md:text-4xl mb-4">Instructions 📝</h1>
      <ul>
        <li className="text-l">
          🤝
          <span className="ml-2">
            Welcome to <b>Cav&apos;s Course Recommender</b>: Input course ratings,
            receive recommended courses you would enjoy 🔍✨
          </span>
        </li>
        {/* <li className="text-l">
          ❓
          <span className="ml-2">
            Don&apos;t know what the course is about? Ask our custom LLM chatbot
            🤖
          </span>
        </li> */}
        <li className="text-l">
          ✨
          <span className="ml-2">
            Made {" "}
            {/* <a href="https://js.langchain.com/" target="_blank">
              LangChain.js
            </a>{" "}
            and the Vercel{" "}
            <a href="https://sdk.vercel.ai/docs" target="_blank">
              AI SDK
            </a>{" "} */}
            in a{" "}
            <a href="https://nextjs.org/" target="_blank">
              Next.js
            </a>{" "}
            project.
          </span>
        </li>
      </ul>
    </div>
    </>
  );
}
