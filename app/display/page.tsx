'use client';

import { useState, useEffect } from 'react';
import { ContentData } from '../../types';

const ShabbatCandles = () => (
  <div className="flex items-end justify-center space-x-3 mx-4">
    <div className="flex flex-col items-center">
      <div className="candle-flame mb-1"></div>
      <div className="candle-body"></div>
    </div>
    <div className="flex flex-col items-center">
      <div className="candle-flame mb-1" style={{ animationDelay: '-0.5s' }}></div>
      <div className="candle-body"></div>
    </div>
  </div>
);

export default function DisplayPage() {
  const [data, setData] = useState<ContentData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/content');
        const contentData = await response.json();
        setData(contentData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
    
    // Refresh data every 5 minutes
    const dataInterval = setInterval(fetchData, 5 * 60 * 1000);
    
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Slide rotation for announcements
    const slideInterval = setInterval(() => {
      if (data?.announcements && data.announcements.length > 1) {
        setCurrentSlide((prev) => (prev + 1) % data.announcements.length);
      }
    }, 8000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(timeInterval);
      clearInterval(slideInterval);
    };
  }, [data?.announcements]);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen gradient-blue">
        <div className="text-4xl text-white text-shadow">טוען...</div>
      </div>
    );
  }

  const today = new Date().getDay(); // 0 = Sunday, 6 = Saturday
  const todaysLessons = data.lessons.filter(lesson => 
    lesson.recurring && lesson.dayOfWeek === today
  );

  const activeAnnouncements = data.announcements.filter(announcement => {
    const now = new Date();
    const start = new Date(announcement.startDate);
    const end = new Date(announcement.endDate);
    return now >= start && now <= end;
  });

  return (
    <div className="min-h-screen gradient-blue relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full blur-lg"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-7xl font-bold text-white mb-6 text-shadow shine relative overflow-hidden">
            בית כנסת קרית מלאכי
          </h1>
          <div className="text-3xl text-white/90 text-shadow">
            {currentTime.toLocaleString('he-IL', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Right Column - Shabbat Times */}
          <div className="space-y-8">
            {data.shabbatTimes && (
              <div className="glass rounded-3xl shadow-2xl p-8 card-float backdrop-blur-lg">
                <h2 className="text-5xl font-bold text-center text-white mb-8 text-shadow">
                  {data.shabbatTimes.parsha}
                </h2>
                <div className="space-y-6 text-2xl">
                  <div className="flex justify-between items-center p-6 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center">
                      <span className="font-semibold text-white">הדלקת נרות:</span>
                      <ShabbatCandles />
                    </div>
                    <span className="text-yellow-200 font-bold text-3xl">
                      {data.shabbatTimes.candleLighting}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-6 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <span className="font-semibold text-white">יציאת שבת:</span>
                    <span className="text-blue-200 font-bold text-3xl">
                      {data.shabbatTimes.havdalah}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Lessons */}
            {todaysLessons.length > 0 && (
              <div className="glass rounded-3xl shadow-2xl p-8 card-float">
                <h2 className="text-4xl font-bold text-center text-white mb-8 text-shadow">
                  🎓 שיעורים היום
                </h2>
                <div className="space-y-4">
                  {todaysLessons.map((lesson, index) => (
                    <div key={lesson.id} className="p-6 bg-white/30 rounded-2xl backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
                      <div className="text-2xl font-semibold text-white">
                        {lesson.title}
                      </div>
                      <div className="text-xl text-white/90 flex items-center mt-2">
                        <span>👨‍🏫 {lesson.teacher}</span>
                        <span className="mx-4">•</span>
                        <span>🕐 {lesson.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Announcements Carousel */}
            {activeAnnouncements.length > 0 && (
              <div className="glass rounded-3xl shadow-2xl p-8 card-float relative overflow-hidden min-h-[300px]">
                <h2 className="text-4xl font-bold text-center text-white mb-8 text-shadow">
                  📢 הודעות
                </h2>
                <div className="relative">
                  {activeAnnouncements.map((announcement, index) => (
                    <div
                      key={announcement.id}
                      className={`transition-all duration-1000 ${
                        index === currentSlide ? 'opacity-100 transform translate-x-0' : 'opacity-0 absolute top-0 transform translate-x-full'
                      }`}
                    >
                      <div className="bg-white/30 rounded-2xl p-6 backdrop-blur-sm">
                        {announcement.image && (
                          <img
                            src={announcement.image}
                            alt={announcement.title}
                            className="w-full h-48 object-cover rounded-xl mb-4"
                          />
                        )}
                        <h3 className="text-2xl font-bold text-white mb-4">{announcement.title}</h3>
                        <p className="text-xl text-white/90 leading-relaxed">{announcement.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {activeAnnouncements.length > 1 && (
                  <div className="flex justify-center mt-6 space-x-2">
                    {activeAnnouncements.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Torah Words */}
            {data.torahWords.length > 0 && (
              <div className="glass rounded-3xl shadow-2xl p-8 card-float">
                <h2 className="text-4xl font-bold text-center text-white mb-8 text-shadow">
                  📜 דבר תורה
                </h2>
                <div className="space-y-6">
                  {data.torahWords.slice(0, 2).map((word, index) => (
                    <div key={word.id} className="p-6 bg-white/30 rounded-2xl backdrop-blur-sm">
                      <p className="text-xl leading-relaxed text-white mb-4">
                        "{word.content}"
                      </p>
                      <div className="text-lg font-semibold text-yellow-200">
                        - {word.author}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Memorials */}
            {data.memorials.length > 0 && (
              <div className="glass rounded-3xl shadow-2xl p-8 card-float">
                <h2 className="text-4xl font-bold text-center text-white mb-8 text-shadow">
                  🕯️ אזכרות
                </h2>
                <div className="space-y-4">
                  {data.memorials.map((memorial) => (
                    <div key={memorial.id} className="p-6 bg-white/30 rounded-2xl text-center backdrop-blur-sm">
                      <div className="text-2xl font-semibold text-white">
                        {memorial.name}
                      </div>
                      <div className="text-lg text-white/90 mt-2">
                        {memorial.hebrewDate} • {memorial.yearsAgo} שנים
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-3xl text-white text-shadow">
          <div className="flex items-center justify-center space-x-4">
            <span>✨</span>
            <span>שבת שלום ומבורך</span>
            <span>✨</span>
          </div>
        </div>
      </div>
    </div>
  );
}
