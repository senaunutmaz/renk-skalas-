import { SeasonalPalette, SubSeason } from '../types/stylist';

export const SEASONAL_PALETTES: Record<SubSeason, SeasonalPalette> = {
  warm_autumn: {
    id: 'warm_autumn',
    nameTr: 'Sıcak Sonbahar (Warm Autumn)',
    seasonGroup: 'autumn',
    undertone: 'warm',
    contrastLevel: 'Orta',
    description: 'Zengin, sıcak, baharatlı ve altın ışıltılı tonlar. Cildiniz sıcak alt tona sahiptir; sarı ve altın yansımalar yüzünüzü canlı gösterir.',
    bestMetals: ['Altın', 'Bronz', 'Rose Gold'],
    keyColors: [
      { name: 'Hardal Sarısı', hex: '#D4A325', description: 'Yüze anında canlılık ve sıcak ışıltı kazandırır', isAccent: true },
      { name: 'Terracotta', hex: '#C86446', description: 'Cildi aydınlatan zengin kiremit tonu', isAccent: true },
      { name: 'Zeytin Yeşili', hex: '#556B2F', description: 'Doğal toprak uyumu sağlayan sakin ton' },
      { name: 'Sıcak Karamel', hex: '#995B30', description: 'Yumuşak ve lüks sonbahar temeli' },
      { name: 'Kızıl Kahve', hex: '#803828', description: 'Güçlü ve derin sonbahar vurgusu' },
      { name: 'Petrol Mavisi', hex: '#1C5468', description: 'Sıcak paletle tezat oluşturan büyüleyici mavi' },
      { name: 'Krem / Ekru', hex: '#FDFBF7', description: 'Optik beyaz yerine sıcak ekru yüzü yumuşatır' },
      { name: 'Tarçın', hex: '#B55A30', description: 'Baharatlı sıcak vurgu' }
    ],
    neutralColors: [
      { name: 'Camel / Deve Tüyü', hex: '#C19A6B', description: 'Mükemmel nötr temel' },
      { name: 'Kahve Espresso', hex: '#4B3621', description: 'Siyah yerine en zarif derin nötr' },
      { name: 'Haki Bej', hex: '#8B8565', description: 'Çok yönlü alt giyim rengi' },
      { name: 'Ilık Taş Rengi', hex: '#D2B48C', description: 'Hafif nötr zemin' }
    ],
    avoidColors: [
      { name: 'Buz Mavisi', hex: '#D4F0F0', description: 'Cildi solgun ve donuk gösterir' },
      { name: 'Saf Kar Beyazı', hex: '#FFFFFF', description: 'Fazla sert ve kireçli kalır' },
      { name: 'Neon Pembe', hex: '#FF1493', description: 'Sıcak alt tonla çatışır' }
    ],
    faceFramingTips: 'Yüzünüze yakın parçalarda (gömlek, bluz, şal) saf siyah veya buzlu maviler yerine sıcak karamel, terracotta, ekru ve zeytin yeşili tercih edin.',
    celebrityExamples: ['Jessica Alba', 'Julianne Moore', 'Gigi Hadid', 'Gisele Bündchen']
  },

  soft_autumn: {
    id: 'soft_autumn',
    nameTr: 'Yumuşak Sonbahar (Soft Autumn)',
    seasonGroup: 'autumn',
    undertone: 'neutral',
    contrastLevel: 'Düşük',
    description: 'Puslu, dumanlı, sıcak ve sofistike nötr tonlar. Keskin kontrastlar yerine ton-sür-ton geçişler ve mat dokular cildinizi parlatır.',
    bestMetals: ['Rose Gold', 'Altın', 'Bronz'],
    keyColors: [
      { name: 'Adaçayı Yeşili', hex: '#778F7B', description: 'Hafif dumanlı sakin yeşil', isAccent: true },
      { name: 'Gül Kurusu', hex: '#B87B7C', description: 'Romantik ve zarif yüz aydınlatıcı', isAccent: true },
      { name: 'Taba', hex: '#945D3B', description: 'Klasik yumuşak deri tonu' },
      { name: 'Tozlu Haki', hex: '#8F8973', description: 'Dengeli sofistike ton' },
      { name: 'Ilık Vizon', hex: '#A39281', description: 'Lüks ton-sür-ton katmanı' },
      { name: 'Soft Mercan', hex: '#D97D6E', description: 'Ilık ve tazeleyici vurgu' },
      { name: 'Puslu Mavi', hex: '#5D737E', description: 'Dumanlı nötr mavi' }
    ],
    neutralColors: [
      { name: 'Kaşmir Gri Bej', hex: '#B5A895', description: 'Mükemmel yumuşak nötr' },
      { name: 'Fildişi Ekru', hex: '#F7F4EB', description: 'Pürüzsüz açık zemin' },
      { name: 'Dumanlı Kahve', hex: '#5C4A3E', description: 'Koyu temel' }
    ],
    avoidColors: [
      { name: 'Çarpıcı Fuşya', hex: '#FF007F', description: 'Yumuşak ifadenizi bastırır' },
      { name: 'Zifiri Siyah', hex: '#000000', description: 'Cildinizde sert gölgeler yaratır' }
    ],
    faceFramingTips: 'Yüksek kontrast yerine monokrom veya ton-sür-ton kombinler yapın. Mat kumaşlar (keten, süet, yün) parlak satenlerden daha çok yakışır.',
    celebrityExamples: ['Drew Barrymore', 'Nicole Richie', 'Gigi Hadid (soft dönemleri)']
  },

  deep_autumn: {
    id: 'deep_autumn',
    nameTr: 'Koyu Sonbahar (Deep Autumn)',
    seasonGroup: 'autumn',
    undertone: 'warm',
    contrastLevel: 'Yüksek',
    description: 'Koyu, zengin, sıcak ve gizemli tonlar. Siyah yerine çikolata kahve ve orman yeşili gibi derin sıcak renkler muazzam asalet katar.',
    bestMetals: ['Altın', 'Bronz'],
    keyColors: [
      { name: 'Orman Yeşili', hex: '#1E4329', description: 'Derin ve asil doğa yeşili', isAccent: true },
      { name: 'Koyu Bordo', hex: '#5C1D24', description: 'Cildi aydınlatan derin kırmızı', isAccent: true },
      { name: 'Kestane Kahve', hex: '#4A2A18', description: 'Güçlü sıcak temel' },
      { name: 'Yanık Turuncu', hex: '#B84A28', description: 'Canlı sıcak vurgu', isAccent: true },
      { name: 'Patlıcan Moru', hex: '#4A2138', description: 'Gizemli ve derin ton' },
      { name: 'Zengin Hardal', hex: '#C2891D', description: 'Göz alıcı sıcak kontrast' }
    ],
    neutralColors: [
      { name: 'Acı Çikolata', hex: '#311E16', description: 'Siyah alternatifi lüks temel' },
      { name: 'Krem Kadife', hex: '#EDE6D6', description: 'Işıltılı açık zemin' },
      { name: 'Koyu Haki', hex: '#484534', description: 'Klasik ceket ve pantolon rengi' }
    ],
    avoidColors: [
      { name: 'Pastel Pembe', hex: '#FADADD', description: 'Derinliğinizi sönük bırakır' },
      { name: 'Buz Mavisi', hex: '#E0F7FA', description: 'Yüzü renksiz ve cansız gösterir' }
    ],
    faceFramingTips: 'Açık renklerle koyu tonları birleştirerek yüksek kontrast yakalayın; yüz çevresinde koyu bordo veya orman yeşili blazerlar gücünüzü artırır.',
    celebrityExamples: ['Beyoncé', 'Penelope Cruz', 'Eva Mendes', 'Kim Kardashian (doğal tonları)']
  },

  light_spring: {
    id: 'light_spring',
    nameTr: 'Açık İlkbahar (Light Spring)',
    seasonGroup: 'spring',
    undertone: 'warm',
    contrastLevel: 'Düşük',
    description: 'Aydınlık, taze, hafif ve şeftali ışıltılı tonlar. Sabah güneşinin ferahlığı gibi canlandırıcı ve naiftir.',
    bestMetals: ['Altın', 'Rose Gold'],
    keyColors: [
      { name: 'Şeftali Nektarı', hex: '#FFA07A', description: 'Yanaklara doğal sıcak pembe-şeftali ışıltı verir', isAccent: true },
      { name: 'Açık Nil Yeşili', hex: '#8FBC8F', description: 'Bahar ferahlığı veren taze ton' },
      { name: 'Tereyağı Sarısı', hex: '#FDFD96', description: 'Yumuşak güneş ışıltısı', isAccent: true },
      { name: 'Açık Mercan', hex: '#F08080', description: 'Canlı ve güler yüzlü ton' },
      { name: 'Turkuaz Esintisi', hex: '#48D1CC', description: 'Göz rengini öne çıkaran ışıltılı mavi' },
      { name: 'Ilık Pudra', hex: '#F4C2C2', description: 'Hafif taze ton' }
    ],
    neutralColors: [
      { name: 'Açık Kum Beji', hex: '#E8D8C8', description: 'Hafif nötr' },
      { name: 'Kırık Fildişi', hex: '#FAF5EF', description: 'Taze aydınlık zemin' },
      { name: 'Açık Camel', hex: '#CDB18B', description: 'Hafif sonbahar geçişi' }
    ],
    avoidColors: [
      { name: 'Koyu Antrasit', hex: '#2F4F4F', description: 'Yüzü karartır ve yorar' },
      { name: 'Simsiyah', hex: '#111111', description: 'Taze bahar ışıltısını boğar' }
    ],
    faceFramingTips: 'Koyu renkler yerine aydınlık tonları yüz çevrenizde tutun. Şeftali ve açık mercan bluzlar toplantılarda enerjinizi ikiye katlar.',
    celebrityExamples: ['Taylor Swift', 'Scarlett Johansson', 'Blake Lively']
  },

  warm_spring: {
    id: 'warm_spring',
    nameTr: 'Sıcak İlkbahar (Warm Spring)',
    seasonGroup: 'spring',
    undertone: 'warm',
    contrastLevel: 'Orta',
    description: 'Güneş gibi sıcak, canlı, doygun ve enerjik bahar renkleri. Altın sarıları, mango ve canlı mercanlar teninizle dans eder.',
    bestMetals: ['Altın'],
    keyColors: [
      { name: 'Güneş Sarısı', hex: '#FFC300', description: 'Saf bahar enerjisi', isAccent: true },
      { name: 'Canlı Mercan', hex: '#FF6F59', description: 'Yüzü doğrudan parlatan vazgeçilmez ton', isAccent: true },
      { name: 'Elma Yeşili', hex: '#7CB342', description: 'Tazeleyici sıcak yeşil' },
      { name: 'Mango Turuncusu', hex: '#FF8243', description: 'Sıcak baharatlı ışıltı' },
      { name: 'Ilık Akuamarin', hex: '#00B4D8', description: 'Kontrast yaratan canlı mavi' }
    ],
    neutralColors: [
      { name: 'Sıcak Karamel', hex: '#D29054', description: 'Canlı nötr' },
      { name: 'Sütlü Kahve', hex: '#A67B5B', description: 'Hafif zemin' },
      { name: 'Vanilya', hex: '#F3E5AB', description: 'Ilık açık temel' }
    ],
    avoidColors: [
      { name: 'Kül Grisi', hex: '#808080', description: 'Sıcak enerjinizi söndürür' },
      { name: 'Koyu Lacivert', hex: '#000080', description: 'Fazla soğuk ve uzak kalır' }
    ],
    faceFramingTips: 'Canlı renkleri nötr bejlerle dengeleyin; mercan veya mango bir üst, bej pantolonla kusursuz görünür.',
    celebrityExamples: ['Emma Stone', 'Amy Adams', 'Nicole Kidman (kızıl dönemi)']
  },

  bright_spring: {
    id: 'bright_spring',
    nameTr: 'Parlak İlkbahar (Bright Spring)',
    seasonGroup: 'spring',
    undertone: 'neutral',
    contrastLevel: 'Yüksek',
    description: 'Son derece canlı, net, kristal berraklığında ve yüksek kontrastlı renkler. Gözleriniz ve cildiniz canlı kontrastlarla ışıldar.',
    bestMetals: ['Altın', 'Gümüş'],
    keyColors: [
      { name: 'Parlak Turkuaz', hex: '#00E5FF', description: 'Gözleri doğrudan parlatan neon-altı mavi', isAccent: true },
      { name: 'Flamingo Pembesi', hex: '#FF5E7E', description: 'Çarpıcı ve canlı pembe', isAccent: true },
      { name: 'Limon Yeşili', hex: '#AEEA00', description: 'Enerji bombası bahar yeşili' },
      { name: 'Haşhaş Kırmızısı', hex: '#FF2A2A', description: 'Saf canlı kırmızı' },
      { name: 'Kobalt Esintisi', hex: '#2979FF', description: 'Yüksek kontrast mavi' }
    ],
    neutralColors: [
      { name: 'Parlak Ekru', hex: '#FFFDF7', description: 'Berrak nötr' },
      { name: 'Derin Kömür', hex: '#263238', description: 'Keskin zemin' },
      { name: 'Kum Grisi', hex: '#CFD8DC', description: 'Dengeli açık ton' }
    ],
    avoidColors: [
      { name: 'Puslu Toprak Tonları', hex: '#8D6E63', description: 'Berraklığınızı matlaştırır' },
      { name: 'Hardal Haki', hex: '#6B705C', description: 'Canlı yüz tonunuzu gölgeler' }
    ],
    faceFramingTips: 'Bulanık ve gri tonlardan kaçının; net, berrak ve yüksek kontrastlı parçalar giyin.',
    celebrityExamples: ['Milla Jovovich', 'Rose McGowan', 'Camilla Belle']
  },

  light_summer: {
    id: 'light_summer',
    nameTr: 'Açık Yaz (Light Summer)',
    seasonGroup: 'summer',
    undertone: 'cool',
    contrastLevel: 'Düşük',
    description: 'Hafif, serin, pastel ve pudralı tonlar. Su yeşilleri, lavanta ve bebek mavisi soğuk alt tonunuzu zarafetle vurgular.',
    bestMetals: ['Gümüş', 'Beyaz Altın'],
    keyColors: [
      { name: 'Pudra Bebek Mavisi', hex: '#89CFF0', description: 'Ciltteki serinliği berraklaştıran imza ton', isAccent: true },
      { name: 'Lavanta Rüyası', hex: '#B57EDC', description: 'Zarif ve dingin leylak tonu', isAccent: true },
      { name: 'Pudra Pembe', hex: '#FFD1DC', description: 'Romantik ve serin aydınlık' },
      { name: 'Buzlu Su Yeşili', hex: '#9FE2BF', description: 'Tazeleyici serin yeşil' },
      { name: 'Soft İndigo', hex: '#4B6584', description: 'Hafif serin tezat' }
    ],
    neutralColors: [
      { name: 'İnci Grisi', hex: '#DCDDE1', description: 'Temel nötr zemin' },
      { name: 'Kırık Soğuk Beyaz', hex: '#F5F6FA', description: 'Zarif temiz ton' },
      { name: 'Duman Grisi', hex: '#718093', description: 'Siyah alternatifi serin ton' }
    ],
    avoidColors: [
      { name: 'Turuncu', hex: '#FF7F00', description: 'Soğuk alt tonu kızarık gösterir' },
      { name: 'Hardal Sarısı', hex: '#FFDB58', description: 'Yüzde sarımsı yorgunluk hissi verir' }
    ],
    faceFramingTips: 'Siyah yerine antrasit veya duman grisi; sarı altın yerine parlak gümüş takılar seçin.',
    celebrityExamples: ['Reese Witherspoon', 'Gwyneth Paltrow', 'Elle Fanning']
  },

  cool_summer: {
    id: 'cool_summer',
    nameTr: 'Serin Yaz (Cool Summer)',
    seasonGroup: 'summer',
    undertone: 'cool',
    contrastLevel: 'Orta',
    description: 'Tamamen serin, mavi bazlı, zümrüt ve eflatun tonları. İçinde zerrece sarı veya turuncu barındırmayan serin tonlar cildinizi berraklaştırır.',
    bestMetals: ['Gümüş', 'Platin'],
    keyColors: [
      { name: 'Serin Fuşya', hex: '#D2386C', description: 'Mavi alt tonlu çarpıcı serin pembe', isAccent: true },
      { name: 'Orkide Moru', hex: '#8A2BE2', description: 'Asil serin çiçek tonu' },
      { name: 'Klasik Fransız Mavisi', hex: '#3B6E8C', description: 'Ofis ve toplantıların kurtarıcısı', isAccent: true },
      { name: 'Serin Çam Yeşili', hex: '#2E6153', description: 'Dengeli soğuk yeşil' },
      { name: 'Ahududu', hex: '#9B111E', description: 'Soğuk bazlı asil kırmızı' }
    ],
    neutralColors: [
      { name: 'Kayrak Taşı Grisi', hex: '#636E72', description: 'Mükemmel iş kıyafeti rengi' },
      { name: 'Buz Grisi', hex: '#B2BEC3', description: 'Aydınlık nötr' },
      { name: 'Mavi-Lacivert', hex: '#2C3E50', description: 'Siyahın en kaliteli muadili' }
    ],
    avoidColors: [
      { name: 'Sıcak Kiremit', hex: '#C86446', description: 'Soğuk tenle çatışır' },
      { name: 'Altın Sarısı', hex: '#D4AF37', description: 'Tenin serin berraklığını bozar' }
    ],
    faceFramingTips: 'Tüm giyim parçalarında mavi bazlı soğuk tonlar tercih edin. Fransız mavisi ve ahududu bluzlar cildinize porselen etkisi verir.',
    celebrityExamples: ['Emily Blunt', 'Kate Middleton', 'Marion Cotillard']
  },

  soft_summer: {
    id: 'soft_summer',
    nameTr: 'Yumuşak Yaz (Soft Summer)',
    seasonGroup: 'summer',
    undertone: 'neutral',
    contrastLevel: 'Düşük',
    description: 'Dumanlı, serin ve griye çalan zarafet. Ne fazla parlak ne de fazla koyu; ipeksi pastel ve dumanlı tonların mükemmel uyumu.',
    bestMetals: ['Gümüş', 'Rose Gold'],
    keyColors: [
      { name: 'Dumanlı Gül', hex: '#A37081', description: 'Hafif gri yansımalı serin pembe', isAccent: true },
      { name: 'Kayrak Mavisi', hex: '#4A6572', description: 'Mat ve şık nötr mavi', isAccent: true },
      { name: 'Kuru Nane Yeşili', hex: '#779D88', description: 'Puslu doğallık' },
      { name: 'Böğürtlen Buğusu', hex: '#6C5B7B', description: 'Yumuşak eflatun' },
      { name: 'Serin Vizon', hex: '#877B75', description: 'Lüks kumaş tonu' }
    ],
    neutralColors: [
      { name: 'Güvercin Grisi', hex: '#9E9E9E', description: 'Mat serin nötr' },
      { name: 'Dumanlı Ekru', hex: '#EDEAE5', description: 'Sakin açık ton' },
      { name: 'Kömür Vizon', hex: '#4E4A48', description: 'Yumuşak koyu temel' }
    ],
    avoidColors: [
      { name: 'Elektrik Mavisi', hex: '#0000FF', description: 'Gözü yoran aşırı kontrast' },
      { name: 'Parlak Sarı', hex: '#FFFF00', description: 'Puslu güzelliğinizi un ufak eder' }
    ],
    faceFramingTips: 'Doku zenginliği (kaşmir, ince triko, keten) yaratın; renkleri ton-sür-ton geçişlerle birleştirin.',
    celebrityExamples: ['Jennifer Aniston', 'Sarah Jessica Parker', 'Leona Lewis']
  },

  deep_winter: {
    id: 'deep_winter',
    nameTr: 'Koyu Kış (Deep Winter)',
    seasonGroup: 'winter',
    undertone: 'cool',
    contrastLevel: 'Yüksek',
    description: 'Çok koyu, yoğun, serin ve dramatik tonlar. Kar beyazı ve zifiri siyahı en muazzam taşıyan paletlerden biridir.',
    bestMetals: ['Gümüş', 'Platin'],
    keyColors: [
      { name: 'Saf Kar Beyazı', hex: '#FFFFFF', description: 'En yüksek aydınlık kontrast', isAccent: true },
      { name: 'Gece Mavisi / Çivit', hex: '#002366', description: 'Güçlü asil lacivert', isAccent: true },
      { name: 'Zümrüt Yeşili', hex: '#046307', description: 'Mücevher parlaklığı', isAccent: true },
      { name: 'Yakut Kırmızısı', hex: '#9B111E', description: 'Büyüleyici derin serin kırmızı' },
      { name: 'Koyu Erik', hex: '#3B0910', description: 'Gizemli ve sofistike' }
    ],
    neutralColors: [
      { name: 'Zifiri Siyah', hex: '#000000', description: 'Kusursuz güçlü temel' },
      { name: 'Antrasit Kömür', hex: '#2C3A47', description: 'Derin yapı taşı' },
      { name: 'Buz Grisi', hex: '#CAD3C8', description: 'Yüksek tezat zemin' }
    ],
    avoidColors: [
      { name: 'Hardal Sarısı', hex: '#E1AD01', description: 'Cildi sarartır ve yorar' },
      { name: 'Taba & Camel', hex: '#C19A6B', description: 'Kış kontrastınızı tamamen söndürür' }
    ],
    faceFramingTips: 'Siyah-beyaz monokrom veya zümrüt yeşili blazer ile toplantılarda karşı konulmaz bir otorite ve zarafet sağlarsınız.',
    celebrityExamples: ['Anne Hathaway', 'Lupita Nyong\'o', 'Salma Hayek', 'Sandra Bullock']
  },

  cool_winter: {
    id: 'cool_winter',
    nameTr: 'Serin Kış (Cool Winter)',
    seasonGroup: 'winter',
    undertone: 'cool',
    contrastLevel: 'Yüksek',
    description: 'Saf kış soğukluğu, buzlu yansımalar ve elektrik mavisi. Sıcaklığın sıfır olduğu, buz gibi net ve parlak renkler.',
    bestMetals: ['Gümüş', 'Platin'],
    keyColors: [
      { name: 'Elektrik Mavisi', hex: '#003399', description: 'İmza kış mavisi', isAccent: true },
      { name: 'Buz Mavisi', hex: '#AFEEEE', description: 'Kristal soğuk ışıltı' },
      { name: 'Çarpıcı Macenta', hex: '#C71585', description: 'Yüzü canlandıran soğuk neon etki', isAccent: true },
      { name: 'Çam Ormanı Yeşili', hex: '#013220', description: 'Derin serin zarafet' },
      { name: 'Gümüş Grisi', hex: '#C0C0C0', description: 'Metalik serinlik' }
    ],
    neutralColors: [
      { name: 'Koyu Gece Siyahı', hex: '#0A0A0A', description: 'Keskin temel' },
      { name: 'Optik Beyaz', hex: '#FDFEFE', description: 'Tertemiz tezat' },
      { name: 'Çelik Mavisi', hex: '#4682B4', description: 'Ofis temeli' }
    ],
    avoidColors: [
      { name: 'Sıcak Portakal Turuncusu', hex: '#FF7F00', description: 'Yüzde rahatsız edici tezat yaratır' },
      { name: 'Toprak Beji', hex: '#A89F91', description: 'Yüzü soluk ve cansız bırakır' }
    ],
    faceFramingTips: 'Buzlu tonları zifiri siyahla veya gece mavisiyle birleştirin; boyun kısmında gümüş aksesuarlar kullanın.',
    celebrityExamples: ['Liv Tyler', 'Lauren Graham', 'Brooke Shields']
  },

  bright_winter: {
    id: 'bright_winter',
    nameTr: 'Parlak Kış (Bright Winter)',
    seasonGroup: 'winter',
    undertone: 'neutral',
    contrastLevel: 'Yüksek',
    description: 'Göz alıcı canlılık, neon ışıltılar ve ultra yüksek kontrast. İlkbaharın parlaklığı ile kışın serin berraklığının buluşmasıdır.',
    bestMetals: ['Gümüş', 'Platin', 'Beyaz Altın'],
    keyColors: [
      { name: 'Neon Fuşya', hex: '#FF007F', description: 'En parlak kış vurgusu', isAccent: true },
      { name: 'Kobalt Mavisi', hex: '#0047AB', description: 'Gözleri parlatan derin elektrik mavi', isAccent: true },
      { name: 'Asit Sarısı', hex: '#DFFF00', description: 'Küçük aksesuarda elektrik kıvılcımı' },
      { name: 'Zümrüt Parıltısı', hex: '#50C878', description: 'Canlı ve net yeşil' },
      { name: 'Saf Kırmızı', hex: '#E60000', description: 'Klasik kırmızı ruj uyumu', isAccent: true }
    ],
    neutralColors: [
      { name: 'Jet Siyah', hex: '#050505', description: 'Yüksek kontrast temel' },
      { name: 'Buzlu Beyaz', hex: '#FFFFFF', description: 'Net keskin zemin' },
      { name: 'Koyu Çelik', hex: '#37474F', description: 'Modern zemin' }
    ],
    avoidColors: [
      { name: 'Mat Haki', hex: '#556B2F', description: 'Canlılığınızı tamamen gölgeler' },
      { name: 'Tozlu Pastel', hex: '#C4A484', description: 'Donuk ve sıkıcı görünür' }
    ],
    faceFramingTips: 'Kıyafetinizde en az bir adet yüksek doygunluklu parça bulundurun; soluk tonlar sizi yorgun gösterir.',
    celebrityExamples: ['Megan Fox', 'Katy Perry', 'Courtney Cox']
  }
};
