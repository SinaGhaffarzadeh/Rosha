import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '../../context/AppContext';
import MindMap from '../MindMap/MindMap';
import ProjectPhases from '../ProjectPhases/ProjectPhases';
import styles from './Table.module.css';

// استخراج داده‌ها از ساختار فعلی
const extractTableData = () => {
  const sections = [
    {
      id: 'signal-analysis',
      title: 'Signal Analysis & Quality Metrics',
      rosha: 'Signal Analysis & Quality Metrics',
      sectionGroup: 'Signal Analysis & Quality Metrics',
      description: 'تحلیل ویژگی‌های سیگنال برای کنترل کیفیت و گزارش‌دهی',
      features: ['قدرت سیگنال صوتی به نویز موجود در محیط', 'سطوح انرژی گفتار و نویز'],
      requirements: 'Time to reach robust analysis method. Because reached information will be useful in future to get better results in ASR model.',
      time: '~ 3 weeks',
      result: '80%',
      futureItems: ['انعکاس (reverb) موجود در سیگنال صوتی (در آینده)'],
      level: 'خیلی زیاد'
    },
    {
      id: 'sie-audio-input',
      title: 'Audio Input & Signal Preparation',
      rosha: 'Audio Input & Signal Preparation',
      sectionGroup: 'Speech Intelligence Engine (SIE)',
      description: 'استانداردسازی و آماده‌سازی سیگنال صوتی برای پردازش',
      features: ['پشتیبانی از انواع فرمت‌ها', 'دریافت فایل آپلودی'],
      requirements: '-',
      time: '~1 week',
      result: '90%',
      futureItems: ['استریم برخط (در آینده)'],
      level: 'خیلی زیاد'
    },
    {
      id: 'sie-audio-enhancement',
      title: 'Audio Enhancement & Noise Reduction',
      rosha: 'Audio Enhancement & Noise Reduction',
      sectionGroup: 'Speech Intelligence Engine (SIE)',
      description: 'بهبود کیفیت صدا برای افزایش دقت ASR',
      features: ['استفاده از خصوصیات 3 نوع denoiser برای حذف نویز'],
      requirements: 'Embarking on novelty (on type of noise, seeking sample data, literature review) and system (server or GPU) to train our modern filtering model.',
      time: '~ 3 months',
      result: 'Existing techniques are not suitable for Persian voices and they have much error on applying.\nCombined 5 method to reduce this effect. But it is overwhelming in both side (filtering and converting voice to text)\n~ 60% error',
      futureItems: ['فیلتر تطبیقی (در آینده)', 'توسعه مدل یادگیری غیرنظارتی برای کاهش نویز (در آینده)'],
      level: 'زیاد'
    },
    {
      id: 'sie-vad',
      title: 'Speech & Silence Detection (VAD)',
      rosha: 'Speech & Silence Detection (VAD)',
      sectionGroup: 'Speech Intelligence Engine (SIE)',
      description: 'تشخیص بخش‌های گفتار، سکوت و نویز',
      features: [],
      requirements: 'Embarking on novelty\n(on controlling intensities, robust segmenting (it can be affect by different frequencies and noises), control and match timestamps)\nMono or single channel recording doesn\'t have enough methods – Cocktail party problem',
      time: '~ 3 months',
      result: '0%',
      futureItems: ['تقسیم‌بندی بخش های گفتار (در آینده)', 'تشخیص بخش های سکوت (در آینده)', 'علامت‌گذاری زمانی برای بخش‌های گفتار و سکوت (در آینده)'],
      level: 'متوسط'
    },
    {
      id: 'sie-diarization',
      title: 'Speaker Diarization',
      rosha: 'Speaker Diarization',
      sectionGroup: 'Speech Intelligence Engine (SIE)',
      description: 'تشخیص نقش و تفکیک گویندگان',
      features: [],
      requirements: '-',
      time: '~ 2 months',
      result: '0%',
      futureItems: ['تفکیک کارشناس / مشتری', 'تشخیص تعداد گوینده', 'بردارسازی هویت صوتی', 'تطابق با گویندگان مکالمات قبلی'],
      level: 'متوسط'
    },
    {
      id: 'sie-asr',
      title: 'Speech Recognition (ASR)',
      rosha: 'OpenAI API (Cloud)',
      sectionGroup: 'Speech Intelligence Engine (SIE)',
      description: 'موتور تبدیل ویس به متن',
      features: [],
      requirements: 'System (server or GPU) to run and fine-tune (Research) it\nAt least 5000 voice with their texts',
      time: '~ 1 week for local implementation\n~ 2 month for fine-tuning',
      result: 'Almost 60% similarity in some filtering and high CER.\nBut, with applying combined filters we reach up to 90% similarity and ~ 30% CER in final output.\nBut with this method we lose our time that is curtail for us.\nThere is no training we just set hyperparameter for our tasks',
      futureItems: ['Whisper (Local) ((در آینده', 'Custom Fine-tuning Support(در آینده)'],
      level: 'متوسط'
    },
    {
      id: 'cie-text-structuring',
      title: 'Text Enhancement and Separating',
      rosha: 'Text Enhancement and Separating',
      sectionGroup: 'Conversation Intelligence Engine (CIE)',
      description: 'بازسازی و تفکیک متن',
      features: ['اصلاح خطاهای ASR', 'اصلاح ساختار جملات', 'تشخیص تکرار جملات', 'رفع اشتباهات نگارشی و گرامری', 'بازسازی معنی واقعی جملات ناقص', 'حذف نویزهای متنی', 'تشخیص عبارات نامفهوم یا جایگزین مناسب'],
      requirements: 'Embarking on novelty (There is a little bit method to control error and needs to develop our methods like embedding models) and system (server or GPU) to train our modern filtering model.',
      time: '~ 2 month implement our method\n~ 3 week for setting traditional method',
      result: 'Traditional methods just improve 10% of in cleaning and 20% in integrating.',
      futureItems: ['اتوماسیون عملیات فوق با استفاده مدل های آمار پیشرفته (در آینده)', 'تفکیک نقش‌ها: کارشناس / مشتری', 'تشخیص Overlap (در آینده)'],
      level: 'زیاد'
    },
    {
      id: 'cie-semantic-analysis',
      title: 'Semantic Analysis & Content Extraction',
      rosha: 'Semantic Analysis & Content Extraction',
      sectionGroup: 'Conversation Intelligence Engine (CIE)',
      description: 'استخراج داده‌های مهم و کاربردی از متن',
      features: ['کلمات کلیدی مکالمه', 'عبارات مهم مرتبط با محصول/سرویس'],
      requirements: 'Details of demands (what you need to have), System (server or GPU) to run and fine-tune (Research) it',
      time: '~ 2.5 month for fine-tuning\n~ 3 weeks for adjusting language model',
      result: '-',
      futureItems: ['کلمات و جملات ممنوعه (در آینده)', 'کلمات ضروری (اسکریپت سازمان) (در آینده)', 'رعایت احوال‌پرسی استاندارد (در آینده)', 'رعایت قوانین سازمان (Privacy, Legal) (در آینده)', 'دلیل تماس (در آینده)', 'شکایت، درخواست، پیشنهاد (در آینده)', 'اولویت مشکل (در آینده)', 'پیش‌بینی نیاز بعدی مشتری (در آینده)', 'اطلاعات هویتی (در آینده)', 'نیاز، درخواست، مشکل اصلی (در آینده)', 'تاریخ، شماره تماس، شناسه‌ها (در آینده)'],
      level: 'زیاد'
    },
    {
      id: 'cie-agent-behavior',
      title: 'Agent Behavior & Quality Evaluation',
      rosha: 'Agent Behavior & Quality Evaluation',
      sectionGroup: 'Conversation Intelligence Engine (CIE)',
      description: 'تحلیل عملکرد کارشناس و استانداردهای پاسخگویی',
      features: ['تشخیص لحن از متن و امتیاز دهی 0 تا 10'],
      requirements: 'Details of demands (what you need to have), System (server or GPU) to run and fine-tune (Research) it',
      time: '~ 2.5 month for fine-tuning\n~ 3 weeks for adjusting language model',
      result: '60%',
      futureItems: ['تشخیص لحن پیشرفته با استفاده از صدای کارشناس (در آینده)', 'استرس یا خستگی کارشناس (در آینده)', 'ثبات لحن در طول مکالمه (در آینده)', 'پاسخ صحیح و مرتبط (در آینده)', 'سرعت پاسخ‌دهی (در آینده)', 'جلوگیری از گمراه‌سازی مشتری (در آینده)', 'میزان کمک واقعی به مشتری (در آینده)'],
      level: 'متوسط'
    },
    {
      id: 'cie-customer-emotion',
      title: 'Customer Emotion & Sentiment Understanding',
      rosha: 'Customer Emotion & Sentiment Understanding',
      sectionGroup: 'Conversation Intelligence Engine (CIE)',
      description: 'تحلیل احساسات، رضایت و روند هیجانی مشتری',
      features: [],
      requirements: 'Details of demands (what you need to have), System (server or GPU) to run and fine-tune (Research) it',
      time: '-',
      result: '0%',
      futureItems: ['رضایت / نارضایتی / بی‌تفاوتی (در آینده)', 'شدت احساس (Low, Mid, High) (در آینده)', 'تغییر احساس در طول مکالمه (در آینده)'],
      level: 'متوسط'
    },
    {
      id: 'integrating-kpi',
      title: 'IKBS',
      rosha: 'Checking project knowledge',
      sectionGroup: 'IKBS',
      description: '',
      features: [],
      requirements: '',
      time: '',
      result: '',
      futureItems: [],
      level: ''
    }
  ];

  return sections.map(section => ({
    rosha: section.rosha || section.title,
    features: section.features.length > 0 ? section.features.join(', ') : '-',
    aim: section.description,
    requirements: section.requirements || '-',
    time: section.time || '-',
    result: section.result || '-',
    futurePerspective: section.futureItems.length > 0 ? section.futureItems.join('; ') : '-',
    level: section.level || '-',
    section: section.sectionGroup
  }));
};

