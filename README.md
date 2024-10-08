1. Layihənin Ümumi Təsviri
Bu layihə bir restoran rezervasiya sistemidir. Layihə vasitəsilə istifadəçilər restoran rezervasiyaları yarada, onları yeniləyə, ləğv edə və mövcud rezervasiyalara baxa bilərlər. İstifadəçilərin autentifikasiyası və icazə səviyyələri mövcuddur, bu isə müxtəlif istifadəçi rollarına görə fərqli hüquqların tətbiq olunmasına imkan yaradır. Layihə təhlükəsizlik baxımından JWT ilə təmin edilir və hər bir əməliyyatın qeydiyyatı üçün audit logları saxlanılır.

2. Texnologiyalar
Node.js və Express.js: Backend üçün əsas texnologiyalar.
MongoDB: Məlumatların saxlanması üçün NoSQL verilənlər bazası.
Mongoose: MongoDB ilə əlaqə qurmaq üçün istifadə olunan ODM.
Winston: Layihədə logger kimi istifadə olunur və bütün server hadisələrini qeyd edir.
JWT (JSON Web Token): İstifadəçi autentifikasiyası və yetkiləndirmə üçün istifadə olunur.
Swagger: API sənədləşdirilməsi üçün istifadə olunur.
Express Validator: Gələn məlumatların validasiyası üçün istifadə edilir.
Nodemailer: İstifadəçilərə e-poçt göndərmək üçün (parol sıfırlama kimi əməliyyatlarda) istifadə olunur.
Rate Limiter: API-yə həddindən artıq sorğuların qarşısını almaq üçün istifadə olunur.
3. Qurğu və Tələblər
Node.js və npm quraşdırılmış olmalıdır.
MongoDB serveri işlək vəziyyətdə olmalıdır.
Qurulum təlimatları:
npm install komutunu istifadə edərək bütün asılılıqları quraşdırın.
env faylında PORT, JWT_KEY, və MONGO_PATH kimi konfiqurasiya parametrlərini konfiqurasiya edin.
npm start komutu ilə serveri başladın.
4. API Endpoint-lər
İstifadəçi Autentifikasiyası və Rollar:

/auth/register - Yeni istifadəçi qeydiyyatdan keçirmək.
/auth/login - İstifadəçinin daxil olması və JWT əldə etməsi.
/auth/refresh-token - Refresh token ilə yeni access token əldə etmək.
/auth/logout - İstifadəçinin sistemdən çıxışı.
/auth/forget-password - Parol sıfırlama istəyi göndərmək.
/auth/reset-password/:resetToken - Parolun sıfırlanması.
İstifadəçi İdarəetməsi:

/user/ - Bütün istifadəçiləri əldə etmək (yalnız admin və menecer).
/user/:id - İstifadəçini ID-yə görə əldə etmək.
/user/update-role/:id - İstifadəçinin rolunu yeniləmək (yalnız admin).
/user/:id - İstifadəçini ID-yə görə silmək (yalnız admin).
Rezervasiya İdarəetməsi:

/reserve/ - Bütün rezervasiyaları əldə etmək (yalnız admin).
/reserve/:id - Rezervasiyanı ID-yə görə əldə etmək.
/reserve/:id - Rezervasiyanı yeniləmək.
/reserve/:id - Rezervasiyanı silmək.
Rezervasiya Sistemi Ətraflı
Rezervasiya sistemi istifadəçilərin restoran üçün yer bron etməsinə imkan yaradır. Aşağıdakı əməliyyatlar mövcuddur:

Yeni rezervasiya yaratmaq: İstifadəçilər sistemə daxil olduqdan sonra müəyyən tarix və vaxt üçün rezervasiya yarada bilərlər.
Rezervasiyalara baxmaq: Admin istifadəçilər bütün rezervasiyaları görə bilər, digər istifadəçilər isə yalnız öz rezervasiyalarına baxa bilərlər.
Rezervasiyaları yeniləmək və ya silmək: İstifadəçilər yalnız özlərinə aid rezervasiyaları yeniləyə və ya ləğv edə bilərlər.
5. Güvənlilik və Rollar
JWT ilə Autentifikasiya: İstifadəçilər sistemə daxil olduqda server tərəfindən onlara JSON Web Token (JWT) verilir. Bu token istifadəçi adından əməliyyatlar aparılmasına icazə verir və hər bir sorğuda "Authorization" başlığında istifadə olunur.

Refresh Token Mexanizmi: Access token-in müddəti bitdikdə, istifadəçinin yenidən daxil olmasına ehtiyac olmadan yeni access token əldə etmək üçün refresh token istifadə edilir. Refresh token-lər daha uzun müddət etibarlıdır və cookie-lərdə saxlanılır. Refresh token endpoint (/auth/refresh-token) vasitəsilə istifadəçi yeni access token əldə edə bilər.

İstifadəçi Rolları: Sistemdə müxtəlif rollar mövcuddur:

User: Öz rezervasiyalarını yarada, baxa, yeniləyə və ya ləğv edə bilər.
Manager: Bütün istifadəçilərə baxa bilər, lakin onları idarə edə bilməz.
Admin: Bütün istifadəçiləri və rezervasiyaları idarə edə bilər. Rolların dəyişdirilməsi, istifadəçilərin silinməsi kimi hüquqlara malikdir.
6. Üstünlüklər və Funksionallıqlar
Audit Log: Hər bir əməliyyat (yaratma, silmə, yeniləmə və s.) audit log-a yazılır. Bu isə hər hansı bir əməliyyatın kim tərəfindən və nə vaxt edildiyini izləməyə imkan verir.
Rate Limiting: Sistemin təhlükəsizliyini təmin etmək üçün hər IP üçün müəyyən müddət ərzində məhdud sayda sorğuya icazə verilir.
Validasiya: Gələn məlumatların doğru formatda olmasını təmin etmək üçün Express Validator istifadə edilir.
E-poçt Bildirişləri: Parol sıfırlama kimi əməliyyatlarda istifadəçilərə bildiriş göndərilir.
Swagger Dokumentasiyası: API-lərin istifadəsini asanlaşdırmaq və sənədləşdirmək üçün Swagger istifadə edilmişdir. /api-docs endpointinə daxil olaraq API-lərin necə işlədiyini görə bilərsiniz.


