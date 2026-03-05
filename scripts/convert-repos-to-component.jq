#!/usr/bin/env jq -f
# Converts kigster.repositories.json (GitHub API shape) to RepoProject array.
# Usage: jq -f scripts/convert-repos-to-component.jq src/lib/kigster.repositories.json > src/lib/component.repositories.json
#
# - Filters: not archived, not disabled, owner is kigster
# - Sorts by stargazers_count descending
# - Output: name, repo, desc, stars, url, site?, homepage, forks, license?, languages, topics

# Infer an additional language from description (case-insensitive); only if different from primary
def infer_language_from_description:
  .description // "" | ascii_downcase |
  if test("\\b(ruby|rails|gem)\\b") then "Ruby"
  elif test("\\b(objective-c|objective c|ios)\\b") then "Objective-C"
  elif test("\\bswift\\b") then "Swift"
  elif test("\\b(arduino|cmake|c\\+\\+|c/c\\+\\+)\\b") then "C++"
  elif test("\\b(ansi c|c language)\\b") then "C"
  elif test("\\b(typescript|node\\.?js)\\b") then "TypeScript"
  elif test("\\bjavascript\\b") then "JavaScript"
  elif test("\\bpython\\b") then "Python"
  elif test("\\b(bash|shell)\\b") then "Shell"
  elif test("\\bgo\\b") then "Go"
  elif test("\\brust\\b") then "Rust"
  else empty
  end;

# Valid site: homepage present, non-empty, and not the same as repo url
def valid_site:
  (.homepage | type == "string" and length > 0) and
  ((.homepage | gsub("/$"; "")) != (.html_url | gsub("/$"; "")));

# Build languages: primary from .language, optionally add one inferred from description if different.
# If both CMake and C++ are present, add Arduino.
def build_languages:
  (.language // "Other") as $primary
  | (. | infer_language_from_description) as $inferred
  | (if $inferred != null and $inferred != $primary then [$primary, $inferred] else [$primary] end)
  | (if (index("CMake") != null) and (index("C++") != null) then . + ["Arduino"] | unique else . end);

# Map one repo to output shape
def to_repo_project:
  select((.archived | not) and (.disabled | not) and (.owner.login == "kigster"))
  | (. | build_languages) as $langs
  | ({
      name: .name,
      repo: .full_name,
      desc: ((.description // "") | gsub("^\\s+|\\s+$"; "")),
      stars: (.stargazers_count // 0),
      url: .html_url,
      homepage: (.homepage // ""),
      forks: (.forks_count // 0),
      languages: $langs,
      topics: (.topics // [])
    } + (if .license then { license: .license.key } else {} end)
      + (if valid_site then { site: .homepage } else {} end))
  ;

# Main: sort by stars desc, then map
sort_by(-(.stargazers_count // 0))
| map(to_repo_project)
