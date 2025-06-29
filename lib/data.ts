import { ContentData, ShabbatTimes, Lesson, Memorial, TorahWord, Announcement } from '../types';

let contentData: ContentData = {
  lessons: [
    {
      id: '1',
      title: 'שיעור גמרא',
      teacher: 'הרב כהן',
      time: '08:00',
      date: '',
      recurring: true,
      dayOfWeek: 6
    }
  ],
  memorials: [],
  torahWords: [
    {
      id: '1',
      content: 'זכור את יום השבת לקדשו - כל השבת זכר ליציאת מצרים',
      author: 'רש"י',
      date: new Date().toISOString().split('T')[0]
    }
  ],
  announcements: [
    {
      id: '1',
      title: 'ברוכים הבאים',
      content: 'ברוכים הבאים לבית הכנסת שלנו. שבת שלום לכולם!',
      priority: 'medium',
      startDate: '2024-01-01',
      endDate: '2025-12-31'
    }
  ],
  shabbatTimes: null
};

export const getData = (): ContentData => contentData;

export const updateData = (newData: Partial<ContentData>): void => {
  contentData = { ...contentData, ...newData };
};

export const addLesson = (lesson: Omit<Lesson, 'id'>): void => {
  const newLesson = { ...lesson, id: Date.now().toString() };
  contentData.lessons.push(newLesson);
};

export const addMemorial = (memorial: Omit<Memorial, 'id'>): void => {
  const newMemorial = { ...memorial, id: Date.now().toString() };
  contentData.memorials.push(newMemorial);
};

export const addTorahWord = (torahWord: Omit<TorahWord, 'id'>): void => {
  const newTorahWord = { ...torahWord, id: Date.now().toString() };
  contentData.torahWords.push(newTorahWord);
};

export const addAnnouncement = (announcement: Omit<Announcement, 'id'>): void => {
  const newAnnouncement = { ...announcement, id: Date.now().toString() };
  contentData.announcements.push(newAnnouncement);
};

export const deleteLesson = (id: string): void => {
  contentData.lessons = contentData.lessons.filter(l => l.id !== id);
};

export const deleteMemorial = (id: string): void => {
  contentData.memorials = contentData.memorials.filter(m => m.id !== id);
};

export const deleteTorahWord = (id: string): void => {
  contentData.torahWords = contentData.torahWords.filter(t => t.id !== id);
};

export const deleteAnnouncement = (id: string): void => {
  contentData.announcements = contentData.announcements.filter(a => a.id !== id);
};
