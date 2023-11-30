"use client";

import { useState } from "react";

export default function CoursesPage() {
  const [result, setResult] = useState("");
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
  const initialState = {
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

  const [courseState, setCourseState] = useState(initialState);

  const handleSliderChange = (event, value) => {
    setCourseState((prevState) => ({
      ...prevState,
      [value]: parseFloat(event.target.value),
    }));
  };

  const handleSubmit = async () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(courseState),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setResult("Check the Console and Network tabs for results yo.");
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
          <div>
            <input
              type="range"
              value={courseState[course]}
              min={1}
              max={5}
              step={1}
              onChange={(e) => handleSliderChange(e, course)}
            />
            <div className="text-center font-bold mt-2" id="slider-output">
              {courseState[course]}
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
          <h2 className="text-2xl md:text-2xl">🤔 Input Information</h2>
          {CourseCard}
        </div>
        <div className="p-4 md:p-8 rounded bg-[#17141c] w-full max-h-[85%] overflow-hidden">
          <h2 className="text-2xl md:text-2xl">💡 Recommended Course</h2>
          {courses.map((course) => (
            <div key={course}>
              <p>
                {course}: {courseState[course]}
              </p>
            </div>
          ))}
          <button
            type="submit"
            className="shrink-0 px-8 py-4 bg-[#fb442c] rounded w-28"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <br></br>
          Result: {result}
        </div>
      </div>
    </div>
  );
}
