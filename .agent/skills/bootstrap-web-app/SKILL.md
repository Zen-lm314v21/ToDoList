---
name: bootstrap-web-app
description: Initialize a modern web application with Next.js, Tailwind CSS, and TypeScript.
---

# Webアプリ初期構築 (Bootstrap Web App)

このSkillは、Next.js, Tailwind CSS, TypeScriptを使用したモダンなWebアプリケーションの雛形を作成します。
ベストプラクティスに基づいたディレクトリ構成と初期設定を自動で行います。

## 前提条件 (Prerequisites)
- Node.js 18.17 以上

## 手順 (Instructions)

### 1. Next.js プロジェクトの初期化
カレントディレクトリに新しいNext.jsプロジェクトを作成します。
以下のコマンドは、対話モードをスキップし、推奨設定（App Router, TypeScript, Tailwind CSS, ESLintなど）で自動的にインストールを行います。

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-git
```
*注意: カレントディレクトリがプロジェクトのルートであり、空（または書き込み可能）であることを前提としています。*

### 2. クリーンアップと構造化 (Cleanup & Structure)
デフォルトのボイラープレート（サンプルコード）を削除し、開発しやすいクリーンな構造に整えます。

1.  **デフォルトスタイルの削除**:
    `src/app/globals.css` の中身をクリアし、Tailwindのディレクティブのみを残します。
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

2.  **`page.tsx` の簡素化**:
    `src/app/page.tsx` をシンプルな内容に置き換えます。
    ```tsx
    export default function Home() {
      return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <h1 className="text-4xl font-bold">Welcome to your new App</h1>
        </main>
      );
    }
    ```

3.  **ディレクトリの作成**:
    整理整頓のために以下のディレクトリを作成します：
    - `src/components/ui` (ボタンなどの基本UIコンポーネント用)
    - `src/lib` (ユーティリティ関数やヘルパー用)
    - `src/hooks` (カスタムReactフック用)

### 3. 動作確認 (Verification)
開発サーバーを起動して、正しくセットアップされたか確認します。

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスし、ウェルカムページが表示されれば成功です。
