function validate_commit_length()
{
  local message=$(cat ".git/COMMIT_EDITMSG")
  local max_lenght=80;

  if [[ ${#message} -ge 80 ]]; then
    print_error "Commit message was ${#message} characters long, but should be at most $max_lenght characters"
    exit 1
  fi
}