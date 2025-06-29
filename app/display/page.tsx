'use client';

import { useState, useEffect } from 'react';

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
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  // Demo data
  const demoData = {
    shabbatTimes: {
      candleLighting: "19:12",
      havdalah: "20:28",
      parsha: "פרשת בלק"
    },
    lessons: [
      {
        id: '1',
        title: 'שיעור גמרא',
        teacher: 'הרב כהן',
        time: '08:00'
      }
    ],
    announcements: [
      {
        id: '1',
        title: 'ברוכים הבאים',
        content: 'ברוכים הבאים לבית הכנסת שלנו. שבת שלום לכולם!'
      }
    ],
    torahWords: [
      {
        id: '1',
        content: 'זכור את יום השבת לקדשו - כל השבת זכר ליציאת מצרים',
        author: 'רש"י'
      }
    ],
    memorials: []
  };

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
            <div className="glass rounded-3xl shadow-2xl p-8 card-float backdrop-blur-lg">
              <h2 className="text-5xl font-bold text-center text-white mb-8 text-shadow">
                {demoData.shabbatTimes.parsha}
              </h2>
              <div className="space-y-6 text-2xl">
                <div className="flex justify-between items-center p-6 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center">
                    <span className="font-semibold text-white">הדלקת נרות:</span>
                    <ShabbatCandles />
                  </div>
                  <span className="text-yellow-200 font-bold text-3xl">
                    {demoData.shabbatTimes.candleLighting}
                  </span>
                </div>
                <div className="flex justify-between items-center p-6 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <span className="font-semibold text-white">יציאת שבת:</span>
                  <span className="text-blue-200 font-bold text-3xl">
                    {demoData.shabbatTimes.havdalah}
                  </span>
                </div>
              </div>
            </div>

            {/* Lessons */}
            <div className="glass rounded-3xl shadow-2xl p-8 card-float">
              <h2 className="text-4xl font-bold text-center text-white mb-8 text-shadow">
                🎓 שיעורים היום
              </h2>
              <div className="space-y-4">
                {demoData.lessons.map((lesson) => (
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
          </div>

          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Announcements */}
            <div className="glass rounded-3xl shadow-2xl p-8 card-float relative overflow-hidden min-h-[300px]">
              <h2 className="text-4xl font-bold text-center text-white mb-8 text-shadow">
                📢 הודעות
              </h2>
              <div className="relative">
                {demoData.announcements.map((announcement) => (
                  <div key={announcement.id} className="bg-white/30 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold text-white mb-4">{announcement.title}</h3>
                    <p className="text-xl text-white/90 leading-relaxed">{announcement.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Torah Words */}
            <div className="glass rounded-3xl shadow-2xl p-8 card-float">
              <h2 className="text-4xl font-bold text-center text-white mb-8 text-shadow">
                📜 דבר תורה
              </h2>
              <div className="space-y-6">
                {demoData.torahWords.map((word) => (
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
