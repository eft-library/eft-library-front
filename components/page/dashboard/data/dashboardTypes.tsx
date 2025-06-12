export interface ChartData {
  time_distribution: TimeDistribution[];
  endpoint: Endpoint[];
}

interface TimeDistribution {
  time: string;
  requests: number;
}

interface Endpoint {
  request: string;
  link: string;
  request_count: number;
}

export interface TopEndpointsChart {
  endpoint: Endpoint[];
  getMethodColor: (method: string) => string;
}

export interface HourlyDistributionChart {
  time_distribution: TimeDistribution[];
}
