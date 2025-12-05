import streamlit as st
import pandas as pd
import time
from openai import OpenAI

# Page Config
st.set_page_config(
    page_title="Y-OUR Career",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS to approximate the React app's look
st.markdown("""
    <style>
    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
    
    html, body, [class*="css"] {
        font-family: 'Pretendard', sans-serif;
    }
    
    .main-header {
        font-size: 32px;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 16px;
    }
    
    .sub-header {
        font-size: 16px;
        color: #666;
        margin-bottom: 48px;
    }
    
    .stButton > button {
        width: 100%;
        border-radius: 8px;
        height: 48px;
        font-weight: 600;
    }
    
    .primary-button > button {
        background-color: #000;
        color: white;
    }
    
    .job-card {
        background-color: white;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 16px;
        transition: all 0.2s;
    }
    
    .job-card:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        transform: translateY(-2px);
    }
    
    .tag {
        display: inline-block;
        background-color: #f3f4f6;
        padding: 4px 12px;
        border-radius: 999px;
        font-size: 12px;
        color: #4b5563;
        margin-right: 8px;
        margin-bottom: 8px;
    }
    
    /* Hide Streamlit branding */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    </style>
""", unsafe_allow_html=True)

# State Management
if 'page' not in st.session_state:
    st.session_state.page = 'LANDING'
if 'user_profile' not in st.session_state:
    st.session_state.user_profile = {
        'academic': {'year': '', 'major': ''},
        'career': {'roles': [], 'industries': []},
        'personal': {'name': '', 'email': '', 'employmentType': []},
        'keywords': [],
        'notificationOptIn': False
    }
if 'openai_api_key' not in st.session_state:
    st.session_state.openai_api_key = ''
if 'selected_job' not in st.session_state:
    st.session_state.selected_job = None
if 'saved_jobs' not in st.session_state:
    st.session_state.saved_jobs = set()

# Load Data
@st.cache_data
def load_data():
    try:
        df = pd.read_csv('career_all_20.csv')
        # Ensure tags are lists
        df['tags'] = df['tags'].apply(lambda x: [t.strip() for t in str(x).split(',')] if pd.notna(x) else [])
        return df
    except Exception as e:
        st.error(f"Error loading data: {e}")
        return pd.DataFrame()

df = load_data()

# Constants
JOB_ROLES = ['기획 / 전략', '마케팅 / 광고', '디자인 / 콘텐츠', '개발 / IT', '데이터 / 분석', '운영 / 교육']
INDUSTRIES = ['IT / 테크', '미디어 / 엔터', '교육/EdTech', '금융 / 핀테크', '소비재 / 패션 / 뷰티', '공공 / 연구']
EMPLOYMENT_TYPES = ['인턴', '정규직', '계약직', '파트타임', '프리랜서', '상관없음']

# --- Views ---

def render_landing():
    col1, col2, col3 = st.columns([1, 2, 1])
    with col2:
        st.markdown("<div style='text-align: center; color: #3b82f6; font-weight: 700; font-size: 24px; margin-bottom: 32px;'>Y-OUR Career</div>", unsafe_allow_html=True)
        st.markdown("<h1 style='text-align: center; font-size: 32px; margin-bottom: 16px;'>커리어연세의 중요한 공고,<br>놓치지 않게.</h1>", unsafe_allow_html=True)
        st.markdown("<p style='text-align: center; color: #666; margin-bottom: 48px;'>AI가 당신의 직무·관심사에 맞는<br>채용·채용 관련 프로그램만 골라 알려드립니다.</p>", unsafe_allow_html=True)
        
        # Placeholder for BrainCircuit image/icon
        st.markdown("<div style='display: flex; justify-content: center; margin-bottom: 48px;'><div style='width: 320px; height: 240px; background-color: #f3f4f6; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 48px;'>🧠</div></div>", unsafe_allow_html=True)
        
        if st.button("시작하기", type="primary", use_container_width=True):
            st.session_state.page = 'ONBOARDING_ACADEMIC'
            st.rerun()

def render_onboarding_academic():
    st.markdown("## 학업 정보를\n## 알려주세요")
    
    year = st.text_input("학년", placeholder="예: 3학년", value=st.session_state.user_profile['academic']['year'])
    major = st.text_input("학과", placeholder="예: 경영학과", value=st.session_state.user_profile['academic']['major'])
    
    if st.button("다음", type="primary", disabled=not (year and major)):
        st.session_state.user_profile['academic']['year'] = year
        st.session_state.user_profile['academic']['major'] = major
        st.session_state.page = 'ONBOARDING_CAREER'
        st.rerun()

def render_onboarding_career():
    st.markdown("## 관심 분야를\n## 선택해주세요")
    
    st.markdown("### 직무 (최대 3개)")
    selected_roles = st.multiselect("직무 선택", JOB_ROLES, default=st.session_state.user_profile['career']['roles'])
    
    st.markdown("### 산업 (최대 3개)")
    selected_industries = st.multiselect("산업 선택", INDUSTRIES, default=st.session_state.user_profile['career']['industries'])
    
    if st.button("다음", type="primary", disabled=len(selected_roles) == 0):
        st.session_state.user_profile['career']['roles'] = selected_roles
        st.session_state.user_profile['career']['industries'] = selected_industries
        st.session_state.page = 'ONBOARDING_PERSONAL'
        st.rerun()

def render_onboarding_personal():
    st.markdown("## 기본 정보를\n## 입력해주세요")
    
    name = st.text_input("이름", placeholder="홍길동", value=st.session_state.user_profile['personal']['name'])
    email = st.text_input("이메일", placeholder="example@yonsei.ac.kr", value=st.session_state.user_profile['personal']['email'])
    
    st.markdown("### 선호 고용형태")
    selected_emp_types = st.multiselect("고용형태 선택", EMPLOYMENT_TYPES, default=st.session_state.user_profile['personal']['employmentType'])
    
    if st.button("다음", type="primary", disabled=not (name and email)):
        st.session_state.user_profile['personal']['name'] = name
        st.session_state.user_profile['personal']['email'] = email
        st.session_state.user_profile['personal']['employmentType'] = selected_emp_types
        st.session_state.page = 'KEYWORDS'
        st.rerun()

def render_keywords():
    st.markdown("## 관심 키워드를\n## 선택해주세요")
    
    # Simple keyword input
    new_keyword = st.text_input("키워드 입력 (엔터로 추가)", placeholder="예: UX, 파이썬, 스타트업...")
    if new_keyword and new_keyword not in st.session_state.user_profile['keywords']:
         # Note: Streamlit reruns on enter, so we need to handle state update carefully
         # But here we might need a button to explicitly add if we want to avoid complex state logic
         pass

    col1, col2 = st.columns([3, 1])
    with col2:
        if st.button("추가"):
            if new_keyword and new_keyword not in st.session_state.user_profile['keywords']:
                st.session_state.user_profile['keywords'].append(new_keyword)
                st.rerun()
    
    st.write("선택된 키워드:")
    for k in st.session_state.user_profile['keywords']:
        st.markdown(f"- {k}")
        
    if st.button("추천 받기", type="primary"):
        st.session_state.page = 'AI_PROCESSING'
        st.rerun()

def render_ai_processing():
    st.markdown("## AI가 당신에게 맞는 공고를 분석하는 중입니다...")
    
    # API Key Input if not present
    if not st.session_state.openai_api_key:
        api_key = st.text_input("OpenAI API Key를 입력해주세요", type="password")
        if st.button("분석 시작"):
            if api_key:
                st.session_state.openai_api_key = api_key
                st.rerun()
            else:
                st.warning("API Key가 필요합니다.")
        return

    # Simulate processing
    with st.spinner("직무 적합도 평가 중..."):
        time.sleep(1)
    with st.spinner("키워드 매칭 중..."):
        time.sleep(1)
        
    st.session_state.page = 'RECOMMENDATIONS'
    st.rerun()

def render_recommendations():
    st.title("Y-OUR Career")
    
    # Tabs
    tab1, tab2 = st.tabs(["채용", "비교과"])
    
    # Filters
    with st.expander("필터 & 검색"):
        col1, col2, col3 = st.columns(3)
        with col1:
            search_query = st.text_input("검색", placeholder="제목, 기업명, 태그")
        with col2:
            filter_industry = st.selectbox("산업", ["All"] + INDUSTRIES)
        with col3:
            filter_employment = st.selectbox("고용형태", ["All"] + EMPLOYMENT_TYPES)

    # Filter Logic
    filtered_df = df.copy()
    
    # Tab filter
    current_type = "채용" if tab1 else "비교과" # This logic is tricky with st.tabs, better to render content inside tabs
    
    with tab1:
        display_jobs(filtered_df[filtered_df['type'] == '채용'], search_query, filter_industry, filter_employment)
        
    with tab2:
        display_jobs(filtered_df[filtered_df['type'] == '비교과'], search_query, filter_industry, filter_employment)

def display_jobs(data, search, industry, employment):
    # Apply filters
    if search:
        data = data[
            data['title'].str.contains(search, case=False) | 
            data['company'].str.contains(search, case=False)
        ]
    if industry != "All":
        data = data[data['industry'] == industry]
    if employment != "All":
        data = data[data['employment_type'] == employment] # Note: might need to check subtype too
        
    st.write(f"총 {len(data)}건의 공고")
    
    for _, job in data.iterrows():
        with st.container():
            st.markdown(f"""
            <div class="job-card">
                <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                    <span style="color:#3b82f6; font-weight:600; font-size:14px;">{job['subtype']}</span>
                    <span style="color:#9ca3af; font-size:14px;">{job['deadline']} 마감</span>
                </div>
                <h3 style="font-size:18px; font-weight:700; margin-bottom:4px;">{job['title']}</h3>
                <div style="color:#4b5563; font-size:14px; margin-bottom:16px;">{job['company']}</div>
                <div style="margin-bottom:16px;">
                    {' '.join([f'<span class="tag">#{t}</span>' for t in job['tags']])}
                </div>
            </div>
            """, unsafe_allow_html=True)
            if st.button("상세보기", key=f"btn_{job['id']}"):
                st.session_state.selected_job = job
                st.session_state.page = 'DETAIL'
                st.rerun()

def render_detail():
    job = st.session_state.selected_job
    if job is None:
        st.session_state.page = 'RECOMMENDATIONS'
        st.rerun()
        return

    if st.button("← 목록으로 돌아가기"):
        st.session_state.page = 'RECOMMENDATIONS'
        st.rerun()

    st.markdown(f"""
    <div style="background:white; padding:32px; border-radius:24px; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
        <span style="background:#eff6ff; color:#3b82f6; padding:4px 12px; border-radius:8px; font-weight:700; font-size:14px;">
            {job['type']} · {job['subtype']}
        </span>
        <h1 style="font-size:28px; font-weight:700; margin-top:16px; margin-bottom:8px;">{job['title']}</h1>
        <div style="color:#6b7280; font-size:15px; margin-bottom:32px; display:flex; gap:16px;">
            <span>🏢 {job['company']}</span>
            <span>📅 {job['deadline']} 마감</span>
        </div>
        
        <div style="margin-bottom:32px;">
            {' '.join([f'<span class="tag">#{t}</span>' for t in job['tags']])}
        </div>
        
        <div style="background:#f9fafb; padding:24px; border-radius:12px; margin-bottom:32px;">
            <h3 style="color:#3b82f6; font-weight:700; margin-bottom:8px;">🧠 AI 추천 이유</h3>
            <p style="line-height:1.6;">{job.get('reason', '이 공고는 회원님의 관심사와 직무 적합도가 높습니다.')}</p>
        </div>
        
        <div style="margin-bottom:32px;">
            <h3 style="font-weight:700; font-size:18px; margin-bottom:16px;">상세 내용</h3>
            <p style="line-height:1.6; white-space: pre-line;">{job['description']}</p>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    with col1:
        if st.button("저장하기"):
            st.toast("저장되었습니다!")
    with col2:
        if st.button("지원하기", type="primary"):
            st.balloons()
            st.toast("지원이 완료되었습니다!")

# Main Routing
if st.session_state.page == 'LANDING':
    render_landing()
elif st.session_state.page == 'ONBOARDING_ACADEMIC':
    render_onboarding_academic()
elif st.session_state.page == 'ONBOARDING_CAREER':
    render_onboarding_career()
elif st.session_state.page == 'ONBOARDING_PERSONAL':
    render_onboarding_personal()
elif st.session_state.page == 'KEYWORDS':
    render_keywords()
elif st.session_state.page == 'AI_PROCESSING':
    render_ai_processing()
elif st.session_state.page == 'RECOMMENDATIONS':
    render_recommendations()
elif st.session_state.page == 'DETAIL':
    render_detail()

