import "@testing-library/jest-dom/vitest";

// jsdom doesn't implement IntersectionObserver; framer-motion's `whileInView`
// prop (used for the section heading fade-in) needs it to exist.
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
// @ts-expect-error - test-environment stub, not a full implementation
global.IntersectionObserver = MockIntersectionObserver;