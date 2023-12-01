"use client";

import { useState } from "react";

export default function CoursesPage() {
  const courses = [
    "ENGR 102",
    "CSCE 121",
    "CSCE 181",
    "CSCE 221",
    "CSCE 222",
    "CSCE 312",
    "CSCE 313",
    "CSCE 314",
    "CSCE 315",
  ];
  const initialRatings = {
    "ENGR 102": 1,
    "CSCE 121": 1,
    "CSCE 181": 1,
    "CSCE 221": 1,
    "CSCE 222": 1,
    "CSCE 312": 1,
    "CSCE 313": 1,
    "CSCE 314": 1,
    "CSCE 315": 1,
  };

  const emojis = {
    0: "🤔",
    1: "💀",
    2: "😭",
    3: "😐",
    4: "😀",
    5: "🤩",
  };

  const [courseRatings, setCourseRatings] = useState(initialRatings);
  const [result, setResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setCourseRatings((prevState) => ({
      ...prevState,
      [value]: parseFloat(event.target.value),
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    fetch("https://fool1280.pythonanywhere.com/predict", {
      method: "POST",
      body: JSON.stringify(courseRatings),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setResult(json["predicted_ratings"]);
        setIsLoading(false);
      });
  };

  const InfoCard = (
    <div className="p-4 md:p-8 rounded bg-[#25252d] w-full max-h-[85%] overflow-hidden">
      <h1 className="text-3xl md:text-4xl">📄 Courses Recommender Portal</h1>
    </div>
  );

  const CourseCard = (
    <div className="p-4 md:p-8 rounded bg-[#25252d] w-full max-h-[85%] overflow-auto">
      {courses.map((course) => (
        <div key={course}>
          <h3 className="text-3xl md:text-2xl">{course}</h3>
          <div className="flex items-center">
            <input
              type="range"
              className="w-[85%]"
              value={courseRatings[course as keyof typeof courseRatings]}
              min={1}
              max={5}
              step={1}
              onChange={(e) => handleSliderChange(e, course)}
            />
            <div className="text-center text-2xl md:text-2x1 font-bold mt-2 ml-10">
              {courseRatings[course as keyof typeof courseRatings]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {InfoCard}
      <div className="flex flex-row gap-4">
        <div className="p-4 md:p-8 rounded bg-[#17141c] w-full max-h-[85%] overflow-hidden">
          <h2 className="text-2xl md:text-2xl">
            🤔 Input Your Overall Course Ratings
          </h2>
          <p>How to calculate this score?</p>
          <p>
            (Difficulty + Happiness + Willingness to Take Again + Grade) / 4
            rounded to the closet number
          </p>
          {CourseCard}
        </div>
        <div className="p-4 md:p-8 rounded bg-[#17141c] w-full max-h-[85%] overflow-hidden flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-2xl">💡 Recommended Course</h2>
            <div>
              <button
                type="submit"
                className="w-48 h-12 bg-[#fb442c] rounded"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div
                    role="status"
                    className={`${
                      isLoading ? "" : "hidden"
                    } flex justify-center items-center w-full h-full`}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-white animate-spin dark:text-white fill-sky-800"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <span
                    className={`w-full h-full flex items-center justify-center`}
                  >
                    Get Results
                  </span>
                )}
              </button>
            </div>
          </div>
          <div>
            {Object.keys(result)
              .sort(
                (a: string, b: string) =>
                  result[b as keyof typeof result] -
                  result[a as keyof typeof result],
              )
              .map((course: string, index: number) => (
                <div
                  key={course}
                  className={`p-1 rounded bg-[#3f871c] w-full max-h-[85%] flex justify-center items-center my-4`}
                >
                  <p className="text-center text-2xl md:text-2xl font-bold">
                    {course} | Predicted Rating{" "}
                    {result[course as keyof typeof result]}{" "}
                    {
                      emojis[
                        Math.round(
                          result[course as keyof typeof result] as number,
                        ) as keyof typeof emojis
                      ]
                    }
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
