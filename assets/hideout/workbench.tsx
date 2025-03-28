import type { StationSize } from "../assetTypes";

export default function Workbench({ color, width, height }: StationSize) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 751 863"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="29"
        y="82"
        width="692"
        height="693"
        fill="url(#pattern0_487_669)"
      />
      <line
        x1="371.156"
        y1="853.38"
        x2="744.792"
        y2="637.661"
        stroke={color}
        strokeWidth="22"
      />
      <line
        x1="382.136"
        y1="9.52628"
        x2="8.49997"
        y2="225.245"
        stroke={color}
        strokeWidth="22"
      />
      <line
        x1="739.261"
        y1="647.625"
        x2="739.261"
        y2="216.188"
        stroke={color}
        strokeWidth="22"
      />
      <line
        x1="11.7393"
        y1="647.625"
        x2="11.7392"
        y2="216.188"
        stroke={color}
        strokeWidth="22"
      />
      <line
        x1="8.5"
        y1="637.661"
        x2="382.136"
        y2="853.38"
        stroke={color}
        strokeWidth="22"
      />
      <line
        x1="744.792"
        y1="225.245"
        x2="371.156"
        y2="9.5263"
        stroke={color}
        strokeWidth="22"
      />
      <defs>
        <pattern
          id="pattern0_487_669"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_487_669"
            transform="matrix(0.0156476 0 0 0.015625 -0.000722543 0)"
          />
        </pattern>
        <image
          id="image0_487_669"
          width="64"
          height="64"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAARN0lEQVR4AeyUgQrCQAxD1+v+/4N18wTJIIR6HHBUGQ08GjkQmtBtpTyVSqWSTXLLhRtwsAtOtKwwbPF/2Jc3Uw9YfQDe18uXtSuT8EnaL87A1t+zLDIISdp/gZMn0cF/BDBoXH6Hb85N8/LgAKcEsQ1OomcGoM36NYmmPph2NcuLgyfQEDiA2CcFoHe+A4++7uI5mA508Qf5Q89BfMBHb16tArqNa9veEaNB5oAh8EKGMDtUZnDcsN9vmKHcBsrMGHCokJeYwg4npoALDjO9BswMGmk0I+mfe32WvjtLP8vV9/taa6/bSDPuPfvugzNtHAS9pDWZsWqABqBF6BD6lli0aFH8wYN7N6xYsXT+G2+8Oh0wLSUl5ZHDh3NuVVVViWiAN7KUcnf6v7qywseA5+3kNQBdWlraqKKi31/fu3fXohUrlj1qMBjawfcBAD+E/8iRiYlqtTqwqamWNDZUEau1jgsLC4rs1u0f4+H3ngALwB+vNwNMCANChwSrEXJifCfAB+PVLU87MXH4S3FxvWaMHDF87qsvL/mkqOjEupdfWkwN6wgIBJit1iajU3IQ0SEQEVan2PzfFRUVMfB7J0AIkubvhQgDKkkH0MgI8NQaba0Acg/jNS0IMLz99ls/lpWVNTlEO7E7eAInG7F06WvT3nnnreloXGBdXaPSE7FcbuJ0uYjTKRGdVqtDgwORAFwBSASSYEQSUAUYX/7DCvAYfw8C9KtXp/45derMtMrKSge9SaInLQpkwfxZg8eOffoherobN268zFttDg7/9y4gQJJE8uVXHwftyd72yNtvLX88JiaqG/wUCggCBI4ePbrzqVN/fJifn/dZbGxsb/xeD9DICfCgDQiQl6/epO8xHuVJDh06dPK1197aJ0puNzthp8CIWLRwXj+NRtO5qKio6eSps7cUKg0ogDQrAAjw9zcr4uN6hc2cNe3hvXuzX/zyyy8mmc3mzn379u3204Z170RHR43sFNNh9MofvvokMjJyOCEk2KOC/0cFyE/fYzxCD5D27t1XJAiijeM44mIkiKRXr566/v37xVEZnzp1+rparWnOWVQBTieRIBbYBZ7w1gai1XCGpGcfG7pv364FmzZtXKw36dtXV5WSpqZ60qFDu4jU1O9fCQ0NHYQBUyMLhG1KgFcFPPTQQwHXrl376LvvvkqCf4dhkDIiCepnn33W38/PXwMaAAKcAOrnTtKjR9cIuum7d+/WqpQqlvHoNXgdu0YEIhwOO7HZmkhoSECARs1ZqqrKiI3niYP95iCxvWJDhg0b9gwhpDNAJ3eBNidAfvpAQJfo6MikyZMnLF24cF4KfNcBA5R21KhRwR9++MEUBedWSZIExoGfO13EBXpXKDRaSpZLktycQkE4DrfgIaL5OifcJwIcgp3wNisR7Dz7nlkH9929W+z+7bff6Om3QzdQ+jJXUPhY+KhzcnJ4nm/iYePKN15/+ek33nhlYv/+/WPnz58b+/PPP84P8DeGWPl6MLz59F3EzSJ+XV01K3K0eo2S/qYCN1BDLFBSKOBPU0IoYZQMqhoAXMfIIQCFUknu3C4mKf+cai0uLi4nhPCy4MzJ0KYxQIlQ79q1q6GkpOQu7AqM4BQvvjB/yK5dWXM//uiD2WazLhiKHOrT7NTY3qm8AVFRMWyTu3btLt6+Y+eFnTv31eUVnBDLy6pdGp2hmQxwDYgdqAhGHI0jGC8IefGl1+xXrly9Bv88BSjFfap8aa2VfyPvq+VFDwQh87BhQwZIoghBTITdSQpBoHK10bzO5OwxAhN/u/btlenpWSXl5RV/bt++83p29p66bdt2Vm7ZklF+4cIVZ7v2EfoOHTqo/nr6BOBiW1Kp6BYUYk5O3mkkoBzgkHWPgNb1BAqfCyBY33zz7WMHD+ZeUdATcyuYbJ1U8hRovAvAVix2oiLbK1PX/DAA0iHN8Q2AM4BjVqs1Nzs7e2dy8qQdGzf8dEej1YMamEswVwABsL9LY0pS0lO6uLi4YAy6WIfAivtCKORK+LsEtKb2FyZPnvyv7OwDd9RaLVErNUQBfqyAU1LByimUcBPXItU1B7XhiYMDNm5c94xOpwtDHy4HlABuAIGn3n7nw8x163+5rNUaqTt47ncCaIaADXHjxo3tDl9HYoWolZPQ2v5A0YoCSHGPgSbH8/aKlJTn06ZPX1CUk3vcWlFR43IITmIHaNQ6T3Bj/avTTSM7c5HhwwZCRbh2ApAQiZt3o3QbAbffe+/9bWfOXizTafUsUzAVYXYQIEUmDh/mp9fraQoMkRkvU4HMeF8VIC+Be/eOs3Tv3jUwIiKCxoOyrVu37h83ftK2ESMfODZi5P0XYb3xbNLEu7t27+dpwaMCIjgOjMBTtEFaGzyoX+iGDS1J8HxEQPk333y7T6XWuZRKJQZSFwukItQBFou/smvXrh2wJMbGSK4AX13g3iSofissnHfkyKFVgM8LCwveycpKm/TIIw8FQ+S+0dDQUAA5ej9kiH0nThRmz527cNuGjb/c0qi1oAY1dQh2khIlwcaTQQP7hK5fnzoB2uYoGQlSTk7uhRJIdRpWOnhiCYsDArjSggVzor/77punMzPT5n/88QfJYWFh7QkWYnIC2kABHih7xfV6GkTpxxHJBFWaedjQAX3Wr18949TJ3xccPJj9bHb27jHbt2cOfuKJJ+gmri1b9nbWz5s2X0WXoLagIVD6ghIGDugTujb1h/FelCBcvnLj3zqdEe7hsDZws1gi2O0kPr6HfvTIYT0TEmJHJT379JwlCxcuhHtiAHrZAMXHLOCdFNq7u232JihJbXASNjDCBsHNylksJkvPHt279+sXlzB40IB+c+bMegJ9tPq115ZnbfpX2lWNRsfcwU04Vh06HFQJVtJ/QL/Q9etWyd3BBa11hRbiAKsamX6aSRAlkZXGlVUVpLysBHqERqLRa+Phnj6AAJn/++wCxNskVkWTMX5Y6eqSmCwpITzfQJoaa4EYnjQ21vvjDEADqKAkbN6cDiQ0pzhGAvi0g7qDtYn07dcndN26lX8hgePgArhSrzcQnU5PtLRYUtNsA3GhRcksAWpra2labA/Qt0Uv4JbBhXCKoF2FElIdpD26ckTJ/NrlZEGKbYrKNNDfT4OnQVeRkfA6KGETkKClVZ8ajKBKoCQIQB6Q0Kc3uMP3HhIyM7ddPZKTd/Pq1Wu2S5evOasra91Gk5kYjSYgxASE6IgWVKXRau910m6fXEBmvJMgPv34k9S8vOPlBw7mOgryCyXQJ5LgxgkPQHKSjlEdFVFRkSYMShxBEpYtX5G1ZUvWFa0OlKABbpgSXGwsZgUS+gAJK1d+x0g4depU/ZQp/9w2NnnSwSlTphY+kzTuj6lTZ1/fvmNPg+R0u3R6EzEAGaWlFe4DBw42YBp1eKkE3b4SIH9gIX7w0ScHn3tuwobnp87cN3nK88dr65ocKpXS4xIA1v9rtRry2GOPhuMoq9ltkISlS5dv3ZK29apOa/CQ4KRKEIAEayPp1zchdOOG1CmPPvpoH4jugsViuQiD1GOCIOQUFZ3Mfvfd97c999zE/AkTUs6PHz/lRnLy+PO//vrbCULIFawwXR7c46NqpQu4ZHP7akARVm+W8pKy9qGhvTpDNCMudrWLssVONGXKREtaWkZkdXX1XfiqFuD2KGHZiiwQTVJy8lP/APfxzAMcjua1S5cYy6efvDfOLohWCJ7gWZJYXHy7EirPCytXrjxfWlp6CyO9GyvKYsB1VIHnmYEvLuD+XxQgInhAJeA24FZOft5J8EMWqQnW/y4cbNCC5fPPPxiMfbtGVuxULAd3yEjfcVWvN0Jw07LA6AQyBCCPh8BYU1tFHPYmo42v9xMdfBAUXt3nzZ2RtDUrY3qXLl2oe/0bD6MQcB5QgS7glJPgQxCUP7fzKMABEAiu69f/eLa6prpRpdKiG1ACaMUnETsULEOHDAlYs+aHpwMDA6ORBO4vJKwAEjKRBEww7H5JZPneyltJfX0doBYifSWprq4kHTtGtP/2my+mhYeHd8W/xQPsAFH+KK0tg6CHAIQdIFTBZ/PmzEKNGmzjmgMaU4FLaq74ILAlJg4Jz0jf/F+zZ8+432QyWVC6HhJWrHgz64/fior1BsP/zAJcADcD2wZ8DQvHJshWUEdISLD/q68sGY9NkVLWEsuM90UBsvTnTQUI/u2338lrhF1xNKJj3U5X1ryIIuHZhgPNixfNf/TI4f0vZWSkz05NXZn8ww/fPPPgg/fT6q3+l83pR4wGPzdrfuBmCKdsB2A5cw+DwUSAPKKHVaFQsHJ48JChkZ07xwzBdOuUE9AWCriHEgCohN27dz9gCQw2gN1ovNuzupwSNkBW0gBFkkLpNnfvFtNj1KgRIx984P77xo8fTyvG8Js3b5ZwCs6hULC6wmO8Fow3mf1IRsZ219Rpcxrff/+TarsgOWnuNxr0XL9+/elzggi0R5I9QPW5EPKuBBkJ0KmJ+fn5kxITh460WusVoii0nAK1qA2ctIICnxZoCcv8uaqynEm5tqYmmNbwECP0EEyV4AKeJ+e06NRBFfjD96udX371TcnFi5d+gynS9qVLl2ULgijAbxAPOgThQxS11/cJAG3SC3hTAYyvuNhe3UY3NtTC6dbT4MVOTQkSBXJgVTJb6IF6pkRYOgNZTBmQ22n0NMHKMdFzOAKD7UHuJ1lZO1zrN/xYiiOwPED+77+fzHz99eXrzpw+U3X69KlKT+PT+pGYvA7wyRUgLxc35uUfO9anT6+HYc7PZE8lTP24rLyCtIsIxzm/QJpH5E6mCkJVQZRsTBYcEsQal+vXr/NQLzTCZMmCEY/QcVvB0WM22lUCTmKerwXwBQUFZYCL9PTx9yaZ7yN8cIHWZgQwyj52bHJqfv7RyzRIGY1m5q+ff/6NNH58SuWWtKw6OiI0mvxYM6OicwEOGhl6yjjj6xQTrTTCxwaFFJzsNb0R0qFS3TwikkRoe+PcOP0tBtQBeEQZ4BhgJ5JTLwuAbfqChNeXnjDvCzDZvda9e7duUNr6f/bZl8KmTZtv2e32ooKCo6ePHDlS53CIRj+/AK0lMJA2Dp7Gif53YKCFKy4pdV+6dPnmpUuX/oSnSn0I51Y5RZG5TEJCvBomSPz58xfPYgHWBLAhCQ2AalzFv/tSFefD43EVQo3QIgIAPQBDAGF4Wpdxk8GASAhu0b169uz01ZefdtcZNCqb1Uo4iBNm6O6uXL1uT0mZRk/yHAw3El599aVnoKNU0vGXEvoMjVrvXrV6dTYUXevgmj+x3BUQDlkB5JajzQhAKGVEaBBm9EcTbsqG1+rxtyBA8OlTRUsEwWquq69lf8wABNy+VSxNmDglhz5cBjSMGTNm9OxZ0x/p2rWTWWLvDuhYNnjmmbFfgxKyaAkOsHl9j0jWy7RFEPQaB2TfO3Ej9V4UYkcl1EJnVwmSd9fUiJ6ylwZPtUbF4fUCoBjcZgfg0oMPPnAfxICu4eEhJpgzCrdu3QlHMkXvxsuNbjsXIK16G9T78wMtQgOpUbd9+7b3O3eKGkwHIPBhFV5q6joB8jw9/a2Aq0ioDt2pIyAcoMWTz8dsYPf+LuF/kgDvUCA4L6SoPSSgIuLj4xMefvj+qTzPd1artIb6hnpXRkbW7cbGxsPw+0FssyWEG6BpMei0Aqroeg+/J21PQOtfgPb6NokM/oCugO4YPAlG8nOAG//dvhloYAzDQDhlYO//sIXOsBv10UOtNeQjcinIpfr/WCtzDXFxDeaVd16VhcYafzAZ53ufIB6q/soqzjRNtk7z3G8dAPGf1UZvAgRMDczZOmYGcMSHsAk22O1gGQ0AmRFWT1B2vhhhzcGZEF7/dADK1MTvrup1Da6mQDtoOkmSJFnFDUlAVD9qEapgAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
}
