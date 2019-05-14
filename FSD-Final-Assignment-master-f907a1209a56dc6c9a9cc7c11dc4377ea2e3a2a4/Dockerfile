# Base image 
FROM mhart/alpine-node:8.9

# User info
LABEL maintainer="saravanaprasad.dhandapani@cognizant.com"
LABEL Name=mean-notes-app Version=0.0.1

RUN mkdir -p /app

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .
