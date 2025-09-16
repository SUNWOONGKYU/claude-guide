// Markdown to HTML 변환 스크립트
// 이 스크립트는 Claude_설치_가이드_v1.1.md를 완전한 HTML로 변환합니다

const fs = require('fs');
const path = require('path');

// Markdown 파일 읽기
const markdownPath = path.join(__dirname, 'Claude_설치_가이드_v1.1.md');
const markdown = fs.readFileSync(markdownPath, 'utf8');

// 간단한 Markdown to HTML 변환 함수들
function convertMarkdownToHTML(md) {
    let html = md;

    // 제목 변환 (H1-H6)
    html = html.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
    html = html.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // 볼드 텍스트
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // 이탤릭 텍스트
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // 링크
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // 이미지
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

    // 코드 블록
    html = html.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');

    // 인라인 코드
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // 리스트 처리 (간단한 버전)
    html = html.replace(/^\* (.+)$/gim, '<li>$1</li>');
    html = html.replace(/^- (.+)$/gim, '<li>$1</li>');
    html = html.replace(/^\d+\. (.+)$/gim, '<li>$1</li>');

    // 줄바꿈
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';

    // 수평선
    html = html.replace(/^---$/gim, '<hr>');

    return html;
}

// HTML 템플릿
const htmlTemplate = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Claude 4종 & VS Code 설치 가이드 v1.1</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        ${convertMarkdownToHTML(markdown)}
    </div>
</body>
</html>`;

// HTML 파일 저장
const outputPath = path.join(__dirname, 'full-content.html');
fs.writeFileSync(outputPath, htmlTemplate, 'utf8');

console.log('✅ Markdown이 HTML로 변환되었습니다: full-content.html');
console.log('📌 이제 이 내용을 index.html의 <main> 섹션에 복사하세요.');

// 스타일시트도 별도로 생성
const cssContent = `
/* 별도 스타일시트 파일 */
/* index.html의 <style> 태그 내용을 여기로 이동 가능 */
`;

fs.writeFileSync(path.join(__dirname, 'style.css'), cssContent, 'utf8');