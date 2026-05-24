# @partyvelope/react-block-cms

블록 기반 콘텐츠 CMS 툴킷. **SSR/SEO 안전한 렌더러**와 **실시간 미리보기 admin 에디터**를 제공하며, 데이터 계층(백엔드)에 종속되지 않습니다.

- 🧱 블록 타입: hero, rich-text, card-grid, two-column, process-steps, faq, cta, text-panel, callout, table, card-list, info-columns, raw-html, floating-toolbar
- 🖥️ 렌더러는 **서버 컴포넌트 안전**(hooks 없음) → Next.js App Router / RSC에서 그대로 SSR, 봇 크롤링/SEO OK
- ✏️ 에디터: 블록 추가·순서변경·표시토글·삭제 + 타입별 폼 + **편집 옆 실시간 미리보기** + 토스트 + 삭제 확인
- 🔌 데이터 계층 무관: `onSave(payload)` 콜백만 연결하면 REST/GraphQL/무엇이든
- 🎨 비개발자용 입력: 제목 강조·줄바꿈·이미지 좌우 위치 등 태그 없이 칸으로 입력

## 설치

```bash
npm i @partyvelope/react-block-cms
```

peer deps: `react >=18`, `react-dom >=18`.

## 스타일 (둘 중 하나)

**A. 컴파일된 CSS (Tailwind 불필요)**
```ts
import "@partyvelope/react-block-cms/styles.css";
```

**B. Tailwind v4 프로젝트** — `globals.css`:
```css
@import "tailwindcss";
@import "@partyvelope/react-block-cms/theme.css";
@source "../node_modules/@partyvelope/react-block-cms/dist";
```

### 테마 색상 변경 (어느 방식이든)
```css
:root {
  --cms-primary: #16a34a;
  --cms-primary-dark: #15803d;
  --cms-primary-surface: #f0fdf4;
  --cms-primary-light: #dcfce7;
  --cms-primary-300: #86efac;
}
```

## 공개 페이지 렌더링 (서버 컴포넌트)

```tsx
import { BlockRenderer, type CmsBlock } from "@partyvelope/react-block-cms";

export default async function Page() {
  const blocks: CmsBlock[] = await loadBlocksFromAnywhere(); // 당신의 백엔드
  return <BlockRenderer blocks={blocks} />;
}
```

## Admin 에디터 (클라이언트 컴포넌트)

```tsx
"use client";
import { PageEditor } from "@partyvelope/react-block-cms/editor";
import type { AdminPage, SavePagePayload } from "@partyvelope/react-block-cms";

export default function Editor({ page }: { page: AdminPage }) {
  const handleSave = async (payload: SavePagePayload) => {
    await fetch(`/api/pages/${page.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  };
  return <PageEditor page={page} onSave={handleSave} />;
}
```

## 데이터 형태

```ts
interface CmsBlock { id: string; type: BlockType; data: BlockDataMap[BlockType]; order?: number; visible?: boolean; }
interface AdminPage { slug: string; displayName: string; theme: { seo?: { title?: string; description?: string } }; blocks: AdminBlock[]; }
interface SavePagePayload { displayName?: string; theme?: {...}; blocks: { type; data; visible }[]; }
```

블록의 `data`는 JSON이므로 DB에 그대로 저장(JSONB 권장).

## 빌드 / 배포

```bash
npm run build         # tsup(JS+타입) + tailwind(CSS)
npm publish --access public   # 스코프 공개 패키지
```

## 라이선스
MIT
