import AppLayout from "@/components/AppLayout";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const Achievements = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token not found.");
        }

        const response = await fetch("/api/user/me/achievements", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch achievements.");
        }

        const data = await response.json();
        setAchievements(data);
      } catch (err) {
        console.error("Failed to fetch achievements:", err);
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAchievements();
    }
  }, [user]);

  return (
    <AppLayout>
      <div className="p-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#006045] mb-2 text-center">
          My Achievements
        </h1>
        <p className="text-center text-gray-600 mb-8">
          A collection of badges and awards you've earned by reading books.
        </p>

        {loading && (
          <div className="flex justify-center items-center h-40">
            <span className="text-gray-500">Loading achievements...</span>
          </div>
        )}

        {error && <div className="text-center text-red-500 mt-4">{error}</div>}

        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {achievements.length > 0 ? (
              achievements.map((item) => (
                <div
                  key={item.id}
                  className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-sm
                    ${
                      item.unlocked
                        ? "bg-[#D9F3EA] shadow-md"
                        : "bg-gray-100 opacity-60 shadow-inner"
                    }`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className={`w-16 h-16 object-contain mb-2 ${
                      item.unlocked ? "" : "grayscale"
                    }`}
                  />
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
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 p-8">
                No achievements found. Start borrowing books to earn your first
                one!
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Achievements;
