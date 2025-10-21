import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, useIsomorphicLayoutEffect, useScroll } from 'framer-motion';
import FaqPage from './FaqPage';
import PrivacyPolicyPage from './PrivacyPolicyPage';
import CareerJourney from './CareerJourney';
import TermsOfServicePage from './TermsOfServicePage';

// Enhanced Particle Background dengan efek glassmorphism
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 80;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(132, 204, 22, ${Math.random() * 0.4})`; // Lime color
        this.alpha = Math.random() * 0.5 + 0.2;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Enhanced connections dengan gradient
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, 'rgba(99, 102, 241, 0.1)'); // Indigo color
            gradient.addColorStop(1, 'rgba(139, 92, 246, 0.1)'); // Violet color
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.3;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

// Glass Morphism Elements
const GlassElements = React.memo(() => {
  return (
    <>
      <div className="fixed top-20 left-10 w-72 h-72 bg-gradient-to-br from-indigo-500/10 to-violet-600/10 rounded-full blur-3xl animate-float-slow"></div>
      <div className="fixed top-40 right-20 w-96 h-96 bg-gradient-to-br from-violet-400/10 to-indigo-500/10 rounded-full blur-3xl animate-float-medium"></div>
      <div className="fixed bottom-40 left-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 rounded-full blur-3xl animate-float-fast"></div>
      <div className="fixed bottom-20 right-1/3 w-64 h-64 bg-gradient-to-br from-violet-500/10 to-indigo-700/10 rounded-full blur-3xl animate-float-slow"></div>
    </>
  );
});

// Modern Animated Counter
const AnimatedCounter = ({ end, duration = 2000, prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{prefix}{count}</span>;
};

// Modern Typewriter dengan cursor
const Typewriter = ({ text, delay = 120, deleteDelay = 50, pauseDelay = 2000, className = '' }) => {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;

    if (isDeleting) {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(prev => prev.slice(0, -1));
        }, deleteDelay);
      } else {
        setIsDeleting(false);
      }
    } else {
      if (currentText.length < text.length) {
        timeout = setTimeout(() => {
          setCurrentText(prev => text.slice(0, prev.length + 1));
        }, delay);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDelay);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, text, delay, deleteDelay, pauseDelay]);

  return (
    <span className={`inline-block ${className}`}>
      {currentText}
      <span 
        className={` 
          inline-block w-2 h-12 md:h-16 bg-lime-400 ml-2 rounded-full
          transition-opacity duration-300
          animate-pulse
        `}
      ></span>
    </span>
  );
};

const AnimatedSubtitle = ({ texts }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % texts.length);
    }, 5000); // Ganti teks setiap 5 detik

    return () => clearInterval(interval);
  }, [texts.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
    exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };

  const wordVariants = {
    hidden: { opacity: 0, filter: 'blur(8px)', y: 20 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, filter: 'blur(8px)', y: -20, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="text-lg md:text-xl text-gray-300 mb-12 max-w-xl leading-relaxed h-20 font-mono">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {texts[index].split(' ').map((word, i) => (
            <motion.span key={i} variants={wordVariants} className="inline-block mr-2">
              {word}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Modern Card Component
const ModernCard = React.memo(({ children, className = '', hoverable = true }) => {
  return (
    <div className={`
      relative overflow-hidden rounded-2xl backdrop-blur-xl border border-white/10 
      bg-gradient-to-br from-white/5 to-white/10 shadow-2xl
      ${hoverable ? 'transform transition-all duration-500 hover:scale-105 hover:shadow-3xl' : ''}
      ${className}
    `}> 
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-600/5"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
});

// Custom Hook untuk reCAPTCHA v3
const useRecaptchaV3 = (siteKey) => {
  useIsomorphicLayoutEffect(() => {
    const scriptId = 'recaptcha-v3-script';
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [siteKey]);

  const getToken = async (action) => {
    return new Promise((resolve, reject) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(siteKey, { action }).then(token => {
          resolve(token);
        }).catch(err => {
          reject(err);
        });
      });
    });
  };

  return { getToken };
};

// Modern Authentication Modal
const AuthModal = ({ isOpen, onClose, t }) => {
  const [authMode, setAuthMode] = useState('login');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getToken } = useRecaptchaV3(import.meta.env.VITE_RECAPTCHA_SITE_KEY);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const email = e.target.email?.value;
    const password = e.target.password?.value;

    if (authMode === 'login' || authMode === 'signup') {
      if (!email || !password) {
        setError(t.errorAllFields);
        setIsSubmitting(false);
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError(t.errorInvalidEmail);
        setIsSubmitting(false);
        return;
      }
    }

    if (authMode === 'signup') {
      const name = e.target.name?.value;
      const confirmPassword = e.target.confirmPassword?.value;
      if (!name || !confirmPassword) {
        setError(t.errorAllFields);
        setIsSubmitting(false);
        return;
      }
      if (password.length < 8) {
        setError(t.errorPasswordLength);
        setIsSubmitting(false);
        return;
      }
      if (password !== confirmPassword) {
        setError(t.errorPasswordMatch);
        setIsSubmitting(false);
        return;
      }
    }

    // Hanya jalankan reCAPTCHA untuk login dan signup
    if (authMode === 'login' || authMode === 'signup') {
      try {
        const token = await getToken(authMode);
        console.log(`reCAPTCHA v3 Token (${authMode}):`, token);
        // Di sini Anda akan mengirim token bersama data formulir ke backend untuk verifikasi
      } catch (recaptchaError) {
        setError('Gagal memverifikasi reCAPTCHA. Silakan coba lagi.');
        setIsSubmitting(false);
        return;
      }
    }

    // Simulasi berhasil untuk semua mode
    console.log(`Formulir ${authMode} disubmit.`);
    setTimeout(() => {
      onClose();
      setIsSubmitting(false);
    }, 500);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 15, stiffness: 200 } },
    exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.2 } }
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const AuthForm = ({ mode }) => (
    <motion.div
      key={mode}
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <motion.form
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {mode === 'signup' && (
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl blur opacity-0 group-focus-within:opacity-75 transition duration-500"></div>
            <span className="absolute left-4 top-3.5 text-gray-400">👤</span>
            <input name="name" type="text" placeholder={t.name} className="relative w-full bg-slate-900/80 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none transition-all duration-300" required />
          </motion.div>
        )}
        <motion.div variants={itemVariants} className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl blur opacity-0 group-focus-within:opacity-75 transition duration-500"></div>
          <span className="absolute left-4 top-3.5 text-gray-400">✉️</span>
          <input name="email" type="email" placeholder={t.email} className="relative w-full bg-slate-900/80 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none transition-all duration-300" required />
        </motion.div>
        {mode !== 'forgot' && (
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl blur opacity-0 group-focus-within:opacity-75 transition duration-500"></div>
            <span className="absolute left-4 top-3.5 text-gray-400">🔒</span>
            <input name="password" type="password" placeholder={t.password} className="relative w-full bg-slate-900/80 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none transition-all duration-300" required />
          </motion.div>
        )}
        {mode === 'signup' && (
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl blur opacity-0 group-focus-within:opacity-75 transition duration-500"></div>
            <span className="absolute left-4 top-3.5 text-gray-400">🔒</span>
            <input name="confirmPassword" type="password" placeholder={t.confirmPassword} className="relative w-full bg-slate-900/80 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none transition-all duration-300" required />
          </motion.div>
        )}
        {mode === 'login' && (
          <motion.div variants={itemVariants} className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2"><input type="checkbox" className="rounded bg-white/5 border-white/10" /><span className="text-gray-300">{t.rememberMe}</span></label>
            <button type="button" onClick={() => setAuthMode('forgot')} className="text-violet-400 hover:text-violet-300 transition-colors duration-300">{t.forgotPassword}</button>
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm text-center bg-red-500/10 p-3 rounded-lg border border-red-500/20"
          >
            {error}
          </motion.div>
        )}
        {(mode === 'login' || mode === 'signup') && (
          <motion.div variants={itemVariants} className="text-center text-gray-500 text-xs mb-6">
            This site is protected by reCAPTCHA and the Google 
            <a href="https://policies.google.com/privacy" className="text-violet-500 hover:underline"> Privacy Policy</a> and 
            <a href="https://policies.google.com/terms" className="text-violet-500 hover:underline"> Terms of Service</a> apply.
          </motion.div>
        )}
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit" 
          className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 transition-all"
          disabled={isSubmitting}
        >
          {mode === 'login' ? t.login : mode === 'signup' ? t.signup : t.reset}
        </motion.button>
      </motion.form>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            layout
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <ModernCard className="p-8 overflow-hidden" hoverable={false}>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {authMode === 'login' ? t.loginTitle : authMode === 'signup' ? t.signupTitle : t.forgotTitle}
                </h3>
                <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/10 transition-all duration-300">
                  <span className="text-xl">✕</span>
                </button>
              </div>

              <AnimatePresence mode="wait">
                <AuthForm mode={authMode} />
              </AnimatePresence>

              {authMode !== 'forgot' && (
                <>
                  <div className="relative flex items-center my-6">
                    <div className="flex-grow border-t border-white/10"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase">Or</span>
                    <div className="flex-grow border-t border-white/10"></div>
                  </div>

                  <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 gap-4">
                    <motion.button variants={itemVariants} className="w-full flex items-center justify-center space-x-3 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><title>Google</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.96-4.82 1.96-5.66 0-10.26-4.6-10.26-10.26s4.6-10.26 10.26-10.26c3.2 0 5.22 1.22 6.82 2.72l-2.72 2.72c-1.2-1.14-2.8-1.96-4.1-1.96-3.32 0-6.02 2.7-6.02 6.02s2.7 6.02 6.02 6.02c3.46 0 5.44-2.34 5.66-4.14H12.48z" fill="currentColor"/></svg>
                      <span>Google</span>
                    </motion.button>
                    <motion.button variants={itemVariants} className="w-full flex items-center justify-center space-x-3 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor"/></svg>
                      <span>GitHub</span>
                    </motion.button>
                    <motion.button variants={itemVariants} className="w-full flex items-center justify-center space-x-3 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><title>Facebook</title><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor"/></svg>
                      <span>Facebook</span>
                    </motion.button>
                    <motion.button variants={itemVariants} className="w-full flex items-center justify-center space-x-3 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.936 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.277.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319.936 20.651.524 19.86.218 19.095-.083 18.225-.285 16.947-.344 15.667-.402 15.26-.417 12-.417zm0 2.163c3.203 0 3.585.012 4.85.07 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.012 3.585-.07 4.85c-.055 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.585-.012-4.85-.07c-1.17-.055-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.012-3.585.07-4.85c.055-1.17.249-1.805.413-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679-1.381-.896.422-.164 1.057-.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zm0 4.865a4.972 4.972 0 100 9.944 4.972 4.972 0 000-9.944zM12 19.77a2.807 2.807 0 110-5.614 2.807 2.807 0 010 5.614zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" fill="currentColor"/></svg>
                      <span>Instagram</span>
                    </motion.button>
                  </motion.div>
                </>
              )}

              <div className="mt-6 text-center text-sm">
                {authMode === 'login' ? (
                  <p className="text-gray-400">{t.noAccount} <button onClick={() => setAuthMode('signup')} className="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-300">{t.signup}</button></p>
                ) : authMode === 'signup' ? (
                  <p className="text-gray-400">{t.haveAccount} <button onClick={() => setAuthMode('login')} className="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-300">{t.login}</button></p>
                ) : (
                  <button onClick={() => setAuthMode('login')} className="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-300">{t.backToLogin}</button>
                )}
              </div>
            </ModernCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Komponen ProjectCard baru dengan efek 3D tilt
const ProjectCard = ({ project, t }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [25, -25]);
  const rotateY = useTransform(x, [-150, 150], [-25, 25]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ transformStyle: 'preserve-3d' }}
      rotateX={rotateX}
      rotateY={rotateY}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group"
    >
      <ModernCard className="p-0 overflow-hidden h-full flex flex-col" hoverable={false}>
        <div className="relative overflow-hidden" style={{ transform: 'translateZ(40px)' }}>
          <img src={project.image} alt={project.title} className="w-full h-56 object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-3 py-1 text-xs rounded-full bg-white/10 backdrop-blur-lg text-white border border-white/20">{tag}</span>
            ))}
          </div>
        </div>
        <div className="p-6 flex-grow flex flex-col" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent">{project.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">{project.description}</p>
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
            <span className="text-sm font-mono text-gray-500">{project.year}</span>
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex items-center space-x-2 text-violet-400 hover:text-violet-300 transition-colors duration-300 font-medium text-sm"
            >
              <span>{t.viewProject}</span>
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
            </motion.button>
          </div>
        </div>
      </ModernCard>
    </motion.div>
  );
};

const TeamMemberCard = React.memo(({ member, t }) => {
  const divisionStyles = {
    'Ketua Tim': 'text-violet-400 font-semibold',
    'Wakil Ketua Tim': 'text-gray-300',
    'Anggota': 'text-gray-400',
  };
  
  return (
    <ModernCard className="p-8 flex flex-col items-center text-center group">
      <div className="relative w-full flex justify-center mb-6">
        <img src={member.image} alt={member.name} className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-slate-800 group-hover:border-violet-500/50 transition-all duration-300" loading="lazy" />
      </div>
      <div>
        <h3 className="text-2xl font-bold">{member.name}</h3>
        <p className={`text-sm font-mono my-1 ${divisionStyles[member.division] || 'text-gray-500'}`}>{member.division}</p>
        <p className="text-lime-400 text-base mb-2">{member.role}</p>
        <p className="text-sm text-gray-500 font-mono mb-4">{member.class}</p>
      </div>
      <p className="text-gray-400 text-sm mb-6 flex-grow">{member.bio}</p>
      <div className="flex justify-center space-x-6">
        {Object.entries(member.social).map(([platform, url]) => (
          <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-125">
            {platform === 'github' && <svg role="img" viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>}
            {platform === 'linkedin' && <svg role="img" viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>}
            {platform === 'instagram' && <svg role="img" viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.936 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.277.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319.936 20.651.524 19.86.218 19.095-.083 18.225-.285 16.947-.344 15.667-.402 15.26-.417 12-.417zm0 2.163c3.203 0 3.585.012 4.85.07 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.012 3.585-.07 4.85c-.055 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381-.896-.422-.164-1.057.36-2.227.413 1.266-.057-1.646.07-4.85.07s-3.585-.012-4.85-.07c-1.17-.055-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.012-3.585.07-4.85c.055-1.17.249-1.805.413-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679-1.381-.896.422-.164 1.057-.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zm0 4.865a4.972 4.972 0 100 9.944 4.972 4.972 0 000-9.944zM12 19.77a2.807 2.807 0 110-5.614 2.807 2.807 0 010 5.614zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>}
          </a>
        ))}
      </div>
    </ModernCard>
  );
});

// Komponen SkillCard baru yang lebih modern dan interaktif
const SkillCard = React.memo(({ skill }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    cardRef.current.style.setProperty('--mouse-xp', `${x / rect.width}`);
    cardRef.current.style.setProperty('--mouse-yp', `${y / rect.height}`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
      }}
      className="group relative rounded-3xl border border-white/10 bg-slate-900/50 p-8 overflow-hidden flex flex-col items-center text-center"
    >
      <div 
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(132, 204, 22, 0.15), transparent 80%)`,
        }}
      />
      <motion.div 
        className="text-6xl mb-6 transition-transform duration-300 group-hover:scale-110"
        style={{
          transform: 'translateZ(50px)',
          textShadow: '0 5px 15px rgba(0,0,0,0.3)'
        }}
      >
        {skill.icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-2" style={{ transform: 'translateZ(30px)' }}>{skill.name}</h3>
      <p className="text-gray-400 text-sm leading-relaxed" style={{ transform: 'translateZ(20px)' }}>{skill.description}</p>
    </motion.div>
  );
});

