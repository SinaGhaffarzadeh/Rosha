import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '../../context/AppContext';
import styles from './ProjectPhases.module.css';

const ProjectPhases = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { closeDrawer } = useApp();

  const phases = [
    {
      id: 1,
      title: 'طراحی و معماری سیستم',
      description: 'طراحی و تعریف معماری کلی سیستم',
      tasks: [
        { name: 'تعریف معماری کلی سیستم', progress: 100 },
        { name: 'طراحی ساختار پایگاه داده', progress: 10 },
        { name: 'طراحی API ها و رابط‌های ارتباطی', progress: 100 },
        { name: 'تعریف استانداردهای کدنویسی و مستندسازی', progress: 70 },
        { name: 'پیاده سازی نمونه اولیه', progress: 100 },
        { name: 'نتایج و ارزیابی عملکرد مدل', progress: 100 }
      ],
      duration: '2 ماه',
      progress: null // محاسبه می‌شود از میانگین tasks
    },
    {
      id: 2,
      title: 'Signal Analysis & Quality Metrics',
      description: 'تحلیل ویژگی‌های سیگنال برای کنترل کیفیت و گزارش‌دهی.',
      tasks: [
        { name: 'قدرت سیگنال صوتی به نویز موجود در محیط', progress: 90 },
        { name: 'سطوح انرژی گفتار و نویز', progress: 90 },
        { name: 'طراحی ساختار پایگاه داده', progress: 10 },
        { name: 'طراحی API ها و رابط‌های ارتباطی', progress: 100 }
      ],
      duration: 'تقریبا 3 هفته',
      progress: null // محاسبه می‌شود از میانگین tasks
    },
    {
      id: 3,
      title: 'Speech Intelligence Engine (SIE)',
      description: 'موتور تبدیل صدا به متن و پردازش سیگنال.',
      tasks: [
        { name: 'Audio Input & Signal Preparation', progress: 100 },
        { name: 'Audio Enhancement & Noise Reduction', progress: 60 },
        { name: 'Speech Recognition (ASR)', progress: 90 },
        { name: 'Speech & Silence Detection (VAD)', progress: 20 },
        { name: 'Speaker Diarization', progress: 0 }
      ],
      duration: '4-5 ماه',
      progress: null // محاسبه می‌شود از میانگین tasks
    },
    {
      id: 4,
      title: 'Conversation Intelligence Engine (CIE)',
      description: 'موتور تحلیل هوشمند مکالمات.',
      tasks: [
        { name: 'Text Enhancement and Separating', progress: 80 },
        { name: 'Semantic Analysis & Content Extraction', progress: 70 },
        { name: 'Agent Behavior & Quality Evaluation', progress: 60 },
        { name: 'Customer Emotion & Sentiment Understanding', progress: 0 }
      ],
      duration: '4-5 ماه',
      progress: null // محاسبه می‌شود از میانگین tasks
    },
    {
      id: 5,
      title: 'IKBS',
      description: 'بررسی دانش پروژه و استخراج اطلاعات حیاتی',
      tasks: [
        'در آینده'
      ],
      duration: '2-3 ماه',
      status: 'برنامه‌ریزی شده'
    },
    {
      id: 6,
      title: 'یکپارچه‌سازی و تست',
      description: 'یکپارچه‌سازی تمام بخش‌ها و انجام تست‌های جامع.',
      tasks: [
        'یکپارچه‌سازی تمام موتورها',
        'تست عملکرد و کارایی',
        'تست امنیتی'
      ],
      duration: '2-3 ماه',
      status: 'برنامه‌ریزی شده'
    },
    {
      id: 7,
      title: 'استقرار و راه‌اندازی',
      description: 'استقرار سیستم در محیط production و راه‌اندازی.',
      tasks: [
        'آماده‌سازی محیط production',
        'استقرار سیستم',
        'راه‌اندازی و پیکربندی',
        'آموزش کاربران'
      ],
      duration: '1-2 ماه',
      status: 'برنامه‌ریزی شده'
    }
  ];

  const toggleModal = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) {
      closeDrawer();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  useEffect(() => {
    if (isOpen) {
      closeDrawer();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, closeDrawer]);

  const calculateProgress = (phase) => {
    if (phase.progress !== null && phase.progress !== undefined) {
      return phase.progress;
    }
    if (phase.tasks && phase.tasks.length > 0) {
      // اگر tasks آرایه‌ای از object است
      if (typeof phase.tasks[0] === 'object' && phase.tasks[0].progress !== undefined) {
        const total = phase.tasks.reduce((sum, task) => sum + (task.progress || 0), 0);
        return Math.round(total / phase.tasks.length);
      }
    }
    return null;
  };

  const isEnglishText = (text) => {
    // بررسی می‌کند که آیا متن با کاراکتر انگلیسی شروع می‌شود
    return /^[A-Za-z]/.test(text.trim());
  };

  const getStatusColor = (status, progress) => {
    if (progress !== undefined && progress !== null) {
      // رنگ بر اساس درصد: سبز برای درصدهای بالا، نارنجی برای متوسط، آبی برای پایین
      if (progress >= 80) return '#4caf50';
      if (progress >= 50) return '#ff9800';
      if (progress > 0) return '#2196f3';
      return '#9e9e9e';
    }
    // برای فازهای دیگر که status دارند
    switch (status) {
      case 'در حال انجام':
        return '#ff9800';
      case 'برنامه‌ریزی شده':
        return '#2196f3';
      default:
        return '#9e9e9e';
    }
  };

  return (
    <>
      <button 
        className={styles.phasesButton}
        onClick={toggleModal}
        aria-label="فاز های پروژه"
      >
        فاز های پروژه
      </button>
      
      {isOpen && createPortal(
        <div className={styles.overlay} onClick={toggleModal}>
          <div className={styles.content} onClick={(e) => e.stopPropagation()}>
            <div className={styles.header}>
              <button 
                className={styles.backButton}
                onClick={toggleModal}
                aria-label="بازگشت"
              >
                ← بازگشت
              </button>
              <h2>فازهای پروژه Rosha</h2>
            </div>
            <div className={styles.phasesContainer}>
              {phases.map((phase) => {
                const phaseProgress = calculateProgress(phase);
                return (
                  <div key={phase.id} className={styles.phaseCard}>
                    <div className={styles.phaseHeader}>
                      <h3 className={styles.phaseTitle}>{phase.title}</h3>
                      <div 
                        className={styles.statusBadge}
                        style={{ backgroundColor: getStatusColor(phase.status, phaseProgress) }}
                      >
                        {phaseProgress !== null ? `${phaseProgress}%` : phase.status}
                      </div>
                    </div>
                    <p className={styles.phaseDescription}>{phase.description}</p>
                    <div className={styles.phaseDetails}>
                      <div className={styles.duration}>
                        <strong>مدت زمان:</strong> {phase.duration}
                      </div>
                      <div className={styles.tasks}>
                        <strong>وظایف:</strong>
                        <ul>
                          {phase.tasks.map((task, index) => {
                            const taskName = typeof task === 'object' ? task.name : task;
                            const taskProgress = typeof task === 'object' ? task.progress : null;
                            const isEnglish = isEnglishText(taskName);
                            return (
                              <li key={index} className={isEnglish ? styles.taskEnglish : ''}>
                                {taskName}
                                {taskProgress !== null && taskProgress !== undefined && (
                                  <span className={styles.taskProgress}> ({taskProgress}%)</span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ProjectPhases;

