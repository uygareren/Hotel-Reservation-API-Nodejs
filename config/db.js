const mongoose = require('mongoose');

// MongoDB bağlantısı için gerekli olan URL'yi belirleyin
const dbUrl = 'mongodb+srv://uygar:uygareren123@cluster0.sg1tnmy.mongodb.net/?retryWrites=true&w=majority' // Örnek bir bağlantı URL'si

// Mongoose bağlantısını yapılandırma
const db = mongoose.connect(dbUrl, {
  useNewUrlParser: true, // Yeni URL parser'ı kullan
  useUnifiedTopology: true, // Yeni birleşik topoloji motorunu kullan
  // Gerekirse diğer mongoose seçeneklerini buraya ekleyebilirsiniz
})
  .then(() => {
    console.log('MongoDB bağlantısı başarılı.');
  })
  .catch((error) => {
    console.error('MongoDB bağlantısı başarısız:', error);
  });


module.exports = db;
