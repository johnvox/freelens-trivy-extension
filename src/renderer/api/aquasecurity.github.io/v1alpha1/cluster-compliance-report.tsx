import { Renderer } from "@freelensapp/extensions";
import * as common from "../../common";

export class ClusterComplianceReport extends Renderer.K8sApi.LensExtensionKubeObject<
  Renderer.K8sApi.ClusterScopedMetadata,
  ComplianceReportStatus,
  ReportSpec
> {
  static readonly kind = "ClusterComplianceReport";
  static readonly namespaced = false;
  static readonly apiBase = "/apis/aquasecurity.github.io/v1alpha1/clustercompliancereports";

  static readonly crd: Renderer.K8sApi.LensExtensionKubeObjectCRD = {
    apiVersions: ["aquasecurity.github.io/v1alpha1"],
    plural: "clustercompliancereports",
    singular: "clustercompliancereport",
    shortNames: ["compliance"],
  };
}

export class ClusterComplianceReportApi extends Renderer.K8sApi.KubeApi<ClusterComplianceReport> {}
export class ClusterComplianceReportStore extends Renderer.K8sApi.KubeObjectStore<ClusterComplianceReport, ClusterComplianceReportApi> {}

let _clusterComplianceReportStore: ClusterComplianceReportStore | undefined;

export function getClusterComplianceReportStore(): ClusterComplianceReportStore {
  if (!_clusterComplianceReportStore) {
    const api = new ClusterComplianceReportApi({ objectConstructor: ClusterComplianceReport });
    _clusterComplianceReportStore = new ClusterComplianceReportStore(api);
    Renderer.K8sApi.apiManager.registerStore(_clusterComplianceReportStore);
  }
  return _clusterComplianceReportStore;
}



interface ReportSpec {
  /** Cron expression defining the intervals for report generation. */
  cron: string;
  reportType: ReportType;
  compliance: Compliance;
}

type ReportType = "summary" | "all";

interface Compliance {
  id: string;
  title: string;
  description: string;
  version: string;
  relatedResources: string[];
  platform: string;
  /** (Go field SpecType) */
  type: string;
  controls: Control[];
}

interface Control {
  id: string;
  name: string;
  description?: string;
  checks?: SpecCheck[];
  commands?: Commands[];
  severity: common.Severity;
  /** Default check status in case the resource is not found. */
  defaultStatus?: ControlStatus;
}

interface Commands {
  id: string;
}

interface SpecCheck {
  /** Check id as produced by the scanner. */
  id: string;
}

interface ComplianceReportStatus {
  summary?: ComplianceSummary;
  updateTimestamp: common.Time;
  detailReport?: ComplianceReport;
  summaryReport?: SummaryReport;
}

export interface ComplianceSummary {
  failCount?: number;
  passCount?: number;
}

interface SummaryReport {
  id?: string;
  title?: string;
  /** (JSON key is "controlCheck") */
  controlCheck?: ControlCheckSummary[];
}

interface ControlCheckSummary {
  id?: string;
  name?: string;
  severity?: string;
  totalFail?: number;
}

interface ComplianceReport {
  id?: string;
  title?: string;
  description?: string;
  version?: string;
  /** (JSON key is "relatedVersion", sic) */
  relatedVersion?: string[];
  results?: ControlCheckResult[];
}

interface ControlCheckResult {
  id?: string;
  name?: string;
  description?: string;
  /** (defsec ControlStatus, JSON key is "status") */
  status?: ControlStatus;
  severity?: string;
  checks: ComplianceCheck[];
}

type ControlStatus = "FAIL" | "PASS" | "WARN";

interface ComplianceCheck {
  checkID: string;
  target?: string;
  title?: string;
  description?: string;
  severity: common.Severity;
  category?: string;
  messages?: string[];
  remediation?: string;
  success: boolean;
}
