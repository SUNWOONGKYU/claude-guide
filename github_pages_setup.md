# GitHub Pages 활성화 방법

## 1단계: GitHub 저장소로 이동
https://github.com/SUNWOONGKYU/claude-guid

## 2단계: Settings 탭 클릭
저장소 상단 메뉴에서 **Settings** 탭을 클릭하세요.

## 3단계: Pages 설정
1. 왼쪽 사이드바에서 **Pages** 클릭
2. **Source** 섹션에서:
   - **Deploy from a branch** 선택
   - **Branch**: `main` 선택
   - **Folder**: `/ (root)` 선택
3. **Save** 버튼 클릭

## 4단계: 배포 대기
- 보통 2-10분 정도 소요됩니다
- Actions 탭에서 배포 진행 상황을 확인할 수 있습니다

## 5단계: 사이트 접속
배포 완료 후 다음 URL로 접속:
**https://sunwoongkyu.github.io/claude-guid/**

## 문제 해결
만약 404 에러가 나타난다면:
1. 저장소가 public인지 확인
2. index.html 파일이 루트 디렉토리에 있는지 확인
3. GitHub Actions에서 배포 로그 확인

## 확인사항
✅ index.html 파일 존재 (완료)
✅ main 브랜치에 푸시됨 (완료)
⏳ GitHub Pages 활성화 필요 (진행 필요)