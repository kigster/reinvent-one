/**
 * Converts kigster.repositories.json (GitHub API shape) to component.repositories.json.
 * Run: npm run convert-repos   or   just convert
 */

import * as fs from "fs";
import * as path from "path";
import {
  convertRepos,
  REQUIRED_REPO,
  type GithubRepo,
} from "./convert-repos-lib";

const ROOT = path.join(__dirname, "..");
const INPUT_PATH = path.join(ROOT, "src/lib/kigster.repositories.json");
const OUTPUT_PATH = path.join(ROOT, "src/lib/component.repositories.json");

function main(): void {
  const raw = fs.readFileSync(INPUT_PATH, "utf-8");
  const data: GithubRepo[] = JSON.parse(raw);
  const projects = convertRepos(data);

  const hasGomokuAnsiC = projects.some((p) => p.repo === REQUIRED_REPO);
  if (!hasGomokuAnsiC) {
    console.error(
      `Fatal: required repo "${REQUIRED_REPO}" is not in the output. Aborting.`
    );
    process.exit(1);
  }

  fs.writeFileSync(
    OUTPUT_PATH,
    JSON.stringify(projects, null, 2),
    "utf-8"
  );
  console.log(
    `Wrote ${OUTPUT_PATH} with ${projects.length} repos (including ${REQUIRED_REPO}).`
  );
}

main();
