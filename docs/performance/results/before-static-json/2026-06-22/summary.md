# Production Performance before-static-json 2026-06-22

- 기준 URL: `https://eftlibrary.com`
- 실행 횟수: 1
- 결과 원본: `docs/performance/results/before-static-json/2026-06-22`

| page | run | score | FCP | LCP | TBT | CLS | TTFB | transfer | requests |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `home` | 1 | 52 | 8.6 s | 8.6 s | 210 ms | 0.038 | Root document took 930 ms | Total size was 2,133 KiB | 126 |
| `roadmap` | 1 | 28 | 8.0 s | 8.0 s | 630 ms | 0.253 | Root document took 460 ms | Total size was 1,966 KiB | 92 |
| `price` | 1 | 33 | 7.8 s | 7.8 s | 410 ms | 0.268 | Root document took 820 ms | Total size was 1,994 KiB | 104 |
| `rank` | 1 | 54 | 3.7 s | 3.8 s | 1,390 ms | 0.006 | Root document took 560 ms | Total size was 1,908 KiB | 97 |
| `story` | 1 | 35 | 7.7 s | 7.7 s | 350 ms | 0.263 | Root document took 540 ms | Total size was 8,763 KiB | 126 |
| `quest` | 1 | 35 | 7.4 s | 9.9 s | 330 ms | 0.275 | Root document took 570 ms | Total size was 1,916 KiB | 133 |
| `quest-detail` | 1 | 49 | 7.7 s | 11.9 s | 310 ms | 0.052 | Root document took 560 ms | Total size was 2,786 KiB | 139 |
| `item-detail` | 1 | 37 | 7.9 s | 15.0 s | 270 ms | 0.268 | Root document took 540 ms | Total size was 1,831 KiB | 89 |
| `hideout` | 1 | 30 | 12.2 s | 19.1 s | 450 ms | 0.271 | Root document took 440 ms | Total size was 1,953 KiB | 142 |
| `boss-detail` | 1 | 42 | 7.6 s | 14.3 s | 80 ms | 0.278 | Root document took 480 ms | Total size was 2,884 KiB | 98 |
| `event` | 1 | 43 | 7.5 s | 13.1 s | 80 ms | 0.255 | Root document took 490 ms | Total size was 1,828 KiB | 103 |
| `event-detail` | 1 | 57 | 8.1 s | 12.4 s | 70 ms | 0 | Root document took 720 ms | Total size was 1,304 KiB | 55 |
| `map-of-tarkov` | 1 | 37 | 7.4 s | 26.5 s | 80 ms | 0.382 | Root document took 620 ms | Total size was 18,420 KiB | 121 |
| `community-detail` | 1 | 33 | 7.8 s | 14.4 s | 70 ms | 0.892 | Root document took 510 ms | Total size was 1,321 KiB | 56 |
| `wipe` | 1 | 45 | 7.4 s | 7.4 s | 80 ms | 0.276 | Root document took 520 ms | Total size was 1,805 KiB | 77 |
| `minigame` | 1 | 56 | 9.2 s | 12.0 s | 70 ms | 0 | Root document took 490 ms | Total size was 2,192 KiB | 171 |
| `live-map-customs` | 1 | 55 | 7.3 s | 16.6 s | 160 ms | 0 | Root document took 520 ms | Total size was 1,573 KiB | 48 |
| `live-map-streets-of-tarkov` | 1 | 54 | 9.0 s | 15.5 s | 170 ms | 0 | Root document took 710 ms | Total size was 1,543 KiB | 50 |

## 대상 페이지

- `home`: `/`
- `roadmap`: `/roadmap`
- `price`: `/price`
- `rank`: `/rank`
- `story`: `/story/tour`
- `quest`: `/quest/prapor`
- `quest-detail`: `/quest/detail/shooting-cans`
- `item-detail`: `/item/info/adrenaline-injector`
- `hideout`: `/hideout`
- `boss-detail`: `/boss/reshala`
- `event`: `/event?id=1`
- `event-detail`: `/event/detail/event27`
- `map-of-tarkov`: `/map-of-tarkov/customs`
- `community-detail`: `/community/detail/809203066355191808-saiteu-seongneung-mic-nae-wici-cajgi-gineung-gaeseon-annae`
- `wipe`: `/wipe`
- `minigame`: `/minigame`
- `live-map-customs`: `/live-map/customs`
- `live-map-streets-of-tarkov`: `/live-map/streets-of-tarkov`
