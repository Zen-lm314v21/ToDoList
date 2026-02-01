import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // GitHub Pagesのリポジトリ名がサブディレクトリになる場合はここを設定します
  // basePath: "/repository-name",
};

export default nextConfig;
