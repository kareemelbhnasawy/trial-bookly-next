"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Building,
  Plus,
  Edit,
  Trash2,
  Check,
  Star,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { usePaymentStore } from "@/stores/paymentStore";
import { formatDate } from "@/lib/utils";

export default function PaymentMethodsPage() {
  const {
    savedCards,
    savedBankAccounts,
    removeCard,
    removeBankAccount,
    setDefaultCard,
    setDefaultBankAccount,
    addCard,
    addBankAccount,
  } = usePaymentStore();

  const [showAddCard, setShowAddCard] = useState(false);
  const [showAddBank, setShowAddBank] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState<string | null>(null);

  const [cardForm, setCardForm] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    holderName: "",
    isDefault: false,
  });

  const [bankForm, setBankForm] = useState({
    bankName: "",
    accountNumber: "",
    iban: "",
    accountHolderName: "",
    isDefault: false,
  });

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Parse expiry date
    const [month, year] = cardForm.expiryDate.split("/");

    addCard({
      last4: cardForm.cardNumber.slice(-4),
      brand: getBrandFromCardNumber(cardForm.cardNumber),
      expiryMonth: parseInt(month),
      expiryYear: parseInt(`20${year}`),
      holderName: cardForm.holderName,
      isDefault: cardForm.isDefault,
    });

    setCardForm({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      holderName: "",
      isDefault: false,
    });
    setShowAddCard(false);
  };

  const handleBankSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addBankAccount({
      bankName: bankForm.bankName,
      accountNumber: bankForm.accountNumber,
      iban: bankForm.iban,
      accountHolderName: bankForm.accountHolderName,
      isDefault: bankForm.isDefault,
    });

    setBankForm({
      bankName: "",
      accountNumber: "",
      iban: "",
      accountHolderName: "",
      isDefault: false,
    });
    setShowAddBank(false);
  };

  const getBrandFromCardNumber = (cardNumber: string): string => {
    const firstDigit = cardNumber.charAt(0);
    if (firstDigit === "4") return "Visa";
    if (firstDigit === "5") return "Mastercard";
    if (cardNumber.startsWith("37") || cardNumber.startsWith("34"))
      return "American Express";
    return "Unknown";
  };

  const getBrandIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return (
          <div className="w-8 h-5 bg-blue-600 text-white text-xs flex items-center justify-center rounded">
            VISA
          </div>
        );
      case "mastercard":
        return (
          <div className="w-8 h-5 bg-red-600 text-white text-xs flex items-center justify-center rounded">
            MC
          </div>
        );
      case "american express":
        return (
          <div className="w-8 h-5 bg-green-600 text-white text-xs flex items-center justify-center rounded">
            AMEX
          </div>
        );
      default:
        return <CreditCard className="h-5 w-5 text-gray-400" />;
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">طرق الدفع</h1>
            <p className="text-gray-600">
              إدارة البطاقات والحسابات البنكية المحفوظة
            </p>
          </div>

          {/* Security Notice */}
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-600 ml-2" />
                <div>
                  <h3 className="font-semibold text-green-800">
                    معلومات آمنة ومشفرة
                  </h3>
                  <p className="text-sm text-green-700">
                    جميع معلومات الدفع محمية بتشفير SSL وتحفظ بأمان وفقاً
                    لمعايير PCI DSS
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Credit/Debit Cards */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  البطاقات المحفوظة
                </h2>
                <Button onClick={() => setShowAddCard(true)}>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة بطاقة
                </Button>
              </div>

              {/* Add Card Form */}
              {showAddCard && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>إضافة بطاقة جديدة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCardSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          رقم البطاقة *
                        </label>
                        <Input
                          type="text"
                          value={cardForm.cardNumber}
                          onChange={(e) =>
                            setCardForm((prev) => ({
                              ...prev,
                              cardNumber: formatCardNumber(e.target.value),
                            }))
                          }
                          placeholder="1234 5678 9012 3456"
                          className="text-left"
                          maxLength={19}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            تاريخ الانتهاء *
                          </label>
                          <Input
                            type="text"
                            value={cardForm.expiryDate}
                            onChange={(e) =>
                              setCardForm((prev) => ({
                                ...prev,
                                expiryDate: formatExpiryDate(e.target.value),
                              }))
                            }
                            placeholder="MM/YY"
                            className="text-left"
                            maxLength={5}
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV *
                          </label>
                          <Input
                            type="text"
                            value={cardForm.cvv}
                            onChange={(e) =>
                              setCardForm((prev) => ({
                                ...prev,
                                cvv: e.target.value.replace(/\D/g, ""),
                              }))
                            }
                            placeholder="123"
                            className="text-left"
                            maxLength={4}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          اسم حامل البطاقة *
                        </label>
                        <Input
                          type="text"
                          value={cardForm.holderName}
                          onChange={(e) =>
                            setCardForm((prev) => ({
                              ...prev,
                              holderName: e.target.value.toUpperCase(),
                            }))
                          }
                          placeholder="AHMED MOHAMMED ALALI"
                          className="text-left"
                          required
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="defaultCard"
                          checked={cardForm.isDefault}
                          onChange={(e) =>
                            setCardForm((prev) => ({
                              ...prev,
                              isDefault: e.target.checked,
                            }))
                          }
                          className="h-4 w-4 text-rawasy-600 ml-2"
                        />
                        <label
                          htmlFor="defaultCard"
                          className="text-sm text-gray-700"
                        >
                          جعل هذه البطاقة الافتراضية
                        </label>
                      </div>

                      <div className="flex space-x-3 space-x-reverse">
                        <Button type="submit">حفظ البطاقة</Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowAddCard(false)}
                        >
                          إلغاء
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Saved Cards */}
              <div className="space-y-4">
                {savedCards.length > 0 ? (
                  savedCards.map((card) => (
                    <Card
                      key={card.id}
                      className={
                        card.isDefault ? "border-rawasy-300 bg-rawasy-50" : ""
                      }
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            {getBrandIcon(card.brand)}
                            <div>
                              <div className="flex items-center">
                                <span className="font-medium">
                                  •••• •••• •••• {card.last4}
                                </span>
                                {card.isDefault && (
                                  <span className="mr-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-rawasy-100 text-rawasy-800">
                                    <Star className="h-3 w-3 ml-1" />
                                    افتراضي
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-600">
                                {card.holderName} •{" "}
                                {card.expiryMonth.toString().padStart(2, "0")}/
                                {card.expiryYear.toString().slice(-2)}
                              </div>
                              <div className="text-xs text-gray-500">
                                أضيفت في {formatDate(card.createdAt)}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 space-x-reverse">
                            {!card.isDefault && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setDefaultCard(card.id)}
                              >
                                جعل افتراضي
                              </Button>
                            )}

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeCard(card.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">
                        لا توجد بطاقات محفوظة
                      </h3>
                      <p className="text-gray-600 mb-4">
                        أضف بطاقة ائتمانية أو خصم لتسريع عملية الدفع
                      </p>
                      <Button onClick={() => setShowAddCard(true)}>
                        <Plus className="h-4 w-4 ml-2" />
                        إضافة بطاقة
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Bank Accounts */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  الحسابات البنكية
                </h2>
                <Button onClick={() => setShowAddBank(true)}>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة حساب
                </Button>
              </div>

              {/* Add Bank Form */}
              {showAddBank && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>إضافة حساب بنكي</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBankSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          اسم البنك *
                        </label>
                        <select
                          value={bankForm.bankName}
                          onChange={(e) =>
                            setBankForm((prev) => ({
                              ...prev,
                              bankName: e.target.value,
                            }))
                          }
                          className="w-full p-3 border border-gray-300 rounded-md text-right"
                          required
                        >
                          <option value="">اختر البنك</option>
                          <option value="الراجحي">مصرف الراجحي</option>
                          <option value="الأهلي">البنك الأهلي السعودي</option>
                          <option value="ساب">
                            البنك السعودي البريطاني (ساب)
                          </option>
                          <option value="سامبا">مجموعة سامبا المالية</option>
                          <option value="الرياض">بنك الرياض</option>
                          <option value="البلاد">بنك البلاد</option>
                          <option value="الجزيرة">بنك الجزيرة</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          رقم الحساب *
                        </label>
                        <Input
                          type="text"
                          value={bankForm.accountNumber}
                          onChange={(e) =>
                            setBankForm((prev) => ({
                              ...prev,
                              accountNumber: e.target.value.replace(/\D/g, ""),
                            }))
                          }
                          placeholder="1234567890123456"
                          className="text-left"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          رقم الآيبان (IBAN) *
                        </label>
                        <Input
                          type="text"
                          value={bankForm.iban}
                          onChange={(e) =>
                            setBankForm((prev) => ({
                              ...prev,
                              iban: e.target.value.toUpperCase(),
                            }))
                          }
                          placeholder="SA0312345678901234567890"
                          className="text-left"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          اسم صاحب الحساب *
                        </label>
                        <Input
                          type="text"
                          value={bankForm.accountHolderName}
                          onChange={(e) =>
                            setBankForm((prev) => ({
                              ...prev,
                              accountHolderName: e.target.value,
                            }))
                          }
                          placeholder="أحمد محمد العلي"
                          className="text-right"
                          required
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="defaultBank"
                          checked={bankForm.isDefault}
                          onChange={(e) =>
                            setBankForm((prev) => ({
                              ...prev,
                              isDefault: e.target.checked,
                            }))
                          }
                          className="h-4 w-4 text-rawasy-600 ml-2"
                        />
                        <label
                          htmlFor="defaultBank"
                          className="text-sm text-gray-700"
                        >
                          جعل هذا الحساب الافتراضي
                        </label>
                      </div>

                      <div className="flex space-x-3 space-x-reverse">
                        <Button type="submit">حفظ الحساب</Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowAddBank(false)}
                        >
                          إلغاء
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Saved Bank Accounts */}
              <div className="space-y-4">
                {savedBankAccounts.length > 0 ? (
                  savedBankAccounts.map((account) => (
                    <Card
                      key={account.id}
                      className={
                        account.isDefault
                          ? "border-rawasy-300 bg-rawasy-50"
                          : ""
                      }
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <Building className="h-8 w-8 text-gray-600" />
                            <div>
                              <div className="flex items-center">
                                <span className="font-medium">
                                  {account.bankName}
                                </span>
                                {account.isDefault && (
                                  <span className="mr-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-rawasy-100 text-rawasy-800">
                                    <Star className="h-3 w-3 ml-1" />
                                    افتراضي
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-600">
                                {account.accountHolderName}
                              </div>
                              <div className="text-sm text-gray-500">
                                •••• •••• •••• {account.accountNumber.slice(-4)}
                              </div>
                              <div className="text-xs text-gray-500">
                                أضيف في {formatDate(account.createdAt)}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 space-x-reverse">
                            {!account.isDefault && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  setDefaultBankAccount(account.id)
                                }
                              >
                                جعل افتراضي
                              </Button>
                            )}

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeBankAccount(account.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Building className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">
                        لا توجد حسابات محفوظة
                      </h3>
                      <p className="text-gray-600 mb-4">
                        أضف حساب بنكي لاستخدامه في التحويلات المباشرة
                      </p>
                      <Button onClick={() => setShowAddBank(true)}>
                        <Plus className="h-4 w-4 ml-2" />
                        إضافة حساب
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {/* Support Info */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                الدعم والمساعدة
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    أمان المعلومات
                  </h4>
                  <p className="text-gray-600">
                    نحن لا نحفظ أرقام البطاقات الكاملة أو معلومات CVV. جميع
                    المعلومات المالية محمية بتشفير عالي المستوى.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    هل تحتاج مساعدة؟
                  </h4>
                  <p className="text-gray-600">
                    إذا واجهت أي مشكلة في إضافة طرق الدفع، تواصل مع فريق الدعم
                    على الرقم +966 11 123 4567
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
