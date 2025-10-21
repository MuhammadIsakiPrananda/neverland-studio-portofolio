import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Impor komponen latar belakang dari App.jsx
// Anda mungkin perlu mengekspornya dari App.jsx atau memindahkannya ke file terpisah
// Untuk saat ini, kita asumsikan mereka bisa diimpor atau didefinisikan di sini.

// Placeholder untuk komponen background, idealnya ini diimpor dari file bersama
const ParticleBackground = () => <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-slate-950 to-slate-900"></div>;
const GlassElements = () => <></>;

const PageLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-white">
      <ParticleBackground />
      <GlassElements />
      
      <header className="py-6 text-center">
        <Link to="/" className="text-2xl font-bold hover:text-teal-400 transition-colors">
          Neverland Studio
        </Link>
      </header>

      <main className="container mx-auto px-6 py-12 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
        >
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">{title}</h1>
          {children}
          <div className="mt-12 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PageLayout;