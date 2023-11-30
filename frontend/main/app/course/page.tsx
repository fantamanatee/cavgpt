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

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setCourseRatings((prevState) => ({
      ...prevState,
      [value]: parseFloat(event.target.value),
    }));
  };

  const handleSubmit = async () => {
    console.log(courseRatings);
    fetch("https://fool1280.pythonanywhere.com/predict", {
      method: "POST",
      body: JSON.stringify(courseRatings),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setResult(json["predicted_ratings"])
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
                className="shrink-0 px-8 py-4 bg-[#fb442c] rounded"
                onClick={handleSubmit}
              >
                <span className="w-full text-center">Get Recommendations</span>
              </button>
            </div>
          </div>
          <div>
            {Object.keys(result)
              .sort((a: string, b: string) => result[b as keyof typeof result] - result[a as keyof typeof result])
              .map((course: string, index: number) => (
                <div
                  key={course}
                  className={`p-1 rounded bg-[#3f871c] w-full max-h-[85%] flex justify-center items-center my-4`}
                >
                  <p className="text-center text-2xl md:text-2xl font-bold">
                    {course} | Predicted Rating {result[course as keyof typeof result]}{" "}
                    {emojis[Math.round(result[course as keyof typeof result] as number) as keyof typeof emojis]}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
