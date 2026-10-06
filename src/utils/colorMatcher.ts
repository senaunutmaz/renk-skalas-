import { ClothingItem, DailyOutfit, DayOfWeek, SeasonalPalette, WardrobeAuditResult } from '../types/stylist';

// Hex to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// Color Euclidean distance (approximate perceptual distance)
export function colorDistance(hex1: string, hex2: string): number {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);
  const rMean = (c1.r + c2.r) / 2;
  const r = c1.r - c2.r;
  const g = c1.g - c2.g;
  const b = c1.b - c2.b;
  // Weighted RGB euclidean distance
  return Math.sqrt((((512 + rMean) * r * r) >> 8) + 4 * g * g + (((767 - rMean) * b * b) >> 8));
}

// Check how closely an item matches the user's seasonal palette
export function calculateItemPaletteAffinity(
  item: ClothingItem,
  palette: SeasonalPalette
): { isMatch: boolean; isFaceBest: boolean; score: number } {
  const allPaletteColors = [...palette.keyColors, ...palette.neutralColors];
  let minDistance = 999;
  let matchedKeyColor = false;

  for (const pal of allPaletteColors) {
    const dist = colorDistance(item.colorHex, pal.hex);
    if (dist < minDistance) {
      minDistance = dist;
      matchedKeyColor = pal.isAccent || palette.keyColors.some((k) => k.hex === pal.hex);
    }
  }

  // Check if it's near an avoid color
  let avoidMinDist = 999;
  for (const av of palette.avoidColors) {
    const dist = colorDistance(item.colorHex, av.hex);
    if (dist < avoidMinDist) {
      avoidMinDist = dist;
    }
  }

  // If very close to an avoid color, penalty
  if (avoidMinDist < 80) {
    return {
      isMatch: false,
      isFaceBest: false,
      score: Math.max(20, Math.round(100 - minDistance * 0.4 - 30)),
    };
  }

  const isMatch = minDistance < 140;
  const isFaceBest = isMatch && matchedKeyColor;
  const score = Math.max(30, Math.min(100, Math.round(100 - minDistance * 0.25)));

  return { isMatch, isFaceBest, score };
}

