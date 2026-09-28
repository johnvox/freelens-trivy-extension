import { Renderer } from "@freelensapp/extensions";
import * as common from "../../common";


export class InfraAssessmentReport extends Renderer.K8sApi.LensExtensionKubeObject<
  Renderer.K8sApi.KubeObjectMetadata,
  Renderer.K8sApi.KubeStatus,
  InfraAssessmentReportData
> {
  static readonly kind = "InfraAssessmentReport";
  static readonly namespaced = true;
  static readonly apiBase = "/apis/aquasecurity.github.io/v1alpha1/infraassessmentreports";

  static readonly crd: Renderer.K8sApi.LensExtensionKubeObjectCRD = {
    apiVersions: ["aquasecurity.github.io/v1alpha1"],
    plural: "infraassessmentreports",
    singular: "infraassessmentreport",
    shortNames: ["infraassessment","infraassessments"],
  };  
}

export class ClusterInfraAssessmentReport extends Renderer.K8sApi.LensExtensionKubeObject<
  Renderer.K8sApi.ClusterScopedMetadata,
  Renderer.K8sApi.KubeStatus,
  InfraAssessmentReportData
> {
  static readonly kind = "ClusterInfraAssessmentReport";
  static readonly namespaced = false;
  static readonly apiBase = "/apis/aquasecurity.github.io/v1alpha1/clusterinfraassessmentreports";

  static readonly crd: Renderer.K8sApi.LensExtensionKubeObjectCRD = {
    apiVersions: ["aquasecurity.github.io/v1alpha1"],
    plural: "clusterinfraassessmentreports",
    singular: "clusterinfraassessmentreport",
    shortNames: ["clusterinfraassessment"],
  };
}

export class InfraAssessmentReportApi extends Renderer.K8sApi.KubeApi<InfraAssessmentReport> { }
export class InfraAssessmentReportStore extends Renderer.K8sApi.KubeObjectStore<InfraAssessmentReport, InfraAssessmentReportApi> { }
export class ClusterInfraAssessmentReportApi extends Renderer.K8sApi.KubeApi<ClusterInfraAssessmentReport> { }
export class ClusterInfraAssessmentReportStore extends Renderer.K8sApi.KubeObjectStore<ClusterInfraAssessmentReport, ClusterInfraAssessmentReportApi> { }


interface InfraAssessmentReportData {
  scanner: common.Scanner;
  summary: common.Summary;
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
  scope?: common.CheckScope;
}
