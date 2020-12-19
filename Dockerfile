FROM hayd/deno:latest

EXPOSE 8000

WORKDIR /app

ADD . /app

RUN deno cache index.ts

CMD ["run", "--allow-net","--allow-write", "--allow-read", "--unstable" "index.ts"]