# Server config for centos

1. Add new user and give him root priviledges => https://www.digitalocean.com/community/tutorials/how-to-add-and-delete-users-on-a-centos-7-server

2. Use sudo without password

- Run the following command: `sudo visudo`

- Add the following to the bottom of the file and substitute 'username' with your username: `username ALL=(ALL) NOPASSWD:ALL`

2. Disable root login ( Optional ) => https://www.ionos.com/help/server-cloud-infrastructure/getting-started/important-security-information-for-your-server/deactivating-the-ssh-root-login/


## Git

1. Install git => https://www.digitalocean.com/community/tutorials/how-to-install-git-on-centos-7

2. Persists git credentials: Run `git config --global credential.helper store` and `sudo git config --global credential.helper store`

3. Configure git credentials
    - `git config --global user.name "Your Name"`
    - `git config --global user.email "you@example.com"`

4. Check git configs: `git config --list`
## Git Action

1. Install shasum running `sudo yum install -y perl-Digest-SHA` => https://github.com/portainer/portainer/issues/507

1. Install dotnet 6: `sudo yum install libicu -y` => https://github.com/actions/runner/issues/2511

1. Setup git actions: https://github.com/username/project/settings/actions/runners/new?arch=x64&os=linux

# Docker

1. Install docker => https://docs.docker.com/engine/install/centos/
2. Install docker-compose => https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-centos-7
3. Allow to run docker-compose as sudo: `sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose` => https://stackoverflow.com/questions/38775954/sudo-docker-compose-command-not-found

4. run `sudo systemctl enable docker.service`

5. run `sudo systemctl start docker`


# Run server management tools
1. Remove apache `sudo yum erase httpd httpd-tools apr apr-util`

2. Clone dedicated repo

3. go to the base path of the cloned repo and run `s`


# Run project 

1. Configurer git actions

2. Push to the dedicated branch

3. Make sure everything is working as expected