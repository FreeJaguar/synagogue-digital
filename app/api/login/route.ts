import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    // Simple demo login
    if ((username === 'גבאי1' && password === 'password1') || 
        (username === 'גבאי2' && password === 'password2')) {
      return NextResponse.json({ token: 'demo-token-12345' });
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
