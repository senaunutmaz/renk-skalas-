import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  ShoppingBag,
  Coins,
} from 'lucide-react';
import { ClothingItem, SubSeason } from '../types/stylist';
import { SEASONAL_PALETTES } from '../data/seasonalPalettes';
import { auditWardrobe, calculateItemPaletteAffinity } from '../utils/colorMatcher';

interface WardrobeAuditViewProps {
  wardrobe: ClothingItem[];
  currentSeason: SubSeason;
  onOpenAddItem: () => void;
  onOpenToneQuiz: () => void;
}

export const WardrobeAuditView: React.FC<WardrobeAuditViewProps> = ({
  wardrobe,
  currentSeason,
  onOpenAddItem,
  onOpenToneQuiz,
}) => {
  const palette = SEASONAL_PALETTES[currentSeason];
  const audit = auditWardrobe(wardrobe, palette);

  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
              <Sparkles className="w-4 h-4 text-amber-800" />
              <span>Profesyonel Stilist Gardırop Raporu</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Gardırop Renk Sağlık Skoru
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {palette.nameTr} cilt alt tonunuza göre gardırobunuzun analiz sonuçları
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAddItem}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            >
              Yeni Parça Ekle
            </button>
          </div>
        </div>

        {/* 3 Metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="p-5 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
              Genel Palet Uyumu
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tabular-nums">
                %{audit.paletteMatchPercentage}
              </span>
              <span className="text-xs text-emerald-700 font-medium">Uyumlu</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-2">
              Toplam {audit.totalItems} parçanızdan {Math.round((audit.paletteMatchPercentage * audit.totalItems) / 100)} adedi cilt skalasıyla uyumlu.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
              Yüz Çevresi Başarısı
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tabular-nums">
                %{audit.faceFramingMatchPercentage}
              </span>
              <span className="text-xs text-emerald-700 font-medium">Işıltı</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-2">
              Yüzünüze doğrudan etki eden üst giyimlerinizin palet uyum oranı.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
              Tezat / Riskli Parçalar
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tabular-nums">
                {audit.clashingCount}
              </span>
              <span className="text-xs text-amber-700 font-medium">Adet</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-2">
              Bu parçaları atmak yerine alt giyimde veya nötr aksesuarlarla dengeleyin.
            </p>
          </div>
        </div>

        {/* Stylist Summary Narrative */}
        <div className="mt-6 p-4 rounded-xl bg-[#FAF9F5] border border-stone-200">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800 mb-1">
            Stilistin Değerlendirme Notu
          </h4>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            {audit.stylistSummary}
          </p>
        </div>
      </div>

      {/* Comparison: Why ChromaWardrobe replaces expensive stylists */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 shadow-lg border border-stone-800">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold">
            <Coins className="w-4 h-4" />
            <span>Akıllı Tasarruf & Profesyonel Stil</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Özel Stilist Desteğine Para Ödemeye Son
          </h3>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Piyasada haftalık kıyafet planlaması ve gardırop analizi için çalışanlardan seans başına 1.500 TL ile 3.500 TL arasında ücret talep ediliyor. ChromaWardrobe ile:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
            <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700">
              <span className="text-xs font-semibold text-rose-300 block mb-1">
                Geleneksel Ücretli Stilist
              </span>
              <ul className="text-xs text-stone-400 space-y-1.5 list-disc list-inside">
                <li>Haftalık 2.000 TL+ sürekli danışmanlık maliyeti</li>
                <li>Randevu ve fotoğraf gönderme bekleme süresi</li>
                <li>Sürekli yeni kıyafet alma baskısı</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-600/50">
              <span className="text-xs font-semibold text-amber-300 block mb-1">
                ChromaWardrobe Kişisel Stilist
              </span>
              <ul className="text-xs text-stone-300 space-y-1.5 list-disc list-inside">
                <li>0 TL — Kendi mevcut gardırobunuzu değerlendirin</li>
                <li>Cilt tonunuza göre anında 7 günlük kombin motoru</li>
                <li>Tek tıkla parça değiştirme ve sonsuz varyasyon</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations & Missing capsule pieces */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
            Gardırobunuzu Güçlendirecek Stilist İpuçları
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Mevcut parçalarınızı en verimli şekilde kullanmak ve eksikleri tamamlamak için tavsiyeler
          </p>
        </div>

        <div className="space-y-3">
          {audit.missingRecommendations.map((rec, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-3"
            >
              <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {rec}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