const InfoCard = ({ icon, title, content, href, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <ModernCard className="p-6 h-full" hoverable={true}>
      <div className="flex items-center space-x-4 mb-4">
        <div className="text-3xl">{icon}</div>
        <h4 className="text-lg font-bold">{title}</h4>
      </div>
      {content && (
        <a href={href} className="text-cyan-400 hover:text-cyan-300 break-all transition-colors">
          {content}
        </a>
      )}
      {children}
    </ModernCard>
  </motion.div>
);

// Data statis dipindahkan ke luar komponen
const translations = {
  id: {
    home: 'Beranda',
    about: 'Tentang',
    team: 'Tim',
    more: 'Lainnya',
    career: 'Karir',
    certificates: 'Sertifikat',
    skills: 'Keahlian',
    projects: 'Proyek',
    contact: 'Kontak',
    login: 'Masuk',
    language: 'ID',
    heroTitle: 'Neverland Studio',
    heroSubtitles: [
      'Memadukan kreativitas, desain modern, dan rekayasa AI.',
      'Membangun solusi digital yang berdampak dan menginspirasi.',
      'Dari ide menjadi realitas digital yang luar biasa.'
    ],
    aboutTitle: 'Tentang Kami',
    aboutText: 'Kami adalah studio pengembangan digital yang menggabungkan kreativitas dengan teknologi mutakhir untuk menciptakan pengalaman digital yang luar biasa. Dengan fokus pada AI dan desain modern, kami memberikan solusi inovatif yang mengubah cara bisnis beroperasi di era digital.',
    teamTitle: 'Tim Profesional',
    certificatesTitle: 'Sertifikasi & Penghargaan',
    skillsTitle: 'Spesialisasi Teknis',
    projectsTitle: 'Proyek Unggulan',
    contactTitle: 'Mulai Proyek Anda',
    name: 'Nama Lengkap',
    email: 'Alamat Email',
    message: 'Pesan Anda',
    send: 'Kirim Pesan',
    footerText: '© 2024 Neverland Studio. All rights reserved.',
    loginTitle: 'Akses Dashboard',
    signupTitle: 'Buat Akun Baru',
    forgotTitle: 'Reset Kata Sandi',
    password: 'Kata Sandi',
    confirmPassword: 'Konfirmasi Kata Sandi',
    rememberMe: 'Ingat Saya',
    forgotPassword: 'Lupa Kata Sandi?',
    noAccount: 'Belum punya akun?',
    haveAccount: 'Sudah punya akun?',
    signup: 'Daftar Sekarang',
    reset: 'Reset Password',
    backToLogin: 'Kembali ke Login',
    viewProject: 'Lihat Detail',
    statsTitle: 'Dalam Angka',
    getStarted: 'Mulai Sekarang',
    learnMore: 'Pelajari Lebih',
    viewAll: 'Lihat Semua',
    completed: 'Selesai',
    inProgress: 'Dalam Proses',
    showMore: 'Lihat Lebih Banyak',
    showLess: 'Tampilkan Lebih Sedikit',
    errorAllFields: 'Harap isi semua kolom yang diperlukan.',
    errorInvalidEmail: 'Format email tidak valid.'
    ,
    errorPasswordLength: 'Kata sandi harus minimal 8 karakter.',
    errorPasswordMatch: 'Konfirmasi kata sandi tidak cocok.',
    location: 'Lokasi',
    careerTitle: 'Perjalanan Karir',
    careerSubtitle: 'Jejak langkah, pembelajaran, dan pencapaian yang membentuk keahlian saya hingga hari ini.',
    career1Title: 'Awal Mula Coding',
    career1Company: 'Pembelajaran Mandiri',
    career1Desc: 'Memulai perjalanan di dunia pemrograman dengan mempelajari dasar-dasar HTML, CSS, dan JavaScript. Membangun proyek-proyek kecil untuk mengasah logika dan pemahaman.',
    career2Title: 'Juara LKS Web Technologies',
    career2Company: 'Tingkat Kota Malang',
    career2Desc: 'Meraih Juara 1 dalam Lomba Kompetensi Siswa bidang Web Technologies, membuktikan kemampuan dalam pengembangan web frontend dan backend yang kompetitif.',
    career3Title: 'Pengembangan Proyek Freelance',
    career3Company: 'Klien Lokal & Internasional',
    career3Desc: 'Mengerjakan berbagai proyek sebagai freelancer, mulai dari website profil perusahaan hingga aplikasi web kompleks, mengasah kemampuan manajemen proyek dan komunikasi klien.',
    career4Title: 'Spesialisasi AI & Full Stack',
    career4Company: 'Neverland Studio',
    career4Desc: 'Mendirikan Neverland Studio dengan fokus pada integrasi AI dalam solusi web modern. Memimpin pengembangan produk inovatif dari konsep hingga peluncuran.'
  },
  en: {
    home: 'Home',
    about: 'About',
    team: 'Team',
    career: 'Career',
    more: 'More',
    certificates: 'Certificates',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
    login: 'Login',
    language: 'EN',
    heroTitle: 'Neverland Studio',
    heroSubtitles: [
      'Blending creativity, modern design, and AI engineering.',
      'Building impactful and inspiring digital solutions.',
      'From idea to extraordinary digital reality.'
    ],
    aboutTitle: 'About Us',
    aboutText: 'We are a digital development studio that combines creativity with cutting-edge technology to create extraordinary digital experiences. Focusing on AI and modern design, we deliver innovative solutions that transform how businesses operate in the digital era.',
    teamTitle: 'Professional Team',
    certificatesTitle: 'Certifications & Awards',
    skillsTitle: 'Technical Specialization',
    projectsTitle: 'Featured Projects',
    contactTitle: 'Start Your Project',
    name: 'Full Name',
    email: 'Email Address',
    message: 'Your Message',
    send: 'Send Message',
    footerText: '© 2024 Neverland Studio. All rights reserved.',
    loginTitle: 'Access Dashboard',
    signupTitle: 'Create New Account',
    forgotTitle: 'Reset Password',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    rememberMe: 'Remember Me',
    forgotPassword: 'Forgot Password?',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    signup: 'Sign Up Now',
    reset: 'Reset Password',
    backToLogin: 'Back to Login',
    viewProject: 'View Details',
    statsTitle: 'By The Numbers',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    viewAll: 'View All',
    completed: 'Completed',
    inProgress: 'In Progress',
    showMore: 'Show More',
    showLess: 'Show Less',
    errorAllFields: 'Please fill in all required fields.',
    errorInvalidEmail: 'Invalid email format.'
    ,
    errorPasswordLength: 'Password must be at least 8 characters.'
    ,
    errorPasswordMatch: 'Password confirmation does not match.'
    ,
    location: 'Location',
    careerTitle: 'Career Journey',
    careerSubtitle: 'The steps, learnings, and achievements that have shaped my expertise to this day.',
    career1Title: 'The Beginning of Coding',
    career1Company: 'Self-Taught Learning',
    career1Desc: 'Started the journey into the programming world by learning the basics of HTML, CSS, and JavaScript. Built small projects to sharpen logic and understanding.',
    career2Title: 'Winner of LKS Web Technologies',
    career2Company: 'Malang City Level',
    career2Desc: 'Achieved 1st place in the Student Competency Competition for Web Technologies, proving competitive skills in both frontend and backend web development.',
    career3Title: 'Freelance Project Development',
    career3Company: 'Local & International Clients',
    career3Desc: 'Worked on various projects as a freelancer, from company profile websites to complex web applications, honing project management and client communication skills.',
    career4Title: 'AI & Full Stack Specialization',
    career4Company: 'Neverland Studio',
    career4Desc: 'Founded Neverland Studio with a focus on integrating AI into modern web solutions. Leading the development of innovative products from concept to launch.'
  }
};

const stats = [
  { number: 50, label: 'Projects Completed', suffix: '+', icon: '🚀' },
  { number: 3, label: 'Years Experience', suffix: '+', icon: '💼' },
  { number: 100, label: 'Happy Clients', suffix: '+', icon: '😊' },
  { number: 24, label: 'Awards Won', suffix: '', icon: '🏆' }
];

const teamMembers = [
  {
    name: 'Muhammad Isaki Prananda',
    role: 'Full Stack Developer & AI Specialist',
    division: 'Ketua Tim',
    class: 'TKJ 2',
    image: '/Muhammad Isaki Prananda.jpeg',
    bio: 'Specialized in React, Node.js, and AI integration with 3+ years of experience in modern web development.',
    skills: ['React', 'Node.js', 'Python', 'AI/ML', 'Cloud'],
    social: {
      github: 'https://github.com/MuhammadIsakiPrananda/neverland-studio-portofolio',
      linkedin: 'https://www.linkedin.com/in/muhammad-isaki-prananda-454668240/',
      instagram: 'https://www.instagram.com/tuanmudazaky_/'
    }
  },
];

const skills = [
  { name: 'React.js & Next.js', icon: '⚛️', description: 'Membangun aplikasi web yang dinamis dan berkinerja tinggi.' },
  { name: 'AI & Machine Learning', icon: '🤖', description: 'Mengintegrasikan kecerdasan buatan ke dalam produk digital.' },
  { name: 'UI/UX Design', icon: '🎨', description: 'Merancang antarmuka pengguna yang intuitif dan indah.' },
  { name: 'Node.js & Backend', icon: '🚀', description: 'Mengembangkan aplikasi sisi server yang kuat dan skalabel.' },
  { name: 'Cloud & DevOps', icon: '☁️', description: 'Mengelola infrastruktur yang skalabel dan penerapan otomatis.' },
  { name: 'Database Management', icon: '🗃️', description: 'Merancang dan memelihara sistem data yang efisien.' },
  { name: 'Mobile Development', icon: '📱', description: 'Menciptakan pengalaman seluler lintas platform yang mulus.' },
  { name: 'Cyber Security', icon: '🛡️', description: 'Melindungi aset digital dengan langkah-langkah keamanan yang kuat.' },
  { name: 'Project Management', icon: '📊', description: 'Memastikan proyek dikirimkan secara efisien dan tepat waktu.' },
];

const projects = [
  {
    title: 'AI-Powered E-Commerce Platform',
    description: 'Next-generation e-commerce with personalized AI recommendations and real-time analytics',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    tags: ['React', 'Node.js', 'AI', 'MongoDB', 'Stripe'],
    status: 'Completed',
    year: '2023'
  },
  {
    title: 'Smart Learning Management System',
    description: 'Interactive learning platform with adaptive AI and real-time collaboration features',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    tags: ['Vue.js', 'Python', 'AI', 'Firebase', 'WebRTC'],
    status: 'In Progress',
    year: '2023'
  },
  {
    title: 'Enterprise Analytics Dashboard',
    description: 'Real-time business intelligence dashboard with predictive analytics and AI insights',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    tags: ['React', 'D3.js', 'AI', 'Express', 'PostgreSQL'],
    status: 'Completed',
    year: '2022'
  },
  {
    title: 'Mobile Banking App UI/UX',
    description: 'A complete redesign of a mobile banking application focusing on user experience and modern aesthetics.',
    image: 'https://images.unsplash.com/photo-1580674287405-80cd35825f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    tags: ['UI/UX', 'Figma', 'Mobile'],
    status: 'Completed',
    year: '2023'
  },
  {
    title: 'AI-driven Content Generator',
    description: 'A web application that uses generative AI to create marketing copy and blog posts.',
    image: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    tags: ['AI', 'React', 'Python', 'API'],
    status: 'Completed',
    year: '2023'
  },
  {
    title: 'Interactive 3D Product Visualizer',
    description: 'A web-based tool for customers to view and customize products in a 3D space.',
    image: 'https://images.unsplash.com/photo-1618060932014-4deda4932554?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    tags: ['React', 'Three.js', 'UI/UX'],
    status: 'In Progress',
    year: '2024'
  },
  {
    title: 'Corporate Website for Tech Startup',
    description: 'A sleek and modern corporate website built with Vue.js and a headless CMS.',
    image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    tags: ['Vue.js', 'Nuxt.js', 'UI/UX'],
    status: 'Completed',
    year: '2022'
  },
  {
    title: 'AI Chatbot for Customer Service',
    description: 'An intelligent chatbot integrated into existing platforms to automate customer support.',
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    tags: ['AI', 'Python', 'API', 'Node.js'],
    status: 'Completed',
    year: '2023'
  }
];

// Komponen Halaman Utama
const MainPage = () => {
  const [language, setLanguage] = useState('id');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const pillContainerRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [projectFilter, setProjectFilter] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [hoveredPill, setHoveredPill] = useState(null);
  const [activePill, setActivePill] = useState(null);

  // Refs dan motion values untuk efek 3D pada kartu hero
  const contactCardRef = useRef(null);
  const handleContactMouseMove = (e) => {
    if (!contactCardRef.current) return;
    const rect = contactCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    contactCardRef.current.style.setProperty('--mouse-x', `${x}px`);
    contactCardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };
  const isScrollingRef = useRef(false);

  // Ref dan motion values untuk efek paralaks pada gambar 'About'
  const aboutSectionRef = useRef(null);
  const { scrollYProgress: aboutScrollYProgress } = useScroll({
    target: aboutSectionRef,
    offset: ["start end", "end start"]
  });
  const aboutImageY = useTransform(aboutScrollYProgress, [0, 1], ["-20%", "20%"]);

  // Efek untuk mengunci scroll saat modal atau menu mobile terbuka
  useEffect(() => {
    const body = document.body;
    body.style.overflow = showLoginModal || isMenuOpen ? 'hidden' : 'auto';
    return () => { body.style.overflow = 'auto'; };
  }, [showLoginModal, isMenuOpen]);

  // Mouse follow effect untuk navbar
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!navRef.current) return;
      const rect = navRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      navRef.current.style.setProperty('--mouse-x', `${x}px`);
      navRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update active pill position
  useEffect(() => {
    if (!pillContainerRef.current) return;
    const activeItem = pillContainerRef.current.querySelector(`[data-section="${activeSection}"]`);
    if (activeItem) {
      setActivePill({
        left: activeItem.offsetLeft,
        width: activeItem.offsetWidth,
      });
    }
  }, [activeSection]);
  
  // Sinkronisasi Navbar dengan posisi scroll
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
      root: null,
      // Membuat "garis" pemicu di tengah layar secara vertikal.
      // Bagian yang melewati area ini akan dianggap aktif.
      // -40% dari atas, -60% dari bawah, menciptakan zona aktif di tengah viewport.
      rootMargin: '-40% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      if (isScrollingRef.current) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
      // Penanganan khusus untuk memastikan 'home' aktif saat di paling atas.
      if (window.scrollY < window.innerHeight * 0.6) {
        setActiveSection('home');
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(sec => observer.observe(sec));

    return () => sections.forEach(sec => observer.unobserve(sec));
  }, []);

  // Efek untuk menampilkan/menyembunyikan tombol scroll to top
  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScrollTop && window.pageYOffset > 400){
        setShowScrollTop(true);
      } else if (showScrollTop && window.pageYOffset <= 400){
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScrollTop]);


  // Pill hover effect
  const handlePillHover = (e) => { // ... (fungsi ini tidak berubah)
    setHoveredPill({
      left: e.currentTarget.offsetLeft,
      width: e.currentTarget.offsetWidth,
    });
  };

  const handlePillLeave = () => setHoveredPill(null);

  // Ikon untuk Navbar
  const sectionIcons = {
    home: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    about: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    more: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>,
    career: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    projects: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    team: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    skills: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    contact: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    login: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>,
  };

  const filteredProjects = useMemo(() => {
    if (projectFilter === 'All') {
      return projects;
    }
    return projects.filter(p => p.tags.includes(projectFilter));
  }, [projectFilter, projects]);

  const handleProjectToggle = useCallback(() => {
    setVisibleProjects(prev => 
      prev < filteredProjects.length ? filteredProjects.length : 3
    );
  }, [filteredProjects.length]);

  const primaryNavItems = ['home', 'about', 'projects', 'contact'];
  const moreNavItems = ['career', 'team', 'skills'];

  const t = translations[language];

  const scrollToSection = useCallback((sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    isScrollingRef.current = true;
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    // Reset flag setelah scroll selesai
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000); // Durasi timeout harus cukup untuk scroll selesai
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'id' ? 'en' : 'id');
  }, [language]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-white overflow-hidden">
      {/* Enhanced Background Elements */} 
      <ParticleBackground />
      <GlassElements />

      {/* Tombol Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center shadow-lg shadow-violet-500/30 z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modern Capsule Navbar */}
      <nav className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl z-50 transition-all duration-500 px-4 animate-fade-in-down">
        <div 
          ref={navRef}
          className={`
          group relative mx-auto mt-3 flex justify-between items-center rounded-full border border-white/10 shadow-2xl
          transition-all duration-500 bg-slate-900/70 backdrop-blur-xl px-5 py-2.5
        `}>
          {/* Mouse-following Spotlight Effect */}
          <div 
            className="pointer-events-none absolute -inset-px rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{ // Teal
              background: `radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(167, 139, 250, 0.1), transparent 80%)`,
            }}
          ></div>
          
          <div className="flex items-center space-x-2 z-10">
            <div className="w-8 h-8">
              <img src="/Logo Navbar .png" alt="Neverland Studio Logo" className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="flex flex-col items-center leading-none -mt-1">
              <div 
                className="text-2xl font-black bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent animate-gradient-x"
                style={{
                  textShadow: '0 0 5px rgba(255, 255, 255, 0.1), 0 0 15px rgba(20, 184, 166, 0.3), 0 0 25px rgba(6, 182, 212, 0.3)'
                }}
              >
                Neverland
              </div>
              <div className="text-[10px] text-gray-400 tracking-[0.3em] font-light uppercase -mr-1">Studio</div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-center flex-grow z-10">
            <div 
              ref={pillContainerRef}
              onMouseLeave={handlePillLeave}
              className="relative flex items-center space-x-1 bg-white/5 backdrop-blur-lg rounded-full p-1.5 border border-white/10"
            >
              {/* Sliding Indicator */}
              <motion.div 
                className="absolute top-1.5 h-[calc(100%-12px)] bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full transition-all duration-300 ease-out -z-10 shadow-lg shadow-violet-500/20"
                style={{
                  left: hoveredPill ? hoveredPill.left : activePill?.left, 
                  width: hoveredPill ? hoveredPill.width : activePill?.width,
                  opacity: hoveredPill ? 1 : 0,
                }}
              />
              {primaryNavItems.map((item) => (
                <button
                  layout
                  key={item}
                  data-section={item}
                  onClick={() => scrollToSection(item)}
                  onMouseEnter={handlePillHover}
                  className={`px-4 py-2 flex items-center space-x-2 rounded-full transition-all duration-300 relative group text-sm font-medium ${
                    activeSection === item
                      ? 'text-white font-semibold'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {sectionIcons[item]}
                  <span>{t[item]}</span>
                </button>
              ))}
              {/* More Dropdown */}
              <div className="relative" onMouseEnter={handlePillHover}>
                <button
                  layout
                  onClick={() => setIsMoreMenuOpen(prev => !prev)}
                  
                  className={`px-4 py-2 flex items-center space-x-2 rounded-full transition-all duration-300 relative group text-sm font-medium ${
                    moreNavItems.includes(activeSection)
                      ? 'text-white font-semibold'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {sectionIcons.more}
                  <span>{t.more}</span>
                </button>
                <AnimatePresence>
                  {isMoreMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-full right-0 mt-2 w-48 bg-slate-800/80 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl p-2"
                    >
                      {moreNavItems.map(item => (
                        <button
                          key={item}
                          onClick={() => {
                            scrollToSection(item);
                            setIsMoreMenuOpen(false);
                          }}
                          className={`w-full text-left flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm transition-colors duration-200 ${
                            activeSection === item ? 'bg-violet-500/20 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {sectionIcons[item]}
                          <span>{t[item]}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2 z-10">
            <button
              onClick={toggleLanguage} 
              className="flex items-center space-x-2 px-4 py-2.5 rounded-full hover:bg-white/10 transition-all duration-300 border border-white/10 backdrop-blur-lg font-semibold text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>
              <span>{t.language}</span>
            </button>
            <button
              onClick={() => setShowLoginModal(true)} 
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 text-sm border-indigo-500/30"
            >
              {sectionIcons.login}
              <span>{t.login}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-all duration-300 z-10"
          >
            <div className="w-6 h-6 relative flex flex-col justify-between">
              <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-[11px]' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-[11px]' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Modern Animated Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden absolute top-full left-0 w-full backdrop-blur-xl bg-slate-900/95 border-b border-white/10 shadow-2xl"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.07 } }
                }}
                className="container mx-auto py-4 flex flex-col space-y-1 px-4"
              >
                {['home', 'about', 'career', 'projects', 'team', 'skills', 'contact'].map((item) => (
                  <motion.button
                    key={item}
                    variants={{ hidden: { opacity: 0, y: -15 }, visible: { opacity: 1, y: 0 } }}
                    onClick={() => scrollToSection(item)}
                    className={`flex items-center space-x-4 text-left py-3 px-4 rounded-xl transition-all duration-300 w-full ${
                      activeSection === item
                        ? 'bg-gradient-to-r from-indigo-500/20 to-violet-600/20 text-white font-semibold'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="w-5 h-5">{sectionIcons[item]}</span>
                    <span>{t[item]}</span>
                  </motion.button>
                ))}
                <motion.div
                  variants={{ hidden: { opacity: 0, y: -15 }, visible: { opacity: 1, y: 0 } }}
                  className="pt-2 mt-2 border-t border-white/10"
                >
                  <button
                    onClick={toggleLanguage}
                    className="w-full flex items-center space-x-4 text-left py-3 px-4 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>
                    <span>{t.language === 'ID' ? 'Switch to English' : 'Ubah ke Indonesia'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowLoginModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-4 text-left py-3 px-4 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                  >
                    <span className="w-5 h-5">{sectionIcons.login}</span>
                    <span>{t.login}</span>
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AuthModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} t={t} />
 
      {/* Enhanced Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-3 mb-8">
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-300">Available for new projects</span>
              </div>

              <h1 
                className="text-5xl md:text-7xl font-black mb-6 leading-tight bg-gradient-to-r from-violet-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent animate-gradient-x"
                style={{ 
                  backgroundSize: '200% 200%',
                  textShadow: `
                    0 0 5px rgba(139, 92, 246, 0.3),
                    0 0 15px rgba(99, 102, 241, 0.3),
                    0 0 30px rgba(124, 58, 237, 0.2)
                  `
                }}
              >
                <Typewriter text={t.heroTitle} />
              </h1>
              
              <AnimatedSubtitle texts={t.heroSubtitles} />

              <motion.div 
                className="flex flex-col sm:flex-row items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center space-x-2"
                >
                  <span>{t.getStarted}</span>
                  <span className="text-lg">→</span>
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-4 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                >
                  <span>{t.viewProject}</span>
                </button>
              </motion.div>

              <motion.div 
                className="mt-12 flex items-center space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <p className="text-sm text-gray-400">Follow us:</p>
                <div className="flex space-x-4">
                  {Object.entries(teamMembers[0].social).map(([platform, url]) => (
                    <a 
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {platform === 'github' && <svg role="img" viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>}
                      {platform === 'linkedin' && <svg role="img" viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>}
                      {platform === 'instagram' && <svg role="img" viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.936 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.277.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319.936 20.651.524 19.86.218 19.095-.083 18.225-.285 16.947-.344 15.667-.402 15.26-.417 12-.417zm0 2.163c3.203 0 3.585.012 4.85.07 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.012 3.585-.07 4.85c-.055 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.585-.012-4.85-.07c-1.17-.055-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.012-3.585.07-4.85c.055-1.17.249-1.805.413-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679-1.381-.896.422-.164 1.057-.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zm0 4.865a4.972 4.972 0 100 9.944 4.972 4.972 0 000-9.944zM12 19.77a2.807 2.807 0 110-5.614 2.807 2.807 0 010 5.614zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>}
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Mockup UI Visual */}
            <div
              className="relative hidden lg:block"              
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <ModernCard className="p-0 font-mono text-xs" hoverable={false}>
                  <div className="absolute inset-0 bg-grid-slate-800/40 [mask-image:linear-gradient(0deg,transparent,black)]"></div>
                  <div className="relative">
                    <div className="flex items-center space-x-2 p-3 border-b border-white/10 bg-slate-900/50 rounded-t-2xl">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="flex-grow text-center text-gray-400">bash - activity_log</div>
                    </div>
                    <div className="p-4" style={{ transform: 'translateZ(20px)' }}>
                      <DynamicActivityLog />
                    </div>
                  </div>
                </ModernCard>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-14 border-2 border-gray-400/50 rounded-full flex justify-center items-start p-2"
          >
            <motion.div 
              className="w-1.5 h-3 bg-gray-400/80 rounded-full"
              animate={{ y: [0, 24, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <ModernCard className="p-6" hoverable={false}>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x-0 md:divide-x divide-y md:divide-y-0 divide-white/10">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                    <AnimatedCounter end={stat.number} duration={2500} />
                    {stat.suffix}
                  </div>
                  <div className="text-gray-400 font-medium text-sm tracking-wider uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </ModernCard>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" ref={aboutSectionRef} className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t.aboutTitle} 
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Di sinilah keunggulan teknis bertemu dengan desain visioner untuk menciptakan masa depan digital.
            </p>
          </motion.div>          
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Image */}
            <motion.div
              className="relative h-96 lg:h-auto lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <motion.div style={{ y: aboutImageY }} className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Tim Neverland Studio"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent"></div>
            </motion.div>

            {/* Right Column: Narrative */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl lg:text-4xl font-bold mb-6 tracking-tight bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Kisah Kami: Awal Mula Neverland
              </h3>
              <p className="text-gray-300 text-lg leading-loose mb-6">
                Neverland Studio lahir dari visi bersama dua individu yang bersemangat: seorang developer dengan keahlian mendalam di bidang AI dan seorang desainer dengan mata tajam untuk estetika. Kami memulai perjalanan ini dari sebuah ide sederhana: bagaimana jika teknologi canggih dapat dipadukan dengan desain yang humanis untuk menciptakan sesuatu yang benar-benar ajaib?
              </p>
              <p className="text-gray-400 leading-loose mb-10">
                Dari garasi kecil hingga menjadi studio digital yang diakui, semangat kami tetap sama. Kami percaya bahwa setiap proyek adalah sebuah petualangan baru, sebuah kesempatan untuk menjelajahi "Neverland" — dunia di mana imajinasi dan inovasi tidak memiliki batas.
              </p>

              {/* Core Values */}
              <div className="grid grid-cols-2 gap-6">
              {[
                { icon: '💡', title: 'Inovasi' },
                { icon: '🎨', title: 'Desain Estetik' },
                { icon: '⚡️', title: 'Performa Tinggi' },
                { icon: '🤝', title: 'Kolaborasi' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group p-5 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
                >
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-800/50 border border-white/10 text-2xl transition-colors duration-300 group-hover:border-teal-400/50">
                      {item.icon}
                    </div>
                    <h4 className="font-semibold text-lg text-gray-200">{item.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
            </motion.div>
          </div>          
        </div>
      </section>

      {/* Career Journey Section */}
      <CareerJourney t={t} />

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t.projectsTitle}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Jelajahi inovasi terbaru kami dan kolaborasi sukses dengan bisnis yang berpikiran maju.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <div className="flex justify-center flex-wrap gap-3 mb-12">
            {['All', 'React', 'AI', 'Vue.js', 'UI/UX'].map(filter => (
              <motion.button
                key={filter}
                onClick={() => setProjectFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden border ${
                  projectFilter === filter
                    ? 'text-white border-violet-500/50'
                    : 'text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
                whileHover={{ y: -2 }}
              >
                {projectFilter === filter && (
                  <motion.div
                    layoutId="projectFilterPill"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-600 -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </motion.button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.slice(0, visibleProjects).map((project, index) => (
                <motion.div
                  key={project.title}
                  layout="position"
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -50, transition: { duration: 0.3 } }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    opacity: { duration: 0.4 }
                  }}
                >
                  <ProjectCard project={project} t={t} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length > 3 && (
            <div className="mt-16 text-center">
              <motion.button
                onClick={handleProjectToggle}
                className="relative inline-flex items-center justify-center px-8 py-4 rounded-2xl font-semibold overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-500 group-hover:from-indigo-600 group-hover:to-violet-700"></span>
                <span className="absolute inset-1 bg-slate-900 rounded-xl"></span>
                <span className="relative z-10">
                  {visibleProjects < filteredProjects.length ? t.showMore : t.showLess}
                </span>
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section id="team" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {t.teamTitle}
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Meet the talented professionals behind our success story
          </p>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-xl mx-auto">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.name} member={member} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {t.skillsTitle}
          </h2>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}
          </motion.div>
          <p className="text-center text-gray-400 mt-16 max-w-2xl mx-auto">
            Keahlian kami mencakup spektrum teknologi modern yang luas, dari pengembangan frontend hingga rekayasa AI yang kompleks. Arahkan kursor untuk interaksi.
          </p>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side: Form with 3D Tilt Effect */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="relative rounded-3xl border border-white/10 bg-slate-900/50 shadow-2xl p-8 md:p-12"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-grid-slate-800/40 [mask-image:linear-gradient(0deg,#000,rgba(0,0,0,0))] animate-grid-pan"></div>
              <div className="relative z-10" style={{ transform: 'translateZ(40px)' }}>
                <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {t.contactTitle}
                </h2>
                <p className="text-gray-400 mb-8">
                  Siap untuk memulai proyek Anda berikutnya? Mari diskusikan bagaimana kami dapat membantu mewujudkan ide Anda.
                </p>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input type="text" placeholder={t.name} className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all duration-300" />
                    <input type="email" placeholder={t.email} className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all duration-300" />
                  </div>
                  <div>
                    <textarea rows="6" placeholder={t.message} className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all duration-300 resize-none"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-violet-500/30 flex items-center justify-center space-x-2">
                    <span>{t.send}</span>
                    <span className="text-lg">→</span>
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Right Side: Info & Map with Spotlight Effect */}
            <motion.div
              ref={contactCardRef}
              onMouseMove={handleContactMouseMove}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/50 shadow-2xl"
            >
              {/* Spotlight Effect */}
              <div 
                className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(132, 204, 22, 0.15), transparent 40%)`,
                }}
              />
              <div className="relative flex flex-col h-full">
                {/* Info Kontak */}
                <div className="p-8 md:p-12 flex-shrink-0">
                  <h3 className="text-2xl font-bold mb-8">Info Kontak</h3>
                  <div className="space-y-6">
                    <a href="mailto:arlianto032@gmail.com" className="flex items-start space-x-4 group/info">
                      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover/info:bg-violet-500/20 group-hover/info:border-violet-400/50 transition-all duration-300 text-2xl">📧</div>
                      <div>
                        <h4 className="font-semibold">Email</h4>
                        <p className="text-violet-400 group-hover/info:text-violet-300 break-all transition-colors">arlianto032@gmail.com</p>
                      </div>
                    </a>
                    <a href="tel:+628995257735" className="flex items-start space-x-4 group/info">
                      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover/info:bg-violet-500/20 group-hover/info:border-violet-400/50 transition-all duration-300 text-2xl">📱</div>
                      <div>
                        <h4 className="font-semibold">Phone</h4>
                        <p className="text-violet-400 group-hover/info:text-violet-300 break-all transition-colors">+62 899 525 7735</p>
                      </div>
                    </a>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-2xl">📍</div>
                      <div>
                        <h4 className="font-semibold">{t.location}</h4>
                        <p className="text-gray-400">Jl. Ki Ageng Gribig No.28, Madyopuro, Kec. Kedungkandang, Kota Malang, Jawa Timur 65139</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Peta */}
                <div className="flex-grow min-h-[300px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.219941913364!2d112.66913460000001!3d-7.9750697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62866628675a5%3A0xe475311940a81d11!2sSMK%20Negeri%206%20Kota%20Malang!5e0!3m2!1sen!2sid"
                    width="100%"
                    height="100%"
                    className="border-0 grayscale-[50%] contrast-125 group-hover:grayscale-0 transition-all duration-500"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative pt-20 pb-10 overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-grid-slate-800/40 [mask-image:linear-gradient(to_bottom,white,transparent)] z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Column 1: Brand & Social */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img src="/Logo Navbar .png" alt="Neverland Studio Logo" className="w-10 h-10 rounded-full object-cover" />
                <span className="text-2xl font-bold">Neverland Studio</span>
              </div>
              <p className="text-gray-400 text-sm">Mewujudkan ide menjadi realitas digital yang luar biasa dengan sentuhan kreativitas dan teknologi AI.</p>
              <div className="flex space-x-4 pt-2">
                <a href={teamMembers[0].social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><svg role="img" viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
                <a href={teamMembers[0].social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><svg role="img" viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg></a>
                <a href={teamMembers[0].social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><svg role="img" viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.936 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.277.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319.936 20.651.524 19.86.218 19.095-.083 18.225-.285 16.947-.344 15.667-.402 15.26-.417 12-.417zm0 2.163c3.203 0 3.585.012 4.85.07 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.012 3.585-.07 4.85c-.055 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381-.896-.422-.164-1.057.36-2.227.413 1.266-.057-1.646.07-4.85.07s-3.585-.012-4.85-.07c-1.17-.055-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.012-3.585.07-4.85c.055-1.17.249-1.805.413-2.227.217-.562.477.96.896-1.382.42-.419.819-.679-1.381-.896.422-.164 1.057-.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zm0 4.865a4.972 4.972 0 100 9.944 4.972 4.972 0 000-9.944zM12 19.77a2.807 2.807 0 110-5.614 2.807 2.807 0 010 5.614zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg></a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:justify-self-center">
              <h4 className="font-bold text-lg mb-4">Navigasi</h4>
              <ul className="space-y-3">
                {['home', 'about', 'projects', 'team', 'skills'].map(item => (
                  <li key={item}>
                    <a href={`#${item}`} onClick={(e) => { e.preventDefault(); scrollToSection(item); }} className="text-gray-400 hover:text-violet-400 transition-colors duration-300">{t[item]}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Legal & Support */}
            <div className="lg:justify-self-center">
              <h4 className="font-bold text-lg mb-4">Dukungan</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="text-gray-400 hover:text-violet-400 transition-colors duration-300">
                    Contact Us
                  </a>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-400 hover:text-violet-400 transition-colors duration-300">FAQ</Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-gray-400 hover:text-violet-400 transition-colors duration-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="text-gray-400 hover:text-violet-400 transition-colors duration-300">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div>
              <h4 className="font-bold text-lg mb-4">Tetap Terhubung</h4>
              <p className="text-gray-400 text-sm mb-4">Dapatkan pembaruan terbaru tentang proyek, teknologi, dan wawasan dari kami.</p>
              <form className="flex space-x-2" onSubmit={e => e.preventDefault()}>
                <input type="email" placeholder={t.email} className="w-full bg-slate-800/80 border border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all duration-300" />
                <button type="submit" className="p-3 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-lg hover:scale-105 transition-transform flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 mt-8 text-center text-gray-500 text-sm">
            <p>{t.footerText}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const TypingLogLine = ({ item, typeColors, onComplete }) => {
  const [typedMsg, setTypedMsg] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setTypedMsg('');
    setShowCursor(true);
    
    const fullText = `${item.msg}${item.file ? ` ${item.file}` : ''}${item.status ? ` ${item.status}` : ''}`;
    let i = 0;

    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedMsg(prev => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setShowCursor(false);
        if (onComplete) {
          setTimeout(onComplete, 1000); // Tunggu sebentar sebelum log berikutnya
        }
      }
    }, 30); // Kecepatan mengetik

    return () => clearInterval(typingInterval);
  }, [item, onComplete]);

  return (
    <div className="flex items-start space-x-3 mb-2 text-gray-300">
      <span className="text-gray-500">{item.time}</span>
      <span className={`font-bold w-20 ${typeColors[item.type]}`}>{`[${item.type}]`}</span>
      <span className="flex-1 text-gray-300">
        <span>{typedMsg}</span>
        {showCursor && <span className="w-2 h-3 bg-lime-400 inline-block animate-pulse ml-1"></span>}
      </span>
    </div>
  );
};

const DynamicActivityLog = () => {
  const activities = useMemo(() => [
    { time: '09:41:12', type: 'COMMIT', msg: 'feat: Implement real-time collaboration', file: 'collab.js' },
    { time: '09:42:05', type: 'DEPLOY', msg: 'Deploying to staging environment...', status: 'OK' },
    { time: '09:42:30', type: 'TEST', msg: 'Running integration tests...', status: 'PASS' },
    { time: '09:43:01', type: 'DESIGN', msg: 'New wireframes for dashboard approved', file: 'dashboard.fig' },
    { time: '09:43:55', type: 'AI', msg: 'Training new recommendation model...', status: 'RUNNING' },
  ], []);

  const typeColors = {
    COMMIT: 'text-blue-400',
    DEPLOY: 'text-purple-400',
    TEST: 'text-lime-400',
    DESIGN: 'text-pink-400',
    AI: 'text-violet-400',
  };

  const [log, setLog] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Inisialisasi log pertama
    if (log.length === 0) {
      setLog([activities[0]]);
      setCurrentIndex(1);
    }
  }, [activities, log.length]);

  const handleTypingComplete = () => {
    setLog(prev => {
      const newLog = [...prev, activities[currentIndex % activities.length]];
      return newLog.length > 5 ? newLog.slice(1) : newLog;
    });
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="h-[120px] overflow-hidden font-mono text-xs">
      {log.map((item, index) => (
        index === log.length - 1 ? (
          <TypingLogLine 
            key={item.time + index} 
            item={item} 
            typeColors={typeColors} 
            onComplete={handleTypingComplete} 
          />
        ) : (
          <div key={item.time + index} className="flex items-start space-x-3 mb-2 text-gray-300">
            <span className="text-gray-500">{item.time}</span>
            <span className={`font-bold w-20 ${typeColors[item.type]}`}>{`[${item.type}]`}</span>
            <span className="flex-1 text-gray-300">
              {item.msg}
              {item.file && <span className="text-yellow-400 ml-2">{item.file}</span>}
              {item.status && (<span className={`ml-2 font-bold ${item.status === 'OK' || item.status === 'PASS' ? 'text-lime-400' : 'text-yellow-400'}`}>{item.status}</span>)}
            </span>
          </div>
        )
      ))}
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Main App Component (Router)
const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      </Routes>
    </>
  );
};

export default App;