# next-blog
Next.js + Typescript + Remarkableによる個人用ブログプラットフォーム

## 概要
- 記事は[blog-resources](https://github.com/SKKbySSK/blog-resources) で管理
  - `site.json`にタイトルやサブタイトル、パーマリンク、Markdown等を設定する
  - 任意の場所にMarkdownを配置

## 更新手順
**TODO**
1. `npm run update`を実行する
2. ローカルで記事をチェック
3. リモートでも同様に実行

## ビルド詳細
1. [blog-resources](https://github.com/SKKbySSK/blog-resources) を`resources/blog-resources`へクローン
2. `site.json`を読み込んでパーマリンクとMarkdownを関連付ける
3. Next.jsのStatic Generation(SSG)を用いて、静的ページを生成
