import React, { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Handle, Position, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import styles from './MindMap.module.css';
import signalWaveform from '../../assets/signal-waveform.png';

// Custom Signal Node
const SignalNode = () => (
  <div className={styles.signalNode}>
    <img src={signalWaveform} alt="Signal Waveform" className={styles.signalImage} />
    <Handle id="source-bottom-30" type="source" position={Position.Bottom} style={{ left: '30%', background: '#9c27b0' }} />
    <Handle id="source-bottom-70" type="source" position={Position.Bottom} style={{ left: '70%', background: '#9c27b0' }} />
  </div>
);

// Custom Main Node with Tooltip
const MainNode = ({ data }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // آماده کردن محتوای tooltip
  const tooltipContent = [];
  
  // برای Pre-Processing، Voice To Text Engine، Processing Text، Language Model Based Analysis و Analyzing Audio فقط subItems را نمایش می‌دهیم، description را نه
  if (data.description && data.type !== 'preProcessing' && data.type !== 'voiceToTextEngine' && data.type !== 'processingText' && data.type !== 'lmAnalysis' && data.type !== 'analyzingAudio') {
    tooltipContent.push({ type: 'description', content: data.description });
  }
  
  if (data.subItems && data.subItems.length > 0) {
    tooltipContent.push({ type: 'subItems', items: data.subItems });
  }
  
  if (data.serviceDetails && data.serviceDetails.length > 0) {
    tooltipContent.push({ type: 'serviceDetails', items: data.serviceDetails });
  }

  return (
    <div 
      className={`${styles.mainNode} ${styles[data.type]}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Handle type="target" position={Position.Top} style={{ background: '#9c27b0' }} />
      <div className={styles.nodeTitle}>{data.label}</div>
      <div className={styles.subNodes}>
        {data.description && (
          <div className={styles.description}>{data.description}</div>
        )}
        {data.subItems && data.type !== 'preProcessing' && data.type !== 'voiceToTextEngine' && data.type !== 'processingText' && data.type !== 'lmAnalysis' && data.type !== 'analyzingAudio' && data.subItems.map((item, index) => (
          <div key={index} className={styles.subNode}>{item}</div>
        ))}
        {data.serviceDetails && (
          <div className={styles.subNodeGroup}>
            <div className={styles.subNodeTitle}>Service Detail:</div>
            {data.serviceDetails.map((detail, index) => (
              <div key={index} className={styles.subNode}>{detail}</div>
            ))}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} style={{ background: '#9c27b0' }} />
      
      {/* Tooltip */}
      {showTooltip && tooltipContent.length > 0 && (
        <div className={styles.tooltip}>
          {tooltipContent.map((item, index) => (
            <div key={index} className={styles.tooltipSection}>
              {item.type === 'description' && (
                <div className={styles.tooltipDescription}>{item.content}</div>
              )}
              {item.type === 'subItems' && (
                <div className={styles.tooltipSubItems}>
                  <div className={styles.tooltipTitle}>عملیات</div>
                  {item.items.map((subItem, subIndex) => {
                    const isGreen = subItem === 'Speech & Silence Detection (VAD)' || 
                                   subItem === 'Speaker Diarization' ||
                                   subItem === 'اتوماسیون عملیات فوق با استفاده مدل های آمار پیشرفته' ||
                                   subItem === 'تفکیک نقش‌ها: کارشناس / مشتری' ||
                                   subItem === 'تشخیص Overlap';
                    return (
                      <div 
                        key={subIndex} 
                        className={`${styles.tooltipSubItem} ${isGreen ? styles.tooltipSubItemGreen : ''}`}
                      >
                        • {subItem}
                      </div>
                    );
                  })}
                </div>
              )}
              {item.type === 'serviceDetails' && (
                <div className={styles.tooltipServiceDetails}>
                  <div className={styles.tooltipTitle}>Service Details:</div>
                  {item.items.map((detail, detailIndex) => (
                    <div key={detailIndex} className={styles.tooltipSubItem}>• {detail}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const nodeTypes = {
  signal: SignalNode,
  main: MainNode,
};

const nodes = [
  {
    id: 'signal',
    type: 'signal',
    position: { x: -100, y: 0 },
    data: {},
    style: { width: 640, height: 640 },
  },
  {
    id: 'pre-processing',
    type: 'main',
    position: { x: -600, y: 300 },
    data: {
      label: 'Pre-Processing',
      type: 'preProcessing',
      description: 'اینجا جایست که سیگنال صوتی خام پردازش می شود تا آماده تزریق به مدل سیگنال به متن شود',
      subItems: [
        'Audio Input & Signal Preparation',
        'Audio Enhancement & Noise Reduction',
        'Speech & Silence Detection (VAD)',
        'Speaker Diarization',
      ],
    },
  },
  {
    id: 'analyzing-audio',
    type: 'main',
    position: { x: 400, y: 300 },
    data: {
      label: 'Analyzing Audio',
      type: 'analyzingAudio',
      description: 'جای که روی سیگنال یک سری تحلیل ها انجام می شود تا کیفیت آن سیگنال ارزیابی شود',
      subItems: [
        'قدرت سیگنال صوتی به نویز موجود در محیط',
        'سطوح انرژی گفتار و نویز',
      ],
    },
  },
  {
    id: 'voice-to-text-engine',
    type: 'main',
    position: { x: 0, y: 300 },
    data: {
      label: 'Voice To Text Engine',
      type: 'voiceToTextEngine',
      description: 'جای که سیگنال پردازش شده به متن تبدیل می شود',
      subItems: [
        'Automatic speech recognition model',
      ],
    },
  },
  {
    id: 'processing-text',
    type: 'main',
    position: { x: 0, y: 700 },
    data: {
      label: 'Processing Text',
      type: 'processingText',
      description: 'جای که متن خام تولید شده تو مدل سیگنال به متن پردازش می شود',
      subItems: [
        'اصلاح خطاهای ASR',
        'اصلاح ساختار جملات',
        'تشخیص تکرار جملات',
        'رفع اشتباهات نگارشی و گرامری',
        'بازسازی معنی واقعی جملات ناقص',
        'حذف نویزهای متنی',
        'تشخیص عبارات نامفهوم یا جایگزین مناسب',
        'اتوماسیون عملیات فوق با استفاده مدل های آمار پیشرفته',
        'تفکیک نقش‌ها: کارشناس / مشتری',
        'تشخیص Overlap',
      ],
    },
  },
  {
    id: 'lm-analysis',
    type: 'main',
    position: { x: 0, y: 1100 },
    data: {
      label: 'Language Model Based Analysis',
      type: 'lmAnalysis',
      description: 'جای که متن نهایی با استفاده از مدل زبانی پردازش می شود و اطلاعات ساختاری و هم چنین احساسی متن طبقه بندی می شود',
      subItems: [
        'Semantic Analysis & Content Extraction',
        'Agent Behavior & Quality Evaluation',
        'Customer Emotion & Sentiment Understanding',
      ],
    },
  },
];

const initialEdges = [
  { 
    id: 'signal-pre', 
    source: 'signal', 
    target: 'pre-processing', 
    sourceHandle: 'source-bottom-30', 
    type: 'smoothstep', 
    animated: true 
  },
  { 
    id: 'signal-analyze', 
    source: 'signal', 
    target: 'analyzing-audio', 
    sourceHandle: 'source-bottom-70', 
    type: 'smoothstep', 
    animated: true 
  },
  { id: 'pre-voice', source: 'pre-processing', target: 'voice-to-text-engine', type: 'smoothstep', animated: true },
  { id: 'voice-text', source: 'voice-to-text-engine', target: 'processing-text', type: 'smoothstep', animated: true },
  { id: 'text-lm', source: 'processing-text', target: 'lm-analysis', type: 'smoothstep', animated: true },
];

const MindMap = () => {
  const [reactFlowNodes, setReactFlowNodes] = useState(nodes);
  const [reactFlowEdges, setReactFlowEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setReactFlowNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setReactFlowEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return (
    <div className={styles.mindMapContainer}>
      <ReactFlow
        nodes={reactFlowNodes}
        edges={reactFlowEdges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        style={{ background: '#1a1a2e' }}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
      >
        <Background color="#aaa" gap={16} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default MindMap;
