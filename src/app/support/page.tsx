'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { MessageCircle, Mail, Phone, Globe, ChevronDown, Search, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How do I get my game voucher after purchase?',
    answer: 'After a successful purchase, your game voucher will be instantly delivered to your registered email address and will also be available in your account dashboard.',
    category: 'Purchases',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept various payment methods including M-Pesa, USSD, mobile banking, credit/debit cards, and other local payment options specific to your region.',
    category: 'Payments',
  },
  {
    question: 'How does the rewards program work?',
    answer: 'You earn points for every purchase made on our platform. These points can be used for discounts on future purchases or redeemed for exclusive gaming rewards.',
    category: 'Rewards',
  },
  {
    question: "What should I do if I haven't received my purchase?",
    answer: "First, check your email spam folder. If you still haven't received your purchase, contact our 24/7 support team through the chat or email us with your order number.",
    category: 'Support',
  },
  {
    question: 'Are my payment details secure?',
    answer: 'Yes, we use industry-standard encryption and security measures to protect your payment information. We are PCI DSS compliant and never store your card details.',
    category: 'Security',
  },
  {
    question: 'Can I get a refund?',
    answer: 'Refund policies vary by product. Generally, unused game vouchers can be refunded within 24 hours of purchase. Contact our support team for specific cases.',
    category: 'Refunds',
  },
];

const contactMethods = [
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: '24/7 instant support',
    action: 'Chat Now',
    color: 'text-energy-orange',
    bgColor: 'bg-energy-orange/10',
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Response within 24 hours',
    action: 'Send Email',
    color: 'text-trust-blue',
    bgColor: 'bg-trust-blue/10',
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Available 9AM - 5PM',
    action: 'Call Us',
    color: 'text-victory-gold',
    bgColor: 'bg-victory-gold/10',
  },
  {
    icon: Globe,
    title: 'Help Center',
    description: 'Browse all topics',
    action: 'Visit Help Center',
    color: 'text-growth-green',
    bgColor: 'bg-growth-green/10',
  },
];

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-digital-black">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-cloud-white mb-4">
            Need <span className="text-energy-orange">Help?</span>
          </h1>
          <p className="text-lg text-cloud-white/80">
            We&apos;re here to assist you with any questions or concerns
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="glass-effect rounded-2xl p-4">
            <div className="relative">
              <Search className="absolute left-4 top-3 text-cloud-white/50" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2 bg-digital-black/50 border border-gray-600 rounded-lg text-cloud-white focus:ring-2 focus:ring-energy-orange focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method) => (
            <div
              key={method.title}
              className="glass-effect p-6 rounded-2xl hover:scale-105 transition-transform"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${method.bgColor}`}>
                  <method.icon className={`w-6 h-6 ${method.color}`} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-cloud-white">{method.title}</h3>
                  <p className="text-sm text-cloud-white/60">{method.description}</p>
                </div>
              </div>
              <button
                className={`w-full py-2 px-4 rounded-lg border border-gray-600 text-cloud-white hover:bg-digital-black/30 transition-colors`}
              >
                {method.action}
              </button>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-cloud-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="glass-effect rounded-2xl overflow-hidden"
              >
                <button
                  className="w-full p-6 text-left flex items-center justify-between"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <div className="flex items-center">
                    <HelpCircle className="w-5 h-5 text-energy-orange mr-3" />
                    <span className="text-cloud-white font-semibold">{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-cloud-white/60 transition-transform ${
                      expandedFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-cloud-white/80 ml-8">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="text-center mt-16">
          <p className="text-cloud-white/80">
            Still need help? Contact our support team directly at{' '}
            <a href="mailto:support@1moregame.com" className="text-energy-orange hover:text-energy-orange-hover">
              support@1moregame.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
} 