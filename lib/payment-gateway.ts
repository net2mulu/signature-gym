import { type PaymentMethod, PaymentStatus } from "@/types"

// Simulated payment gateway
export class PaymentGateway {
  // Simulate processing a payment
  static async processPayment(
    amount: number,
    method: PaymentMethod,
    cardDetails?: {
      cardNumber: string
      expiryDate: string
      cvv: string
      cardholderName: string
    },
    mobileDetails?: {
      phoneNumber: string
      provider: string
    },
  ) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate success/failure (90% success rate)
    const isSuccessful = Math.random() < 0.9

    if (isSuccessful) {
      return {
        success: true,
        status: PaymentStatus.COMPLETED,
        transactionId: `txn_${Math.random().toString(36).substring(2, 10)}`,
        message: "Payment processed successfully",
      }
    } else {
      return {
        success: false,
        status: PaymentStatus.FAILED,
        message: "Payment processing failed. Please try again.",
      }
    }
  }

  // Simulate refunding a payment
  static async refundPayment(transactionId: string, amount: number) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate success/failure (95% success rate)
    const isSuccessful = Math.random() < 0.95

    if (isSuccessful) {
      return {
        success: true,
        status: PaymentStatus.REFUNDED,
        refundId: `ref_${Math.random().toString(36).substring(2, 10)}`,
        message: "Refund processed successfully",
      }
    } else {
      return {
        success: false,
        message: "Refund processing failed. Please try again.",
      }
    }
  }
}
