import { NextRequest, NextResponse } from 'next/server';
import { addAnnouncement } from '../../../lib/data';

export async function POST(request: NextRequest) {
  try {
    const announcement = await request.json();
    addAnnouncement(announcement);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add announcement' }, { status: 500 });
  }
}
