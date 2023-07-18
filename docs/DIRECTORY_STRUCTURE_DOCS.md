# Directory Structure Documentation For FlashLyf

## Table of Contents

### /frontend_web

The frontend client website. (NextJS)

### /frontend_web/app

The pages of the app are placed here.
As well as some other app level files.

### /frontend_web/app/pageName

Each page is a subfolder in the app folder.
Each page can consist of multiple files.
The subfolder is named as the page name.

### /frontend_web/features

Here we put the main features of the app.
Each feature can consist of multiple React/JSX components,
as well as multiple CSS files an other files needed for the features.

### /frontend_web/features/featureName

Each feature is a subfolder in the features folder.
The subfolder is named as the feature name.

### /frontend_web/clientAPI

The frontend API to communicate with the Django server.

### /frontend_web/public

Publicly available files.
Public assets and static files are placed here.
Usually accessed by bots, scrapers, search engines, or other 3rd party apps.

### /frontend_web/public/images

Public image assets.

### /frontend_web/shared

Independent files that can be used by other components and features troughout the app.

### /frontend_web/shared/components

Independent React/JSX components that can be used troughout the app.

### /frontend_web/shared/components/misc

Uncatogorized independent React/JSX components that can be used troughout the app.

### /frontend_web/shared/constants

Constants that can be used troughout the app.

### /frontend_web/shared/hooks

Independent React hooks that can be used in React components.

### /frontend_web/shared/providers

Providers that can used troughout the app. Most are placed in the root layout in `frontend_web/app/layout.js`

### /frontend_web/shared/utils

Utility functions that can be used troughout the app.

### /backend

The backend server. (Django)

### /backend/django_server

Config files for the django server.

### /backend/api

All the files for FlashLyf main API server.

### /backend/api/constants

Constants for the backend.

### /backend/api/management/commands

Custom commands to use with the Django server.

### /backend/api/migrations

Changes applied to the PostGreSQL database.
The Postgres tables are defined in the models folder.

### /backend/api/tests

Tests for the Django API server.

### /backend/api/urls

The routes or URLS of the API endpoints are defined here. (Might be changed in the future to urls.py)

### /backend/api/views

All the view functions. The actual logic and proccesing of the API endpoints are defined here.

### /backend/media

All the user uploaded media files are stored here. Including images, videos, audios, and profile avatar pics.

### /docs

Files for documentation about the app.

### /testing 

Files use for testing the app.

### /testing/tests

Individual tests.

### /testing/utils

Utilities and shared code for tests.

### /testing/test_data

Dummy test data for tests.

### /monitor

An individual app for monitoring FlashLyf. (Not done yet).

### /.vscode

Config files for Visual Studio Code

### /.github

Github repo config files and github workflows.
