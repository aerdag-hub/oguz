import fs from "node:fs";
import path from "node:path";

export type Service = { id: string; title: string; desc: string; icon: string; image?: string };
export type Stat = { value: string; label: string };
export type Legislation = { title: string; desc: string };

export type SiteContent = {
  siteName: string;
  slogan: string;
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    image?: string;
  };
  stats: Stat[];
  services: Service[];
  about: {
    title: string;
    text: string;
    bullets: string[];
    mission: string;
    vision: string;
    year: string;
    team: string;
    image?: string;
  };
  references: { name: string; sector: string }[];
  legislation: Legislation[];
  contact: {
    email: string;
    phone: string;
    address: string;
    workHours: string;
  };
  footerText: string;
};

export const defaultContent: SiteContent = {
  siteName: "BURSA PERİYODİK KONTROL",
  slogan: "İş güvenliğinde bağımsız ve tarafsız muayene",
  hero: {
    badge: "Bursa merkezli • Türkiye geneli hizmet",
    title: "Periyodik kontrol ve muayenede güvenilir adres",
    subtitle:
      "Basınçlı kaplardan kaldırma ekipmanlarına, elektrik tesisatından yangın sistemlerine kadar tüm iş ekipmanlarınızın yasal periyodik muayenelerini raporluyoruz. 6331 sayılı kanun ve ilgili yönetmeliklere tam uyum.",
    ctaPrimary: "Muayene Hizmetleri",
    ctaSecondary: "Teklif Alın",
    image: "https://www.progepi.it/wp-content/uploads/2019/05/6.jpg",
  },
  stats: [
    { value: "12+", label: "Yıllık Saha Deneyimi" },
    { value: "2.500+", label: "Tamamlanan Muayene" },
    { value: "400+", label: "Hizmet Verilen İşletme" },
    { value: "81", label: "İlde Mobil Ekip" },
  ],
  services: [
    {
      id: "basincli-kaplar",
      title: "Basınçlı Kap Muayenesi",
      desc: "Buhar ve kalorifer kazanları, hava tankları, kompresörler, genleşme tankları, hidrofor ve otoklavların hidrostatik test ve göz muayeneleri.",
      icon: "🔧",
      image:
        "https://cbnmuhendislik.com/wp-content/uploads/2025/01/basincli-kaplarin-periyodik-kontrol-1140x595-1.jpg",
    },
    {
      id: "kaldirma-iletme",
      title: "Kaldırma ve İletme Ekipmanları",
      desc: "Vinç, caraskal, forklift, transpalet, mobil platform, asansör ve yürüyen merdivenlerin yük testi ve fonksiyon kontrolleri.",
      icon: "🏗️",
      image:
        "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_860/https://fatihistif.com/wp-content/uploads/2024/09/ssssssssssss-860x645.jpg",
    },
    {
      id: "elektrik",
      title: "Elektrik Tesisatı Ölçümleri",
      desc: "Topraklama, paratoner, kaçak akım rölesi, pano uygunluk, termal kamera ve elektrik iç tesisat periyodik kontrolleri.",
      icon: "⚡",
      image: "https://www.fidergrup.com/wp-content/uploads/2020/05/%C3%96L%C3%87%C3%9CMLER-2.jpg",
    },
    {
      id: "yangin",
      title: "Yangın Tesisatı Kontrolü",
      desc: "Hidrant, sprinkler, yangın pompası, algılama ve alarm sistemleri ile söndürme tüplerinin fonksiyon ve basınç kontrolleri.",
      icon: "🧯",
      image:
        "https://www.aplasgroup.com.tr/wp-content/uploads/2020/05/yangin-tesisati-aplas-enerji-sistemleri-antalya.jpg",
    },
    {
      id: "is-makineleri",
      title: "Tezgâh ve Raf Sistemleri",
      desc: "Pres, torna, freze gibi iş tezgâhları ile depo raf sistemlerinin deformasyon, bağlantı ve taşıma kapasitesi kontrolleri.",
      icon: "🏭",
      image:
        "https://yilkarlazer.com/wp-content/uploads/2024/01/karadeniz_raf_yapi_market_ve_hirdavat_raf_sistemleri-1024x683.jpg",
    },
    {
      id: "ortam-olcum",
      title: "Ortam ve Hijyen Ölçümleri",
      desc: "Aydınlatma, gürültü, titreşim, toz ve termal konfor ölçümleriyle çalışma ortamınızın mevzuata uygunluğunu belgeliyoruz.",
      icon: "📋",
      image:
        "https://shoesforcrews.pro/cdn/shop/articles/202504P2UK-featured-image.jpg?v=1784304090",
    },
  ],
  about: {
    title: "Hakkımızda",
    text: "BURSA PERİYODİK KONTROL, Bursa'da faaliyet gösteren bağımsız bir periyodik muayene kuruluşudur. Makine ve elektrik mühendislerinden oluşan ekibimizle, İş Ekipmanlarının Kullanımında Sağlık ve Güvenlik Şartları Yönetmeliği başta olmak üzere tüm yasal mevzuata göre muayene yapıyor; eksikleri net dille raporluyoruz. Amacımız ceza korkusu değil, gerçekten güvenli tesisler.",
    bullets: [
      "Mühendis kadro ile sahada muayene",
      "Aynı gün ön rapor, 3 günde onaylı rapor",
      "Hatırlatma sistemi ile periyot takibi",
      "Bursa'da aynı gün, Türkiye genelinde 48 saatte sahada",
    ],
    mission: "Bursa ve çevresindeki işletmelerin ekipman güvenliğini bağımsız muayene ile güvence altına almak.",
    vision: "Marmara'nın referans gösterilen periyodik kontrol kuruluşu olmak.",
    year: "2013",
    team: "Makine + elektrik mühendisleri",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop",
  },
  references: [
    { name: "Bursa OSB Otomotiv Tedarikçisi", sector: "Otomotiv" },
    { name: "Nilüfer Tekstil İşletmesi", sector: "Tekstil" },
    { name: "Gıda Üretim Tesisi", sector: "Gıda" },
    { name: "Lojistik ve Depolama Merkezi", sector: "Lojistik" },
    { name: "AVM ve Site Yönetimleri", sector: "Tesis Yönetimi" },
    { name: "Metal İşleme Atölyesi", sector: "Metal" },
  ],
  contact: {
    email: "info@bursaperiyodik.com.tr",
    phone: "0 533 438 57 46",
    address: "BURSA / TÜRKİYE",
    workHours: "Hafta içi 08:30 – 18:00, Cumartesi 09:00 – 13:00",
  },
  legislation: [
    {
      title: "6331 Sayılı İş Sağlığı ve Güvenliği Kanunu",
      desc: "İşverenlere iş ekipmanlarının güvenliğini sağlama ve periyodik kontrollerini yaptırma yükümlülüğü getirir. Kontrollerin yapılmaması idari para cezası sebebidir.",
    },
    {
      title: "İş Ekipmanlarının Kullanımında Sağlık ve Güvenlik Şartları Yönetmeliği",
      desc: "Hangi ekipmanın hangi aralıkla, hangi kriterlere göre muayene edileceğini belirler. Basınçlı kaplar, kaldırma araçları ve tesisatlar için kontrol süre ve standartlarını tanımlar.",
    },
    {
      title: "Elektrik İç Tesisleri Yönetmeliği",
      desc: "Topraklama, paratoner ve elektrik iç tesisatının periyodik ölçüm ve kontrol esaslarını düzenler. Ölçüm sonuçlarının raporlanmasını zorunlu kılar.",
    },
    {
      title: "Asansör İşletme ve Bakım Yönetmeliği",
      desc: "Asansörlerin yıllık periyodik kontrollerini ve güvenlik aksamlarının muayenesini kapsar. Bina yöneticilerinin yükümlülüklerini belirler.",
    },
    {
      title: "Binaların Yangından Korunması Hakkında Yönetmelik",
      desc: "Hidrant, sprinkler, yangın pompası, algılama ve söndürme sistemlerinin periyodik bakım ve fonksiyon kontrollerini zorunlu tutar.",
    },
    {
      title: "Basınçlı Ekipmanlar Yönetmeliği",
      desc: "Kazan, hava tankı, kompresör gibi basınçlı kapların tasarım, imalat ve periyodik muayene kriterlerini belirler; hidrostatik test esaslarını içerir.",
    },
  ],
  footerText: "© 2026 BURSA PERİYODİK KONTROL. Tüm hakları saklıdır.",
};

const dataFile = path.join(process.cwd(), "src", "data", "site.json");

export function getContent(): SiteContent {
  try {
    if (fs.existsSync(dataFile)) {
      const raw = fs.readFileSync(dataFile, "utf-8");
      const parsed = JSON.parse(raw) as SiteContent;
      return { ...defaultContent, ...parsed };
    }
  } catch {
    // fallback
  }
  return defaultContent;
}

export function saveContent(content: SiteContent) {
  fs.mkdirSync(path.dirname(dataFile), { recursive: true });
  fs.writeFileSync(dataFile, JSON.stringify(content, null, 2), "utf-8");
}

export function checkAdminPassword(reqPassword: string | null): boolean {
  const expected = process.env.ADMIN_PASSWORD || "admin123";
  return !!reqPassword && reqPassword === expected;
}
