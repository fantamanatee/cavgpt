"use client";

import { useState } from "react";

export default function CoursesPage() {
  const courses = [
    "engr102",
    "csce121",
    "csce181",
    "csce221",
    "csce222",
    "csce312",
    "csce313",
    "csce314",
    "csce315",
  ];
  const initialRatings = {
    engr102: 1,
    csce121: 1,
    csce181: 1,
    csce221: 1,
    csce222: 1,
    csce312: 1,
    csce313: 1,
    csce314: 1,
    csce315: 1,
  };

  const initialResults = {
    csce470: 5,
  };

  const [courseRatings, setCourseRatings] = useState(initialRatings);
  const [result, setResult] = useState(initialResults);

  const handleSliderChange = (event, value) => {
    setCourseRatings((prevState) => ({
      ...prevState,
      [value]: parseFloat(event.target.value),
    }));
  };

  const handleSubmit = async () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(courseRatings),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setResult({ "Expecting response from backend": 0 });
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
              value={courseRatings[course]}
              min={1}
              max={5}
              step={1}
              onChange={(e) => handleSliderChange(e, course)}
            />
            <div className="text-center text-2xl md:text-2x1 font-bold mt-2 ml-10">
              {courseRatings[course]}
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
          <h2 className="text-2xl md:text-2xl">💡 Recommended Course</h2>
          <div className="flex justify-center">
            <button
              type="submit"
              className="shrink-0 px-8 py-4 bg-[#fb442c] rounded"
              onClick={handleSubmit}
            >
              <span className="w-full text-center">Get Recommendations</span>
            </button>
          </div>
          <div>
            {Object.keys(result).map((course) => (
              <div key={course}>
                <p className="text-center text-2xl md:text-2xl font-bold mt-2 ml-10">
                  {course}: {result[course]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