// Generate weekly outfits based on wardrobe and palette
export function generateWeeklyPlan(
  wardrobe: ClothingItem[],
  palette: SeasonalPalette,
  preferredVibe?: string
): DailyOutfit[] {
  const days: { day: DayOfWeek; label: string; occasion: string; vibePriorities: string[] }[] = [
    {
      day: 'monday',
      label: 'Pazartesi',
      occasion: 'Haftaya Güçlü Başlangıç & Kurumsal Zarafet',
      vibePriorities: ['formal', 'smart_casual'],
    },
    {
      day: 'tuesday',
      label: 'Salı',
      occasion: 'Önemli Toplantı & Müşteri Sunumu',
      vibePriorities: ['formal', 'smart_casual'],
    },
    {
      day: 'wednesday',
      label: 'Çarşamba',
      occasion: 'Dinamik Ofis Günü & Ekip Buluşması',
      vibePriorities: ['smart_casual', 'formal'],
    },
    {
      day: 'thursday',
      label: 'Perşembe',
      occasion: 'İş Sonrası Akşam Yemeğine Geçiş',
      vibePriorities: ['smart_casual', 'evening'],
    },
    {
      day: 'friday',
      label: 'Cuma',
      occasion: 'Casual Friday & Hafta Sonu Karşılaması',
      vibePriorities: ['casual', 'smart_casual'],
    },
    {
      day: 'saturday',
      label: 'Cumartesi',
      occasion: 'Şehirde Kahve, Galeri & Hafta Sonu Şıklığı',
      vibePriorities: ['casual', 'smart_casual'],
    },
    {
      day: 'sunday',
      label: 'Pazar',
      occasion: 'Brunch & Dinlendirici Akşam Programı',
      vibePriorities: ['casual', 'evening', 'smart_casual'],
    },
  ];

  const tops = wardrobe.filter((i) => i.category === 'top');
  const bottoms = wardrobe.filter((i) => i.category === 'bottom');
  const outerwears = wardrobe.filter((i) => i.category === 'outerwear');
  const shoes = wardrobe.filter((i) => i.category === 'shoes');
  const accessories = wardrobe.filter((i) => i.category === 'accessory');

  // Fallback defaults if user's closet is missing some category
  const fallbackTop: ClothingItem = tops[0] || {
    id: 'fb-top',
    name: 'Ekru İpek Gömlek',
    category: 'top',
    colorName: 'Ekru',
    colorHex: '#FDFBF7',
    styleVibe: ['formal', 'smart_casual'],
    seasonSuitability: 'all',
    createdAt: Date.now(),
  };

  const fallbackBottom: ClothingItem = bottoms[0] || {
    id: 'fb-bottom',
    name: 'Klasik Kumaş Pantolon',
    category: 'bottom',
    colorName: 'Kahve Espresso',
    colorHex: '#4B3621',
    styleVibe: ['formal', 'smart_casual'],
    seasonSuitability: 'all',
    createdAt: Date.now(),
  };

  const fallbackShoes: ClothingItem = shoes[0] || {
    id: 'fb-shoes',
    name: 'Deri Loafer',
    category: 'shoes',
    colorName: 'Taba Deri',
    colorHex: '#945D3B',
    styleVibe: ['formal', 'smart_casual'],
    seasonSuitability: 'all',
    createdAt: Date.now(),
  };

  // Track used items to rotate through wardrobe
  const usedTops = new Set<string>();
  const usedBottoms = new Set<string>();

  return days.map((dayConfig, index) => {
    // 1. Pick top
    let candidateTops = tops.filter((t) =>
      dayConfig.vibePriorities.some((v) => t.styleVibe.includes(v as any))
    );
    if (candidateTops.length === 0) candidateTops = tops;

    // Sort tops by palette affinity
    candidateTops.sort((a, b) => {
      const aAffinity = calculateItemPaletteAffinity(a, palette).score;
      const bAffinity = calculateItemPaletteAffinity(b, palette).score;
      const aUsed = usedTops.has(a.id) ? -20 : 0;
      const bUsed = usedTops.has(b.id) ? -20 : 0;
      return bAffinity + bUsed - (aAffinity + aUsed);
    });

    const chosenTop = candidateTops[0] || fallbackTop;
    usedTops.add(chosenTop.id);

    // 2. Pick bottom
    let candidateBottoms = bottoms.filter((b) =>
      dayConfig.vibePriorities.some((v) => b.styleVibe.includes(v as any))
    );
    if (candidateBottoms.length === 0) candidateBottoms = bottoms;

    // Pick a bottom that provides contrast with top
    candidateBottoms.sort((a, b) => {
      const distA = colorDistance(chosenTop.colorHex, a.colorHex);
      const distB = colorDistance(chosenTop.colorHex, b.colorHex);
      const aUsed = usedBottoms.has(a.id) ? -30 : 0;
      const bUsed = usedBottoms.has(b.id) ? -30 : 0;
      return distB + bUsed - (distA + aUsed);
    });

    const chosenBottom = candidateBottoms[0] || fallbackBottom;
    usedBottoms.add(chosenBottom.id);

    // 3. Pick outerwear (optional, based on vibe)
    let chosenOuter: ClothingItem | undefined = undefined;
    if (outerwears.length > 0 && index % 2 === 0) {
      chosenOuter = outerwears[index % outerwears.length];
    }

    // 4. Pick shoes
    let candidateShoes = shoes.filter((s) =>
      dayConfig.vibePriorities.some((v) => s.styleVibe.includes(v as any))
    );
    if (candidateShoes.length === 0) candidateShoes = shoes;
    const chosenShoes = candidateShoes[index % (candidateShoes.length || 1)] || fallbackShoes;

    // 5. Pick accessory
    const chosenAccessory = accessories.length > 0 ? accessories[index % accessories.length] : undefined;

    // Calculate outfit harmony score
    const topScore = calculateItemPaletteAffinity(chosenTop, palette).score;
    const bottomScore = calculateItemPaletteAffinity(chosenBottom, palette).score;
    const contrastDiff = Math.min(30, colorDistance(chosenTop.colorHex, chosenBottom.colorHex) / 10);
    const totalScore = Math.min(99, Math.round(topScore * 0.5 + bottomScore * 0.3 + contrastDiff + 5));

    // Stylist notes tailored to colorimetry
    const topAffinity = calculateItemPaletteAffinity(chosenTop, palette);
    let stylistNote = '';
    if (topAffinity.isFaceBest) {
      stylistNote = `${chosenTop.colorName} tonundaki üst parçanız ${palette.nameTr} cildinizin doğal sıcaklığını/ışıltısını doğrudan yüz çevresinde parlatıyor. ${chosenBottom.colorName} alt parça ile sofistike bir ton dengesi yakalandı.`;
    } else {
      stylistNote = `${chosenTop.name} ile ${chosenBottom.name} zamansız bir silüet oluşturuyor. Yüz çevrenizde ${palette.bestMetals[0]} tonlarında bir aksesuar kullanarak cilt parlaklığınızı artırabilirsiniz.`;
    }

    return {
      day: dayConfig.day,
      dayLabelTr: dayConfig.label,
      occasion: dayConfig.occasion,
      top: chosenTop,
      bottom: chosenBottom,
      outerwear: chosenOuter,
      shoes: chosenShoes,
      accessory: chosenAccessory,
      harmonyScore: totalScore,
      stylistNote,
      paletteCompliance: totalScore >= 90 ? 'perfect' : totalScore >= 75 ? 'good' : 'balanced',
    };
  });
}

