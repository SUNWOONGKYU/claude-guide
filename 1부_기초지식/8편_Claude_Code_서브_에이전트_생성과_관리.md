# 8편 | Claude Code 서브 에이전트 생성과 관리

---

서브 에이전트는 Claude Code에서 특정 작업을 전담하는 전문가 AI입니다. 마치 회사에서 개발팀, 디자인팀, QA팀을 따로 두는 것처럼, 각 분야별 전문 에이전트를 만들어 활용할 수 있습니다. 이번 편에서는 이러한 서브 에이전트를 직접 생성하고 관리하는 실전 방법을 알아봅니다.

## 1. 서브 에이전트 생성 및 설정 방법

### `/agents` 명령어 통합 관리 인터페이스

서브 에이전트는 `/agents` 명령어를 통해 생성 및 관리합니다. Claude Code 채팅창에 `/agents`를 입력하면 서브 에이전트를 관리할 수 있는 대화형 메뉴가 나타납니다. 마치 앱의 설정 메뉴처럼 원하는 기능을 선택해서 사용할 수 있습니다.

```bash
/agents  # Claude Code 채팅창에 입력
```

입력하면 다음과 같은 메뉴 옵션들이 표시되어 원하는 작업을 선택할 수 있습니다:

- **View All Agents**: 기본 제공, 사용자, 프로젝트 에이전트 전체 목록 조회
- **Create New Agent**: 가이드형 에이전트 생성 (Claude가 자동 생성 + 사용자 커스터마이징)
- **Edit Existing Agent**: 기존 에이전트의 프롬프트, 도구 권한, 모델 수정
- **Delete Agent**: 불필요한 에이전트 안전 삭제
- **Active Agent Status**: 중복 이름 에이전트 시 우선순위 표시
- **Tool Permission Manager**: 모든 사용 가능한 도구 시각적 관리 (MCP 도구 포함)

이 중에서 필요한 작업을 선택하면 Claude Code가 해당 기능을 실행합니다.

### 서브 에이전트 생성 단계별 가이드

**1단계: 통합 관리 인터페이스 접속 및 생성 옵션 선택**

```bash
/agents
```
위 명령어를 입력한 후 메뉴에서 "Create New Agent"를 선택합니다.

**2단계: 기본 정보 입력**
- **이름**: 서브 에이전트의 고유 식별자 (예: code-reviewer, test-generator)
  - 소문자와 하이픈만 사용
  - 역할을 명확히 나타내는 이름 선택
  - 15자 이내 권장
  
- **설명**: 언제 이 에이전트가 호출될지 설명
  - Claude가 자동 선택 시 참고하는 핵심 정보
  - 구체적인 트리거 조건 포함
  - 프로액티브 키워드 포함 권장
  
- **모델 선택**:
  - Haiku: 빠르고 저렴, 단순 반복 작업용
  - Sonnet: 균형잡힌 성능, 일반 개발 작업용
  - Opus: 고품질, 복잡한 분석과 설계용

**3단계: 시스템 프롬프트 작성**
서브 에이전트의 성격과 작업 방식을 상세히 기술합니다. 구체적일수록 더 정확한 결과를 얻을 수 있습니다.

```markdown
당신은 15년 경력의 사이버보안 전문가입니다.

## 주요 역할
- 코드 보안 취약점 탐지
- 보안 강화 방안 제시
- 보안 코딩 가이드라인 검증

## 검토 기준
1. **Critical**: 즉시 수정 필요한 심각한 보안 위험
2. **Warning**: 잠재적 보안 위험, 수정 권장
3. **Suggestion**: 보안 향상을 위한 제안사항

## 응답 형식
각 발견사항을 위험도별로 분류하여 구체적인 수정 방법과 코드 예시를 함께 제시해주세요.
```

**4단계: 도구 권한 설정**
필요한 도구만 선택적으로 부여합니다. 보안과 집중도를 위해 최소 권한 원칙을 적용합니다.

**전체 도구 목록**:

파일 시스템 도구:
- **read**: 파일 내용 읽기 (모든 분석 에이전트 필수)
- **write**: 파일 생성/수정 (개발 에이전트 필수)
- **edit**: 파일의 특정 부분 수정
- **list**: 디렉토리 목록 조회
- **grep**: 텍스트 패턴 검색 (코드 분석에 필수)
- **glob**: 파일 패턴 매칭
- **diff**: 파일 변경사항 비교 (리뷰 에이전트 필수)

