#!/bin/bash

### Release management and changelog generation script. ###

set -e

changelog() {
  # NOTE: This requires github_changelog_generator to be installed.
  # https://github.com/github-changelog-generator/github-changelog-generator

  if [ -z "$NEXT" ]; then
      NEXT="Unreleased"
  fi

  echo "Generating changelog upto version: $NEXT"
  github_changelog_generator \
    --no-verbose \
    --pr-label "**Changes**" \
    --bugs-label "**Bug Fixes**" \
    --issues-label "**Closed Issues**" \
    --future-release="$NEXT" \
    --release-branch=master \
    --exclude-labels=unnecessary,duplicate,question,invalid,wontfix \
    --user leapfrogtechnology \
    --project bulletin-board \
    --exclude-tags v1.0.0,2.0.0
}

bump() {
  # Bump package version and generate changelog
  VERSION="${NEXT/v/}"

  echo "Bump version to ${VERSION}"

  # Update version in the following files
  sed -i "s/\(\"version\":\s*\"\)[^\"]*\(\"\)/\1${VERSION}\2/g" package.json

  # Generate change log
  changelog
  echo ""

  # Generate new build.
  yarn

  # Prepare to commit
  git add CHANGELOG.md package.json yarn.lock && \
    git commit -v --edit -m "${VERSION} Release :tada: :fireworks: :bell:" && \
    git tag "$NEXT" && \
    echo -e "\nRelease tagged $NEXT"
  git push origin HEAD --tags
}

# Run command received from args.
$1
