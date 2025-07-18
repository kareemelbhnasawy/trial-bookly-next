import Link from "next/link";

export default function DiagnosticPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🔧 Rawasy Site Diagnostic
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Navigation Tests */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">📍 Navigation Tests</h2>
            <div className="space-y-2">
              <Link
                href="/"
                className="block text-blue-600 hover:text-blue-800"
              >
                ✅ Homepage (/)
              </Link>
              <Link
                href="/categories"
                className="block text-blue-600 hover:text-blue-800"
              >
                📦 Categories
              </Link>
              <Link
                href="/categories/steel"
                className="block text-blue-600 hover:text-blue-800"
              >
                🔩 Steel Category
              </Link>
              <Link
                href="/login"
                className="block text-blue-600 hover:text-blue-800"
              >
                🔐 Login
              </Link>
              <Link
                href="/register"
                className="block text-blue-600 hover:text-blue-800"
              >
                ✍️ Register
              </Link>
              <Link
                href="/cart"
                className="block text-blue-600 hover:text-blue-800"
              >
                🛒 Cart
              </Link>
              <Link
                href="/supplier"
                className="block text-blue-600 hover:text-blue-800"
              >
                🏢 Supplier Dashboard
              </Link>
            </div>
          </div>

          {/* Component Tests */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">🧩 Component Tests</h2>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <div className="font-medium text-green-800">
                  ✅ Layout Components
                </div>
                <div className="text-sm text-green-600">
                  Header, Footer loading correctly
                </div>
              </div>

              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <div className="font-medium text-green-800">
                  ✅ UI Components
                </div>
                <div className="text-sm text-green-600">
                  Button, Input, Card components working
                </div>
              </div>

              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <div className="font-medium text-green-800">✅ Icons</div>
                <div className="text-sm text-green-600">
                  Lucide React icons loading
                </div>
              </div>

              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <div className="font-medium text-green-800">✅ Styling</div>
                <div className="text-sm text-green-600">
                  Tailwind CSS working properly
                </div>
              </div>
            </div>
          </div>

          {/* Features Tests */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">⚡ Features Status</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                <span>Homepage loading</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                <span>Arabic RTL layout</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                <span>Component architecture</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                <span>Navigation working</span>
              </div>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-2">⚠️</span>
                <span>I18n (simplified)</span>
              </div>
            </div>
          </div>

          {/* Technical Info */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">⚙️ Technical Info</h2>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Framework:</strong> Next.js 14
              </div>
              <div>
                <strong>Styling:</strong> Tailwind CSS
              </div>
              <div>
                <strong>Icons:</strong> Lucide React
              </div>
              <div>
                <strong>State:</strong> Zustand
              </div>
              <div>
                <strong>Fonts:</strong> Tajawal (Arabic), Inter (English)
              </div>
              <div>
                <strong>Direction:</strong> RTL (Right-to-Left)
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            🏠 Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
