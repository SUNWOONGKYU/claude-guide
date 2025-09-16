# GitHub 저장소 구조 정리 보고서

## 현재 구조 분석

### 루트 디렉토리 (/)
```
claude-guide/
├── index.html                     # Claude & Claude Code 입문 메인 페이지 (기존)
├── README.md                       # 저장소 설명
├── Claude_Code_입문_완전판.html    # 입문 가이드 전체 HTML
├── 1부_기초지식/                   # 입문 가이드 세부 문서들 (19개 파일)
│   ├── 1편_Claude란_무엇인가.md
│   ├── 2편_프롬프트_엔지니어링_기초편.md
│   └── ... (총 19개 편)
├── Claude설치가이드/               # 설치 가이드 폴더
│   ├── index.html                  # 통합 랜딩 페이지 (새로 만든)
│   ├── Claude_설치_가이드_v1.0.md
│   ├── Claude_설치_가이드_v1.1.md
│   ├── Claude_설치_가이드_v1.2.md
│   ├── install/                    # v1.2 HTML 버전
│   │   ├── index.html              # 설치 가이드 HTML
│   │   └── 스크린샷/               # 19개 스크린샷
│   ├── introduction/               # 입문 가이드로 이동
│   │   └── index.html
│   └── 스크린샷/                   # 원본 스크린샷
└── 기타 파일들 (count_chars.py 등)
```

## 문제점

1. **중복된 콘텐츠**
   - 입문 가이드가 루트와 Claude설치가이드/introduction에 중복
   - index.html이 여러 곳에 산재

2. **비직관적 구조**
   - 설치 가이드가 서브폴더에 있어 URL이 길어짐
   - 메인 페이지 역할이 불명확

3. **파일 정리 필요**
   - 임시 파일들이 섞여있음
   - 판매 전략 등 내부 문서가 공개됨

## 제안하는 새 구조

### 옵션 1: 깔끔한 통합 구조
```
claude-guide/
├── index.html                      # 통합 메인 페이지 (설치 + 입문 선택)
├── README.md                        # 저장소 설명
├── install/                        # 설치 가이드
│   ├── index.html                  # v1.2 설치 가이드 HTML
│   ├── guide.md                    # v1.2 마크다운
│   └── screenshots/                # 스크린샷 19개
├── introduction/                   # 입문 가이드
│   ├── index.html                  # 입문 가이드 메인
│   └── chapters/                   # 각 챕터별 문서
│       ├── 01_what_is_claude.md
│       ├── 02_prompt_engineering.md
│       └── ...
├── assets/                         # 공통 리소스
│   ├── css/
│   ├── js/
│   └── images/
└── docs/                           # 문서화
    ├── v2_update_plan.md
    └── development_notes.md
```

### 옵션 2: 간단한 구조
```
claude-guide/
├── index.html           # 메인 페이지
├── install.html         # 설치 가이드
├── introduction.html    # 입문 가이드
├── screenshots/         # 모든 스크린샷
└── docs/               # 추가 문서
```

## 정리 작업 필요 항목

### 1. 삭제할 파일
- count_*.py (글자수 계산 스크립트)
- 임시파일_삭제예정/
- 판매전략 관련 문서들 (비공개로 이동)

### 2. 이동/통합할 파일
- 중복된 index.html 정리
- 입문 가이드 통합
- 스크린샷 폴더 통합

### 3. 추가할 파일
- 통합 CSS 파일
- 404.html 페이지
- sitemap.xml

## 실행 계획

### Phase 1: 백업
1. 현재 상태 전체 백업
2. 새 브랜치 생성 (restructure-v2)

### Phase 2: 구조 재정리
1. 옵션 1의 구조로 파일 재배치
2. URL 리디렉션 설정
3. 모든 링크 업데이트

### Phase 3: 테스트 및 배포
1. 로컬 테스트
2. GitHub Pages 설정 확인
3. main 브랜치에 병합

## 예상 결과

### 개선된 URL 구조
- 메인: https://sunwoongkyu.github.io/claude-guide/
- 설치: https://sunwoongkyu.github.io/claude-guide/install/
- 입문: https://sunwoongkyu.github.io/claude-guide/introduction/

### 장점
- 명확한 콘텐츠 구분
- 짧고 직관적인 URL
- 유지보수 용이
- 확장 가능한 구조