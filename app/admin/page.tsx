'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('auth-token');
    if (token) {
      // Verify token
      fetch('/api/verify-token', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          setIsAuthenticated(true);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const { token } = await response.json();
        Cookies.set('auth-token', token, { expires: 7 });
        setIsAuthenticated(true);
      } else {
        alert('שם משתמש או סיסמה שגויים');
      }
    } catch (error) {
      alert('שגיאה בהתחברות');
    }
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

  return <AdminDashboard />;
}

function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('lessons');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/content');
      const contentData = await response.json();
      setData(contentData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const logout = () => {
    Cookies.remove('auth-token');
    window.location.reload();
  };

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
            {activeTab === 'lessons' && <LessonsTab data={data} onUpdate={fetchData} />}
            {activeTab === 'announcements' && <AnnouncementsTab data={data} onUpdate={fetchData} />}
            {activeTab === 'memorials' && <MemorialsTab data={data} onUpdate={fetchData} />}
            {activeTab === 'torah' && <TorahTab data={data} onUpdate={fetchData} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnnouncementsTab({ data, onUpdate }: any) {
  const [form, setForm] = useState({
    title: '',
    content: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (selectedImage) {
        // Convert image to base64 for storage (in production, use cloud storage)
        const reader = new FileReader();
        reader.onload = async () => {
          imageUrl = reader.result as string;
          
          await fetch('/api/announcements', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, image: imageUrl })
          });
          
          setForm({
            title: '',
            content: '',
            priority: 'medium',
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          });
          setSelectedImage(null);
          setImagePreview('');
          onUpdate();
        };
        reader.readAsDataURL(selectedImage);
      } else {
        await fetch('/api/announcements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        
        setForm({
          title: '',
          content: '',
          priority: 'medium',
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });
        onUpdate();
      }
    } catch (error) {
      alert('שגיאה בהוספת הודעה');
    }
  };

  const deleteAnnouncement = async (id: string) => {
    try {
      await fetch(`/api/announcements/${id}`, { method: 'DELETE' });
      onUpdate();
    } catch (error) {
      alert('שגיאה במחיקת הודעה');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <h3 className="text-2xl font-bold mb-6 text-slate-800 flex items-center">
          <span className="ml-3">📢</span>
          הוספת הודעה חדשה
        </h3>
        <form onSubmit={addAnnouncement} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">כותרת</label>
              <input
                type="text"
                placeholder="כותרת ההודעה"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">עדיפות</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value as any })}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="low">נמוכה</option>
                <option value="medium">בינונית</option>
                <option value="high">גבוהה</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">תאריך התחלה</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">תאריך סיום</label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">תוכן ההודעה</label>
            <textarea
              placeholder="תוכן ההודעה..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">תמונה (אופציונלי)</label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                📷 בחר תמונה
              </label>
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg border-2 border-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview('');
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg font-medium text-lg"
          >
            ➕ הוסף הודעה
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200">
        <h3 className="text-2xl font-bold p-8 border-b border-slate-200 text-slate-800 flex items-center">
          <span className="ml-3">📋</span>
          הודעות קיימות
        </h3>
        <div className="divide-y divide-slate-200">
          {data.announcements.map((announcement: any) => (
            <div key={announcement.id} className="p-8 hover:bg-slate-50 transition-colors duration-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h4 className="text-xl font-semibold text-slate-800">{announcement.title}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority === 'high' ? 'גבוהה' : 
                       announcement.priority === 'medium' ? 'בינונית' : 'נמוכה'}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-3 leading-relaxed">{announcement.content}</p>
                  {announcement.image && (
                    <img
                      src={announcement.image}
                      alt={announcement.title}
                      className="w-32 h-24 object-cover rounded-lg border border-slate-200 mb-3"
                    />
                  )}
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <span>📅 {new Date(announcement.startDate).toLocaleDateString('he-IL')}</span>
                    <span>-</span>
                    <span>📅 {new Date(announcement.endDate).toLocaleDateString('he-IL')}</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteAnnouncement(announcement.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                >
                  🗑️ מחק
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LessonsTab({ data, onUpdate }: any) {
  const [form, setForm] = useState({
    title: '',
    teacher: '',
    time: '',
    recurring: true,
    dayOfWeek: 6
  });

  const addLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setForm({ title: '', teacher: '', time: '', recurring: true, dayOfWeek: 6 });
      onUpdate();
    } catch (error) {
      alert('שגיאה בהוספת שיעור');
    }
  };

  const deleteLesson = async (id: string) => {
    try {
      await fetch(`/api/lessons/${id}`, { method: 'DELETE' });
      onUpdate();
    } catch (error) {
      alert('שגיאה במחיקת שיעור');
    }
  };

  const dayNames = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

  return (
    <div className="space-y-6">
      <form onSubmit={addLesson} className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">הוספת שיעור חדש</h3>
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
              <button
                onClick={() => deleteLesson(lesson.id)}
                className="text-red-600 hover:text-red-800"
              >
                מחק
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MemorialsTab({ data, onUpdate }: any) {
  const [form, setForm] = useState({
    name: '',
    hebrewDate: '',
    gregorianDate: '',
    yearsAgo: 0
  });

  const addMemorial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/memorials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setForm({ name: '', hebrewDate: '', gregorianDate: '', yearsAgo: 0 });
      onUpdate();
    } catch (error) {
      alert('שגיאה בהוספת אזכרה');
    }
  };

  const deleteMemorial = async (id: string) => {
    try {
      await fetch(`/api/memorials/${id}`, { method: 'DELETE' });
      onUpdate();
    } catch (error) {
      alert('שגיאה במחיקת אזכרה');
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={addMemorial} className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">הוספת אזכרה</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="שם הנפטר"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="תאריך עברי"
            value={form.hebrewDate}
            onChange={(e) => setForm({ ...form, hebrewDate: e.target.value })}
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="date"
            value={form.gregorianDate}
            onChange={(e) => setForm({ ...form, gregorianDate: e.target.value })}
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="number"
            placeholder="כמה שנים"
            value={form.yearsAgo}
            onChange={(e) => setForm({ ...form, yearsAgo: parseInt(e.target.value) })}
            className="border rounded px-3 py-2"
            required
          />
        </div>
