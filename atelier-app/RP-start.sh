#!/bin/bash

cp ./nginx.conf /tmp
sudo docker run --name asi2-nginx-container --network host -v /tmp/nginx.conf:/etc/nginx/nginx.conf:ro --rm nginx


# <For mac and win
# sudo docker run --name asi2-nginx-container -p 80:80 -v C:/Users/tomda/Documents/asi2/CoursReact/atelier-app/nginx.conf:/etc/nginx/nginx.conf:ro --rm nginx

