#!/bin/bash

### Release management and changelog generation script. ###

set -e

# Set color variables
RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
WHITE="\033[1;37m"
NC="\033[0m" # No Color, Default Terminal COlor


# Checks if the command is executed on valid git repository
if !(git tag > /dev/null 2>&1 && [ $? -eq 0 ]); then
  echo -e "${RED} This is not a git repository"
  echo -e "${RED} Please run this command on git repository"
  echo ""

  exit 1 # Exit script after printing help
fi


changelog() {
  # NOTE: This requires github_changelog_generator to be installed.
  # https://github.com/github-changelog-generator/github-changelog-generator

  if [ -z "$NEXT" ]; then
      NEXT="Unreleased"
  fi

  if [ -z "$TOKEN" ]; then
      TOKEN=""
  fi

  echo "Generating changelog upto version: $NEXT"
  github_changelog_generator \
    --no-verbose \
    --pr-label "**Changes**" \
    --bugs-label "**Bug Fixes**" \
    --issues-label "**Closed Issues**" \
    --future-release="$NEXT" \
    --release-branch=master \
    --exclude-labels=unnecessary,duplicate,question,invalid,wontfix,exclude-from-changelog \
    --user leapfrogtechnology \
    --project bulletin-board \
    --exclude-tags v1.0.0,2.0.0 \
    --token "$TOKEN"
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

  # Push new tag and commit to origin  
  git push origin HEAD --tags
}

CURRENT_BRANCH_NAME="$(git symbolic-ref --short HEAD)"

if [ "$CURRENT_BRANCH" == "master" ]; then
  echo ""
  echo -e "${RED}Looks like you are on master branch"
  echo -e "${RED}Although this Changelog read's commit history from master branch"
  echo -e "${RED}Reason Being Other Branch will not have changelog and version history"
  echo -e "${NC}"
fi

# Run command received from args.
$1
