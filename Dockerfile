FROM hayd/deno:latest

EXPOSE 8000

WORKDIR /app

ADD . /app

RUN deno install --allow-read --allow-run --allow-write --allow-net -f -q --unstable https://deno.land/x/denon/denon.ts

CMD ["denon", "start"]