#!/bin/bash

# 설정
APP_DIR="/home/frontend_a/eft-library-front"
NODE="/usr/bin/npm"
KILL="/bin/kill"
NETSTAT="/usr/bin/netstat"
GREP="/usr/bin/grep"
AWK="/usr/bin/awk"
CUT="/usr/bin/cut"
SLEEP="/bin/sleep"
NOHUP="/usr/bin/nohup"
DEFAULT_PORT=4002

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

  echo ".next 디렉토리 제거 중..."
  rm -rf .next/

  echo "Next.js 빌드 시작..."
  $NODE run build --prefix "$APP_DIR"

  echo "Next.js 서버를 포트 $PORT에서 시작합니다."
  $NOHUP bash -c "PORT=$PORT $NODE run start --prefix $APP_DIR" > "$APP_DIR/log.out" 2>&1 &
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
