# 설치 가이드 미리보기 방법

## 🖼️ 이미지가 보이지 않는 경우

로컬에서 HTML 파일을 직접 열면 보안 정책으로 인해 이미지가 표시되지 않을 수 있습니다.

### 해결 방법

#### 1. VS Code Live Server 사용 (권장)
1. VS Code에서 `install` 폴더 열기
2. Live Server 확장 설치 (`ritwickdey.liveserver`)
3. `index.html` 우클릭 → "Open with Live Server"
4. 브라우저에서 자동으로 열림

#### 2. Python 로컬 서버
```bash
# install 폴더로 이동
cd "G:\내 드라이브\Claude&Claude Code\install"

# Python 서버 실행
python -m http.server 8000
```
브라우저에서 http://localhost:8000 접속

#### 3. Node.js 로컬 서버
```bash
# http-server 설치 (최초 1회)
npm install -g http-server

# install 폴더에서 실행
http-server
```

#### 4. GitHub Pages
- 온라인: https://sunwoongkyu.github.io/claude-guide/install/
- 이미지가 자동으로 표시됨

## 📁 파일 구조
```
install/
├── index.html          # 메인 가이드 (GitHub Pages용)
├── index_local.html    # 로컬 테스트용
├── guide.md           # 마크다운 버전
└── screenshots/       # 이미지 파일들
    └── integrated-environment-compressed.jpg
```

## 🔗 관련 링크
- [메인 페이지](https://sunwoongkyu.github.io/claude-guide/)
- [설치 가이드](https://sunwoongkyu.github.io/claude-guide/install/)
- [입문 가이드](https://sunwoongkyu.github.io/claude-guide/introduction/)