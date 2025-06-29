export interface ShabbatTimes {
  candleLighting: string;
  havdalah: string;
  parsha: string;
  date: string;
  hebrewDate: string;
}

export interface Lesson {
  id: string;
  title: string;
  teacher: string;
  time: string;
  date: string;
  recurring: boolean;
  dayOfWeek?: number; // 0-6, Sunday = 0
}

export interface Memorial {
  id: string;
  name: string;
  hebrewDate: string;
  gregorianDate: string;
  yearsAgo: number;
}

export interface TorahWord {
  id: string;
  content: string;
  author: string;
  date: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  image?: string;
  priority: 'low' | 'medium' | 'high';
  startDate: string;
  endDate: string;
}

export interface ContentData {
  lessons: Lesson[];
  memorials: Memorial[];
  torahWords: TorahWord[];
  announcements: Announcement[];
  shabbatTimes: ShabbatTimes | null;
}
