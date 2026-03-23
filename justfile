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
    @echo "Removing previous build locally.."
    @rm -rf out
    @npm install
    @npm run build
    @version="$(grep version | pakage.json | awk '{print $2}')"
    @echo $version
