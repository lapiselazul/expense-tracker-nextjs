import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: true, // https://github.com/serwist/serwist/issues/54
});

export default withSerwist({
  // Your Next.js config
});