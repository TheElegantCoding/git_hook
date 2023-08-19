#!/bin/bash

function run_stylelint()
{
  local stylelint_exit_code=0

  ./node_modules/.bin/stylelint $STAGED_FILES --stdin --quiet $1
  stylelint_exit_code=$?

  if [ $stylelint_exit_code != 0 ]; then
    print_error "Error during styling linting"
    exit 1
  fi
}

function stylelint_hook()
{
  local stylelint_autofix_flag=""

  prepare_staged_files ".*\.(css?|scss?)$"

  if [ ${#FILES_TO_ADD_AFTER_LINTING} = ${#STAGED_FILES} ]; then
    stylelint_autofix_flag="--fix"
  fi

  if [[ -n "$STAGED_FILES" ]]; then
    spinner "Running stylelint in ........... ${COUNT_FILES} files" run_stylelint $stylelint_autofix_flag
    add_files_to_staged_tree "${FILES_TO_ADD_AFTER_LINTING[*]}"
    print_success "Lint all css/scss files correctly"
  fi
}

