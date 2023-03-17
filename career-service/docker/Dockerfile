FROM python:3.8

ARG VERSION
RUN pip install --upgrade pip \
    && rm -rf ~/.cache/pip

COPY requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

# Add entrypoint (this allows variable expansion)
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 6000

COPY ml_app/apps/ /apps

RUN echo "Flask Server logs" > /var/log/stdout.log

WORKDIR /

ENTRYPOINT ["sh", "-c", "/entrypoint.sh"]
