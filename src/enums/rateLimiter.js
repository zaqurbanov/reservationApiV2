const rateLimit  = require('express-rate-limit')


const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dəqiqə
    max: 100, // Hər IP üçün maksimum 100 sorğu
    message: 'Çox sayda sorğu göndərdiniz. Bir az sonra yenidən cəhd edin.',
  });
  module.exports = apiLimiter