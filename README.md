AnestEEG Projesi — Bağlam Özeti
Merhaba. Seninle bir web tabanlı eğitim platformu geliştiriyoruz. Platform adı AnestEEG. Aşağıda projenin tüm detayları var.
Projenin amacı: Anesteziyoloji alanında EEG kullanımını öğretmek isteyen herkese yönelik, interaktif ve modüler bir web eğitim platformu. Platform tamamlandığında bir akademik makale olarak yayınlanması hedefleniyor. Eğitimin etkinliği pre-test ve post-test ile ölçülecek.
Teknik yapı kararları:
•	Geliştirme aşamasında lokalde (Visual studio code’da) çalışacak, en sona domain alınacak
•	Önce içerik ve interaktif bileşenler burada prototype olarak üretilecek
•	Backend (Flask) entegrasyonu sonraki aşamada yapılacak
•	Kullanıcı arayüzü HTML + JavaScript ile geliştirilecek

GİRİŞ SAYFASI
Platform adı: AnestEEG
A web-based interactive platform for EEG education in anaesthesiology
________________________________________
1. Üst alan (header) AnestEEG logosu + kısa slogan. Slogan önerisi: "Learn to read the brain under anaesthesia" — sade, net, hedef kitleye doğrudan hitap ediyor.
2. Orta alan Kısa platform tanıtımı — 3"The brain is the primary target of general anaesthesia — yet it remains the least monitored organ in the operating room. AnestEEG is an interactive, evidence-based learning platform designed to help anaesthesia professionals develop practical EEG interpretation skills. Built on an international expert consensus framework, AnestEEG guides you through 10 structured modules — from basic EEG principles to clinical integration. Start with a pre-test, work through the modules at your own pace, and measure your progress with a final assessment."
Altında akış şeması — Pre-test → 10 Modül → Post-test. Görsel ve basit.
3. Kullanıcı girişi: Kullanıcı kayıt formu — toplanacak veriler:
•	Nickname (zorunlu)
•	Unvan: Uzman / Asistan (zorunlu)
•	Deneyim yılı (zorunlu)
•	Ülke (zorunlu)
•	Daha önce EEG eğitimi aldınız mı? Evet / Hayır (zorunlu)
4. Alt alan (footer) Hazırlayan bilgisi, kurumsal bağlantı, etik kurul notu.
PRETESTE BAŞLA BUTONU
PRETEST
…
TESTİ BİTİR VE EĞİTİME BAŞLA BUTONU
Modül 1 — EEG Nedir? Sinyal ve Donanım.
Sayfa 1 — Sinyal Oluşumu
İçerik: Nöronların elektriksel aktivitesi, aksiyon potansiyeli vs postsinaptik potansiyel, EEG'nin esas olarak kortikal piramidal nöronların sinaptik aktivitesini yansıttığı, senkronizasyon kavramı.
İnteraktif: Dalga kompozisyon simülatörü — kullanıcı frekans ve amplitüd seçip dalga ekliyor, üst üste bindirerek karmaşık EEG sinyali oluşturuyor. Amaç: EEG'nin aslında birçok sinyal kaynağının toplamı olduğunu sezgisel kavratmak.
________________________________________
Sayfa 2 — Skalpa İletim, Elektrotlar, Empedans ve Filtreler
İçerik: Sinyalin korteksten skalpa iletimi, hacim iletimi kavramı. Elektrot tipleri, 10-20 sistemi. Empedansın sinyal kalitesine etkisi. High-pass, low-pass, notch filtreler ve skala.
Görsel: 10-20 sistemi elektrot yerleşim şeması — statik ama net.
İnteraktif: Filtre ve skala simülatörü — ekranda normal bir EEG/DSA görüntüsü var, kullanıcı filtreleri ve skalaları değiştiriyor, görüntü bozuluyor ya da düzeliyor. Mesaj: doğru ayar sinyal kalitesi için kritik.
________________________________________
Sayfa 3 — Yaygın Teknik Sorunlar ve Çözümleri
İçerik: Yüksek empedans, elektrot düşmesi, güç hattı gürültüsü, kötü referans elektrot. Her sorunun EEG görünümüne yansıması ve pratik çözümü.
İnteraktif: Yüksek empedans, elektrot düşmesi, güç hattı gürültüsü, kötü referans elektrot. Format: Görsel ağırlıklı — her sorun için bozuk EEG görseli + açıklama + çözüm.
Modül 2 — Anestezide EEG: Neden ve Ne Zaman?
Sayfa 1 — Beyin: En Az İzlenen Organ İçerik: Beyin anestezinin birincil hedef organı ama bilinç kavramının ölçülmesinin güçlüğü. Kalp hızı, tansiyon, SpO2 gibi parametrelerle kıyasla beyin monitörizasyonunun zorluğu. Mevcut yöntemlerin yetersizliği — klinik bulgular, MAC değeri, pEEG indekslerinin sınırlılıkları. Format: Metin + karşılaştırmalı infografik — "izlediğimiz parametreler vs izleyemediğimiz parametreler" görsel olarak.
Sayfa 2 — EEG'nin Klinik Endikasyonları İçerik: Farkındalık riski, aşırı anestezi derinliği, PND ve deliryum ile ilişkisi. Kılavuzların EEG'ye bakışı — ESA ve diğer rehberler. Özellikle vulnerable popülasyonlar: yaşlı hasta, kardiyak cerrahi, nörocerrahi. Format: Metin + kılavuz önerileri kutusu — kısa ve net.
Modül 3 — Frekans Bantları ve Temel EEG Paternleri
Sayfa 1 — Frekans Bantları İçerik: Delta (0.5-4 Hz), teta (4-8 Hz), alfa (8-13 Hz), beta (13-30 Hz), gama (>30 Hz) — frekans aralıkları, amplitüdler, klinik anlamları. Format: Görsel ağırlıklı — her bant için örnek dalga görseli + kısa açıklama tablosu.
Modül 4 — Anestezi Derinliği ve Ham EEG
Sayfa 1 — Ham EEG Nedir? İçerik: Ham EEG'nin tanımı. İşlenmiş EEG'den (BIS, pEEG indeksleri) farkı — ham sinyal vs sayısal indeks. Ham EEG'nin klinisyene ne kazandırdığı. Amplitüd, frekans, süreklilik, simetri kavramları — ham EEG okurken nelere bakılır. Format: Metin + yan yana karşılaştırmalı görsel — solda ham EEG tracingi, sağda aynı verinin BIS ekranı görünümü.
Sayfa 2 — Anestezi Fazlarında Ham EEG İçerik: Baseline (uyanıklık) EEG'si, indüksiyon, idame ve derlenme fazlarında EEG'nin nasıl değiştiği. Her fazın amplitüd ve frekans özellikleri. İnteraktif: Kaydırıcı simülatörü — kullanıcı soldan sağa kaydırıyor: uyanıklık → indüksiyon → idame → derin anestezi → derlenme. Kaydırıcı ilerledikçe ham EEG tracingi gerçek zamanlı değişiyor. Her pozisyonda altında iki şey çıkıyor: o fazın EEG özellikleri (amplitüd, frekans, patern) ve klinik karşılığı.
Sayfa 3 — Alfa-Delta Paterni ve Ham EEG ile Derinlik Değerlendirmesi İçerik: Frontal alfa-delta paterninin tanımı ve önemi. Bu paternin anestezi idamesindeki yeri. Ham EEG ile anestezi derinliğini değerlendirmenin uygulanabilirliği — ne zaman yeterli, ne zaman yetersiz kalır. pEEG indekslerine kıyasla avantajları ve sınırlılıkları. Format: Metin + frontal alfa-delta paternini gösteren açıklamalı EEG görseli.
Modül 5 — Burst Supresyon ve Spike Paternleri
Sayfa 1 — Tanımlar İçerik: Burst supresyonun tanımı, EEG görünümü, BSR'nin nasıl hesaplandığı ve yorumlandığı. Spike paterninin tanımı ve EEG görünümü. İkisinin birbirinden nasıl ayırt edildiği. Format: Metin + her patern için açıklamalı EEG görseli. Yan yana karşılaştırmalı görsel — burst supresyon vs spike.
Sayfa 2 — Klinik Önemi ve Patern Tanıma İçerik: Burst supresyonun aşırı anestezi derinliğinin markeri olarak önemi. PND ve deliryum ile ilişkisi. Spike paterninin klinik anlamı. Bu paternleri tanımanın hasta güvenliğine katkısı. İnteraktif: Patern ayırım egzersizi — kullanıcıya 4-5 farklı EEG tracingi gösteriliyor, her biri için "burst supresyon mu, spike mi, ikisi de değil mi" seçiyor. Doğru cevap sonrası o paterni neden önemli olduğuna dair kısa açıklama çıkıyor.
Modül 6 — Anesteziklerin EEG'ye Etkileri
Sayfa 1 — Ajan Bazlı EEG İmzaları İçerik: Propofol, volatil ajanlar (sevofluran, desfluran), ketamin, deksmedetomidinin karakteristik EEG görünümleri, mekanizmaları ve klinik önemi. Format: Görsel ağırlıklı — her ajan için açıklamalı EEG tracingi.
Sayfa 2 — Multimodal Anestezide EEG Yorumu İçerik: Kombinasyon anestezisinde EEG'nin nasıl değiştiği. Opioidlerin EEG'ye etkisi. Ketaminin ve dexmedetomidinin neden pEEG indekslerini yanıltabileceği. Format: Metin + görsel.
Sayfa 3 — "Bu Hangi Ajan?" Egzersizi İnteraktif: 4-5 EEG tracingi gösteriliyor, kullanıcı hangi ajana ait olduğunu seçiyor. Doğru cevap sonrası o ajana özgü EEG özelliklerinin özeti çıkıyor.
Modül 7 — İşlenmiş EEG ve Spektral Analiz
Sayfa 1 — pEEG ve BIS İçerik: pEEG mantığı, BIS nasıl hesaplanır, klinisyene ne sağlar. Ama neden yetersiz — proprietary algoritma, artefakt duyarlılığı, ketamin ve deksmedetomidin gibi ajanlarda yanıltıcılığı, burst supresyonu kaçırması. Format: Metin + görsel.
Sayfa 2 — Spektral Analiz ve Power Spectrum İçerik: Spektral analizin mantığı, Fourier dönüşümü temeli, power spectrum nedir, frekans bantlarının güç dağılımı. İnteraktif: Power spectrum simülatörü — kullanıcı frekans bandı seçip ağırlığını ayarlıyor, power spectrum grafiği gerçek zamanlı değişiyor. burada kısaca SEF’ten de bahsedebiliriz.
Sayfa 3 — Power Spectrum'dan DSA'ya İçerik: DSA nedir, power spectrumun zaman eksenine yayılmış hali olarak DSA. DSA okuma mantığı. İnteraktif: Kodlama aşamasında konuşacağız.
Modül 8 — Artefaktlar
Sayfa 1 — Artefakt Türleri İçerik: EMG, elektrot hareketi, elektriksel gürültü, göz hareketleri. Her birinin nasıl oluştuğu, EEG görünümü, teknik vs fizyolojik artefakt ayırımı. Format: Görsel ağırlıklı — her artefakt türü için açıklamalı EEG tracingi.
Sayfa 2 — Artefakt Tanıma Egzersizi İçerik: Artefakt yönetimi — her artefakt türü için pratik çözümler. İnteraktif: 5-6 EEG tracingi gösteriliyor, artefakt var mı yok mu, varsa hangi tür soruluyor. Doğru cevap sonrası o artefaktın yönetimine dair kısa açıklama çıkıyor.
Modül 9 — Hasta Varyabilitesi ve Nosisepsiyon
Sayfa 1 — Hasta Varyabilitesi İçerik: Yaşlı hastada EEG farklılıkları — düşük amplitüd, yavaş frekans, burst supresyon eşiğinin düşmesi. Pediatrik hastada EEG özellikleri. Bireysel varyabilite — aynı anestezi derinliğinde farklı EEG görünümleri. Frekans-band-power kavramı, frontal alfa dalgaları. PND riski taşıyan hastayı EEG ile tanıma. İnteraktif: Hasta profili simülatörü — kullanıcı yaş ve ek hastalık parametrelerini seçiyor, EEG görünümünün nasıl değiştiği gösteriliyor. Örneğin yaşlı + demans seçilince EEG'nin nasıl farklılaştığı anlık görülüyor.
Sayfa 2 — Nosisepsiyon ve EEG İçerik: Nosisepsiyona bağlı EEG değişimleri — yetersiz analjezide EEG'de ne olur. Alfa drop-out kavramı ve klinik anlamı. EEG bulgularını diğer klinik bulgularla entegre yorumlama — EEG tek başına yeterli değil. Format: Metin + alfa drop-out gösteren açıklamalı EEG görseli.
Modül 10 — Klinik Entegrasyon ve Sürekli Öğrenme
Sayfa 1 — EEG'yi Anestezi Yönetimine Entegre Etmek İçerik: EEG bulgularına dayanarak anestezi dozunu ayarlama mantığı. Aşırı ve yetersiz anestezinin EEG ile erken tespiti. EEG bulgularını ekiple nasıl iletişime taşırsın — pratik öneriler. Format: Metin + özet kutuları.
Sayfa 2 — Klinik Karar Verme Simülatörleri Senaryo 1 — "Hasta Uyu": Kullanıcıya hasta profili veriliyor, propofol dozunu EEG'ye bakarak ayarlıyor. Burst supresyona girerse veya yetersiz kalırsa uyarı çıkıyor. Senaryo 2 — "Cerrah: Hasta Uyanıyor": Ekranda EEG + DSA var, kullanıcı üç seçenek arasından karar veriyor — anestezi artır, analjezi ver, kas gevşetici ver. Doğru karar EEG bulgusuna göre değişiyor.
Sayfa 3 — Vaka Senaryosu İçerik: Başından sonuna bir anestezi vakasının DSA görüntüsü. Kritik noktalara tıklanınca ham EEG açılıyor, klinik bağlamı açıklanıyor. Burst supresyon, artefakt, alfa drop-out — tüm modüllerin doğal tekrarı. İnteraktif: Tıklanabilir DSA simülatörü.
POSTTESTE GEÇ
POSTTEST
….
Testi bitir- Son sayfa — Sürekli Öğrenme İçerik: Güncel kaynaklar, online platformlar, kılavuzlar. Kısa kapanış mesajı. Format: Metin + kaynak listesi.


