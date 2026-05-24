import { defineConfig } from "tsup";

export default defineConfig([
  // 메인 (서버 컴포넌트 안전): 렌더러 + 타입/헬퍼
  {
    entry: { index: "src/index.ts" },
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    external: ["react", "react-dom"],
  },
  // 에디터 (클라이언트): "use client" 배너 유지
  {
    entry: { editor: "src/editor.ts" },
    format: ["esm", "cjs"],
    dts: true,
    clean: false,
    external: ["react", "react-dom"],
    banner: { js: '"use client";' },
  },
]);
