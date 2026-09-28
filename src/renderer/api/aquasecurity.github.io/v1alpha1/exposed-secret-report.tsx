import { Renderer } from "@freelensapp/extensions";
import * as common from "../../common";

export class ExposedSecretReport extends Renderer.K8sApi.LensExtensionKubeObject<
  Renderer.K8sApi.KubeObjectMetadata,
  Renderer.K8sApi.KubeStatus,
  ExposedSecretReportData
> {
  static readonly kind = "ExposedSecretReport";
  static readonly namespaced = true;
  static readonly apiBase = "/apis/aquasecurity.github.io/v1alpha1/exposedsecretreports";

  static readonly crd: Renderer.K8sApi.LensExtensionKubeObjectCRD = {
    apiVersions: ["aquasecurity.github.io/v1alpha1"],
    plural: "exposedsecretreports",
    singular: "exposedsecretreport",
    shortNames: ["exposedsecret","exposedsecrets"],
  };  
}

export class ExposedSecretReportApi extends Renderer.K8sApi.KubeApi<ExposedSecretReport> { }
export class ExposedSecretReportStore extends Renderer.K8sApi.KubeObjectStore<ExposedSecretReport, ExposedSecretReportApi> { }

interface ExposedSecretReportData {
  updateTimestamp: common.Time;
  scanner: common.Scanner;
  registry?: common.Registry;
  artifact: common.Artifact;
  summary: common.Summary;
  /** Passwords, api keys, tokens and others found in the Artifact. */
  secrets: ExposedSecret[];
}

interface ExposedSecret {
  /** Where the exposed secret was found. */
  target: string;
  /** Rule identifier. */
  ruleID: string;
  title: string;
  category: string;
  /** Enum: CRITICAL | HIGH | MEDIUM | LOW */
  severity: common.Severity;
  /** Where the rule matched. */
  match: string;
}
