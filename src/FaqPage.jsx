import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from './PageLayout';

const faqs = [
  {
    question: "Apa saja layanan yang ditawarkan oleh Neverland Studio?",
    answer: "Kami menawarkan berbagai layanan digital, termasuk pengembangan web (frontend & backend), desain UI/UX, integrasi AI & Machine Learning, pengembangan aplikasi mobile, dan konsultasi strategi digital."
  },
  {
    question: "Berapa lama waktu yang dibutuhkan untuk menyelesaikan sebuah proyek?",
    answer: "Waktu pengerjaan sangat bervariasi tergantung pada kompleksitas dan skala proyek. Proyek website sederhana bisa memakan waktu 2-4 minggu, sementara platform yang lebih kompleks dengan integrasi AI bisa memakan waktu beberapa bulan. Kami akan memberikan estimasi waktu yang lebih akurat setelah diskusi awal."
  },
  {
    question: "Bagaimana proses kerja di Neverland Studio?",
    answer: "Proses kami dimulai dengan fase penemuan (discovery) untuk memahami kebutuhan Anda, diikuti oleh desain UI/UX, pengembangan, pengujian, dan peluncuran. Kami menggunakan metodologi Agile untuk memastikan fleksibilitas dan kolaborasi yang erat dengan klien."
  },
  {
    question: "Apakah saya bisa melihat progres proyek saya?",
    answer: "Tentu saja. Kami menyediakan akses ke staging environment dan laporan progres rutin sehingga Anda dapat memantau perkembangan proyek Anda secara transparan."
  },
];

const FaqPage = () => {
  return (
    <PageLayout title="Frequently Asked Questions (FAQ)">
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-slate-900/50 border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-teal-400 mb-2">{faq.question}</h3>
            <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
};

export default FaqPage;