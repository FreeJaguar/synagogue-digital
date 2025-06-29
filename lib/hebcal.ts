export const fetchShabbatTimes = async (): Promise<ShabbatTimes | null> => {
  try {
    // Kiryat Malakhi coordinates
    const response = await fetch(
      'https://www.hebcal.com/shabbat?cfg=json&geonameid=294801&m=50'
    );
    const data = await response.json();
    
    const candleLighting = data.items.find((item: any) => 
      item.title.includes('Candle lighting')
    );
    const havdalah = data.items.find((item: any) => 
      item.title.includes('Havdalah')
    );
    const parsha = data.items.find((item: any) => 
      item.category === 'parashat'
    );

    if (!candleLighting || !havdalah) return null;

    return {
      candleLighting: new Date(candleLighting.date).toLocaleTimeString('he-IL', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      havdalah: new Date(havdalah.date).toLocaleTimeString('he-IL', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      parsha: parsha?.hebrew || 'פרשת השבוע',
      date: new Date().toLocaleDateString('he-IL'),
      hebrewDate: data.items[0]?.hdate || ''
    };
  } catch (error) {
    console.error('Failed to fetch Shabbat times:', error);
    return null;
  }
};
