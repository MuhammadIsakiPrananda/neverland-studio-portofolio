import React from 'react';
import PageLayout from './PageLayout';

const TermsOfServicePage = () => {
  return (
    <PageLayout title="Terms of Service">
      <div className="space-y-6 text-gray-300 leading-relaxed">
        <p><strong>Last updated: [Tanggal Hari Ini]</strong></p>

        <p>
          Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Neverland Studio website (the "Service") operated by Neverland Studio ("us", "we", or "our").
        </p>

        <h3 className="text-xl font-semibold text-teal-400 pt-4">1. Acceptance of Terms</h3>
        <p>
          By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
        </p>

        <h3 className="text-xl font-semibold text-teal-400 pt-4">2. Intellectual Property</h3>
        <p>
          The Service and its original content, features, and functionality are and will remain the exclusive property of Neverland Studio and its licensors. The Service is protected by copyright, trademark, and other laws of both Indonesia and foreign countries.
        </p>

        <h3 className="text-xl font-semibold text-teal-400 pt-4">3. Limitation Of Liability</h3>
        <p>
          In no event shall Neverland Studio, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
        </p>

        <h3 className="text-xl font-semibold text-teal-400 pt-4">4. Contact Us</h3>
        <p>
          If you have any questions about these Terms, please contact us at arlianto032@gmail.com.
        </p>

        <p className="italic text-gray-500">
          [This is a template. You should consult with a legal professional to create terms of service that are suitable for your business.]
        </p>
      </div>
    </PageLayout>
  );
};

export default TermsOfServicePage;