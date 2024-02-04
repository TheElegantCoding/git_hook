#!/bin/bash
function print_question()
{
  local QUESTION_PREFIX="${GREEN_FOREGROUND}?${RESET}"
  echo -e -n "${QUESTION_PREFIX}${WHITE_FOREGROUND} $1${RESET}"
}

function print_info()
{
  local INFO_PREFIX="${BLUE_BACKGROUND}${WHITE_FOREGROUND}${ICON_GEAR} INFO ${RESET}"
  printf "${INFO_PREFIX}${BLUE_FOREGROUND} $1${RESET}"
}

function print_error()
{
  local ERROR_PREFIX="${RED_BACKGROUND}${WHITE_FOREGROUND}${ICON_ERROR} ERROR ${RESET}"
  echo -e "${ERROR_PREFIX}${RED_FOREGROUND} $1${RESET}\n"
}

function print_success()
{
  local SUCCES_PREFIX="${GREEN_BACKGROUND}${WHITE_FOREGROUND}${ICON_CHECK} SUCCESS ${RESET}"
  echo -e "${SUCCES_PREFIX}${GREEN_FOREGROUND} $1${RESET}\n"
}

function print_file_size()
{
  local -i bytes=$1;

  if [[ $bytes -lt 1024 ]]; then
    echo "${bytes} B"
  elif [[ $bytes -lt 1048576 ]]; then
    echo "$(( (bytes + 1023)/1024 )) KiB"
  else
    echo "$(( (bytes + 1048575)/1048576 )) MiB"
  fi
}

FILE_ICON="  "

function print_icon_file()
{
  local file_extension="${1##*.}"

  case $file_extension in
    "ts")
      FILE_ICON="${BLUE_FOREGROUND}󰛦${RESET}"
      ;;
    "tsx")
      FILE_ICON="${BLUE_FOREGROUND} ${RESET}"
      ;;
    "js")
      FILE_ICON="${YELLOW_FOREGROUND} ${RESET}"
      ;;
    "jsx")
      FILE_ICON="${CYAN_FOREGROUND} ${RESET}"
      ;;
    "json")
      FILE_ICON="${YELLOW_FOREGROUND} ${RESET}"
      ;;
    "html")
      FILE_ICON="${ORANGE_FOREGROUND} ${RESET}"
      ;;
    "yml")
      FILE_ICON="${PURPLE_FOREGROUND} ${RESET}"
      ;;
    *)
      FILE_ICON="${GRAY_FOREGROUND} ${RESET}"
      ;;
  esac
}

function print_staged_file()
{
  local suffix="${GREEN_FOREGROUND}${ICON_CHECK}${RESET}"
  local maxLenght=0

  for FILE in $STAGED_FILES; do
    if [[ $maxLenght < ${#FILE} ]]; then
      maxLenght=${#FILE}
    fi
  done

  for FILE in $STAGED_FILES; do
    local file_size=$(cat $FILE | wc -c)
    local human_file_size=$(print_file_size $file_size)
    local space=$(($maxLenght-${#FILE}+($maxLenght/2)))
    local line=$(printf "%*s%s" $space '' "$human_file_size")
    print_icon_file $FILE

    echo -e "${suffix} ${FILE_ICON} ${WHITE_FOREGROUND}$FILE${RESET}${line}"
  done

  printf "\n"
}

