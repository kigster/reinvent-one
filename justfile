
set shell := ["bash", "-lc"]

setup:
    #!/usr/bin/env bash
    volta install node
    volta install npm
    npm install

run: setup
    npm run dev

build: setup
    npm run build

deploy: build
    #!/usr/bin/env bash
    rsync -avz --delete ./out/ kig@reinvent.one:/home/kig/workspace/reinvent-one/out