// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simple auth check for demo
    const authToken = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;
    if (authToken) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple login for demo
    if ((username === 'גבאי1' && password === 'password1') || 
        (username === 'גבאי2' && password === 'password2')) {
      localStorage.setItem('auth-token', 'demo-token');
      setIsAuthenticated(true);
    } else {
      alert('שם משתמש או סיסמה שגויים');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">טוען...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              התחברות גבאים
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <input
                  type="text"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="שם משתמש"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="סיסמה"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                התחבר
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return <AdminDashboard logout={logout} />;
}

function AdminDashboard({ logout }: { logout: () => void }) {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('lessons');

  useEffect(() => {
    // Simulate data loading
    setData({
      lessons: [
        {
          id: '1',
          title: 'שיעור גמרא',
          teacher: 'הרב כהן',
          time: '08:00',
          recurring: true,
          dayOfWeek: 6
        }
      ],
      announcements: [
        {
          id: '1',
          title: 'ברוכים הבאים',
          content: 'ברוכים הבאים לבית הכנסת שלנו',
          priority: 'medium',
          startDate: '2024-01-01',
          endDate: '2025-12-31'
        }
      ],
      memorials: [],
      torahWords: [
        {
          id: '1',
          content: 'זכור את יום השבת לקדשו',
          author: 'רש"י',
          date: new Date().toISOString().split('T')[0]
        }
      ]
    });
  }, []);

  if (!data) return <div>טוען...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🏛️ ניהול תוכן - בית כנסת
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.open('/display', '_blank')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                👁️ תצוגה מקדימה
              </button>
              <button
                onClick={logout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                🚪 התנתק
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 mb-8">
            <nav className="flex space-x-8 px-6 pt-6">
              {[
                { id: 'lessons', name: 'שיעורים', icon: '🎓' },
                { id: 'announcements', name: 'הודעות', icon: '📢' },
                { id: 'memorials', name: 'אזכרות', icon: '🕯️' },
                { id: 'torah', name: 'דברי תורה', icon: '📜' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-6 font-medium text-lg rounded-t-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform -translate-y-1'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span className="ml-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-8">
            {activeTab === 'lessons' && <LessonsTab data={data} />}
            {activeTab === 'announcements' && <AnnouncementsTab data={data} />}
            {activeTab === 'memorials' && <MemorialsTab data={data} />}
            {activeTab === 'torah' && <TorahTab data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function LessonsTab({ data }: any) {
  const [form, setForm] = useState({
    title: '',
    teacher: '',
    time: '',
    recurring: true,
    dayOfWeek: 6
  });

  const addLesson = (e: React.FormEvent) => {
    e.preventDefault();
    alert('שיעור נוסף בהצלחה!');
    setForm({ title: '', teacher: '', time: '', recurring: true, dayOfWeek: 6 });
  };

  const dayNames = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">הוספת שיעור חדש</h3>
        <form onSubmit={addLesson}>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="כותרת השיעור"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="text"
              placeholder="מרצה"
              value={form.teacher}
              onChange={(e) => setForm({ ...form, teacher: e.target.value })}
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="border rounded px-3 py-2"
              required
            />
            <select
              value={form.dayOfWeek}
              onChange={(e) => setForm({ ...form, dayOfWeek: parseInt(e.target.value) })}
              className="border rounded px-3 py-2"
            >
              {dayNames.map((day, index) => (
                <option key={index} value={index}>{day}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            הוסף שיעור
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium p-6 border-b">שיעורים קיימים</h3>
        <div className="divide-y">
          {data.lessons.map((lesson: any) => (
            <div key={lesson.id} className="p-6 flex justify-between items-center">
              <div>
                <h4 className="font-medium">{lesson.title}</h4>
                <p className="text-gray-600">{lesson.teacher} • {lesson.time}</p>
                <p className="text-sm text-gray-500">
                  {lesson.recurring ? `כל יום ${dayNames[lesson.dayOfWeek]}` : lesson.date}
                </p>
              </div>
              <button className="text-red-600 hover:text-red-800">
                מחק
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnnouncementsTab({ data }: any) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">הודעות</h3>
      <p>מערכת הודעות תבוא בקרוב...</p>
    </div>
  );
}

function MemorialsTab({ data }: any) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">אזכרות</h3>
      <p>מערכת אזכרות תבוא בקרוב...</p>
    </div>
  );
}

function TorahTab({ data }: any) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">דברי תורה</h3>
      {data.torahWords.map((word: any) => (
        <div key={word.id} className="p-4 bg-gray-50 rounded mb-4">
          <p>{word.content}</p>
          <p className="text-gray-600 text-sm mt-2">- {word.author}</p>
        </div>
      ))}
    </div>
  );
}
