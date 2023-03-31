## wsl 開発用 windows プロキシサーバー

### 概要

Charles が無料版だと 30 分おきに再起動が必要だったため、wsl で実行したサーバーへのプロキシサーバーを作成しました。

### 構築手順

- mkcert を scoop からインストールし、localhost の SSL 証明書を作成します。

```PowerShell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser # Optional: Needed to run a remote script the first time
irm get.scoop.sh | iex
scoop bucket add extras
scoop install mkcert
mkcert localhost
```

### 使い方

- wsl で実行した オリジン (`http(s)://<ipaddress>:<port>`) を target オプションに指定して実行します。
- プロキシサーバーのポートを変更したい場合は、ポートを指定します。(デフォルトは 8888)

```PowerShell
npm run start --target 'https://172.20.211.84:8080/' -p 9000
```
