#bin/zsh

sudo /bin/systemctl start grafana-server

#sudo /bin/systemctl restart grafana-server

cd MiddlewareGrafanaServer
nodejs server.js

cd ..

cd AngularProject
ng serve --port 8000

