import * as common from "../../common";
import { Renderer } from "@freelensapp/extensions";

export class ConfigAuditReport extends Renderer.K8sApi.LensExtensionKubeObject<
  Renderer.K8sApi.KubeObjectMetadata,
  Renderer.K8sApi.KubeStatus,
  ConfigAuditReportData
> {
  static readonly kind = "ConfigAuditReport";
  static readonly namespaced = true;
  static readonly apiBase = "/apis/aquasecurity.github.io/v1alpha1/configauditreports";

  static readonly crd: Renderer.K8sApi.LensExtensionKubeObjectCRD = {
    apiVersions: ["aquasecurity.github.io/v1alpha1"],
    plural: "configauditreports",
    singular: "configauditreport",
    shortNames: ["configaudit", "configaudits"],
  };
}

export class ClusterConfigAuditReport extends Renderer.K8sApi.LensExtensionKubeObject<
  Renderer.K8sApi.ClusterScopedMetadata,
  Renderer.K8sApi.KubeStatus,
  ConfigAuditReportData
> {
  static readonly kind = "ClusterConfigAuditReport";
  static readonly namespaced = false;
  static readonly apiBase = "/apis/aquasecurity.github.io/v1alpha1/clusterconfigauditreports";

  static readonly crd: Renderer.K8sApi.LensExtensionKubeObjectCRD = {
    apiVersions: ["aquasecurity.github.io/v1alpha1"],
    plural: "clusterconfigauditreports",
    singular: "clusterconfigauditreport",
    shortNames: ["clusterconfigaudit"],
  };
}

export class ConfigAuditReportApi extends Renderer.K8sApi.KubeApi<ConfigAuditReport> { }
export class ConfigAuditReportStore extends Renderer.K8sApi.KubeObjectStore<ConfigAuditReport, ConfigAuditReportApi> { }
export class ClusterConfigAuditReportApi extends Renderer.K8sApi.KubeApi<ClusterConfigAuditReport> { }
export class ClusterConfigAuditReportStore extends Renderer.K8sApi.KubeObjectStore<ClusterConfigAuditReport, ClusterConfigAuditReportApi> { }


interface ConfigAuditReportData {
  updateTimestamp?: common.Time;
  scanner?: common.Scanner;
  summary?: common.Summary;
  /** Results of conducting audit steps. */
  checks: Check[];
}

interface Check {
  checkID: string;
  title?: string;
  description?: string;
  severity: common.Severity;
  category?: string;
  messages?: string[];
  /** Description or links to external resources to remediate a failing check. */
  remediation?: string;
  success: boolean;
  /** Section of config that was audited. */
  scope?: CheckScope;
}

interface CheckScope {
  /** e.g. Container, ConfigMapKey or JSONPath. */
  type: string;
  /** Depends on type: container name, ConfigMap key or JSONPath expression. */
  value: string;
}
