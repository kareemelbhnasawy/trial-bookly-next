export default function SimpleHomePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Rawasy - رواسي</h1>
        <p>Construction Materials Marketplace</p>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            منصة رواسي لمواد البناء
          </h2>
          <p className="text-xl text-gray-600">
            اكتشف أفضل مواد البناء من موردين موثوقين في الشرق الأوسط
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">حديد وصلب</h3>
            <p className="text-gray-600">Steel & Iron</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">اسمنت</h3>
            <p className="text-gray-600">Cement</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">ركام ورمل</h3>
            <p className="text-gray-600">Aggregates & Sand</p>
          </div>
        </section>
      </main>
    </div>
  );
}
