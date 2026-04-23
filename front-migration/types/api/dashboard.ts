export interface DashboardCountMetric {
  active_user?: number;
  user_total_count?: number;
  current_requests?: number;
}

export interface DashboardEndpointMetric {
  endpoint?: string;
  request_count?: number;
  method?: string;
}

export interface DashboardTimeDistributionMetric {
  hour?: number;
  request_count?: number;
}

export interface DashboardHealthCheckMetric {
  server_name?: string;
  status?: string;
  checked_time?: string;
}

export interface DashboardResponseTimeMetric {
  endpoint?: string;
  avg_response_time?: number;
}

export interface DashboardAnalysisResponse {
  endpoint: DashboardEndpointMetric[];
  time_distribution: DashboardTimeDistributionMetric[];
  active_user: DashboardCountMetric;
  total_user: DashboardCountMetric;
  total_request: DashboardCountMetric;
  health_check: DashboardHealthCheckMetric[];
  response_time: DashboardResponseTimeMetric[];
}
