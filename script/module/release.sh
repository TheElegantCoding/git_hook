#!/bin/bash

source $(dirname $0)/changelog.sh

source $(dirname $0)/../util/print.sh

source $(dirname $0)/../asset/icon.sh

source $(dirname $0)/../style/color.sh

function get_version_title()
{
  VERSION_TITLE=""

  while :
  do
    print_question "Enter the title of the version: "
    read VERSION_TITLE

    if [[ $VERSION_TITLE != "" ]]; then
      printf "\n"
      break
    fi

    clear
    print_error "Please enter a valid title"
  done
}

function get_version()
{
  VERSION=""

  while :
  do
    print_question "Enter the version type: "
    read VERSION

    if [[ $VERSION == "major" ]] || [[ $VERSION == 'minor' ]] || [[ $VERSION == 'patch' ]]; then
      printf "\n"
      break
    fi

    clear
    print_error "Version not valid you should use (major, minor or patch)"
  done
}

function change_npm_version()
{
  NPM_VERSION=$(npm version $VERSION --no-git-tag-version)
}

function create_git_tag()
{
  GIT_TAG=$(git tag $NPM_VERSION)
}

function update_changelog()
{
  generate_changelog
  git add .
  git commit -m ":rocket: release: ${NPM_VERSION} - ${VERSION_TITLE}"
  git push origin $NPM_VERSION
}

print_info "Creating a new release\n\n"

get_version
get_version_title
change_npm_version
create_git_tag
update_changelog

printf "\n"

print_success "Release push succsefully"

# git tag | xargs git tag -d