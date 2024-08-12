import { Separator } from "@/components/ui/separator"

export default function Policies() {
  return (
    <div className="space-y-12">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="prose max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
            <h2 className="text-3xl md:text-2xl font-bold my-6">Introduction</h2>
            <p>
              Welcome to Acme Tees, an e-commerce website for buying high-quality t-shirts. These terms of service
              outline the rules and regulations that govern your use of our website and services.
            </p>
            <h2 className="text-3xl md:text-2xl font-bold my-6">Shipping and Delivery</h2>
            <p>
              We offer standard shipping within the continental United States. Orders typically ship within 2-3 business
              days and arrive within 5-7 business days. Expedited shipping options are available for an additional fee.
            </p>
            <h2 className="text-3xl md:text-2xl font-bold my-6">Returns and Refunds</h2>
            <p>
              We accept returns within 30 days of delivery for a full refund. Items must be unworn, unwashed, and in
              their original condition. Shipping costs are non-refundable.
            </p>
            <h2 className="text-3xl md:text-2xl font-bold my-6">Customer Support</h2>
            <p>
              If you have any questions or concerns, please don't hesitate to contact our customer support team at
              support@acmetees.com or 1-888-888-8888. We're here to help!
            </p>
          </div>
        </div>
        <Separator />
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="prose max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
            <h2 className="text-3xl md:text-2xl font-bold my-6">Information We Collect</h2>
            <p>
              We collect certain personal information from you when you visit our website, such as your name, email
              address, and shipping address. We also collect information about your browsing and purchasing behavior to
              improve our services and provide you with a better experience.
            </p>
            <h2 className="text-3xl md:text-2xl font-bold my-6">How We Use Your Information</h2>
            <p>
              We use your personal information to process your orders, communicate with you about your account and
              orders, and improve our website and services. We may also use your information for marketing purposes,
              such as sending you promotional emails or tailoring our ads to your interests.
            </p>
            <h2 className="text-3xl md:text-2xl font-bold my-6">Sharing Your Information</h2>
            <p>
              We may share your personal information with third-party service providers who help us with our business
              operations, such as fulfillment and shipping. We do not sell or rent your personal information to any
              third parties.
            </p>
            <h2 className="text-3xl md:text-2xl font-bold my-6">Security and Data Retention</h2>
            <p>
              We take reasonable measures to protect your personal information from unauthorized access or disclosure.
              We retain your information for as long as necessary to fulfill the purposes for which it was collected, or
              as required by law.
            </p>
            <h2 className="text-3xl md:text-2xl font-bold my-6">Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. You can also opt-out of
              receiving marketing communications from us. If you have any questions or concerns about our privacy
              practices, please contact us at privacy@acmetees.com.
            </p>
          </div>
        </div>
        <Separator />
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="prose max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Shipping and Returns</h1>
            <h2 className="text-3xl md:text-2xl font-bold my-6">Shipping</h2>
            <p>
              We offer standard shipping within the continental United States. Orders typically ship within 2-3 business
              days and arrive within 5-7 business days. Expedited shipping options are available for an additional fee.
            </p>
            <p>
              We use reputable shipping carriers such as USPS, FedEx, and UPS to ensure your order arrives safely and on
              time. You can track the status of your order using the tracking number provided in your shipping
              confirmation email.
            </p>
            <h2 className="text-3xl md:text-2xl font-bold my-6">Returns and Refunds</h2>
            <p>
              We accept returns within 30 days of delivery for a full refund. Items must be unworn, unwashed, and in
              their original condition. Shipping costs are non-refundable.
            </p>
            <p>
              To initiate a return, please contact our customer support team at support@acmetees.com or 1-888-888-8888.
              They will provide you with instructions on how to return your item(s) and receive your refund.
            </p>
            <p>Please note that custom-made or personalized items are not eligible for returns or refunds.</p>
          </div>
        </div>
    </div>
  )
}