// Audit entire wardrobe against user's seasonal color palette
export function auditWardrobe(wardrobe: ClothingItem[], palette: SeasonalPalette): WardrobeAuditResult {
  if (wardrobe.length === 0) {
    return {
      totalItems: 0,
      paletteMatchPercentage: 0,
      faceFramingMatchPercentage: 0,
      topMatches: 0,
      neutralMatches: 0,
      clashingCount: 0,
      missingRecommendations: ['Gardırobunuza ilk kıyafetlerinizi ekleyerek stil analizinizi başlatın.'],
      stylistSummary: 'Henüz gardırobunuza kıyafet eklenmedi.',
    };
  }

  let paletteMatches = 0;
  let clashing = 0;
  let topMatches = 0;
  let topsTotal = 0;

  wardrobe.forEach((item) => {
    const aff = calculateItemPaletteAffinity(item, palette);
    if (aff.isMatch) {
      paletteMatches++;
      if (item.category === 'top') {
        topMatches++;
      }
    } else if (aff.score < 45) {
      clashing++;
    }
    if (item.category === 'top') {
      topsTotal++;
    }
  });

  const paletteMatchPercentage = Math.round((paletteMatches / wardrobe.length) * 100);
  const faceFramingMatchPercentage =
    topsTotal > 0 ? Math.round((topMatches / topsTotal) * 100) : 100;

  // Generate actionable stylist recommendations
  const missingRecommendations: string[] = [];
  const paletteTopSwatches = palette.keyColors.slice(0, 3).map((k) => k.name).join(', ');
  
  if (faceFramingMatchPercentage < 60) {
    missingRecommendations.push(
      `Yüz çevresi üst giyimlerinizde palet uyumu %${faceFramingMatchPercentage}. ${paletteTopSwatches} tonlarında gömlek veya trikolar ekleyerek yüzünüzün ışıltısını iki katına çıkarabilirsiniz.`
    );
  } else {
    missingRecommendations.push(
      `Üst giyimlerinizin %${faceFramingMatchPercentage}'i ${palette.nameTr} paletinizle tam uyumlu! Doğal ten ışıltınızı kusursuz yansıtıyorsunuz.`
    );
  }

  if (clashing > 2) {
    missingRecommendations.push(
      `${clashing} adet parça cilt tonunuzla tezat oluşturuyor. Bu parçaları yüzünüzden uzakta (pantolon, etek veya ayakkabı olarak) kullanarak kurtarabilirsiniz.`
    );
  }

  missingRecommendations.push(
    `Aksesuar seçimlerinizde ${palette.bestMetals.join(' ve ')} tonları tercih ederek kombinlerinize lüks bir dokunuş katın.`
  );

  let stylistSummary = '';
  if (paletteMatchPercentage >= 75) {
    stylistSummary = `Harika bir gardırop bilinci! Kıyafetlerinizin %${paletteMatchPercentage}'i cilt tipinizle uyum içinde. Özel stilist seansına gerek kalmadan zahmetsizce göz alıcı görünebilirsiniz.`;
  } else if (paletteMatchPercentage >= 50) {
    stylistSummary = `Gardırobunuz dengeli bir temele sahip (%${paletteMatchPercentage} palet uyumu). Yüz çevresinde doğru renk geçişleri yaparak mevcut parçalarınızdan maksimum verim alabilirsiniz.`;
  } else {
    stylistSummary = `Gardırobunuzdaki parçaların büyük kısmı nötr veya farklı skalalarda. Cilt tonunuzu parlatan birkaç kilit renk üst giyim eklemek kombinlerinizi anında dönüştürecektir.`;
  }

  return {
    totalItems: wardrobe.length,
    paletteMatchPercentage,
    faceFramingMatchPercentage,
    topMatches,
    neutralMatches: wardrobe.length - paletteMatches - clashing,
    clashingCount: clashing,
    missingRecommendations,
    stylistSummary,
  };
}
