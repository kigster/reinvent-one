set shell := ["bash", "-lc"]

sync:
    volta install node
    volta install npm
    npm install

run:
    npm install
    npm run dev

# Run unit tests (uses kigster.repositories.json as fixture)
test:
    npm run test

# Convert kigster.repositories.json → component.repositories.json → TypeScript
convert:
    npm run convert

