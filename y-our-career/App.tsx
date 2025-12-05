import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { JobCard } from './components/JobCard';
import { Input } from './components/Input';
import { Button } from './components/Button';
import { Tag } from './components/Tag';
import { SAMPLE_JOBS, SAMPLE_NOTIFICATIONS, JOB_ROLES, INDUSTRIES, EMPLOYMENT_TYPES } from './constants';
import { Job, Notification, OnboardingData } from './types';
import { Check, BrainCircuit, Bell, Bookmark, ArrowLeft, Calendar, Building2, Search, Filter, X } from 'lucide-react';

// View State Enum
type ViewState = 
  | 'LANDING'
  | 'ONBOARDING_ACADEMIC'
  | 'ONBOARDING_CAREER'
  | 'ONBOARDING_PERSONAL'
  | 'KEYWORDS'
  | 'ALERT_MODAL'
  | 'AI_PROCESSING'
  | 'RECOMMENDATIONS'
  | 'DETAIL'
  | 'SAVED';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('LANDING');
  const [notifications, setNotifications] = useState<Notification[]>(SAMPLE_NOTIFICATIONS);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [isApplied, setIsApplied] = useState(false);
  
  // Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterIndustry, setFilterIndustry] = useState<string>('All');
  const [filterEmployment, setFilterEmployment] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);
  
  // Onboarding State
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    academic: { year: '', major: '' },
    career: { roles: [], industries: [] },
    personal: { name: '', email: '', employmentType: [] },
    keywords: [],
    notificationOptIn: false
  });

  // Keyword input state
  const [keywordInput, setKeywordInput] = useState('');

  // Processing Animation State
  const [processStep, setProcessStep] = useState(0);

  // Recommendation Tab State
  const [activeTab, setActiveTab] = useState<'채용' | '비교과'>('채용');

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Reset applied state when job changes
  useEffect(() => {
    setIsApplied(false);
  }, [selectedJob]);

  // Helper to update onboarding data
  const updateOnboarding = (section: keyof OnboardingData, data: any) => {
    setOnboardingData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const handleToggle = (list: string[], item: string): string[] => {
    return list.includes(item) 
      ? list.filter(i => i !== item)
      : [...list, item];
  };

  // Navigation Logic
  const startOnboarding = () => setCurrentView('ONBOARDING_ACADEMIC');
  
  const finishKeywords = () => setCurrentView('ALERT_MODAL');
  
  const handleAlertOptIn = (optIn: boolean) => {
    setOnboardingData(prev => ({ ...prev, notificationOptIn: optIn }));
    setCurrentView('AI_PROCESSING');
  };

  // AI Processing Effect
  useEffect(() => {
    if (currentView === 'AI_PROCESSING') {
      const t1 = setTimeout(() => setProcessStep(1), 500);
      const t2 = setTimeout(() => setProcessStep(2), 1200);
      const t3 = setTimeout(() => setCurrentView('RECOMMENDATIONS'), 2000);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [currentView]);

  const goToDetail = (job: Job) => {
    setSelectedJob(job);
    setCurrentView('DETAIL');
  };

  const toggleSave = (id: string) => {
    const newSaved = new Set(savedJobs);
    if (newSaved.has(id)) newSaved.delete(id);
    else newSaved.add(id);
    setSavedJobs(newSaved);
  };

  // Filter Logic
  const priorityJobs = SAMPLE_JOBS.filter(j => ['1', '11', 'p3'].includes(j.id));
  
  const filteredListedJobs = SAMPLE_JOBS.filter(j => {
    // Exclude priority jobs from main list
    if (['1', '11', 'p3'].includes(j.id)) return false;
    
    // Filter by Tab
    if (j.type !== activeTab) return false;

    // Filter by Search Query (Title, Company, Tags)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const match = 
        j.title.toLowerCase().includes(query) || 
        j.company.toLowerCase().includes(query) || 
        j.tags.some(tag => tag.toLowerCase().includes(query));
      if (!match) return false;
    }

    // Filter by Industry
    if (filterIndustry !== 'All') {
      if (j.industry !== filterIndustry) return false;
    }

    // Filter by Employment Type
    if (filterEmployment !== 'All') {
      // Check both employment_type field and subtype field for broader matching
      const matchEmp = j.employment_type === filterEmployment || j.subtype === filterEmployment;
      if (!matchEmp) return false;
    }

    return true;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setFilterIndustry('All');
    setFilterEmployment('All');
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    // Optionally scroll to top of list to see results immediately
    window.scrollTo({ top: 400, behavior: 'smooth' }); 
  };

  const activeFilterCount = (filterIndustry !== 'All' ? 1 : 0) + (filterEmployment !== 'All' ? 1 : 0);

  // --- RENDER SECTIONS ---

  // 1. Landing
  if (currentView === 'LANDING') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center animate-fade-in-up">
        <div className="mb-8">
          <span className="text-primary font-bold text-2xl tracking-tight">Y-OUR Career</span>
        </div>
        <h1 className="text-[32px] font-bold text-text-main mb-4 leading-tight">
          커리어연세의 중요한 공고,<br />놓치지 않게.
        </h1>
        <h2 className="text-[16px] text-text-gray mb-12 max-w-md leading-relaxed">
          AI가 당신의 직무·관심사에 맞는<br />
          채용·채용 관련 프로그램만 골라 알려드립니다.
        </h2>
        <div className="w-full max-w-[320px] aspect-[4/3] bg-bg-light rounded-2xl mb-12 flex items-center justify-center text-accent/30">
          <BrainCircuit size={80} />
        </div>
        <Button onClick={startOnboarding} className="w-full max-w-sm">시작하기</Button>
      </div>
    );
  }

  // 2-5. Onboarding Layout Wrapper
  const renderOnboardingLayout = (title: string, children: React.ReactNode, onNext: () => void, isNextDisabled: boolean) => (
    <div className="min-h-screen bg-white px-6 pt-16 pb-24 max-w-[480px] mx-auto flex flex-col animate-fade-in-up">
      <div className="flex-grow">
        <h2 className="text-[24px] font-bold text-text-main mb-8 leading-tight whitespace-pre-line">{title}</h2>
        {children}
      </div>
      <Button onClick={onNext} disabled={isNextDisabled} className="w-full mt-8">
        {currentView === 'KEYWORDS' ? '추천 받기' : '다음'}
      </Button>
    </div>
  );

  if (currentView === 'ONBOARDING_ACADEMIC') {
    return renderOnboardingLayout(
      "학업 정보를\n알려주세요",
      <div className="space-y-6">
        <Input 
          label="학년" 
          placeholder="예: 3학년" 
          value={onboardingData.academic.year}
          onChange={(e) => updateOnboarding('academic', { year: e.target.value })}
          onKeyDown={(e) => e.key === 'Enter' && (!(!onboardingData.academic.year || !onboardingData.academic.major)) && setCurrentView('ONBOARDING_CAREER')}
        />
        <Input 
          label="학과" 
          placeholder="예: 경영학과" 
          value={onboardingData.academic.major}
          onChange={(e) => updateOnboarding('academic', { major: e.target.value })}
          onKeyDown={(e) => e.key === 'Enter' && (!(!onboardingData.academic.year || !onboardingData.academic.major)) && setCurrentView('ONBOARDING_CAREER')}
        />
      </div>,
      () => setCurrentView('ONBOARDING_CAREER'),
      !onboardingData.academic.year || !onboardingData.academic.major
    );
  }

  if (currentView === 'ONBOARDING_CAREER') {
    return renderOnboardingLayout(
      "관심 분야를\n선택해주세요",
      <div className="space-y-8">
        <div>
          <label className="text-sm font-bold text-text-main mb-3 block">직무 (최대 3개)</label>
          <div className="grid grid-cols-2 gap-2">
            {JOB_ROLES.map(role => (
              <button
                key={role}
                onClick={() => updateOnboarding('career', { roles: handleToggle(onboardingData.career.roles, role) })}
                className={`h-12 rounded-lg text-sm font-medium border transition-colors ${
                  onboardingData.career.roles.includes(role) 
                  ? 'border-primary bg-primary/5 text-primary' 
                  : 'border-border text-text-gray hover:bg-bg-light'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-bold text-text-main mb-3 block">산업 (최대 3개)</label>
          <div className="grid grid-cols-2 gap-2">
            {INDUSTRIES.map(ind => (
              <button
                key={ind}
                onClick={() => updateOnboarding('career', { industries: handleToggle(onboardingData.career.industries, ind) })}
                className={`h-12 rounded-lg text-sm font-medium border transition-colors ${
                  onboardingData.career.industries.includes(ind) 
                  ? 'border-primary bg-primary/5 text-primary' 
                  : 'border-border text-text-gray hover:bg-bg-light'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      </div>,
      () => setCurrentView('ONBOARDING_PERSONAL'),
      onboardingData.career.roles.length === 0
    );
  }

  if (currentView === 'ONBOARDING_PERSONAL') {
    const isNextDisabled = !onboardingData.personal.name || !onboardingData.personal.email;
    return renderOnboardingLayout(
      "기본 정보를\n입력해주세요",
      <div className="space-y-6">
        <Input 
          label="이름" 
          placeholder="홍길동" 
          value={onboardingData.personal.name}
          onChange={(e) => updateOnboarding('personal', { name: e.target.value })}
          onKeyDown={(e) => e.key === 'Enter' && !isNextDisabled && setCurrentView('KEYWORDS')}
        />
        <Input 
          label="이메일" 
          placeholder="example@yonsei.ac.kr" 
          type="email"
          value={onboardingData.personal.email}
          onChange={(e) => updateOnboarding('personal', { email: e.target.value })}
          onKeyDown={(e) => e.key === 'Enter' && !isNextDisabled && setCurrentView('KEYWORDS')}
        />
        <div>
          <label className="text-sm font-medium text-text-main mb-2 block">선호 고용형태</label>
          <div className="flex flex-wrap gap-2">
            {EMPLOYMENT_TYPES.map(type => (
              <button
                key={type}
                onClick={() => updateOnboarding('personal', { employmentType: handleToggle(onboardingData.personal.employmentType, type) })}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  onboardingData.personal.employmentType.includes(type)
                  ? 'border-primary bg-primary text-white'
                  : 'border-border text-text-gray bg-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>,
      () => setCurrentView('KEYWORDS'),
      isNextDisabled
    );
  }

  if (currentView === 'KEYWORDS') {
    const addKeyword = () => {
      if (keywordInput.trim() && !onboardingData.keywords.includes(keywordInput.trim())) {
        setOnboardingData(prev => ({ ...prev, keywords: [...prev.keywords, keywordInput.trim()] }));
        setKeywordInput('');
      }
    };
    return renderOnboardingLayout(
      "관심 키워드를\n선택해주세요",
      <div>
        <div className="flex gap-2 mb-4">
          <Input 
            placeholder="예: UX, 파이썬, 스타트업..." 
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addKeyword()}
            className="flex-grow"
          />
          <Button onClick={addKeyword} variant="secondary" className="px-4">추가</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {onboardingData.keywords.map(k => (
            <div key={k} className="flex items-center gap-1 bg-bg-light px-3 py-1.5 rounded-lg text-sm text-text-main font-medium">
              #{k}
              <button 
                onClick={() => setOnboardingData(prev => ({...prev, keywords: prev.keywords.filter(kw => kw !== k)}))}
                className="ml-1 text-text-gray hover:text-status-error"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>,
      finishKeywords,
      onboardingData.keywords.length === 0
    );
  }

  // 5.5 Alert Modal
  if (currentView === 'ALERT_MODAL') {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-[360px] rounded-2xl p-8 text-center shadow-modal animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
            <Bell size={32} />
          </div>
          <h3 className="text-[20px] font-bold text-text-main mb-2">신규 공고 알림을 받으시겠어요?</h3>
          <p className="text-text-gray text-sm mb-8 leading-relaxed">
            새로운 채용 공고나 관련 프로그램이 등록될 때<br/>이메일로 먼저 알려드릴게요.
          </p>
          <div className="space-y-3">
            <Button onClick={() => handleAlertOptIn(true)} className="w-full">네, 받을게요</Button>
            <Button onClick={() => handleAlertOptIn(false)} variant="secondary" className="w-full text-text-gray border-none bg-transparent hover:bg-bg-light">괜찮아요, 나중에 받을게요</Button>
          </div>
        </div>
      </div>
    );
  }

  // 6. AI Processing
  if (currentView === 'AI_PROCESSING') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center animate-fade-in-up">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-8 animate-pulse-slow">
          <BrainCircuit size={40} className="text-primary" />
        </div>
        <h2 className="text-[20px] font-bold text-text-main mb-2">
          {processStep === 0 && "AI가 당신에게 맞는 공고를 분석하는 중입니다..."}
          {processStep === 1 && "직무 적합도 평가 중..."}
          {processStep === 2 && "키워드 매칭 중..."}
        </h2>
      </div>
    );
  }

  // 7. Recommendations (Main App)
  if (currentView === 'RECOMMENDATIONS' || currentView === 'SAVED') {
    return (
      <div className="min-h-screen bg-white animate-fade-in-up">
        <Header notifications={notifications} onNotificationRead={() => setNotifications(prev => prev.map(n => ({...n, isRead: true})))} />
        
        <main className="max-w-[1440px] mx-auto px-6 py-8 md:py-16">
          {currentView === 'RECOMMENDATIONS' ? (
            <>
              {/* Priority Picks */}
              <section className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <h2 className="text-[24px] font-bold text-text-main">Priority Pick</h2>
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">Top 3</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {priorityJobs.map(job => (
                    <JobCard 
                      key={job.id} 
                      job={job} 
                      onClick={() => goToDetail(job)} 
                      onTagClick={handleTagClick}
                      isPriority 
                    />
                  ))}
                </div>
              </section>

              {/* Listings with Filters and Tabs */}
              <section>
                {/* Tabs */}
                <div className="flex items-center border-b border-border mb-6">
                  <button 
                    onClick={() => setActiveTab('채용')}
                    className={`px-6 py-3 font-bold text-[16px] transition-colors relative ${activeTab === '채용' ? 'text-primary' : 'text-text-gray'}`}
                  >
                    채용
                    {activeTab === '채용' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
                  </button>
                  <button 
                    onClick={() => setActiveTab('비교과')}
                    className={`px-6 py-3 font-bold text-[16px] transition-colors relative ${activeTab === '비교과' ? 'text-primary' : 'text-text-gray'}`}
                  >
                    비교과
                    {activeTab === '비교과' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
                  </button>
                </div>

                {/* Filters */}
                <div className="bg-bg-light rounded-[12px] p-4 mb-8">
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    {/* Search */}
                    <div className="relative flex-grow w-full md:w-auto">
                      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-gray" />
                      <input 
                        type="text" 
                        placeholder="키워드 검색 (제목, 기업명, 태그)" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-[44px] pl-10 pr-4 rounded-[8px] border border-border text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    
                    {/* Filter Toggle (Mobile) or Inline (Desktop) */}
                    <Button 
                      variant="secondary" 
                      onClick={() => setShowFilters(!showFilters)}
                      className={`md:hidden w-full flex items-center gap-2 justify-center ${activeFilterCount > 0 ? 'border-primary text-primary' : ''}`}
                    >
                       <Filter size={18} /> 필터 {activeFilterCount > 0 && `(${activeFilterCount})`}
                    </Button>

                    {/* Desktop Filters / Collapsible Mobile Filters */}
                    <div className={`
                      flex-col md:flex-row gap-4 w-full md:w-auto
                      ${showFilters ? 'flex' : 'hidden md:flex'}
                    `}>
                      <div className="relative w-full md:w-[180px]">
                        <select 
                          value={filterIndustry}
                          onChange={(e) => setFilterIndustry(e.target.value)}
                          className="w-full h-[44px] px-3 rounded-[8px] border border-border text-sm focus:outline-none focus:border-primary appearance-none bg-white cursor-pointer"
                        >
                          <option value="All">산업 전체</option>
                          {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                        </select>
                         <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-gray text-xs">▼</div>
                      </div>

                      <div className="relative w-full md:w-[140px]">
                        <select 
                          value={filterEmployment}
                          onChange={(e) => setFilterEmployment(e.target.value)}
                          className="w-full h-[44px] px-3 rounded-[8px] border border-border text-sm focus:outline-none focus:border-primary appearance-none bg-white cursor-pointer"
                        >
                          <option value="All">고용형태 전체</option>
                          {EMPLOYMENT_TYPES
                            .filter(type => type !== '상관없음') // Filter out "Any" option for cleaner UI
                            .map(type => <option key={type} value={type}>{type}</option>)
                          }
                        </select>
                         <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-gray text-xs">▼</div>
                      </div>

                      {(searchQuery || filterIndustry !== 'All' || filterEmployment !== 'All') && (
                        <button 
                           onClick={resetFilters}
                           className="text-text-gray text-sm underline hover:text-primary whitespace-nowrap self-center"
                        >
                          초기화
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Result Count */}
                <div className="mb-4 text-sm text-text-gray">
                   총 <span className="font-bold text-primary">{filteredListedJobs.length}</span>건의 공고
                </div>

                {/* Job Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredListedJobs.length > 0 ? (
                    filteredListedJobs.map(job => (
                      <JobCard 
                        key={job.id} 
                        job={job} 
                        onClick={() => goToDetail(job)} 
                        onTagClick={handleTagClick}
                      />
                    ))
                  ) : (
                    <div className="col-span-3 py-20 text-center text-text-gray bg-bg-light rounded-xl">
                      검색 결과가 없습니다.
                    </div>
                  )}
                </div>
              </section>
            </>
          ) : (
            // Saved View
            <section>
              <h2 className="text-[24px] font-bold text-text-main mb-8">저장한 공고</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {SAMPLE_JOBS.filter(j => savedJobs.has(j.id)).length > 0 ? (
                    SAMPLE_JOBS.filter(j => savedJobs.has(j.id)).map(job => (
                      <JobCard key={job.id} job={job} onClick={() => goToDetail(job)} onTagClick={handleTagClick} />
                    ))
                 ) : (
                   <div className="col-span-3 py-20 text-center text-text-gray bg-bg-light rounded-xl">
                      아직 저장된 공고가 없습니다.
                   </div>
                 )}
              </div>
            </section>
          )}
        </main>
        
        {/* Simple Tab Bar for mobile/demo purpose to switch between Home/Saved */}
        <div className="fixed bottom-8 right-8 z-30">
          <button 
            onClick={() => setCurrentView(currentView === 'SAVED' ? 'RECOMMENDATIONS' : 'SAVED')}
            className="w-14 h-14 rounded-full bg-text-main text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
          >
            <Bookmark fill={currentView === 'SAVED' ? "white" : "none"} />
          </button>
        </div>
      </div>
    );
  }

  // 8. Detail View
  if (currentView === 'DETAIL' && selectedJob) {
    const isSaved = savedJobs.has(selectedJob.id);
    return (
      <div className="min-h-screen bg-bg-light py-8 px-4 flex justify-center animate-fade-in-up">
        <div className="w-full max-w-[800px] bg-white rounded-[24px] shadow-lg overflow-hidden flex flex-col relative">
          {/* Header */}
          <div className="p-8 border-b border-border relative">
            <button 
              onClick={() => setCurrentView('RECOMMENDATIONS')}
              className="absolute top-8 left-8 text-text-gray hover:text-text-main hover:bg-bg-light p-2 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="mt-8">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-lg mb-4">
                {selectedJob.type} · {selectedJob.subtype}
              </span>
              <h1 className="text-[28px] font-bold text-text-main mb-2 leading-tight">{selectedJob.title}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-text-gray text-[15px]">
                <span className="flex items-center gap-1.5 font-medium text-text-main">
                  <Building2 size={16} /> {selectedJob.company}
                </span>
                <span className="hidden sm:block text-gray-300">|</span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={16} /> {selectedJob.deadline} 마감
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 flex-grow">
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedJob.tags.map(t => <Tag key={t} label={`#${t}`} onClick={() => {
                setSearchQuery(t);
                setCurrentView('RECOMMENDATIONS');
              }} />)}
            </div>

            <div className="bg-bg-light rounded-xl p-6 mb-8">
              <h3 className="text-primary font-bold mb-2 flex items-center gap-2">
                 <BrainCircuit size={18} /> AI 추천 이유
              </h3>
              <p className="text-text-main leading-relaxed">
                {selectedJob.reason}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-[18px] mb-4 text-text-main">상세 내용</h3>
              <p className="text-text-gray leading-relaxed whitespace-pre-line">
                {selectedJob.description}
              </p>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-6 border-t border-border bg-white sticky bottom-0 flex gap-4">
            <Button 
              variant="outline" 
              className="flex-1 max-w-[120px]"
              onClick={() => toggleSave(selectedJob.id)}
            >
               {isSaved ? '저장됨' : '저장하기'}
            </Button>
            <Button 
              className={`flex-1 transition-all duration-300 ${isApplied ? 'bg-status-success hover:bg-status-success border-transparent' : ''}`}
              onClick={() => {
                  setIsApplied(true);
                  // Optional: Show toast or feedback
              }}
              disabled={isApplied}
            >
              {isApplied ? (
                  <span className="flex items-center gap-2">
                    <Check size={18} /> 지원 완료
                  </span>
              ) : '신청하기'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;