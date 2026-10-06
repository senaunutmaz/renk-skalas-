import React, { useState } from 'react';
import { X, Check, HelpCircle, Sparkles, RefreshCw, ChevronRight, ChevronLeft } from 'lucide-react';
import { SubSeason, Undertone } from '../types/stylist';
import { SEASONAL_PALETTES } from '../data/seasonalPalettes';

interface SkinToneTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSeason: SubSeason;
  onSelectSeason: (season: SubSeason) => void;
}

export const SkinToneTestModal: React.FC<SkinToneTestModalProps> = ({
  isOpen,
  onClose,
  currentSeason,
  onSelectSeason,
}) => {
  const [activeMode, setActiveMode] = useState<'quiz' | 'browse'>('quiz');
  const [quizStep, setQuizStep] = useState(0);

  // Quiz answers
  const [answers, setAnswers] = useState<{
    veins?: 'green' | 'blue' | 'both';
    jewelry?: 'gold' | 'silver' | 'both';
    sun?: 'tans' | 'burns' | 'moderate';
    contrast?: 'high' | 'medium' | 'soft';
  }>({});

  if (!isOpen) return null;

  const quizQuestions = [
    {
      id: 'veins',
      title: 'Bileğinizdeki damarlar gün ışığında ne renk görünüyor?',
      subtitle: 'Alt tonunuzu belirlemenin en klasik ve güvenilir adımı',
      options: [
        {
          key: 'green',
          label: 'Yeşilimsi veya Zeytuni',
          desc: 'Sıcak alt tona (Warm undertone) işaret eder.',
          type: 'warm',
        },
        {
          key: 'blue',
          label: 'Mavi veya Morumsu',
          desc: 'Soğuk alt tona (Cool undertone) işaret eder.',
          type: 'cool',
        },
        {
          key: 'both',
          label: 'Mavi-Yeşil karışık / Ayırt etmesi zor',
          desc: 'Nötr alt tona (Neutral undertone) işaret eder.',
          type: 'neutral',
        },
      ],
    },
    {
      id: 'jewelry',
      title: 'Yüzünüzün hemen yanında hangi takı teninize daha canlı ışıltı katıyor?',
      subtitle: 'Ayna karşısında teninizin hangisiyle daha taze göründüğünü düşünün',
      options: [
        {
          key: 'gold',
          label: 'Sarı Altın veya Bronz',
          desc: 'Sıcak yansımalar yüzünüzü aydınlatır, gümüş soluk kalır.',
          type: 'warm',
        },
        {
          key: 'silver',
          label: 'Gümüş, Platin veya Beyaz Altın',
          desc: 'Serin metaller cildinizi berraklaştırır, altın sarartır.',
          type: 'cool',
        },
        {
          key: 'both',
          label: 'Rose Gold veya Her İkisi de Yakışıyor',
          desc: 'Dengeli nötr alt ton.',
          type: 'neutral',
        },
      ],
    },
    {
      id: 'sun',
      title: 'Güneşe çıktığınızda cildiniz nasıl tepki verir?',
      subtitle: 'Melanin seviyesi ve cilt alt tonunun tepki hızı',
      options: [
        {
          key: 'tans',
          label: 'Hızlı ve kolayca bronzlaşır, nadiren kızarır',
          desc: 'Sıcak ve zengin pigmentli cilt yapısı.',
          type: 'warm',
        },
        {
          key: 'burns',
          label: 'Çok çabuk kızarır / yanar, zor bronzlaşır',
          desc: 'Soğuk ve hassas serin alt ton.',
          type: 'cool',
        },
        {
          key: 'moderate',
          label: 'Önce hafif pembeleşir, ardından altın-buğday bronzlaşır',
          desc: 'Nötr / geçişli cilt yapısı.',
          type: 'neutral',
        },
      ],
    },
    {
      id: 'contrast',
      title: 'Doğal saç, göz ve ten renginiz arasındaki kontrast nasıl?',
      subtitle: 'Renklerin yoğunluk ve netlik dengesi',
      options: [
        {
          key: 'high',
          label: 'Yüksek Kontrast',
          desc: 'Örn: Açık ten + Koyu kahve/siyah saçlar veya çok berrak parlak gözler (Kış / Parlak İlkbahar)',
          type: 'high',
        },
        {
          key: 'medium',
          label: 'Orta Kontrast & Sıcak Tonlar',
          desc: 'Örn: Bal köpüğü, kestane saçlar, ela/kahverengi sıcak gözler (Sıcak Sonbahar / Sıcak İlkbahar)',
          type: 'medium',
        },
        {
          key: 'soft',
          label: 'Yumuşak & Dumanlı Geçişler',
          desc: 'Örn: Küllü kumral, dumanlı gri-mavi gözler, yumuşak buğday ten (Yumuşak Yaz / Yumuşak Sonbahar)',
          type: 'soft',
        },
      ],
    },
  ];

  const handleSelectOption = (questionId: string, optionKey: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Calculate recommended season
      calculateAndSetSeason({ ...answers, [questionId]: optionKey });
    }
  };

  const calculateAndSetSeason = (finalAnswers: typeof answers) => {
    let warmPoints = 0;
    let coolPoints = 0;

    if (finalAnswers.veins === 'green') warmPoints += 2;
    if (finalAnswers.veins === 'blue') coolPoints += 2;
    if (finalAnswers.veins === 'both') {
      warmPoints += 1;
      coolPoints += 1;
    }

    if (finalAnswers.jewelry === 'gold') warmPoints += 2;
    if (finalAnswers.jewelry === 'silver') coolPoints += 2;
    if (finalAnswers.jewelry === 'both') {
      warmPoints += 1;
      coolPoints += 1;
    }

    if (finalAnswers.sun === 'tans') warmPoints += 1;
    if (finalAnswers.sun === 'burns') coolPoints += 1;

    let recommended: SubSeason = 'warm_autumn';

    if (warmPoints > coolPoints) {
      if (finalAnswers.contrast === 'high') {
        recommended = 'deep_autumn';
      } else if (finalAnswers.contrast === 'soft') {
        recommended = 'soft_autumn';
      } else {
        recommended = 'warm_autumn';
      }
    } else if (coolPoints > warmPoints) {
      if (finalAnswers.contrast === 'high') {
        recommended = 'deep_winter';
      } else if (finalAnswers.contrast === 'soft') {
        recommended = 'soft_summer';
      } else {
        recommended = 'cool_summer';
      }
    } else {
      // Neutral
      recommended = finalAnswers.contrast === 'soft' ? 'soft_autumn' : 'warm_autumn';
    }

    onSelectSeason(recommended);
    setActiveMode('browse');
  };

  const allSeasonKeys = Object.keys(SEASONAL_PALETTES) as SubSeason[];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF9F5] rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-white">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
              Cilt Tonu & Renk Skalası Analizi
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              12 Mevsimsel Renk Analizi ile yüzünüzü aydınlatan renkleri keşfedin
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs (Interactive segmented buttons) */}
        <div className="px-6 py-2.5 bg-stone-100/70 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-1 p-0.5 bg-stone-200/70 rounded-lg">
            <button
              onClick={() => setActiveMode('quiz')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                activeMode === 'quiz'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Hızlı Alt Ton Testi ({quizStep + 1}/4)
            </button>
            <button
              onClick={() => setActiveMode('browse')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                activeMode === 'browse'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Tüm 12 Renk Skalası Listesi
            </button>
          </div>

          <div className="text-xs text-stone-500 hidden sm:block">
            Mevcut Seçim: <span className="font-semibold text-stone-900">{SEASONAL_PALETTES[currentSeason].nameTr}</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeMode === 'quiz' ? (
            <div className="max-w-2xl mx-auto py-2">
              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
                  Adım {quizStep + 1} / 4
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                  {quizQuestions[quizStep].title}
                </h3>
                <p className="text-sm text-stone-600 mt-1">
                  {quizQuestions[quizStep].subtitle}
                </p>
              </div>

              {/* Options list */}
              <div className="space-y-3">
                {quizQuestions[quizStep].options.map((opt) => {
                  const isSelected =
                    (answers as any)[quizQuestions[quizStep].id] === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() =>
                        handleSelectOption(quizQuestions[quizStep].id, opt.key)
                      }
                      className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer flex items-start justify-between ${
                        isSelected
                          ? 'border-amber-800 bg-amber-50/50 shadow-xs ring-1 ring-amber-800'
                          : 'border-stone-200 bg-white hover:border-stone-400 hover:bg-stone-50/60'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-stone-900 text-base">
                          {opt.label}
                        </div>
                        <div className="text-xs sm:text-sm text-stone-500 mt-1">
                          {opt.desc}
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ml-3 ${
                          isSelected
                            ? 'border-amber-800 bg-amber-800 text-white'
                            : 'border-stone-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Progress and controls */}
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-stone-200">
                <button
                  disabled={quizStep === 0}
                  onClick={() => setQuizStep((p) => Math.max(0, p - 1))}
                  className={`flex items-center gap-1 text-xs font-medium px-3 py-2 rounded border border-stone-200 transition-colors ${
                    quizStep === 0
                      ? 'opacity-40 cursor-not-allowed text-stone-400'
                      : 'text-stone-700 hover:bg-stone-100 cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Önceki Soru
                </button>

                <div className="flex gap-1.5">
                  {quizQuestions.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-8 h-1.5 rounded-full transition-all ${
                        idx === quizStep
                          ? 'bg-amber-800'
                          : idx < quizStep
                          ? 'bg-stone-400'
                          : 'bg-stone-200'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveMode('browse')}
                  className="text-xs text-stone-500 hover:text-stone-900 underline cursor-pointer"
                >
                  Testi Atla, Kendim Seç
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-stone-900">
                    12 Mevsimsel Renk Skalası
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500">
                    Kişisel cilt tonunuzu temsil eden paleti seçtiğinizde haftalık kombinleriniz bu skalaya göre üretilir.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setQuizStep(0);
                    setActiveMode('quiz');
                  }}
                  className="flex items-center gap-1.5 text-xs text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded border border-amber-200 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Testi Tekrar Başlat
                </button>
              </div>

              {/* Grid of 12 palettes */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allSeasonKeys.map((seasonKey) => {
                  const pal = SEASONAL_PALETTES[seasonKey];
                  const isCurrent = seasonKey === currentSeason;
                  return (
                    <div
                      key={seasonKey}
                      onClick={() => onSelectSeason(seasonKey)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer group flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-white border-stone-900 ring-2 ring-stone-900 shadow-md'
                          : 'bg-white border-stone-200 hover:border-stone-400 hover:shadow-xs'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-serif font-bold text-base text-stone-900 group-hover:text-amber-900 transition-colors">
                            {pal.nameTr}
                          </span>
                          {isCurrent && (
                            <span className="text-[11px] font-semibold text-stone-900 bg-stone-100 px-2 py-0.5 rounded border border-stone-300">
                              Aktif
                            </span>
                          )}
                        </div>

                        {/* Tone metadata without pill enclosures */}
                        <div className="text-[11px] text-stone-500 flex items-center gap-1.5 mb-3">
                          <span>{pal.undertone === 'warm' ? 'Sıcak Alt Ton' : pal.undertone === 'cool' ? 'Soğuk Alt Ton' : 'Nötr Alt Ton'}</span>
                          <span aria-hidden="true">·</span>
                          <span>{pal.contrastLevel} Kontrast</span>
                        </div>

                        <p className="text-xs text-stone-600 line-clamp-2 mb-4 leading-relaxed">
                          {pal.description}
                        </p>
                      </div>

                      <div>
                        {/* Swatches preview */}
                        <div className="flex items-center gap-1 mb-3">
                          {pal.keyColors.slice(0, 6).map((c, i) => (
                            <div
                              key={i}
                              className="h-5 flex-1 rounded-xs border border-black/10 transition-transform group-hover:scale-105"
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                          <span>Takı: {pal.bestMetals.slice(0, 2).join(', ')}</span>
                          <span className="text-stone-900 font-medium group-hover:underline">
                            {isCurrent ? 'Seçildi' : 'Bu Paleti Seç'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <div className="text-xs text-stone-500">
            Seçili Palet: <span className="font-semibold text-stone-900">{SEASONAL_PALETTES[currentSeason].nameTr}</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs sm:text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors cursor-pointer"
          >
            Tamamla ve Kombinlere Dön
          </button>
        </div>
      </div>
    </div>
  );
};
