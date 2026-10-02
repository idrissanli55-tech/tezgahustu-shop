import { supabase } from '../lib/supabase';

export default async function Home() {
  // Supabase'den verileri çekiyoruz. Tablonun adı farklıysa 'urunler' kısmını değiştir (örn: 'products').
  const { data: products, error } = await supabase
    .from('urunler') 
    .select('*');

  if (error) {
    console.error("Veri çekme hatası:", error);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">TezgahÜstü Vitrini</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {products?.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">{product.isim || product.name}</h2>
            <p className="text-gray-600 mb-4">{product.aciklama || product.description}</p>
            <p className="text-2xl font-bold text-green-600">{product.fiyat || product.price} ₺</p>
          </div>
        ))}
      </div>
      
      {(!products || products.length === 0) && (
        <p className="text-center text-gray-500 mt-10">Veritabanında henüz listelenecek ürün bulunamadı.</p>
      )}
    </main>
  );
}