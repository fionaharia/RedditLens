import React from 'react';

const Stat = () => {
  // Sample data (replace with real data)
  const data = {
    subscriberCount: 120000,
    rank: 34,
    description: "A community for discussing interesting questions.",
    topSubmissions: ["Post 1", "Post 2", "Post 3"],
    avgCommentsTopPosts: 45,
    avgUpsTopPosts: 150,
    avgCommentsPerPostLastWeek: 32,
    avgUpsPerPostLastWeek: 140,
    wordCloud: ["discussion", "question", "advice", "fun"],
    bestTimeToPost: "3:00 PM - 5:00 PM",
  };

  return (
    <div className='container mx-auto mt-10 text-black'>
      <h1 className='text-4xl font-bold text-center mb-8'>RedditLens Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Subscriber Count */}
        <div className='p-6 bg-white shadow-md rounded-lg'>
          <h2 className='text-xl font-semibold'>Subscriber Count</h2>
          <p className='text-2xl font-bold'>{data.subscriberCount}</p>
        </div>

        {/* Rank */}
        <div className='p-6 bg-white shadow-md rounded-lg'>
          <h2 className='text-xl font-semibold'>Rank</h2>
          <p className='text-2xl font-bold'>{data.rank}</p>
        </div>

        {/* Description */}
        <div className='p-6 bg-white shadow-md rounded-lg'>
          <h2 className='text-xl font-semibold'>Description</h2>
          <p className='text-lg'>{data.description}</p>
        </div>

        {/* Top Submissions (Filter) */}
        <div className='p-6 bg-white shadow-md rounded-lg'>
          <h2 className='text-xl font-semibold'>Top Submissions</h2>
          <ul className='list-disc ml-5'>
            {data.topSubmissions.map((submission, index) => (
              <li key={index}>{submission}</li>
            ))}
          </ul>
        </div>

        {/* Average Comments on Top Posts */}
        <div className='p-6 bg-white shadow-md rounded-lg'>
          <h2 className='text-xl font-semibold'>Avg Comments on Top Posts</h2>
          <p className='text-2xl font-bold'>{data.avgCommentsTopPosts}</p>
        </div>

        {/* Average Ups on Top Posts */}
        <div className='p-6 bg-white shadow-md rounded-lg'>
          <h2 className='text-xl font-semibold'>Avg Ups on Top Posts</h2>
          <p className='text-2xl font-bold'>{data.avgUpsTopPosts}</p>
        </div>

        {/* Average Comments Made Per Post (Last Week) */}
        <div className='p-6 bg-white shadow-md rounded-lg'>
          <h2 className='text-xl font-semibold'>Avg Comments Per Post (Last Week)</h2>
          <p className='text-2xl font-bold'>{data.avgCommentsPerPostLastWeek}</p>
        </div>

        {/* Average Ups Gained Per Post (Last Week) */}
        <div className='p-6 bg-white shadow-md rounded-lg'>
          <h2 className='text-xl font-semibold'>Avg Ups Per Post (Last Week)</h2>
          <p className='text-2xl font-bold'>{data.avgUpsPerPostLastWeek}</p>
        </div>

        {/* Word Cloud */}
        <div className='p-6 bg-white shadow-md rounded-lg'>
          <h2 className='text-xl font-semibold'>Word Cloud</h2>
          <div className='flex flex-wrap gap-2'>
            {data.wordCloud.map((word, index) => (
              <span
                key={index}
                className='px-3 py-1 bg-gray-200 rounded-full text-sm font-semibold'
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Best Time to Post */}
        <div className='p-6 bg-white shadow-md rounded-lg'>
          <h2 className='text-xl font-semibold'>Best Time to Post</h2>
          <p className='text-2xl font-bold'>{data.bestTimeToPost}</p>
        </div>
      </div>
    </div>
  );
};

export default Stat;
