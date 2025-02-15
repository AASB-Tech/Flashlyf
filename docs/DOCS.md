# FlashLyf Documentation

## Table of Contents

- [FlashLyf Documentation](#flashlyf-documentation)
  - [Table of Contents](#table-of-contents)
  - [Tech Stack:](#tech-stack)
    - [Frontend:](#frontend)
    - [Backend:](#backend)
    - [Testing:](#testing)
  - [Getting started with Docker](#getting-started-with-docker)
    - [Prerequisites](#prerequisites)
    - [Configure Docker environment variables](#configure-docker-environment-variables)
    - [Starting the app with docker.](#starting-the-app-with-docker)
  - [Environment variables documentation](#environment-variables-documentation)
  - [Api documentation](#api-documentation)
  - [Directory documentation](#directory-documentation)
  - [Frontend documentation](#frontend-documentation)
  - [Testing documentation](#testing-documentation)
  - [Version history](#version-history)
  - [Analytics documentation](#analytics-documentation)
  - [External documentation of 3rd party libraries, frameworks, and tools](#external-documentation-of-3rd-party-libraries-frameworks-and-tools)

## Tech Stack:

### Frontend:
- NextJS / React
- TailwindCSS
- React Query
- Recoil
- Axios
- Font Awesome

### Backend:
- Django + Django REST / Python
- PostGreSQL
- Redis

### Testing:
- PyUnit
- Selenium

## Getting started with the app-manager

The app manager is custom built way to automate and manage FlashLyf DevOps tasks from the command line. <br />
It is the easiest way to run, stop, deploy, and monitor the app. <br />
The code for the app manager is in `app_manager.py` <br />
Commands can be executed with the app manager by typing: <br />
`python app_manager.py <command>` <br />
To list the currently available commands together with a description of what they do type: <br />
`python app_manager.py help` <br />

## Getting started with Docker

### Prerequisites

First you need to install Docker. Note that that this app has not yet been tested with Docker Desktop. <br />
`sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin` <br />
For detailed installation instruction go to the [docker installation manual](https://docs.docker.com/engine/install/)

Once docker is installed copy either `docker-compose-production.yml` or `docker-compose-development.yml` to `docker-compose.yml`.  <br />
Use the following command to do so: <br />
`cp docker-compose-development.yml docker-compose.yml` <br />

NOTE: If you are running the postgresql, redis, or nginx services on your host machine you need to turn them off  <br />  
      Or else you might connect to those services instead of the docker services.  <br />
      You can stop those services with the following commands:
```
sudo systemctl stop postgresql
sudo systemctl stop redis-server
sudo systemctl stop nginx
# Optional: Check the status of each service to make sure they stopped.
sudo systemctl status postgresql 
sudo systemctl status redis-server
sudo systemctl status nginx
```
It may be possible run both these services on your host machine and in the docker containers,  <br />
if the docker containers have differents (external) ports for those containers.

## Configure Docker environment variables

If you are using Docker for production then change the following environment variables to your host machine IP address or your domain name. <br /> 
Example:
```
NEXTJS_ORIGIN=http://192.168.1.10
NEXT_PUBLIC_API_SERVER_URL=192.168.1.10
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.
API server lives on [http://localhost:8000/api](http://localhost:8000/api)

### Starting the app with docker

To start the app with docker and rebuild the docker images (if there are code changes or ENV variable changes) use the following command: <br />
`docker compose up --build` <br />
(Use CTRL+C to shut down the containers) <br />
To start the app with docker without rebuilding the images use the following command: <br />
`docker compose up` <br />
To stop the app use the following command: <br />
`docker compose down` <br />
To check if the app containers are running and on which ports use the following command: <br />
`docker ps`
To check the memory and cpu usage of the docker containers use the following command: <br />
`docker stats`

## Environment variables documentation

[Click here](https://github.com/AASB-Tech/Flashlyf/blob/development/docs/ENV_VARS_DOCS.md) to see the full environment variables  documentation.

## Api documentation

[Click here](https://github.com/AASB-Tech/Flashlyf/blob/development/docs/API_DOCS.md) to see the full API documentation.

## Directory documentation

[Click here](https://github.com/AASB-Tech/Flashlyf/blob/development/docs/DIRECTORY_STRUCTURE_DOCS.md) to see the full directory documentation.

## Frontend documentation

[Click here](https://github.com/AASB-Tech/Flashlyf/blob/development/docs/FRONTEND_DOCS.md) to see the full frontend documentation.

## Testing documentation

[Click here](https://github.com/AASB-Tech/Flashlyf/blob/development/docs/TEST_DOCS.md) to see the full testing documentation.

## Version history

[Click here](https://github.com/AASB-Tech/Flashlyf/blob/main/docs/VERSION_HISTORY.md) to see the full version history documentation.

## Analytics documentation

[Click here](https://github.com/AASB-Tech/Flashlyf/blob/main/docs/ANALYTICS_DOCS.md) to see the full version analytics documentation.

## External documentation of 3rd party libraries, frameworks, and tools

- [Next.js Docs](https://nextjs.org/docs)
- [React.js Docs](https://reactjs.org/docs/getting-started.html)
- [React Query Docs](https://react-query-v2.tanstack.com/overview)
- [Recoil Docs](https://recoiljs.org/docs/introduction/getting-started/)
- [TailwindCSS Docs](https://tailwindcss.com/docs/installation)
- [Axios Docs](https://axios-http.com/docs/intro)
- [React Toastify Docs](https://fkhadra.github.io/react-toastify/introduction/)
- [NPM Docs](https://docs.npmjs.com/)
- [Django Docs](https://docs.djangoproject.com/en/4.2/)
- [Django REST Framework Docs](https://www.django-rest-framework.org/)
- [PostGreSQL Docs](https://www.postgresql.org/docs/)
- [Redis Docs](https://redis.io/docs/)
- [Date FNS Docs](https://date-fns.org/docs/Getting-Started)
- [Font Awesome Docs](https://fontawesome.com/docs)
- [Nginx Docs](https://nginx.org/en/docs/)
- [Paypal Developer Docs](https://developer.paypal.com/docs/online/)
- [Docker Docs](https://docs.docker.com)
