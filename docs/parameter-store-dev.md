# Parameter Store 登録項目

以下を AWS Systems Manager Parameter Store に登録してください。

命名規則:
- 共通プレフィックス: /twilio-front-transcribe2

AWS 配備先:
- dev: account 237710157750, region ap-northeast-1
- prod: account 353666332910, region us-east-1

## frontend
- /front/domain
- /front/auth-user-pool-id
- /front/auth-user-pool-web-client-id
- /front/cloudfront-distribution-id

## api
- /api/common-path
- /api/proxy-path

## backend
- /twilio-front-transcribe2/backend/TRANSCRIBE_TABLE_NAME
- /twilio-front-transcribe2/backend/TRANSCRIBE_LOGS_INDEX_NAME
- /twilio-front-transcribe2/backend/TRANSCRIBE_EXPORT_BUCKET
- /twilio-front-transcribe2/backend/TRANSCRIBE_EXPORT_PREFIX
- /twilio-front-transcribe2/backend/TRANSCRIBE_EXPORT_URL_EXPIRES

## frontend 推奨値
dev:
- FRONT_DOMAIN: aic3.tact-dev.jp
- FRONT_AUTH_USER_POOL_ID: ap-northeast-1_BLB8L3DYQ
- FRONT_AUTH_USER_POOL_WEB_CLIENT_ID: 4ncvaeebej54oirb8fh6ve9rej
- FRONT_API_COMMON_BASE_URL: https://flow.tact-dev.jp
- FRONT_API_PROXY_BASE_URL: https://gwzybhh623.execute-api.ap-northeast-1.amazonaws.com/dev
- FRONT_CLOUDFRONT_DISTRIBUTION_ID: E39E2GQS7YYP0O

prod:
- FRONT_DOMAIN: aic3.tactinc.jp
- FRONT_AUTH_USER_POOL_ID: us-east-1_X6rY84hDW
- FRONT_AUTH_USER_POOL_WEB_CLIENT_ID: 4ttagqlvosf6s5v9ghbds7d9br
- FRONT_API_COMMON_BASE_URL: https://flow.tactinc.jp
- FRONT_API_PROXY_BASE_URL: https://g0sm4s8hn0.execute-api.us-east-1.amazonaws.com/Prod
- FRONT_CLOUDFRONT_DISTRIBUTION_ID: E1435WV53DE7LO

配信パス設定:
- FRONT_PATH はローカル .env と Deploy ワークフロー直書き値を利用
- dev: FRONT_PATH=Transcribe
- prod: FRONT_PATH=Transcribe

## 推奨タイプ
- SecureString 推奨
  - FRONT_AUTH_USER_POOL_WEB_CLIENT_ID
  - API_COMMON_PATH
  - API_PROXY_PATH
  - TRANSCRIBE_TABLE_NAME
- String で問題ない
  - FRONT_AUTH_USER_POOL_ID
  - FRONT_DOMAIN
  - FRONT_CLOUDFRONT_DISTRIBUTION_ID
  - TRANSCRIBE_LOGS_INDEX_NAME
  - TRANSCRIBE_EXPORT_BUCKET
  - TRANSCRIBE_EXPORT_PREFIX
  - TRANSCRIBE_EXPORT_URL_EXPIRES

## 登録コマンド例
dev 例:
aws ssm put-parameter --name /front/domain --type String --value aic3.tact-dev.jp --overwrite
aws ssm put-parameter --name /front/auth-user-pool-id --type String --value ap-northeast-1_BLB8L3DYQ --overwrite
aws ssm put-parameter --name /api/proxy-path --type SecureString --value https://gwzybhh623.execute-api.ap-northeast-1.amazonaws.com/dev --overwrite
aws ssm put-parameter --name /front/cloudfront-distribution-id --type String --value E39E2GQS7YYP0O --overwrite

prod 例:
aws ssm put-parameter --name /front/domain --type String --value aic3.tactinc.jp --overwrite
aws ssm put-parameter --name /front/auth-user-pool-id --type String --value us-east-1_X6rY84hDW --overwrite
aws ssm put-parameter --name /api/proxy-path --type SecureString --value https://g0sm4s8hn0.execute-api.us-east-1.amazonaws.com/Prod --overwrite
aws ssm put-parameter --name /front/cloudfront-distribution-id --type String --value E1435WV53DE7LO --overwrite

補足:
- Parameter Store のキー名はケバブケース、ローカルとワークフローは FRONT_* で統一し、Deploy ワークフローでマッピングしてビルドへ渡します。
- FRONT_PATH は認証 path と S3 配信先 prefix の両方に使います（SSM管理対象外）。

GitHub Actions 側は Deploy ワークフローでブランチ(dev/prod)に応じたパスを取得して利用します。
