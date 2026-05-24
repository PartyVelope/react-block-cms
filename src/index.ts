/**
 * @partyvelope/react-block-cms — 메인 진입점 (서버 컴포넌트 안전)
 * 공개 페이지 렌더링 + 블록 타입/헬퍼. RSC/SSR에서 사용 가능 (hooks 없음).
 */
export { default as BlockRenderer, RenderBlock } from "./BlockRenderer";
export { default as FAQSchema } from "./FaqSchema";
export * from "./blocks";
