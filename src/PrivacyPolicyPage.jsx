import React from 'react';
import PageLayout from './PageLayout';

const PrivacyPolicyPage = () => {
  return (
    <PageLayout title="Privacy Policy">
      <div className="space-y-6 text-gray-300 leading-relaxed">
        <p><strong>Last updated: [Tanggal Hari Ini]</strong></p>
        
        <p>
          Neverland Studio ("us", "we", or "our") operates the Neverland Studio website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
        </p>

        <h3 className="text-xl font-semibold text-teal-400 pt-4">1. Information Collection and Use</h3>
        <p>
          We collect several different types of information for various purposes to provide and improve our Service to you. This may include, but is not limited to, your name, email address, and usage data collected via our contact forms and analytics tools.
        </p>

        <h3 className="text-xl font-semibold text-teal-400 pt-4">2. Use of Data</h3>
        <p>
          Neverland Studio uses the collected data for various purposes: to provide and maintain the Service, to notify you about changes to our Service, to provide customer care and support, and to gather analysis or valuable information so that we can improve the Service.
        </p>

        <h3 className="text-xl font-semibold text-teal-400 pt-4">3. Security of Data</h3>
        <p>
          The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
        </p>

        <h3 className="text-xl font-semibold text-teal-400 pt-4">4. Contact Us</h3>
        <p>
          If you have any questions about this Privacy Policy, please contact us by email: arlianto032@gmail.com.
        </p>

        {/* Placeholder content */}
        <p className="italic text-gray-500">
          [This is a template. You should consult with a legal professional to create a privacy policy that is compliant with regulations applicable to your business.]
        </p>
      </div>
    </PageLayout>
  );
};

export default PrivacyPolicyPage;