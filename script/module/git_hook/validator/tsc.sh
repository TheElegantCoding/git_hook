#!/bin/bash
function run_tsc()
{
  local tsc_error_code=0

  ./node_modules/.bin/tsc --pretty --noEmit
  tsc_error_code=$?

  if [ $tsc_error_code != 0 ]; then
    print_error "Couldn't commit, there are typescript errors"
    exit 1
  fi
}

function tsc_validator()
{
  prepare_staged_files ".*\.tsx?$"

  if [[ -n "$STAGED_FILES" ]]; then
    spinner "Running tsc in ........... ${COUNT_FILES} files" run_tsc
    print_staged_file
    add_files_to_staged_tree "${FILES_TO_ADD_AFTER_LINTING[*]}"
    print_success "Typescript correctly"
  fi
}