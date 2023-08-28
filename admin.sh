if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
    # For instance, will be example_kaggle_key
    # echo "your password is: $SSH_PASSWORD"
    echo "Here is the list of the admin platforms"
    echo "Portrainer => https://$SSH_HOST:9443"
    echo "File Manager => http://$SSH_HOST:8081"
    echo "Proxy Manager => http://$SSH_HOST:81"
    echo "SERVER 1 SCHEMA Manager => $SERVER_1_URL/schema/snapshot?export=yaml&access_token=$SERVER_1_TOKEN"
fi