const Table = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMindMapOpen, setIsMindMapOpen] = useState(false);
  const { closeDrawer, selectSection, openDrawer } = useApp(); // Added selectSection and openDrawer
  const tableData = extractTableData();

  // محاسبه تعداد ردیف‌های هر سکشن
  const sectionCounts = {};
  tableData.forEach(row => {
    sectionCounts[row.section] = (sectionCounts[row.section] || 0) + 1;
  });

  // تعیین موقعیت هر سکشن
  let currentIndex = 0;
  const sectionPositions = {};
  Object.keys(sectionCounts).forEach(section => {
    sectionPositions[section] = {
      startIndex: currentIndex,
      rowspan: sectionCounts[section]
    };
    currentIndex += sectionCounts[section];
  });

  const toggleFullscreen = () => {
    const newState = !isFullscreen;
    setIsFullscreen(newState);
    if (newState) {
      // بستن sidebar وقتی modal باز می‌شود
      closeDrawer();
      // جلوگیری از scroll صفحه اصلی
      document.body.style.overflow = 'hidden';
    } else {
      // بازگرداندن scroll صفحه اصلی
      document.body.style.overflow = '';
      // فقط drawer را باز کن، selectedSection را تغییر نده
      // selectSection('overview'); // Removed - drawer should stay closed if user closed it
    }
  };

  const toggleMindMap = () => {
    const newState = !isMindMapOpen;
    setIsMindMapOpen(newState);
    if (newState) {
      // بستن sidebar وقتی modal باز می‌شود
      closeDrawer();
      // جلوگیری از scroll صفحه اصلی
      document.body.style.overflow = 'hidden';
    } else {
      // بازگرداندن scroll صفحه اصلی
      document.body.style.overflow = '';
    }
  };

  // بستن sidebar وقتی component mount می‌شود و modal باز است
  useEffect(() => {
    if (isFullscreen || isMindMapOpen) {
      closeDrawer();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // فقط وقتی fullscreen بسته می‌شود (نه در هر render) drawer را باز کن
      // selectSection('overview'); // Removed to prevent infinite loop
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen, isMindMapOpen]); // Removed closeDrawer from dependencies

  const tableContent = (
    <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.sectionColumn}>Section</th>
            <th className={styles.roshaColumn}>Rosha</th>
            <th className={styles.featuresColumn}>Features</th>
            <th className={styles.aimColumn}>Aim</th>
            <th className={styles.requirementsColumn}>Requirements</th>
            <th className={styles.timeColumn}>~ Time</th>
            <th className={styles.resultColumn}>Result</th>
            <th className={styles.futureColumn}>Future Perspective</th>
            <th className={styles.levelColumn}>Level</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => {
            const sectionPos = sectionPositions[row.section];
            const isFirstRowOfSection = index === sectionPos.startIndex;
            
            return (
              <tr key={index} className={styles.dataRow}>
                {isFirstRowOfSection && (
                  <td 
                    rowSpan={sectionPos.rowspan} 
                    className={styles.sectionCell}
                  >
                    {row.section}
                  </td>
                )}
                <td className={styles.roshaCell}>{row.rosha}</td>
                <td className={styles.featuresCell}>{row.features}</td>
                <td className={styles.aimCell}>{row.aim}</td>
                <td className={styles.requirementsCell}>{row.requirements}</td>
                <td className={styles.timeCell}>{row.time}</td>
                <td className={styles.resultCell}>{row.result}</td>
                <td className={styles.futureCell}>{row.futurePerspective}</td>
                <td className={styles.levelCell}>{row.level}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
  );

  return (
    <>
      <div className={styles.tableContainer}>
        <ProjectPhases />
        <button 
          className={styles.fullscreenButton}
          onClick={toggleFullscreen}
          aria-label="جدول توضیحات"
        >
          جدول توضیحات
        </button>
        <button 
          className={styles.mindMapButton}
          onClick={toggleMindMap}
          aria-label="Mind Map"
        >
          Mind Map
        </button>
      </div>
      
      {isFullscreen && createPortal(
        <div className={styles.fullscreenOverlay} onClick={toggleFullscreen}>
          <div className={styles.fullscreenContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.fullscreenHeader}>
              <button 
                className={styles.backButton}
                onClick={toggleFullscreen}
                aria-label="بازگشت"
              >
                ← بازگشت
              </button>
              <h2>جدول سیستم Rosha</h2>
            </div>
            <div className={styles.fullscreenTableContainer}>
              {tableContent}
            </div>
          </div>
        </div>,
        document.body
      )}

      {isMindMapOpen && createPortal(
        <div className={styles.fullscreenOverlay} onClick={toggleMindMap}>
          <div className={styles.fullscreenContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.fullscreenHeader}>
              <button 
                className={styles.backButton}
                onClick={toggleMindMap}
                aria-label="بازگشت"
              >
                ← بازگشت
              </button>
              <h2>Voice Processing & Analysis Pipeline</h2>
            </div>
            <div className={styles.fullscreenMindMapContainer}>
              <MindMap />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Table;
