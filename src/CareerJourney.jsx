import React from 'react';
import { motion } from 'framer-motion';

const ModernCard = React.memo(({ children, className = '' }) => {
  return (
    <div className={`
      relative overflow-hidden rounded-2xl backdrop-blur-xl border border-white/10 
      bg-gradient-to-br from-white/5 to-white/10 shadow-2xl
      ${className}
    `}> 
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-600/5"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
});

const CareerJourney = ({ t }) => {
  const careerData = [
    {
      year: '2021',
      title: t.career1Title,
      company: t.career1Company,
      description: t.career1Desc,
      icon: '🚀'
    },
    {
      year: '2022',
      title: t.career2Title,
      company: t.career2Company,
      description: t.career2Desc,
      icon: '🏆'
    },
    {
      year: '2023',
      title: t.career3Title,
      company: t.career3Company,
      description: t.career3Desc,
      icon: '💼'
    },
    {
      year: '2024',
      title: t.career4Title,
      company: t.career4Company,
      description: t.career4Desc,
      icon: '🌐'
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = (isLeft) => ({
    hidden: { opacity: 0, x: isLeft ? -100 : 100 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 50 } },
  });

  return (
    <section id="career" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {t.careerTitle}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t.careerSubtitle}
          </p>
        </motion.div>

        <div className="relative">
          {/* Garis tengah linimasa */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-violet-500/50 to-transparent"></div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-16"
          >
            {careerData.map((item, index) => (
              <motion.div key={index} variants={itemVariants(index % 2 === 0)} className="relative flex items-center">
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left ml-auto'}`}>
                  <ModernCard className="p-6">
                    <p className="text-sm font-mono text-violet-400 mb-2">{item.year}</p>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{item.company}</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                  </ModernCard>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-800 border-2 border-violet-500 rounded-full flex items-center justify-center text-lg">
                  {item.icon}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CareerJourney;