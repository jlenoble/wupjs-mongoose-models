FROM mongo

MAINTAINER Jason Lenoble <jason.lenoble@gmail.com>

RUN mkdir -p /data/wup-db/scripts \
    && echo "dbpath = /data/wup-db" > /etc/mongodb.conf \
    && chown -R mongodb:mongodb /data/wup-db

COPY mongo-scripts /data/wup-db/scripts

RUN mongod --fork --logpath /var/log/mongodb.log --dbpath /data/wup-db --smallfiles \
    && CREATE_FILES=/data/wup-db/scripts/*-create.js \
    && for f in $CREATE_FILES; do mongo localhost:27017/wup $f; done \
    && mongod --dbpath /data/wup-db --shutdown \
    && chown -R mongodb:mongodb /data/wup-db

VOLUME /data/wup-db

CMD ["mongod", "--config", "/etc/mongodb.conf", "--smallfiles"]