실행 도구:
- **bash**: 시스템 명령어 실행 (고위험, 제한적 사용)
- **python**: Python 스크립트 실행
- **node**: Node.js 스크립트 실행

네트워크 도구:
- **fetch**: HTTP 요청 (API 테스트 에이전트)
- **curl**: 고급 네트워크 요청
- **websearch**: 웹 검색
- **webfetch**: 웹 페이지 내용 가져오기

**도구별 위험도 분류**:
- 🔴 **고위험** (신중한 할당 필요): 
  - bash (시스템 명령어 실행)
  - write, edit (파일 수정)
  - network 관련 도구 (외부 접속)
- 🟡 **중위험** (대부분 안전):
  - read (파일 읽기)
  - grep, glob (검색)
  - python, node (스크립트 실행)
- 🟢 **저위험** (모든 에이전트에 안전):
  - diff (비교)
  - list (목록 조회)

**5단계: 검토 및 수정**
생성된 서브 에이전트 내용을 검토하고 필요시 세부 조정을 수행합니다.

**6단계: 저장 및 활성화**
저장하면 즉시 사용 가능한 상태가 됩니다.

## 2. 서브 에이전트 설정 파일 구조 분석

### 서브 에이전트 설정 파일의 두 가지 구성 요소

서브 에이전트는 하나의 `.md` 파일로 만들어지며, 이 파일은 크게 두 부분으로 나뉩니다.

**1. YAML 설정부 (상단)** - Claude Code 메인 에이전트가 읽는 부분
**2. 마크다운 지시문 (하단)** - 서브 에이전트가 읽는 부분

### YAML이란 무엇인가

YAML은 "YAML Ain't Markup Language"의 약자로, 사람이 읽기 쉬운 데이터 직렬화 표준입니다. JSON이나 XML보다 간결하고 읽기 쉬워서 설정 파일에 널리 사용됩니다.

**YAML의 특징**:
- 들여쓰기로 구조를 표현 (탭 대신 스페이스 사용)
- 콜론(:)으로 키와 값을 구분
- 대괄호([])로 리스트 표현
- 하이픈(---)으로 문서 구분

**YAML 기본 문법**:
```yaml
# 주석은 해시(#)로 시작
name: value              # 키-값 쌍
number: 123             # 숫자
boolean: true           # 불린값
list: [item1, item2]    # 리스트 (인라인)
multiline: |            # 여러 줄 텍스트
  첫 번째 줄
  두 번째 줄
```

### 실제 파일 예시

```yaml
---                              # ← YAML 시작
name: security-auditor           # ← 서브 에이전트 이름
description: 보안 검토를 수행합니다. use PROACTIVELY for security.  # ← 언제 호출할지
tools: [read, grep, bash]        # ← 사용 가능한 도구들
model: opus                      # ← AI 모델 (haiku/sonnet/opus)
---                              # ← YAML 끝

당신은 15년 경력의 보안 전문가입니다.    # ← 여기부터 마크다운

## 검토할 보안 항목
- SQL 인젝션 취약점
- XSS 공격 가능성
- 인증/인가 문제

## 보고서 작성 방법
발견한 문제를 다음과 같이 분류하세요:
- 🔴 Critical: 즉시 수정 필요
- 🟡 Warning: 개선 권장
- 🔵 Info: 참고사항
```


### YAML 설정부 작성법 (4개 필드)

**1. name (필수)** - 서브 에이전트 이름
```yaml
name: security-auditor  # 소문자와 하이픈만 사용, 15자 이내
```
- 역할을 명확히 나타내는 이름 선택
- 예: `code-reviewer`, `test-generator`, `api-designer`

**2. description (필수)** - 언제 호출할지 설명
```yaml
description: 보안 검토 전문가. use PROACTIVELY for security review. MUST BE USED before deployment.
```
- 자동 호출을 위한 프로액티브 키워드 포함 (`use PROACTIVELY`, `MUST BE USED`)
- 구체적인 트리거 조건 명시

**3. tools (선택)** - 사용 가능한 도구
```yaml
tools: [read, grep, bash]  # 필요한 도구만 선택
```
- 생략하면 Claude Code 메인 에이전트의 모든 도구 사용 가능 (MCP 도구 포함)
- 최소 권한 원칙 적용 권장
- MCP 도구: Claude Code에 연결된 외부 도구들 (파일시스템, 데이터베이스, API 등)도 함께 사용 가능

