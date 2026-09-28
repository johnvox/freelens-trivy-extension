import { Renderer } from "@freelensapp/extensions";
import * as common from "../../common";

export class RbacAssessmentReport extends Renderer.K8sApi.LensExtensionKubeObject<
  Renderer.K8sApi.KubeObjectMetadata,
  Renderer.K8sApi.KubeStatus,
  RbacAssessmentReportData
> {
  static readonly kind = "RbacAssessmentReport";
  static readonly namespaced = true;
  static readonly apiBase = "/apis/aquasecurity.github.io/v1alpha1/rbacassessmentreports";

  static readonly crd: Renderer.K8sApi.LensExtensionKubeObjectCRD = {
    apiVersions: ["aquasecurity.github.io/v1alpha1"],
    plural: "rbacassessmentreports",
    singular: "rbacassessmentreport",
    shortNames: ["rbacassessment","rbacassessments"],
  };  
}

export class ClusterRbacAssessmentReport extends Renderer.K8sApi.LensExtensionKubeObject<
  Renderer.K8sApi.ClusterScopedMetadata,
  Renderer.K8sApi.KubeStatus,
  RbacAssessmentReportData
> {
  static readonly kind = "ClusterRbacAssessmentReport";
  static readonly namespaced = false;
  static readonly apiBase = "/apis/aquasecurity.github.io/v1alpha1/clusterrbacassessmentreports";

  static readonly crd: Renderer.K8sApi.LensExtensionKubeObjectCRD = {
    apiVersions: ["aquasecurity.github.io/v1alpha1"],
    plural: "clusterrbacassessmentreports",
    singular: "clusterrbacassessmentreport",
    shortNames: ["clusterrbacassessmentreport"],
  };    
}


export class RbacAssessmentReportApi extends Renderer.K8sApi.KubeApi<RbacAssessmentReport> { }
export class RbacAssessmentReportStore extends Renderer.K8sApi.KubeObjectStore<RbacAssessmentReport, RbacAssessmentReportApi> { }
export class ClusterRbacAssessmentReportApi extends Renderer.K8sApi.KubeApi<ClusterRbacAssessmentReport> { }
export class ClusterRbacAssessmentReportStore extends Renderer.K8sApi.KubeObjectStore<ClusterRbacAssessmentReport, ClusterRbacAssessmentReportApi> { }


interface RbacAssessmentReportData {
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
