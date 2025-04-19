# 願いリストアプリケーション

願いを共有して「いいね」できるSNSアプリケーションです。Nuxt.js、Supabase、Prismaを使用しています。

## セットアップと開発

### 前提条件
- Node.js v18以上
- npm v9以上
- GitHubアカウント
- Supabaseアカウント

### 1. リポジトリのクローンと依存関係のインストール

```bash
# リポジトリのクローン
git clone <リポジトリURL>
cd nuxt-tutorials/sec15

# 依存関係のインストール
npm install
```

### 2. 環境変数の設定

`.env`ファイルをプロジェクトのルートディレクトリに作成し、以下の内容を設定します：

```
# Supabase
SUPABASE_URL="https://あなたのプロジェクトURL.supabase.co"
SUPABASE_KEY="あなたのSupabaseキー"

# Prisma
DATABASE_URL="postgresql://postgres:データベースパスワード@db.あなたのプロジェクトURL.supabase.co:5432/postgres"
```

### 3. Supabaseの設定

1. [Supabase](https://supabase.com)でアカウントを作成します
2. 新しいプロジェクトを作成します
3. 作成したプロジェクトの設定から以下の情報を取得します：
   - Project URL (SUPABASE_URL用)
   - API Keys > anon/public (SUPABASE_KEY用)
   - Database Password (DATABASE_URL用)

### 4. データベースのマイグレーション

Prismaを使用してデータベースのマイグレーションを実行します：

```bash
npx prisma migrate dev
```

### 5. GitHub OAuth認証の設定

1. GitHubで新しいOAuth Appを作成します:
   - [GitHub Developer Settings](https://github.com/settings/developers) > OAuth Apps > New OAuth App
   - Application name: 願いリストアプリ（任意）
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `https://あなたのプロジェクトURL.supabase.co/auth/v1/callback`

2. 作成したOAuth AppのClient IDとClient Secretを取得します

3. Supabaseで認証設定を行います:
   - Authentication > Providers > GitHub
   - Enable GitHubをオンに
   - Client IDとClient Secretを入力
   - 設定を保存

### 6. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスして、アプリケーションを使用できます。

## 機能

- GitHubログイン認証
- 願いの投稿・編集・削除
- 願いへの「いいね」機能
- 公開願いリストの閲覧

## 本番環境へのデプロイ

```bash
# アプリケーションをビルド
npm run build

# 本番環境のプレビュー
npm run preview
```

より詳細なデプロイ情報は[Nuxt.jsのデプロイドキュメント](https://nuxt.com/docs/getting-started/deployment)を参照してください。
