import React from "react";
import { useState } from "react";

const Stat = () => {
  const data = {
    subscriberCount: 120000,
    rank: 34,
    description: "A community for discussing interesting questions.",
    topSubmissions: [
      {
        score: "13.3k",
        title: "Postttttttttttttttttttttttttttttttttttttttttt 1",
        user: "/u/User1",
      },
      { score: "13.1k", title: "Post 2", user: "/u/User2" },
      { score: "10.5k", title: "Post 3", user: "/u/User3" },
      { score: "9.9k", title: "Post 4", user: "/u/User4" },
      { score: "9.9k", title: "Post 5", user: "/u/User5" },
    ],

    avgCommentsTopPosts: 45,
    avgUpsTopPosts: 150,
    avgCommentsPerPostLastWeek: 32,
    avgUpsPerPostLastWeek: 140,
    wordCloud: ["discussion", "question", "advice", "fun"],
    bestTimeToPost: "3:00 PM - 5:00 PM",
  };

  const [timeFilter, setTimeFilter] = useState("year");

  return (
    <div className="container mx-auto mt-10 text-gray-800">
      <div className="flex flex-wrap gap-6">
        <div className="p-4 bg-white shadow-md rounded-lg flex-[1_1_0%]">
          <h2 className="text-xl font-semibold">Subscriber Count</h2>
          <p className="text-2xl text-customOrange font-bold">
            {data.subscriberCount}
          </p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg flex-[1_1_0%]">
          <h2 className="text-xl font-semibold">Rank</h2>
          <p className="text-2xl text-customOrange font-bold">{data.rank}</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg flex-[2_1_0%]">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="text-xl text-customOrange font-semibold">
            {data.description}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-6 mt-6">
        <div className="p-4 bg-white shadow-md rounded-lg flex-1">
          <h2 className="text-xl font-semibold">Avg Comments (Top Posts)</h2>
          <p className="text-2xl text-customOrange font-bold">
            {data.avgCommentsTopPosts}
          </p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg flex-1">
          <h2 className="text-xl font-semibold">Avg Ups (Top Posts)</h2>
          <p className="text-2xl text-customOrange font-bold">
            {data.avgUpsTopPosts}
          </p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg flex-1">
          <h2 className="text-xl font-semibold">Avg Comments (Last Week)</h2>
          <p className="text-2xl text-customOrange font-bold">
            {data.avgCommentsPerPostLastWeek}
          </p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg flex-1">
          <h2 className="text-xl font-semibold">Avg Ups (Last Week)</h2>
          <p className="text-2xl text-customOrange font-bold">
            {data.avgUpsPerPostLastWeek}
          </p>
        </div>
      </div>
      <div className="bg-white h-auto mt-6 p-6 shadow-md rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Top Submissions</h2>
          <select
            className="border rounded-md px-3 py-2"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="all">All time</option>
            <option value="last year">Last Year</option>
            <option value="last month">Last month</option>
          </select>
        </div>
        <ul className="space-y-2">
          {data.topSubmissions.map((submission, index) => (
            <li key={index} className="flex items-center">
              <div className="flex items-center space-x-2 w-24">
                {" "}
                <span className="text-lg text-customOrange font-semibold">{submission.score}</span>
              </div>
              <a
                href="#"
                className="text-black hover:underline truncate w-full text-left"
              >
                {submission.title}
              </a>
              <span className="text-gray-500 ml-4">{submission.user}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Stat;
