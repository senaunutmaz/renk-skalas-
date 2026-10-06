// Extracts the dominant color from an image element or Data URL using HTML5 Canvas
export async function extractDominantColor(imageSource: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve('#C19A6B');
          return;
        }

        // Downscale for fast processing
        const size = 64;
        canvas.width = size;
        canvas.height = size;

        ctx.drawImage(img, 0, 0, size, size);
        const imageData = ctx.getImageData(0, 0, size, size);
        const data = imageData.data;

        // Sample center 50% to avoid background borders as much as possible
        let totalR = 0;
        let totalG = 0;
        let totalB = 0;
        let count = 0;

        const startX = Math.floor(size * 0.25);
        const endX = Math.floor(size * 0.75);
        const startY = Math.floor(size * 0.25);
        const endY = Math.floor(size * 0.75);

        for (let y = startY; y < endY; y++) {
          for (let x = startX; x < endX; x++) {
            const index = (y * size + x) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const a = data[index + 3];

            // Ignore transparent or extreme pure white/black background pixels if possible
            if (a > 180 && !(r > 245 && g > 245 && b > 245) && !(r < 15 && g < 15 && b < 15)) {
              totalR += r;
              totalG += g;
              totalB += b;
              count++;
            }
          }
        }

        if (count === 0) {
          // If all pixels were excluded, take average of whole center
          for (let y = startY; y < endY; y++) {
            for (let x = startX; x < endX; x++) {
              const index = (y * size + x) * 4;
              totalR += data[index];
              totalG += data[index + 1];
              totalB += data[index + 2];
              count++;
            }
          }
        }

        const avgR = Math.round(totalR / count);
        const avgG = Math.round(totalG / count);
        const avgB = Math.round(totalB / count);

        const hex =
          '#' +
          [avgR, avgG, avgB]
            .map((x) => x.toString(16).padStart(2, '0'))
            .join('')
            .toUpperCase();

        resolve(hex);
      } catch (err) {
        // Fallback default
        resolve('#C19A6B');
      }
    };

    img.onerror = () => {
      resolve('#C19A6B');
    };

    img.src = imageSource;
  });
}

// Convert Hex to nearest human-readable color label in Turkish
export function getFriendlyColorName(hex: string): string {
  const namedColors: { name: string; hex: string }[] = [
    { name: 'Siyah', hex: '#111111' },
    { name: 'Kırık Beyaz / Ekru', hex: '#F9F6F0' },
    { name: 'Saf Beyaz', hex: '#FFFFFF' },
    { name: 'Krem / Fildişi', hex: '#EDE6D6' },
    { name: 'Bej / Kum Rengi', hex: '#D2B48C' },
    { name: 'Camel / Deve Tüyü', hex: '#C19A6B' },
    { name: 'Taba Deri', hex: '#945D3B' },
    { name: 'Acı Kahve', hex: '#4B3621' },
    { name: 'Gri / Antrasit', hex: '#636E72' },
    { name: 'Açık İnci Grisi', hex: '#DCDDE1' },
    { name: 'Koyu Lacivert', hex: '#1B263B' },
    { name: 'Klasik Jean İndigo', hex: '#3B5998' },
    { name: 'Bebek Mavisi', hex: '#89CFF0' },
    { name: 'Petrol Mavisi', hex: '#1C5468' },
    { name: 'Haki / Zeytin Yeşili', hex: '#556B2F' },
    { name: 'Adaçayı Yeşili', hex: '#778F7B' },
    { name: 'Zümrüt Yeşili', hex: '#046307' },
    { name: 'Hardal Sarısı', hex: '#D4A325' },
    { name: 'Terracotta / Kiremit', hex: '#C86446' },
    { name: 'Mercan Pembesi', hex: '#F08080' },
    { name: 'Gül Kurusu', hex: '#B87B7C' },
    { name: 'Bordo', hex: '#5C1D24' },
    { name: 'Canlı Kırmızı', hex: '#E60000' },
    { name: 'Lavanta / Leylak', hex: '#B57EDC' },
  ];

  // Pick nearest
  const hexToNum = (h: string) => {
    const c = h.replace('#', '');
    return {
      r: parseInt(c.substring(0, 2), 16),
      g: parseInt(c.substring(2, 4), 16),
      b: parseInt(c.substring(4, 6), 16),
    };
  };

  const target = hexToNum(hex);
  let bestName = 'Kişisel Renk';
  let bestDist = 999999;

  for (const c of namedColors) {
    const ref = hexToNum(c.hex);
    const dist =
      Math.pow(target.r - ref.r, 2) +
      Math.pow(target.g - ref.g, 2) +
      Math.pow(target.b - ref.b, 2);
    if (dist < bestDist) {
      bestDist = dist;
      bestName = c.name;
    }
  }

  return bestName;
}
