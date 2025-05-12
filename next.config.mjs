import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable:  process.env.NODE_ENV !== "production", // https://github.com/serwist/serwist/issues/54#issuecomment-2760476227
});

export default withSerwist({
  // Your Next.js config
});