set shell := ["bash", "-lc"]

sync:
    volta install node
    volta install npm
    npm install

run:
    npm install
    sleep 1 && open http://localhost:3000/ &
    npm run dev

lint:
    npm run lint

# Run unit tests (uses kigster.repositories.json as fixture)
test:
    npm run test

# Convert kigster.repositories.json → component.repositories.json → TypeScript
convert:
    npm run convert

clean:
    rm -rfv out

deploy:
    @echo -e "Remote update:" 
    @ssh -tt kig@kig.re /bin/bash -c \
        "cd /home/kig/workspace/reinvent-one; mv out; out.pre-deploy; ln -nfs out.pre-deploy out"
    @ssh -tt kig@kig.re /bin/bash -c \
        "cd /home/kig/workspace/reinvent-one; git pull ; npm install; rm -f out; npm build"

tag:
    #!/usr/bin/env bash
    version="$(cat package.json | grep version | awk '{print $2}' | tr -d '",')"
    echo $version
    git tag -f "v${version}"
    git push --tags
