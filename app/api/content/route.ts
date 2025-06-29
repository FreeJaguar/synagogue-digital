import { NextResponse } from 'next/server';

export async function GET() {
  // Demo data for now
  const demoData = {
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
        content: 'ברוכים הבאים לבית הכנסת שלנו. שבת שלום לכולם!',
        priority: 'medium',
        startDate: '2024-01-01',
        endDate: '2025-12-31'
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
    shabbatTimes: {
      candleLighting: "19:12",
      havdalah: "20:28",
      parsha: "פרשת בלק",
      date: new Date().toLocaleDateString('he-IL'),
      hebrewDate: "כ\"ד תמוז"
    }
  };
  
  return NextResponse.json(demoData);
}
