Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install).
```bash
sudo apt-get install --classic heroku
```
## Add a remote repo for an existing-heroku-app
From your local repo, in the folder, run:
```bash
heroku git:remote -a [repo]
```
​
## Deploy local `dev` branch to remote Heroku `master` branch
After pulling the most recent version of the `dev` branch from git, push to the new existing remote `master` branch on Heroku (with default alias of `heroku`).
```bash
git push heroku [fromBranch]:[toHerokuBranch]
```
<!-- ​
## Seeding data
To reseed data you can execute run `npm run seed` in the online Heroku [console](https://dashboard.heroku.com/apps/kach-cpu/settings?web-console=vision-to-graph). -->