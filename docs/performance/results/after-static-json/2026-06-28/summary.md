# Production Performance after-static-json 2026-06-28

- 기준 URL: `https://eftlibrary.com`
- 실행 횟수: 1
- 결과 원본: `docs/performance/results/after-static-json/2026-06-28`

| page | run | score | FCP | LCP | TBT | CLS | TTFB | transfer | requests |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `home` | 1 | 58 | 7.9 s | 7.9 s | 70 ms | 0.038 | Root document took 720 ms | Total size was 2,179 KiB | 128 |
| `roadmap` | 1 | 34 | 7.6 s | 10.3 s | 380 ms | 0.253 | Root document took 550 ms | Total size was 1,968 KiB | 93 |
| `price` | 1 | 44 | 7.9 s | 7.9 s | 80 ms | 0.268 | Root document took 700 ms | Total size was 2,400 KiB | 106 |
| `rank` | 1 | 54 | 7.4 s | 10.0 s | 220 ms | 0.006 | Root document took 530 ms | Total size was 2,019 KiB | 96 |
| `story` | 1 | 43 | 7.6 s | 10.2 s | 70 ms | 0.263 | Root document took 520 ms | Total size was 8,766 KiB | 126 |
| `quest` | 1 | 43 | 7.3 s | 10.1 s | 80 ms | 0.275 | Root document took 540 ms | Total size was 1,924 KiB | 132 |
| `quest-detail` | 1 | 56 | 7.0 s | 10.7 s | 80 ms | 0.052 | Root document took 590 ms | Total size was 2,791 KiB | 117 |
| `item-detail` | 1 | 43 | 7.6 s | 14.6 s | 60 ms | 0.268 | Root document took 520 ms | Total size was 1,835 KiB | 91 |
| `hideout` | 1 | 54 | 12.7 s | 20.3 s | 130 ms | 0 | Root document took 710 ms | Total size was 1,823 KiB | 156 |
| `boss-detail` | 1 | 40 | 8.1 s | 12.4 s | 160 ms | 0.278 | Root document took 560 ms | Total size was 2,890 KiB | 96 |
| `event` | 1 | 55 | 7.3 s | 14.9 s | 130 ms | 0 | Root document took 520 ms | Total size was 1,557 KiB | 115 |
| `event-detail` | 1 | 58 | 7.6 s | 14.9 s | 60 ms | 0 | Root document took 690 ms | Total size was 1,306 KiB | 55 |
| `map-of-tarkov` | 1 | 40 | 7.9 s | 46.2 s | 40 ms | 0.295 | Root document took 730 ms | Total size was 18,356 KiB | 120 |
| `community-detail` | 1 | 33 | 7.5 s | 20.3 s | 100 ms | 0.892 | Root document took 540 ms | Total size was 1,608 KiB | 63 |
| `wipe` | 1 | 43 | 7.4 s | 9.9 s | 80 ms | 0.276 | Root document took 690 ms | Total size was 1,806 KiB | 77 |
| `minigame` | 1 | 55 | 8.5 s | 8.5 s | 90 ms | 0 | Root document took 680 ms | Total size was 2,201 KiB | 177 |
| `live-map-customs` | 1 | 54 | 7.4 s | 19.6 s | 180 ms | 0 | Root document took 550 ms | Total size was 1,558 KiB | 47 |
| `live-map-streets-of-tarkov` | 1 | 55 | 7.5 s | 15.6 s | 150 ms | 0 | Root document took 560 ms | Total size was 1,537 KiB | 49 |

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
