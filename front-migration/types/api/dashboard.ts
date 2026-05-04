export interface DashboardCountMetric {
  active_user?: number;
  user_total_count?: number;
  current_requests?: number;
}

export interface DashboardEndpointMetric {
  url?: string;
  request_count?: number;
  request_type?: string;
}

export interface DashboardTimeDistributionMetric {
  time?: string;
  requests?: number;
}

export interface DashboardHealthCheckMetric {
  service_name?: string;
  total?: number;
  ok_count?: number;
  fail_count?: number;
  ok_percentage?: number;
  fail_percentage?: number;
}

export interface DashboardResponseTimeMetric {
  service_name?: string;
  avg_response_ms?: number;
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
