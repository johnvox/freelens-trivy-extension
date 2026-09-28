import { Renderer } from "@freelensapp/extensions";
import * as common from "../../common";

export class ClusterSbomReport extends Renderer.K8sApi.LensExtensionKubeObject<
  Renderer.K8sApi.KubeObjectMetadata,
  Renderer.K8sApi.KubeStatus,
  SbomReportData
> {
  static readonly kind = "ClusterSbomReport";
  static readonly namespaced = false;
  static readonly apiBase = "/apis/aquasecurity.github.io/v1alpha1/clustersbomreports";

  static readonly crd: Renderer.K8sApi.LensExtensionKubeObjectCRD = {
    apiVersions: ["aquasecurity.github.io/v1alpha1"],
    plural: "clustersbomreports",
    singular: "clustersbomreport",
    shortNames: ["clustersbom"],
  };    
}

export class SbomReport extends Renderer.K8sApi.LensExtensionKubeObject<
  Renderer.K8sApi.ClusterScopedMetadata,
  Renderer.K8sApi.KubeStatus,
  SbomReportData
> {
  static readonly kind = "SbomReport";
  static readonly namespaced = true;
  static readonly apiBase = "/apis/aquasecurity.github.io/v1alpha1/sbomreports";

  static readonly crd: Renderer.K8sApi.LensExtensionKubeObjectCRD = {
    apiVersions: ["aquasecurity.github.io/v1alpha1"],
    plural: "sbomreports",
    singular: "sbomreport",
    shortNames: ["sbom","sboms"],
  };
}

export class SbomReportApi extends Renderer.K8sApi.KubeApi<SbomReport> { }
export class SbomReportStore extends Renderer.K8sApi.KubeObjectStore<SbomReport, SbomReportApi> { }
export class ClusterSbomReportApi extends Renderer.K8sApi.KubeApi<ClusterSbomReport> { }
export class ClusterSbomReportStore extends Renderer.K8sApi.KubeObjectStore<ClusterSbomReport, ClusterSbomReportApi> { }

interface SbomReportData {
  updateTimestamp: common.Time;
  scanner: common.Scanner;
  registry?: common.Registry;
  artifact: common.Artifact;
  summary: SbomSummary;
  /** Artifact bill of materials (JSON key is "components", not "bom"). */
  components: BOM;
}

interface SbomSummary {
  /** Number of dependencies in bom (minimum 0). */
  dependenciesCount: number;
  /** Number of components in bom (minimum 0). */
  componentsCount: number;
}

interface BOM {
  bomFormat: string;
  specVersion: string;
  serialNumber?: string;
  version?: number;
  metadata?: Metadata;
  components?: Component[];
  dependencies?: Dependency[];
}

interface Metadata {
  timestamp?: string;
  tools?: Tools;
  component?: Component;
}

interface Tools {
  components?: Component[];
}

interface Component {
  "bom-ref"?: string;
  type?: string;
  name?: string;
  group?: string;
  version?: string;
  /** Package URL */
  purl?: string;
  supplier?: OrganizationalEntity;
  hashes?: Hash[];
  licenses?: LicenseChoice[];
  properties?: Property[];
}

interface OrganizationalEntity {
  name?: string;
  url?: string[];
  contact?: OrganizationalContact[];
}

interface OrganizationalContact {
  name?: string;
  email?: string;
  phone?: string;
}

interface Hash {
  /** Hash algorithm (Go field Algorithm) */
  alg?: string;
  /** Hash value (Go field Value) */
  content?: string;
}

interface LicenseChoice {
  license?: License;
  expression?: string;
}

interface License {
  id?: string;
  name?: string;
  url?: string;
}

interface Property {
  name?: string;
  value?: string;
}

interface Dependency {
  ref?: string;
  dependsOn?: string[];
}
