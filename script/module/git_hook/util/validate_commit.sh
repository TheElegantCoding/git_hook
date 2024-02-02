function validate_commit_length()
{
  local commit_message=$(cat ".git/COMMIT_EDITMSG")
  local max_lenght=80;

  if [[ ${#commit_message} -ge 80 ]]; then
    print_error "Commit message was ${#commit_message} characters long, but should be at most $max_lenght characters"
    exit 1
  fi
}

function validate_commit_pattern()
{
  local commit_message=$(cat ".git/COMMIT_EDITMSG")
  local pattern=":([a-z]+): ([a-z]+): ([a-z])"

  if ! [[ $commit_message =~ $pattern ]]; then
    print_error "Commit message did not match 'icon type(scope): subject'"
    exit 1
  fi
}

function validate_commit_type()
{
  local message=$(cat ".git/COMMIT_EDITMSG")
  local type_error=0

  for VALUE in "${COMMIT_TYPES[@]}"; do
    if [[ $message == *$VALUE* ]]; then
      type_error=0
      break
    fi

    type_error=1
  done

  if [[ $type_error == 1 ]]; then
    print_error "Commit message's type must be one of: "
    for ITEM in "${COMMIT_ICONS[@]}"; do
      echo -e "${ITEM}"
    done
  fi
}