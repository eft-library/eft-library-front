#!/bin/bash

# 작업 디렉토리로 이동
cd /home/frontend_b/eft-library-front

# .next 디렉토리와 빌드를 삭제
rm -rf /home/frontend_b/eft-library-front/.next/

# 애플리케이션 빌드
/usr/bin/npm run build --prefix /home/frontend_b/eft-library-front

# 포트 번호를 첫 번째 인수로 받아옴
port=4002

# 해당 포트를 사용 중인 프로세스의 PID를 찾아서 변수에 저장
pid=$(/usr/bin/netstat -tnlp | /usr/bin/grep ":$port\b" | /usr/bin/awk '{print $7}' | /usr/bin/cut -d'/' -f1)

# PID가 비어있는지 확인하고, 비어있지 않으면 프로세스를 종료
if [ -n "$pid" ]; then
  echo "포트 $port를 사용 중인 프로세스의 PID: $pid"
  echo "프로세스를 종료합니다."
  /bin/kill -9 "$pid"
else
  echo "포트 $port를 사용 중인 프로세스가 없습니다."
fi

# 1초 대기
/bin/sleep 1

# 백그라운드에서 애플리케이션 시작
/usr/bin/nohup PORT=4002 /usr/bin/npm run start --prefix /home/frontend_b/eft-library-front > /home/frontend_b/eft-library-front/log.out 2>&1 &

echo "Next.js를 실행합니다."