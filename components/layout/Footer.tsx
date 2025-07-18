import Link from "next/link";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Download,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-rawasy-400 ml-2" />
              <div>
                <h2 className="text-xl font-bold text-white">رواسي</h2>
                <p className="text-sm text-gray-400">مواد البناء</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              منصة رواسي الشاملة لمواد البناء في الشرق الأوسط. نربط المقاولين
              والموردين لتوفير أفضل مواد البناء بأسعار تنافسية وجودة عالية.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a
                href="#"
                className="text-gray-400 hover:text-rawasy-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-rawasy-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-rawasy-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-rawasy-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-rawasy-400 transition-colors"
                >
                  من نحن
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-300 hover:text-rawasy-400 transition-colors"
                >
                  فئات المنتجات
                </Link>
              </li>
              <li>
                <Link
                  href="/suppliers"
                  className="text-gray-300 hover:text-rawasy-400 transition-colors"
                >
                  دليل الموردين
                </Link>
              </li>
              <li>
                <Link
                  href="/deals"
                  className="text-gray-300 hover:text-rawasy-400 transition-colors"
                >
                  العروض والخصومات
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-gray-300 hover:text-rawasy-400 transition-colors"
                >
                  المشاريع
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-rawasy-400 transition-colors"
                >
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">خدمة العملاء</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/help"
                  className="text-gray-300 hover:text-rawasy-400 transition-colors"
                >
                  مركز المساعدة
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-300 hover:text-rawasy-400 transition-colors"
                >
                  سياسة الشحن
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-300 hover:text-rawasy-400 transition-colors"
                >
                  سياسة الإرجاع
                </Link>
              </li>
              <li>
                <Link
                  href="/payment"
                  className="text-gray-300 hover:text-rawasy-400 transition-colors"
                >
                  طرق الدفع
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty"
                  className="text-gray-300 hover:text-rawasy-400 transition-colors"
                >
                  الضمان
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="text-gray-300 hover:text-rawasy-400 transition-colors"
                >
                  تتبع الطلب
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info & App Download */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">تواصل معنا</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 ml-2 text-rawasy-400" />
                <span>+966 11 123 4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 ml-2 text-rawasy-400" />
                <span>info@rawasy.com</span>
              </div>
              <div className="flex items-start text-gray-300">
                <MapPin className="h-4 w-4 ml-2 mt-1 text-rawasy-400 flex-shrink-0" />
                <span>
                  شارع الملك فهد، الرياض 12345، المملكة العربية السعودية
                </span>
              </div>
            </div>

            {/* App Download */}
            <div className="space-y-2">
              <h4 className="text-md font-medium text-white">حمل التطبيق</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="flex items-center bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors"
                >
                  <Download className="h-5 w-5 ml-2 text-rawasy-400" />
                  <div className="text-sm">
                    <div className="text-gray-300">حمل من</div>
                    <div className="text-white font-medium">App Store</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors"
                >
                  <Download className="h-5 w-5 ml-2 text-rawasy-400" />
                  <div className="text-sm">
                    <div className="text-gray-300">حمل من</div>
                    <div className="text-white font-medium">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 رواسي. جميع الحقوق محفوظة.
            </div>
            <div className="flex space-x-6 space-x-reverse text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-rawasy-400 transition-colors"
              >
                سياسة الخصوصية
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-rawasy-400 transition-colors"
              >
                شروط الاستخدام
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-rawasy-400 transition-colors"
              >
                سياسة ملفات تعريف الارتباط
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
