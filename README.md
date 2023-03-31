## wsl 開発用 windows プロキシサーバー

### 概要

wsl で実行したサーバーを スマートフォンの実機で確認するため、プロキシサーバーを作成しました。  
プロキシサーバーの実行は wsl ではなく、windows で実行する必要があります。  
また、実機は windows と 同一 LAN 内、かつ windows のネットワーク接続設定が プライベートになっている必要があります。

### 構築手順

mkcert を scoop からインストールし、localhost の SSL 証明書を発行します。  
Set-ExecutionPolicy の設定や、scoop を既にインストールしている場合は mkcert だけインストールし、 SSL 証明書を発行します。

```PowerShell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
scoop bucket add extras
scoop install mkcert
mkcert localhost
```

### 使い方

wsl で実行した オリジン ( `http(s)://<ipaddress>:<port>` ) を target オプションに指定して実行します。  
プロキシサーバーのポートを変更したい場合は、ポートを指定します。(デフォルトは 8888)

```PowerShell
npm start -- -t 'https://172.20.211.84:8080/' -p 9000
```

よく使用するオリジンを指定する場合は、`package.json` の `start`コマンドに オプションを追加します。

```
"start": "@powershell -NoProfile -ExecutionPolicy Unrestricted -Command node index.js -t 'https://172.20.211.84:8080/'"
```

次のコマンドを実行するだけで プロキシサーバーを立ち上げることができます。

```PowerShell
npm start
```