**4. model (선택)** - AI 모델 선택
```yaml
model: opus  # haiku(저렴), sonnet(균형), opus(고품질)
```
- 작업 복잡도에 따라 선택
- 생략 시 Claude Code 메인 에이전트와 동일한 모델 사용

### 마크다운 지시문 작성법

마크다운 부분은 서브 에이전트에게 구체적인 작업 방법을 알려줍니다. 역할 정의, 업무 범위, 작업 프로세스, 평가 기준, 출력 형식을 명확히 작성하면 더 정확한 결과를 얻을 수 있습니다.

## 3. 설정 파일 저장 위치와 우선순위 관리

### 저장 위치별 특성

**프로젝트별 저장** (`.claude/agents/`)
- 범위: 해당 프로젝트에서만 사용
- 용도: 프로젝트 특수 요구사항
- 관리: Git으로 버전 관리
- 우선순위: 최우선
- 예시 경로: `/my-project/.claude/agents/team-reviewer.md`

**사용자별 저장** (`~/.claude/agents/`)
- 범위: 모든 프로젝트에서 사용
- 용도: 개인 작업 스타일
- 관리: 개인 백업 필요
- 우선순위: 프로젝트 레벨보다 낮음
- 예시 경로: `/Users/username/.claude/agents/my-helper.md`

### 우선순위 충돌 시 해결방법

동일한 이름의 서브 에이전트가 여러 위치에 있을 때:

```
프로젝트 레벨 (최우선)
    ↓ (없으면)
사용자 레벨 (사용)
```

예시: `code-reviewer`라는 이름의 서브 에이전트가 두 곳 모두에 있다면, 프로젝트 폴더의 것이 실행됩니다.

## 4. 프로액티브 키워드 활용법

프로액티브 키워드는 서브 에이전트를 자동으로 호출하게 만드는 특별한 단어들입니다. 사용자가 직접 서브 에이전트를 호출하지 않아도, Claude Code 메인 에이전트가 작업 내용을 분석해서 적절한 서브 에이전트를 자동으로 선택하고 실행합니다.

예를 들어, "코드를 검토해줘"라고 요청하면 description에 프로액티브 키워드가 있는 code-reviewer가 자동으로 실행됩니다. 마치 개인 비서가 상황을 파악하고 적절한 전문가를 부르는 것과 같습니다.

### 핵심 프로액티브 키워드

**"use PROACTIVELY"**
- 가장 강력한 자동 실행 트리거
- 관련 작업 감지 시 즉시 실행
- 예: `"use PROACTIVELY for security review"`

**"MUST BE USED"**
- 특정 조건에서 반드시 실행
- 강제성이 가장 높음
- 예: `"MUST BE USED before deployment"`

**"immediately after"**
- 특정 이벤트 직후 실행
- 순서가 중요한 작업에 사용
- 예: `"immediately after code changes"`

**"automatically invoke"**
- 조건 충족 시 자동 호출
- 백그라운드 작업에 적합
- 예: `"automatically invoke for test generation"`

### YAML description 필드 작성 예시

YAML 설정부의 description 필드에 프로액티브 키워드를 넣는 방법:

```yaml
# ❌ 나쁜 예시 (너무 모호함)
description: "코드를 검토하는 에이전트"

# ✅ 좋은 예시 (구체적이고 프로액티브)
description: "Code security auditor. use PROACTIVELY for vulnerability scanning. MUST BE USED before commits. Specializes in SQL injection, XSS, and authentication issues."
```

### YAML description 필드의 키워드 조합 전략

YAML description 필드에서 여러 프로액티브 키워드를 조합하여 더 정확한 자동 호출을 만드는 방법:

**다중 트리거 설정** (여러 상황에서 자동 실행):
```yaml
description: "Performance optimizer. use PROACTIVELY when response time > 1s. MUST BE USED before production deployment. automatically invoke during load testing."
```

**동의어 포함** (비슷한 요청에도 반응):
```yaml
description: "Bug hunter. use PROACTIVELY for debugging, error analysis, issue tracking, problem solving, troubleshooting."
```


**작성일: 2025년 9월 3일 / 글자수: 5,117자 / 작성자: Claude / 프롬프터: 써니**
