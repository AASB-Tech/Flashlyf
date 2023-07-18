#!/bin/sh

# Allow to run command everytime the server gets restarted
# We could expand upon this using STAGE?

set -o errexit
set -o pipefail
set -o nounset

echo "Current working directory:"
echo $PWD
echo "Listing files in current working directory:"
ls -a

echo "Preparing database migrations..."
python manage.py makemigrations

echo "Applying database migrations..."
python manage.py migrate

# echo "Collecting static ..."
# python manage.py collectstatic --noinput

echo "Starting server..."
exec "$@"

