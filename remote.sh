if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
    # For instance, will be example_kaggle_key
    # echo "your password is: $SSH_PASSWORD"
    ssh "$SSH_USER@$SSH_HOST"
fi