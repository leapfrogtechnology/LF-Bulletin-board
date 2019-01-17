#! /bin/sh
apk add curl && apk update

echo  "X-Vault-Token:$VAULT_TOKEN" $VAULT_SERVER/v1/secret/$VAULT_SECRET_DIR/$STAGE/app 
curl --header "X-Vault-Token:$VAULT_TOKEN" $VAULT_SERVER/v1/secret/$VAULT_SECRET_DIR/$STAGE/app | jq .data | jq -r "to_entries|map(\"\(.key)=\(.value|tostring)\")|.[]" > ../app/.env
