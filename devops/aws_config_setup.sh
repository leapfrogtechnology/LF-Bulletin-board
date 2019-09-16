#! /bin/sh
mkdir ~/.aws
echo "[default]" > ~/.aws/credentials 
echo aws_access_key_id = $AWS_ACCESS_KEY_ID >> ~/.aws/credentials
echo aws_secret_access_key = $AWS_SECRET_ACCESS_KEY >> ~/.aws/credentials

echo "[default]" > ~/.aws/config
echo output = json>> ~/.aws/config
echo region = $REGION_NAME >> ~/.aws/config

$1
$2
