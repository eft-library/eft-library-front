export interface DeploymentNoticeStatus {
  isActive: boolean;
  messageKo: string | null;
  messageEn: string | null;
  messageJa: string | null;
  startTime: string | null;
  endTime: string | null;
  updateTime: string;
}
