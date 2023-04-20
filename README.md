# 概要
Microsoft製のNode.jsテストツールである「playwright」を用いたブラウザテスト。  
STG環境と開発環境の画面ごとのスクリーンショットを取得して変更差分を割り出したり、
画面ごとに特定の動作を組み込んだE2Eテストを行うことが可能。  
  
大まかな汎用的な処理は `scripts/modules` 内にあるため、  
そちらをラップして任意の処理を書くのも、  
全く1から処理を書いたりも可能。


## 利用環境(推奨)
- node v12.16.1
- npm 6.13.4

※ 以上であれば問題ないと思います

# 使い方

## インストール
ローカルマシンに適切なディレクトリを作成して実行。
```bash
npm i -D playwright
npm i -D looks-same
```

## 基本
※ サンプルスクリプトで説明

1. 検証する環境のSSを撮る
2. 比較対象としてSTG環境のSSを撮る
3. 画像の差分を抽出する
4. 差分をマーカーで塗りつぶした画像を出力する
5. 出力したファイルを削除する (後片付け)

```bash
# 1 : 検証環境のスクリーンショットを取得を実行する
node scripts/samples/sample_page_browsing.js

# 2 : 比較対象の環境のスクリーンショットを取得を実行する
TARGET=reference node scripts/samples/sample_page_browsing.js

# 3 : 差分比較を実行する ※差分は `result/json/diffList.json` として出力される
node scripts/samples/sample_diff.js

# 4 : 差分をマークした画像を出力する
node scripts/samples/sample_output_diff.js

# 5 : テスト結果ファイルを削除する
node scripts/samples/sample_remove.js
```

## 環境変数 (オプション)
設定は `scripts/modules/config.js` や、`scripts/modules/setting.js` を直接変更しても良いが、  
ケースごとに細かく対応を分けたい場合は、環境変数を渡して実行することで調整する。
```
# 検証対象の環境のURL
CURRENT

# 比較対象の環境のURL
REFERENCE

# ECログインユーザーのメールアドレス
LOGINUSER

# ECログインユーザーのパスワード
LOGINPASSWORD

# 利用するブラウザ [chromium, firefox, webkit] ※いずれか
BROWSER

# 端末 [pc , sp] ※いずれか
DEVICE

# 対象の選択 [current, reference] ※いずれか
TARGET

# ヘッドレスブラウザの利用 [true, false]
HEADLESS

# ログインの有無 [true, false]
LOGIN
```

## オプションの使い方
```bash
# 検証対象の環境を渡す
CURRENT=https://www.yahoo.co.jp node scripts/samples/sample_page_browsing.js

# URLのセット(json)を渡す
JSON=browsing_page_login_url.json node scripts/samples/sample_page_browsing.js

# 単独のURLを渡す
URL=/blog/detail/001 node scripts/samples/sample_page_browsing.js

# 複数のURLを渡す
URL='/blog/list,/blog/detail/001' node scripts/samples/sample_page_browsing.js

# ヘッドレスブラウザの利用
HEADLESS=true node scripts/samples/sample_page_browsing.js
```

---

## 利用例
### 例 1
開発環境とSTG環境の各画面のSSを取得して、差分が無いか確認する (ヘッドレスで実行)
```bash
# 1 : 任意の検証環境のスクリーンショットを取得を実行する
CURRENT=https://www.yahoo.co.jp HEADLESS=true node scripts/samples/sample_page_browsing.js

# 2 : 比較対象の環境のスクリーンショットを取得を実行する
HEADLESS=true TARGET=reference node scripts/samples/sample_page_browsing.js

# 3 : 差分比較を実行する
node scripts/samples/sample_diff.js

# 4 : 差分をマークした画像を出力する
node scripts/samples/sample_output_diff.js
```

### 例 2
スマートフォン版の入力が必要な画面の確認画面をSSを取得して、差分が無いか確認する  
※ 画面操作は予めコード化しておく必要がある
```
# 1 : 任意の検証環境のスクリーンショットを取得を実行する
DEVICE=sp CURRENT=https://www.yahoo.co.jp node scripts/samples/sample_simulate_register_confirm.js

# 2 : 比較対象の環境のスクリーンショットを取得を実行する
DEVICE=sp node scripts/samples/sample_simulate_register_confirm.js

# 3 : 差分比較を実行する
DEVICE=sp node scripts/samples/sample_diff.js

# 4 : 差分をマークした画像を出力する
DEVICE=sp node node scripts/samples/sample_output_diff.js
```

#### 画面のブラウザ操作を行ってコード化する
以下を入力するとブラウザが立ち上がり、操作を記録してコードを出力してくれる。  
```bash
# 例
npx playwright codegen https://www.yahoo.co.jp
```