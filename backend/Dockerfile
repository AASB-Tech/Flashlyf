FROM python:3.11-alpine AS production

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

RUN apk update \
    && apk add --virtual build-essential gcc python3-dev musl-dev \
    && apk add postgresql-dev \
    && pip install psycopg2

COPY . /backend
WORKDIR /backend

# add and run as non-root user (this causes an error?)
# RUN adduser -D nonrootuser
# USER nonrootuser

#RUN pip install --no-cache-dir -r requirements.txt
RUN pip install -r requirements.txt

# Run the script to create superuser (UNTESTED)
# RUN python create_superuser.py

RUN chmod +x /backend/entrypoint.sh
RUN sed -i 's/\r$//g' /backend/entrypoint.sh

ENTRYPOINT ["/backend/entrypoint.sh"]
CMD ["gunicorn", "--threads=4", "--worker-class=gthread", "--max-requests", "1200", "django_server.wsgi"]

# We will need to revisit this file as this doess't really allow to get rid of dev dependencies
# Look into poetry / pipenv for this
# We'll need to manage migration carefully

FROM python:3.11-alpine AS development

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

RUN apk update \
    && apk add --virtual build-essential gcc python3-dev musl-dev \
    && apk add postgresql-dev \
    && pip install psycopg2

COPY . /backend
#RUN chown -R /backend
WORKDIR /backend

# add and run as non-root user (this causes an error?)
# RUN adduser -D nonrootuser
# USER nonrootuser

#RUN pip install --no-cache-dir -r requirements.txt
RUN pip install -r requirements.txt

RUN chmod +x /backend/entrypoint.sh
RUN sed -i 's/\r$//g' /backend/entrypoint.sh

ENTRYPOINT ["/backend/entrypoint.sh"]
CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]