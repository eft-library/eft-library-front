export interface ChartData {
  time_distribution: TimeDistribution[];
  endpoint: Endpoint[];
  active_user: ActiveUser;
  total_request: TotalRequest;
  total_user: TotalUser;
  health_check: HealthCheckInfo[];
  response_time: ResponseTime[];
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

interface ActiveUser {
  active_user: number;
}

interface TotalUser {
  user_total_count: number;
}

interface TotalRequest {
  current_requests: number;
  previous_requests: number;
  percent_change: number;
}

interface HealthCheckInfo {
  service_name: string;
  total: number;
  ok_count: number;
  fail_count: number;
  ok_percentage: number;
  fail_percentage: number;
}

interface ResponseTime {
  service_name: string;
  avg_response_ms: number;
}

export interface HealthCheck {
  health_check: HealthCheckInfo[];
}

export interface TopEndpointsChart {
  endpoint: Endpoint[];
  getMethodColor: (method: string) => string;
}

export interface TotalRequestCard {
  total_request: TotalRequest;
  startDate: Date | null;
  endDate: Date | null;
}

export interface HourlyDistributionChart {
  time_distribution: TimeDistribution[];
}

export interface StatusCard {
  chartData: ChartData;
}
