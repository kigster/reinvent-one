#!/usr/bin/env node
/**
 * Fetches language breakdown from GitHub API for each repo in kigster.repositories.json
 * and adds a "languages" array to each project. Uses GITHUB_TOKEN env var if set (recommended for rate limits).
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const repoPath = path.join(__dirname, "..", "kigster.repositories.json");
const data = JSON.parse(fs.readFileSync(repoPath, "utf8"));

const token = process.env.GITHUB_TOKEN;
const headers = {
  "User-Agent": "reinvent-one-site",
  Accept: "application/vnd.github.v3+json",
};
if (token) headers.Authorization = `token ${token}`;

function fetch(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      { headers },
      (res) => {
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => {
          if (res.statusCode === 200) resolve(JSON.parse(body));
          else reject(new Error(`${url} => ${res.statusCode} ${body}`));
        });
      }
    );
    req.on("error", reject);
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const out = [];
  for (let i = 0; i < data.length; i++) {
    const repo = data[i];
    const fullName = repo.full_name;
    const langUrl =
      repo.languages_url ||
      `https://api.github.com/repos/${fullName}/languages`;
    try {
      const langMap = await fetch(langUrl);
      repo.languages = Object.keys(langMap).sort();
      if (repo.languages.length === 0 && repo.language) {
        repo.languages = [repo.language];
      }
      console.error(`[${i + 1}/${data.length}] ${fullName} => ${repo.languages.join(", ")}`);
    } catch (e) {
      console.error(`[${i + 1}/${data.length}] ${fullName} FAILED: ${e.message}`);
      repo.languages = repo.language ? [repo.language] : [];
    }
    out.push(repo);
    await sleep(token ? 50 : 500);
  }

  fs.writeFileSync(repoPath, JSON.stringify(out, null, 2), "utf8");
  console.error("Done. Wrote", repoPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
