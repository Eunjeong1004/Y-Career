import { Job, Notification } from './types';

export const JOB_ROLES = [
  '기획 / 전략', '마케팅 / 광고', '디자인 / 콘텐츠', '개발 / IT', '데이터 / 분석', '운영 / 교육'
];

export const INDUSTRIES = [
  'IT / 테크', '미디어 / 엔터', '교육/EdTech', '금융 / 핀테크', '소비재 / 패션 / 뷰티', '공공 / 연구'
];

export const EMPLOYMENT_TYPES = [
  '인턴', '정규직', '계약직', '파트타임', '프리랜서', '상관없음'
];

export const SAMPLE_JOBS: Job[] = [
  // Priority Pick 1
  {
    id: '1',
    type: '채용',
    subtype: '계약직',
    title: '기술사업화 전담인력 채용',
    company: '연세대학교 산학협력단',
    industry: '공공 / 연구',
    employment_type: '계약직',
    firm_type: '학교',
    region: '서울',
    deadline: '2025-12-30',
    tags: ['기술사업화', 'R&D 관리', '산학협력', '특허'],
    description: '기술사업화 및 산학협력 업무 수행. 연구개발 성과의 실용화·이전 추진.',
    reason: 'R&D 성과를 사업화하고 산학협력 업무에 관심이 많은 학생에게 적합한 포지션입니다.'
  },
  // Priority Pick 2
  {
    id: '11',
    type: '비교과',
    subtype: '부트캠프',
    title: '2026 연세그룹 Co-Work 동계인턴',
    company: '학생복지처 경력개발팀',
    industry: '교육/EdTech',
    employment_type: '-',
    firm_type: '학교',
    region: '연세대',
    deadline: '2025-12-15',
    tags: ['직무경험', '인턴십', '팀협업'],
    description: '현직자 멘토 기반 5주 직무 부트캠프. 실무 중심 프로젝트 진행.',
    reason: '실제 기업 프로젝트 기반의 팀 인턴십으로, 실무 경험을 쌓고 싶은 학생에게 추천합니다.'
  },
  // Priority Pick 3 (Custom from Spec)
  {
    id: 'p3',
    type: '비교과',
    subtype: '워크숍',
    title: '커리어 디자인 워크숍 (겨울학기)',
    company: '미래교육원',
    industry: '교육/EdTech',
    employment_type: '-',
    firm_type: '학교',
    region: '연세대',
    deadline: '2025-12-10',
    tags: ['진로설계', '자기분석', '워크숍'],
    description: '자기 진단을 기반으로 한 체계적인 진로 설계 워크숍입니다.',
    reason: '자기 진단을 기반으로 한 체계적인 진로 설계가 필요한 학생에게 도움이 되는 프로그램입니다.'
  },
  // Remaining CSV Data
  {
    id: '2',
    type: '채용',
    subtype: '인턴',
    title: 'Social Commerce Marketing/Ops 인턴',
    company: '피키 주식회사',
    industry: 'IT / 테크',
    employment_type: '인턴',
    firm_type: '일반기업',
    region: '서울 외',
    deadline: '2025-11-20',
    tags: ['소셜커머스', '마케팅전략', '운영'],
    description: 'SNS 기반 커머스 마케팅 및 운영 실무. 데이터 기반 캠페인 운영.',
    reason: '소셜 커머스 운영 경험을 쌓고 싶은 분께 추천합니다.'
  },
  {
    id: '3',
    type: '채용',
    subtype: '인턴',
    title: 'Service Engineer Intern',
    company: '지멘스헬시니어스',
    industry: 'IT / 테크',
    employment_type: '채용연계 인턴',
    firm_type: '대기업',
    region: '서울',
    deadline: '2025-11-29',
    tags: ['헬스케어', '서비스엔지니어', '장비관리'],
    description: '헬스케어 장비 점검·관리. 고객지원 및 채용연계형 인턴십.',
    reason: '글로벌 헬스케어 기업에서의 실무 경험 기회입니다.'
  },
  {
    id: '4',
    type: '채용',
    subtype: '인턴',
    title: '기업금융부문 인턴 채용',
    company: '파인스트리트자산운용',
    industry: '금융 / 핀테크',
    employment_type: '인턴',
    firm_type: '일반기업',
    region: '서울',
    deadline: '2025-11-30',
    tags: ['기업금융', 'IB', '투자분석'],
    description: '기업금융·자산운용 리서치 보조. 투자 분석 및 보고서 작성.',
    reason: '자산운용 및 투자 분석 직무를 희망하는 분께 적합합니다.'
  },
  {
    id: '5',
    type: '채용',
    subtype: '인턴',
    title: '투자팀 인턴 채용 공고',
    company: '매쉬업벤처스',
    industry: '금융 / 핀테크',
    employment_type: '인턴',
    firm_type: '일반기업',
    region: '서울',
    deadline: '2025-11-25',
    tags: ['VC', '스타트업투자', '심사역'],
    description: '초기 스타트업 투자 심사 및 리서치. VC 업무 전반 수행.',
    reason: 'VC 심사역 커리어를 꿈꾸는 분들을 위한 인턴십입니다.'
  },
  {
    id: '6',
    type: '채용',
    subtype: '인턴',
    title: '주식부 인턴(3개월) 채용',
    company: '다이와증권CMK',
    industry: '금융 / 핀테크',
    employment_type: '인턴',
    firm_type: '외국계기업',
    region: '서울',
    deadline: '2025-12-15',
    tags: ['Equity', '증권', '외국계', '금융'],
    description: '주식 리서치 지원. 증권·외국계 IB 실제 업무 경험 제공.',
    reason: '외국계 증권사 리서치 업무를 경험할 수 있습니다.'
  },
  {
    id: '7',
    type: '채용',
    subtype: '정규직',
    title: '2026 상반기 채용 공고',
    company: 'McKinsey & Company',
    industry: '금융 / 핀테크',
    employment_type: '정규직',
    firm_type: '외국계기업',
    region: '서울',
    deadline: '2026-01-05',
    tags: ['전략컨설팅', '글로벌컨설팅'],
    description: 'Strategy·Ops 프로젝트 참여. 글로벌 컨설팅 업무 수행.',
    reason: '최고 수준의 전략 컨설팅 경험을 쌓을 수 있습니다.'
  },
  {
    id: '8',
    type: '채용',
    subtype: '정규직',
    title: 'Generative AI Engineer',
    company: '(주)딥엑스',
    industry: 'IT / 테크',
    employment_type: '정규직',
    firm_type: '일반기업',
    region: '서울',
    deadline: '2025-12-31',
    tags: ['Generative AI', 'DNN 최적화', 'AI 개발자'],
    description: '생성형 AI 개발 및 모델 최적화. 딥러닝 기반 엔지니어링.',
    reason: '최신 생성형 AI 모델 개발 및 최적화에 도전해보세요.'
  },
  {
    id: '9',
    type: '채용',
    subtype: '정규직',
    title: '백엔드 개발자(전문연구요원)',
    company: '크몽',
    industry: 'IT / 테크',
    employment_type: '정규직',
    firm_type: '일반기업',
    region: '서울',
    deadline: '2025-12-10',
    tags: ['백엔드개발', '플랫폼', '병역특례'],
    description: '백엔드 시스템 개발·운영. 전문연구요원 가능.',
    reason: '대규모 트래픽을 처리하는 플랫폼 백엔드 경험을 제공합니다.'
  },
  {
    id: '10',
    type: '채용',
    subtype: '정규직',
    title: '2026년 신입사원 채용',
    company: '한국마사회',
    industry: '공공 / 연구',
    employment_type: '정규직',
    firm_type: '공공기관',
    region: '경기',
    deadline: '2025-12-20',
    tags: ['공공기관', '행정직', '기술직'],
    description: '공공기관 신입 채용. 행정·기술 분야 모집.',
    reason: '안정적인 공공기관에서의 커리어 시작을 추천합니다.'
  },
  {
    id: '12',
    type: '비교과',
    subtype: '워크숍',
    title: 'Streamlit으로 AI 서비스 개발하기',
    company: '학술문화처 UML',
    industry: 'IT / 테크',
    employment_type: '-',
    firm_type: '학교',
    region: '연세대',
    deadline: '2025-11-25',
    tags: ['AI', 'Streamlit', '파이썬'],
    description: 'AI·Streamlit을 활용한 웹서비스 개발 실습.',
    reason: 'AI·웹 개발에 관심 있는 학생이 포트폴리오 프로젝트를 만들기 좋은 실습형 워크숍입니다.'
  },
  {
    id: '13',
    type: '비교과',
    subtype: '워크숍',
    title: '생성형 AI를 활용한 챗봇 제작',
    company: '학술문화처 UML',
    industry: 'IT / 테크',
    employment_type: '-',
    firm_type: '학교',
    region: '연세대',
    deadline: '2025-11-19',
    tags: ['챗봇', 'GPT', '프롬프트엔지니어링'],
    description: 'ChatGPT 기반 챗봇 제작. API 연동 및 구조 이해.',
    reason: 'LLM 활용 및 챗봇 제작 실무를 익히고 싶은 분께 추천합니다.'
  },
  {
    id: '14',
    type: '비교과',
    subtype: '워크숍',
    title: '데이터 수집 AI Agent 제작',
    company: '학술문화처 UML',
    industry: 'IT / 테크',
    employment_type: '-',
    firm_type: '학교',
    region: '연세대',
    deadline: '2025-11-13',
    tags: ['AI Agent', 'Make', '자동화'],
    description: 'Make를 활용한 데이터 수집·요약 자동화 에이전트 제작.',
    reason: '노코드 툴을 활용한 업무 자동화에 관심 있는 분께 추천합니다.'
  },
  {
    id: '15',
    type: '비교과',
    subtype: '특강',
    title: '금융권 취업 치트키 특강(IB편)',
    company: '학생복지처 경력개발팀',
    industry: '금융 / 핀테크',
    employment_type: '-',
    firm_type: '학교',
    region: '연세대',
    deadline: '2025-11-25',
    tags: ['IB', '금융권', '특강'],
    description: '증권사 IB 직무 소개 및 취업 전략 공유.',
    reason: '금융권 IB 직무 취업 전략을 세우고 싶은 분께 유익합니다.'
  },
  {
    id: '16',
    type: '비교과',
    subtype: '멘토링',
    title: '삼성SDS 현직자 멘토링(SW직무)',
    company: '학생복지처 경력개발팀',
    industry: 'IT / 테크',
    employment_type: '-',
    firm_type: '학교',
    region: '연세대',
    deadline: '2025-11-02',
    tags: ['SW', '대기업', '멘토링'],
    description: 'SW 직무 중심 커리어 멘토링 세션.',
    reason: 'SW 개발자로서의 진로 고민을 현직자와 나눌 수 있습니다.'
  },
  {
    id: '17',
    type: '비교과',
    subtype: '특강',
    title: '현직자가 전하는 인사 직무(LF)',
    company: '학생복지처 경력개발팀',
    industry: '소비재 / 패션 / 뷰티',
    employment_type: '-',
    firm_type: '학교',
    region: '연세대',
    deadline: '2025-10-01',
    tags: ['HR', '인사', '특강'],
    description: 'LF 인사 직무 설명 및 채용 트렌드 공유.',
    reason: 'HR 직무의 실제 업무와 채용 포인트를 배울 수 있습니다.'
  },
  {
    id: '18',
    type: '비교과',
    subtype: '컨설팅',
    title: '입사지원서 1:1 컨설팅',
    company: '학생복지처 경력개발팀',
    industry: '교육/EdTech',
    employment_type: '-',
    firm_type: '학교',
    region: '연세대',
    deadline: '2025-10-01',
    tags: ['컨설팅', '이력서', '자소서'],
    description: '이력서/자기소개서 작성 1:1 코칭.',
    reason: '완성도 높은 입사지원서를 준비하고 싶은 분께 추천합니다.'
  },
  {
    id: '19',
    type: '비교과',
    subtype: '특강',
    title: '반도체 공정설계 직무 특강(삼성전자)',
    company: '학생복지처 경력개발팀',
    industry: 'IT / 테크',
    employment_type: '-',
    firm_type: '학교',
    region: '연세대',
    deadline: '2025-06-27',
    tags: ['반도체', '공정설계', '이공계'],
    description: '반도체 공정설계 직무 소개 및 실무 이해.',
    reason: '반도체 산업 및 공정 설계 직무에 대한 이해를 높일 수 있습니다.'
  },
  {
    id: '20',
    type: '비교과',
    subtype: '특강',
    title: '데이터 마케팅 직무 특강(Starbucks)',
    company: '학생복지처 경력개발팀',
    industry: '소비재 / 패션 / 뷰티',
    employment_type: '-',
    firm_type: '학교',
    region: '연세대',
    deadline: '2025-07-08',
    tags: ['마케팅', '데이터마케팅'],
    description: '스타벅스 데이터 기반 마케팅 직무 특강.',
    reason: '데이터를 활용한 마케팅 전략 수립 과정을 배울 수 있습니다.'
  }
];

export const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    message: '새로운 프로그램 "커리어 디자인 워크숍"이 등록되었습니다.',
    isRead: false,
    timestamp: '방금 전'
  },
  {
    id: 'n2',
    message: '"학부 연구생 모집" 공고 내용이 업데이트 되었습니다.',
    isRead: false,
    timestamp: '1시간 전'
  },
  {
    id: 'n3',
    message: '프로필 완성도가 80%입니다. 스킬을 추가해보세요!',
    isRead: true,
    timestamp: '1일 전'
  }
];