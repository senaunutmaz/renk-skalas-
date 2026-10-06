import React from 'react';
import { Sparkles, RefreshCw, Check, AlertCircle, HelpCircle, Star, Shield } from 'lucide-react';
import { SubSeason } from '../types/stylist';
import { SEASONAL_PALETTES } from '../data/seasonalPalettes';

interface PaletteViewerProps {
  currentSeason: SubSeason;
  onOpenToneQuiz: () => void;
  onSelectSeason: (season: SubSeason) => void;
}

export const PaletteViewer: React.FC<PaletteViewerProps> = ({
  currentSeason,
  onOpenToneQuiz,
  onSelectSeason,
}) => {
  const palette = SEASONAL_PALETTES[currentSeason];

  return (
    <div className="space-y-8">
      {/* Top Banner with Editorial Drape Portrait */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Visual Column */}
          <div className="lg:col-span-5 relative bg-stone-100 min-h-[280px]">
            <img
              src="/src/assets/images/color_drape_analysis_1791309994567.jpg"
              alt="Mevsimsel Renk Analizi"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1">
                Kişisel Renk Kartı
              </span>
              <h3 className="font-serif text-2xl font-bold">
                {palette.nameTr}
              </h3>
              <p className="text-xs text-stone-200 mt-1">
                Alt Ton: {palette.undertone === 'warm' ? 'Sıcak (Warm)' : palette.undertone === 'cool' ? 'Soğuk (Cool)' : 'Nötr (Neutral)'} · Kontrast: {palette.contrastLevel}
              </p>
            </div>
          </div>

          {/* Explanation Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
                  Mevsimsel Tipoloji Özeti
                </span>
                <button
                  onClick={onOpenToneQuiz}
                  className="flex items-center gap-1.5 text-xs text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded border border-amber-200 transition-colors cursor-pointer font-medium"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Testi Tekrar Yap</span>
                </button>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {palette.nameTr}
              </h2>

              <p className="text-stone-600 text-sm leading-relaxed mt-3">
                {palette.description}
              </p>
            </div>

            {/* Stylist Key Recommendations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-stone-900 block">
                  Yüz Çevresi Kuralı:
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {palette.faceFramingTips}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-stone-900 block">
                  En İyi Aksesuar & Metaller:
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {palette.bestMetals.map((metal, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-0.5 rounded bg-stone-100 text-stone-800 font-medium"
                    >
                      {metal}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Celebrity inspirations rendered cleanly */}
            <div className="pt-2 text-xs text-stone-500 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Aynı Renk Tipine Sahip İkonlar:</span>
              <span className="font-medium text-stone-800">
                {palette.celebrityExamples.join(' · ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Swatches Section */}
      <div className="space-y-6">
        <div>
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            Yüzünüzü Aydınlatan Ana Renk Skalası
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Bu renkleri gömlek, fular, triko ve yüzünüze yakın üst parçalarda giydiğinizde cildiniz anında canlı ve dinlenmiş görünür.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {palette.keyColors.map((color, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-stone-200 p-3 hover:shadow-sm transition-all group"
            >
              <div
                className="w-full h-20 rounded-lg border border-black/10 mb-2 relative overflow-hidden group-hover:scale-[1.02] transition-transform"
                style={{ backgroundColor: color.hex }}
              >
                {color.isAccent && (
                  <span className="absolute top-1.5 right-1.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-semibold px-1.5 py-0.5 rounded">
                    İmza Vurgu
                  </span>
                )}
              </div>
              <div className="font-medium text-xs sm:text-sm text-stone-900 truncate">
                {color.name}
              </div>
              <div className="text-[11px] font-mono text-stone-400 mt-0.5">
                {color.hex}
              </div>
              <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-snug">
                {color.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Neutrals & Avoids Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Neutrals Card */}
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
          <div>
            <div className="flex items-center gap-2 text-stone-900 font-serif text-lg font-bold">
              <Check className="w-5 h-5 text-emerald-700" />
              <span>Kusursuz Nötr Temel Renkler</span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Pantolon, palto, ceket ve çantalarınız için siyah yerine tercih edebileceğiniz lüks nötr tonlar.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {palette.neutralColors.map((color, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-stone-200 bg-stone-50/50 flex items-start gap-3"
              >
                <div
                  className="w-10 h-10 rounded-md border border-black/10 shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
                <div>
                  <div className="font-semibold text-xs text-stone-900">
                    {color.name}
                  </div>
                  <div className="text-[11px] text-stone-500 line-clamp-2 mt-0.5">
                    {color.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Avoid / Caution Card */}
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
          <div>
            <div className="flex items-center gap-2 text-stone-900 font-serif text-lg font-bold">
              <AlertCircle className="w-5 h-5 text-amber-700" />
              <span>Yüz Çevresinde Kaçınılması Gereken Tonlar</span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Bu renkler cilt alt tonunuzla tezat oluşturup yüzde solgunluk veya yorgunluk hissi uyandırabilir.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {palette.avoidColors.map((color, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-amber-200/60 bg-amber-50/30 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-md border border-black/10 shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <span className="font-semibold text-xs text-stone-900">
                      {color.name}
                    </span>
                    <p className="text-[11px] text-stone-600">
                      {color.description}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-amber-800 uppercase tracking-wider font-semibold">
                  Alt giyimde kullan
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
