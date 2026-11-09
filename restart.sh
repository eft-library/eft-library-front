#!/bin/bash

# 설정
APP_DIR="${APP_DIR:-/home/frontend_a/eft-library-front}"
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

  # Keep the previous output until a new build has completed successfully.
  # A killed/failed build must not be followed by `next start` or a version bump.
  backup_dir=""
  if [ -e "$APP_DIR/.next" ]; then
    backup_dir=$(mktemp -d "$APP_DIR/.next-backup.XXXXXX") || exit 1
    mv "$APP_DIR/.next" "$backup_dir/build" || { rmdir "$backup_dir"; exit 1; }
    echo "이전 .next 디렉토리 보관: $backup_dir"
    if [ -d "$backup_dir/build/cache" ]; then
      echo "이전 빌드 캐시 재사용 중..."
      if ! mkdir -p "$APP_DIR/.next" || ! cp -a "$backup_dir/build/cache" "$APP_DIR/.next/cache"; then
        rm -rf "$APP_DIR/.next"
        mv "$backup_dir/build" "$APP_DIR/.next" || { echo "이전 빌드 복원 실패: $backup_dir" >&2; exit 1; }
        rmdir "$backup_dir"
        echo "빌드 캐시 준비 실패. 서버를 시작하지 않습니다." >&2
        exit 1
      fi
    fi
  fi

  echo "Next.js 빌드 시작..."
  "$PNPM" --dir "$APP_DIR" build
  build_status=$?
  if [ "$build_status" -eq 0 ] && [ ! -s "$APP_DIR/.next/BUILD_ID" ]; then
    echo "빌드 결과에 BUILD_ID가 없습니다. 시작을 중단합니다." >&2
    build_status=1
  fi
  if [ "$build_status" -ne 0 ]; then
    echo "Next.js 빌드 실패 (종료 코드: $build_status). 서버를 시작하지 않습니다." >&2
    rm -rf "$APP_DIR/.next"
    if [ -n "$backup_dir" ]; then
      mv "$backup_dir/build" "$APP_DIR/.next" || { echo "이전 빌드 복원 실패: $backup_dir" >&2; exit "$build_status"; }
      rmdir "$backup_dir"
      echo "이전 .next 디렉토리를 복원했습니다."
    fi
    exit "$build_status"
  fi

  # 빌드 후 버전 파일 생성
  date +%s > "$APP_DIR/public/version.txt" || { echo "버전 파일 생성 실패. 이전 빌드 보관: $backup_dir" >&2; exit 1; }
  if [ -n "$backup_dir" ]; then
    rm -rf "$backup_dir"
  fi

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
