/**
 * Reads component.repositories.json and writes openSourceData.generated.ts
 * so the app can use TypeScript objects instead of reading JSON at runtime.
 * Run as part of: just convert
 */

import * as fs from "fs";
import * as path from "path";

const ROOT = path.join(__dirname, "..");
const INPUT_PATH = path.join(ROOT, "src/lib/component.repositories.json");
const OUTPUT_PATH = path.join(ROOT, "src/lib/openSourceData.generated.ts");

function main(): void {
  const raw = fs.readFileSync(INPUT_PATH, "utf-8");
  const data: unknown = JSON.parse(raw);
  if (!Array.isArray(data)) {
    throw new Error("component.repositories.json must be a JSON array");
  }

  const header = `/* eslint-disable */
// Auto-generated from component.repositories.json. Do not edit.
// Re-run \`just convert\` or \`npm run convert-repos\` to regenerate.

import type { RepoProject } from "./openSourceTypes";

export const openSourceProjects: RepoProject[] = `;

  const body = JSON.stringify(data, null, 2);
  const content = header + body + ";\n";
  fs.writeFileSync(OUTPUT_PATH, content, "utf-8");
  console.log(`Wrote ${OUTPUT_PATH} (${data.length} projects).`);
}

main();
