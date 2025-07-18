import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PaymentMethod =
  | "card"
  | "bank_transfer"
  | "cod"
  | "apple_pay"
  | "mada"
  | "stc_pay";

export interface PaymentCard {
  id: string;
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  holderName: string;
  isDefault: boolean;
  createdAt: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  iban: string;
  accountHolderName: string;
  isDefault: boolean;
  createdAt: string;
}

export interface PaymentTransaction {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status:
    | "pending"
    | "processing"
    | "completed"
    | "failed"
    | "cancelled"
    | "refunded";
  gatewayTransactionId?: string;
  gatewayResponse?: Record<string, any>;
  failureReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentGateway {
  id: string;
  name: string;
  nameAr: string;
  type: PaymentMethod;
  isEnabled: boolean;
  supportedCurrencies: string[];
  fees: {
    percentage: number;
    fixed: number;
    currency: string;
  };
  minAmount: number;
  maxAmount: number;
  logo: string;
}

interface PaymentStore {
  // Payment methods
  savedCards: PaymentCard[];
  savedBankAccounts: BankAccount[];

  // Transactions
  transactions: PaymentTransaction[];

  // Available gateways
  availableGateways: PaymentGateway[];

  // Actions
  addCard: (card: Omit<PaymentCard, "id" | "createdAt">) => string;
  removeCard: (cardId: string) => void;
  setDefaultCard: (cardId: string) => void;

  addBankAccount: (account: Omit<BankAccount, "id" | "createdAt">) => string;
  removeBankAccount: (accountId: string) => void;
  setDefaultBankAccount: (accountId: string) => void;

  // Payment processing
  processPayment: (paymentData: {
    orderId: string;
    amount: number;
    currency: string;
    method: PaymentMethod;
    paymentDetails?: any;
  }) => Promise<PaymentTransaction>;

  updateTransactionStatus: (
    transactionId: string,
    status: PaymentTransaction["status"],
    data?: any,
  ) => void;

