#!/bin/bash

# 설정
APP_DIR="/home/frontend_a/eft-library-front"
PNPM="${PNPM:-$(command -v pnpm)}"
KILL="/bin/kill"
NETSTAT="/usr/bin/netstat"
GREP="/usr/bin/grep"
AWK="/usr/bin/awk"
CUT="/usr/bin/cut"
SLEEP="/bin/sleep"
NOHUP="/usr/bin/nohup"
DEFAULT_PORT=4002
LOG_TZ="${LOG_TZ:-Asia/Seoul}"

# 인자 처리
ACTION=$1
PORT=${2:-$DEFAULT_PORT}

# 포트 사용 중인 프로세스 종료 함수
stop_server() {
  pid=$($NETSTAT -tnlp 2>/dev/null | $GREP ":$PORT\b" | $AWK '{print $7}' | $CUT -d'/' -f1)
  if [ -n "$pid" ]; then
    echo "포트 $PORT를 사용 중인 프로세스(PID: $pid)를 종료합니다."
    $KILL -9 "$pid"
  else
    echo "포트 $PORT를 사용 중인 프로세스가 없습니다."
  fi
  $SLEEP 1
}

# 애플리케이션 빌드 및 시작 함수
start_server() {
  echo "앱 디렉토리로 이동: $APP_DIR"
  cd "$APP_DIR" || { echo "디렉토리 이동 실패"; exit 1; }

  if [ -z "$PNPM" ]; then
    echo "pnpm을 찾을 수 없습니다. PNPM=/path/to/pnpm 환경변수를 지정하거나 pnpm을 PATH에 추가하세요."
    exit 1
  fi

  mkdir -p "$APP_DIR/log_history" || { echo "로그 디렉토리 생성 실패"; exit 1; }

  echo ".next 디렉토리 제거 중..."
  rm -rf .next/

  echo "Next.js 빌드 시작..."
  "$PNPM" --dir "$APP_DIR" build

  # 빌드 후 버전 파일 생성
  echo "$(date +%s)" > "$APP_DIR/public/version.txt"

  echo "Next.js 서버를 포트 $PORT에서 시작합니다."
  # 각 줄을 해당 날짜의 파일에 추가하므로 자정 이후에도 자동으로 분리됩니다.
  # LOG_TZ로 시간대 변경 가능 (기본: Asia/Seoul).
  $NOHUP bash -c '
    export TZ="$4"
    PORT="$1" "$2" --dir "$3" start 2>&1 |
      while IFS= read -r line || [ -n "$line" ]; do
        timestamp=$(date "+%Y-%m-%d %H:%M:%S %z")
        printf "[%s] %s\n" "$timestamp" "$line" >> "$3/log_history/${timestamp%% *}.log"
      done
  ' _ "$PORT" "$PNPM" "$APP_DIR" "$LOG_TZ" >> "$APP_DIR/log_history/$(TZ="$LOG_TZ" date +%Y-%m-%d).log" 2>&1 < /dev/null &
}

# 실행 분기
case "$ACTION" in
  start)
    start_server
    ;;
  stop)
    stop_server
    ;;
  restart)
    stop_server
    start_server
    ;;
  *)
    echo "사용법: $0 {start|stop|restart} [포트번호]"
    exit 1
    ;;
esac
