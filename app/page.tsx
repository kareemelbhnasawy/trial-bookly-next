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

        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">
            Basic page is working! Let's test the complex components.
          </p>
          <button
            onClick={() => (window.location.href = "/test")}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 mr-4"
          >
            Test Page
          </button>
          <button
            onClick={() => {
              // Reload with full components
              window.location.href = "/?full=true";
            }}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Load Full Site
          </button>
        </div>
      </main>
    </div>
  );
}