  // Utility functions
  getTransactionsByOrder: (orderId: string) => PaymentTransaction[];
  getDefaultCard: () => PaymentCard | undefined;
  getDefaultBankAccount: () => BankAccount | undefined;
  calculateFees: (amount: number, method: PaymentMethod) => number;
}

// Sample payment gateways for Middle East
const defaultGateways: PaymentGateway[] = [
  {
    id: "meeza",
    name: "Meeza",
    nameAr: "ميزة",
    type: "card",
    isEnabled: true,
    supportedCurrencies: ["EGP"],
    fees: { percentage: 1.5, fixed: 0, currency: "EGP" },
    minAmount: 1,
    maxAmount: 100000,
    logo: "/payment-gateways/mada.png",
  },
  {
    id: "visa_mastercard",
    name: "Visa/Mastercard",
    nameAr: "فيزا/ماستركارد",
    type: "card",
    isEnabled: true,
    supportedCurrencies: ["EGP", "USD", "EUR"],
    fees: { percentage: 2.5, fixed: 0, currency: "EGP" },
    minAmount: 1,
    maxAmount: 50000,
    logo: "/payment-gateways/visa-mc.png",
  },
  {
    id: "vodafone_cash",
    name: "Vodafone Cash",
    nameAr: "فودافون كاش",
    type: "stc_pay",
    isEnabled: true,
    supportedCurrencies: ["EGP"],
    fees: { percentage: 1.0, fixed: 0, currency: "EGP" },
    minAmount: 1,
    maxAmount: 10000,
    logo: "/payment-gateways/vodafone-cash.png",
  },
  {
    id: "orange_money",
    name: "Orange Money",
    nameAr: "أورانج موني",
    type: "apple_pay",
    isEnabled: true,
    supportedCurrencies: ["EGP"],
    fees: { percentage: 1.0, fixed: 0, currency: "EGP" },
    minAmount: 1,
    maxAmount: 10000,
    logo: "/payment-gateways/orange-money.png",
  },
  {
    id: "bank_transfer",
    name: "Bank Transfer",
    nameAr: "تحويل بنكي",
    type: "bank_transfer",
    isEnabled: true,
    supportedCurrencies: ["EGP"],
    fees: { percentage: 0, fixed: 5, currency: "EGP" },
    minAmount: 50,
    maxAmount: 1000000,
    logo: "/payment-gateways/bank-transfer.png",
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    nameAr: "الدفع عند الاستلام",
    type: "cod",
    isEnabled: true,
    supportedCurrencies: ["EGP"],
    fees: { percentage: 0, fixed: 10, currency: "EGP" },
    minAmount: 10,
    maxAmount: 2000,
    logo: "/payment-gateways/cod.png",
  },
];

export const usePaymentStore = create<PaymentStore>()(
  persist(
    (set, get) => ({
      savedCards: [],
      savedBankAccounts: [],
      transactions: [],
      availableGateways: defaultGateways,

      addCard: (cardData) => {
        const cardId = `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const card: PaymentCard = {
          ...cardData,
          id: cardId,
          createdAt: new Date().toISOString(),
        };

        set((state) => {
          // If this is the first card or set as default, make it default
          const cards =
            cardData.isDefault || state.savedCards.length === 0
              ? state.savedCards.map((c) => ({ ...c, isDefault: false }))
              : state.savedCards;

          return {
            savedCards: [...cards, card],
          };
        });

        return cardId;
      },

      removeCard: (cardId) => {
        set((state) => ({
          savedCards: state.savedCards.filter((card) => card.id !== cardId),
        }));
      },

      setDefaultCard: (cardId) => {
        set((state) => ({
          savedCards: state.savedCards.map((card) => ({
            ...card,
            isDefault: card.id === cardId,
          })),
        }));
      },

      addBankAccount: (accountData) => {
        const accountId = `account_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const account: BankAccount = {
          ...accountData,
          id: accountId,
          createdAt: new Date().toISOString(),
        };

        set((state) => {
          const accounts =
            accountData.isDefault || state.savedBankAccounts.length === 0
              ? state.savedBankAccounts.map((a) => ({ ...a, isDefault: false }))
              : state.savedBankAccounts;

          return {
            savedBankAccounts: [...accounts, account],
          };
        });

        return accountId;
      },

      removeBankAccount: (accountId) => {
        set((state) => ({
          savedBankAccounts: state.savedBankAccounts.filter(
            (account) => account.id !== accountId,
          ),
        }));
      },

      setDefaultBankAccount: (accountId) => {
        set((state) => ({
          savedBankAccounts: state.savedBankAccounts.map((account) => ({
            ...account,
            isDefault: account.id === accountId,
          })),
        }));
      },

      processPayment: async (paymentData) => {
        const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const now = new Date().toISOString();

        const transaction: PaymentTransaction = {
          id: transactionId,
          orderId: paymentData.orderId,
          amount: paymentData.amount,
          currency: paymentData.currency,
          method: paymentData.method,
          status: "pending",
          createdAt: now,
          updatedAt: now,
        };

        // Add transaction to store
        set((state) => ({
          transactions: [...state.transactions, transaction],
        }));

        // Simulate payment processing
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000));

          // Simulate different outcomes based on payment method
          let finalStatus: PaymentTransaction["status"] = "completed";
          let gatewayTransactionId = `gw_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

          // Simulate occasional failures
          if (Math.random() < 0.05) {
            // 5% failure rate
            finalStatus = "failed";
            gatewayTransactionId = undefined;
          }

          // Update transaction status
          const updatedTransaction = {
            ...transaction,
            status: finalStatus,
            gatewayTransactionId,
            gatewayResponse: {
              success: finalStatus === "completed",
              timestamp: new Date().toISOString(),
              reference: gatewayTransactionId,
            },
            failureReason:
              finalStatus === "failed" ? "Insufficient funds" : undefined,
            updatedAt: new Date().toISOString(),
          };

          set((state) => ({
            transactions: state.transactions.map((t) =>
              t.id === transactionId ? updatedTransaction : t,
            ),
          }));

          return updatedTransaction;
        } catch (error) {
          // Handle payment failure
          const failedTransaction = {
            ...transaction,
            status: "failed" as const,
            failureReason: "Payment processing error",
            updatedAt: new Date().toISOString(),
          };

          set((state) => ({
            transactions: state.transactions.map((t) =>
              t.id === transactionId ? failedTransaction : t,
            ),
          }));

          return failedTransaction;
        }
      },

      updateTransactionStatus: (transactionId, status, data) => {
        set((state) => ({
          transactions: state.transactions.map((transaction) =>
            transaction.id === transactionId
              ? {
                  ...transaction,
                  status,
                  ...data,
                  updatedAt: new Date().toISOString(),
                }
              : transaction,
          ),
        }));
      },

      getTransactionsByOrder: (orderId) => {
        return get().transactions.filter((t) => t.orderId === orderId);
      },

      getDefaultCard: () => {
        return get().savedCards.find((card) => card.isDefault);
      },

      getDefaultBankAccount: () => {
        return get().savedBankAccounts.find((account) => account.isDefault);
      },

      calculateFees: (amount, method) => {
        const gateway = get().availableGateways.find((g) => g.type === method);
        if (!gateway) return 0;

        const percentageFee = (amount * gateway.fees.percentage) / 100;
        return percentageFee + gateway.fees.fixed;
      },
    }),
    {
      name: "rawasy-payments",
      partialize: (state) => ({
        savedCards: state.savedCards,
        savedBankAccounts: state.savedBankAccounts,
        transactions: state.transactions,
      }),
    },
  ),
);
