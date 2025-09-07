import AppLayout from "@/components/AppLayout";
import React, { useState, useEffect } from "react";

const Achievements = () => {
  const mockAchievements = [
    {
      id: 1,
      name: "Bookworm",
      imageUrl: "/book.jpg",
      unlocked: true,
      progress: { current: 15, total: 10 },
    },
    {
      id: 2,
      name: "Speed master",
      imageUrl: "/car.jpg",
      unlocked: true,
      progress: { current: 1, total: 1 },
    },
    {
      id: 3,
      name: "Top Scorer",
      imageUrl: "/ball.jpg",
      unlocked: false,
      progress: { current: 3, total: 5 },
    },
    {
      id: 4,
      name: "Crown King",
      imageUrl: "/crown.jpg",
      unlocked: false,
      progress: { current: 1, total: 3 },
    },
    {
      id: 5,
      name: "Well Dressed",
      imageUrl: "/suit.jpg",
      unlocked: true,
      progress: { current: 10, total: 10 },
    },
    {
      id: 6,
      name: "High Roller",
      imageUrl: "/goldcoin.jpg",
      unlocked: false,
      progress: { current: 20, total: 50 },
    },
    {
      id: 7,
      name: "Shoe Collector",
      imageUrl: "/shoe.jpg",
      unlocked: true,
      progress: { current: 5, total: 5 },
    },
    {
      id: 8,
      name: "Frequent Flyer",
      imageUrl: "/airplane.jpg",
      unlocked: false,
      progress: { current: 2, total: 10 },
    },
    {
      id: 9,
      name: "Time Master",
      imageUrl: "/watch.jpg",
      unlocked: true,
      progress: { current: 1, total: 1 },
    },
    {
      id: 10,
      name: "Warrior",
      imageUrl: "/sword.jpg",
      unlocked: false,
      progress: { current: 7, total: 15 },
    },
  ];

  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate API fetch with mock data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAchievements(mockAchievements);
      setLoading(false);
    }, 1000); // fake loading delay
  }, []);

  return (
    <AppLayout>
      <div className="p-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#006045] mb-2 text-center">
          My Achievements
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Take a step to unlock new badges every books you borrow 📚
        </p>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-[#D9F3EA]">
          <div className="flex flex-col mb-4">
            <h2 className="font-semibold text-[#006045] mb-2">Your Progress</h2>
            <h2 className="font-semibold text-[#006045] align-left mb-2">
              13%
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-[#006045] h-2 rounded-full w-20"></div>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            points until the next badge. Keep reading!
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-40">
            <span className="text-gray-500">Loading achievements...</span>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-md p-6 border border-[#D9F3EA]">
          <h2 className="font-semibold text-[#006045] mb-4">The Awards</h2>

          {!loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {achievements.map((item) => (
                <div
                  key={item.id}
                  className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    item.unlocked
                      ? "bg-[#D9F3EA] shadow-md"
                      : "bg-gray-100 opacity-60 shadow-inner"
                  }`}
                >
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center bg-white mb-3 overflow-hidden transition-all duration-300 
              ${
                item.unlocked
                  ? "shadow-xl hover:shadow-2xl hover:ring-2 hover:ring-green-400/50"
                  : "shadow-md"
              }`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className={`w-16 h-16 object-contain ${
                        item.unlocked ? "" : "grayscale"
                      }`}
                    />
                  </div>

                  <span
                    className={`text-center font-semibold text-sm ${
                      item.unlocked ? "text-[#006045]" : "text-gray-500"
                    }`}
                  >
                    {item.name}
                  </span>

                  <span className="text-xs text-gray-500 mt-1 text-center">
                    {item.unlocked
                      ? "Unlocked!"
                      : `Progress: ${item.progress.current} / ${item.progress.total}`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Achievements;
