import { Renderer } from "@freelensapp/extensions";
import { TrivyIcon } from "./icons"
import * as v1alpha1 from "./api/aquasecurity.github.io/v1alpha1";
import * as detailsV1alpha1 from "./details/aquasecurity.github.io/v1alpha1";
import * as pagesV1alpha1 from "./pages/aquasecurity.github.io/v1alpha1";
import * as pagesCommon from "./pages/common";

const ROOT_MENU_ID = "trivy-operator";

export class TrivyRenderer extends Renderer.LensExtension {
  clusterPages = [
    {
      id: `overview-cluster-page`,
      components: {
        Page: (props: { extension: Renderer.LensExtension }) => <pagesCommon.OverviewPage {...props} extension={this} />,
      },
    },
    {
      id: `${v1alpha1.ClusterComplianceReport.kind}-cluster-page`,
      components: {
        Page: (props: { extension: Renderer.LensExtension }) => <pagesV1alpha1.ClusterComplianceReportPage {...props} extension={this} />,
      },
    },
    {
      id: `${v1alpha1.ConfigAuditReport.kind}-cluster-page`,
      components: {
        Page: (props: { extension: Renderer.LensExtension }) => <pagesV1alpha1.ConfigAuditReportPage {...props} extension={this} />,
      },
    },
    {
      id: `${v1alpha1.ClusterConfigAuditReport.kind}-cluster-page`,
      components: {
        Page: (props: { extension: Renderer.LensExtension }) => <pagesV1alpha1.ClusterConfigAuditReportPage {...props} extension={this} />,
      },
    },
    {
      id: `${v1alpha1.SbomReport.kind}-cluster-page`,
      components: {
        Page: (props: { extension: Renderer.LensExtension }) => <pagesV1alpha1.SbomReportPage {...props} extension={this} />,
      },
    },
    {
      id: `${v1alpha1.ClusterSbomReport.kind}-cluster-page`,
      components: {
        Page: (props: { extension: Renderer.LensExtension }) => <pagesV1alpha1.ClusterSbomReportPage {...props} extension={this} />,
      },
    },
    {
      id: `${v1alpha1.InfraAssessmentReport.kind}-cluster-page`,
      components: {
        Page: (props: { extension: Renderer.LensExtension }) => <pagesV1alpha1.InfraAssessmentReportPage {...props} extension={this} />,
      },
    },
    {
      id: `${v1alpha1.ClusterInfraAssessmentReport.kind}-cluster-page`,
      components: {
        Page: (props: { extension: Renderer.LensExtension }) => <pagesV1alpha1.ClusterInfraAssessmentReportPage {...props} extension={this} />,
      },
    },
    {
      id: `${v1alpha1.VulnerabilityReport.kind}-cluster-page`,
      components: {
        Page: (props: { extension: Renderer.LensExtension }) => <pagesV1alpha1.VulnerabilityReportPage {...props} extension={this} />,
      },
    },
    {
      id: `${v1alpha1.ClusterVulnerabilityReport.kind}-cluster-page`,
      components: {
        Page: (props: { extension: Renderer.LensExtension }) => <pagesV1alpha1.ClusterVulnerabilityReportPage {...props} extension={this} />,
      },
    },
      {
      id: `${v1alpha1.RbacAssessmentReport.kind}-cluster-page`,
      components: {
        Page: (props: { extension: Renderer.LensExtension }) => <pagesV1alpha1.RbacAssessmentReportPage {...props} extension={this} />,
      },
    },
    {
      id: `${v1alpha1.ClusterRbacAssessmentReport.kind}-cluster-page`,
      components: {
        Page: (props: { extension: Renderer.LensExtension }) => <pagesV1alpha1.ClusterRbacAssessmentReportPage {...props} extension={this} />,
      },
    },
      {
      id: `${v1alpha1.ExposedSecretReport.kind}-cluster-page`,
      components: {
        Page: (props: { extension: Renderer.LensExtension }) => <pagesV1alpha1.ExposedSecretReportPage {...props} extension={this} />,
      },
    },
  ];

  clusterPageMenus = [
    {
      id: ROOT_MENU_ID,
      title: "Trivy Operator",
      components: {
        Icon: TrivyIcon,
      },
    },
      {
      id: `overview-cluster-page-menu`,
      parentId: ROOT_MENU_ID,
      title: "Overview",
      target: { pageId: `overview-cluster-page` },
      components: {},
    },
    {
      id: `${v1alpha1.ClusterComplianceReport.kind}-cluster-page-menu`,
      parentId: ROOT_MENU_ID,
      title: v1alpha1.ClusterComplianceReport.kind,
      target: { pageId: `${v1alpha1.ClusterComplianceReport.kind}-cluster-page` },
      components: {},
    },
    {
      id: `${v1alpha1.ConfigAuditReport.kind}-cluster-page-menu`,
      parentId: ROOT_MENU_ID,
      title: v1alpha1.ConfigAuditReport.kind,
      target: { pageId: `${v1alpha1.ConfigAuditReport.kind}-cluster-page` },
      components: {},
    },
    {
      id: `${v1alpha1.ClusterConfigAuditReport.kind}-cluster-page-menu`,
      parentId: ROOT_MENU_ID,
      title: v1alpha1.ClusterConfigAuditReport.kind,
      target: { pageId: `${v1alpha1.ClusterConfigAuditReport.kind}-cluster-page` },
      components: {},
    },
    {
      id: `${v1alpha1.SbomReport.kind}-cluster-page-menu`,
      parentId: ROOT_MENU_ID,
      title: v1alpha1.SbomReport.kind,
      target: { pageId: `${v1alpha1.SbomReport.kind}-cluster-page` },
      components: {},
    },
    {
      id: `${v1alpha1.ClusterSbomReport.kind}-cluster-page-menu`,
      parentId: ROOT_MENU_ID,
      title: v1alpha1.ClusterSbomReport.kind,
      target: { pageId: `${v1alpha1.ClusterSbomReport.kind}-cluster-page` },
      components: {},
    },
    {
      id: `${v1alpha1.InfraAssessmentReport.kind}-cluster-page-menu`,
      parentId: ROOT_MENU_ID,
      title: v1alpha1.InfraAssessmentReport.kind,
      target: { pageId: `${v1alpha1.InfraAssessmentReport.kind}-cluster-page` },
      components: {},
    },
    {
      id: `${v1alpha1.ClusterInfraAssessmentReport.kind}-cluster-page-menu`,
      parentId: ROOT_MENU_ID,
      title: v1alpha1.ClusterInfraAssessmentReport.kind,
      target: { pageId: `${v1alpha1.ClusterInfraAssessmentReport.kind}-cluster-page` },
      components: {},
    },
    {
      id: `${v1alpha1.ClusterVulnerabilityReport.kind}-cluster-page-menu`,
      parentId: ROOT_MENU_ID,
      title: v1alpha1.ClusterVulnerabilityReport.kind,
      target: { pageId: `${v1alpha1.ClusterVulnerabilityReport.kind}-cluster-page` },
      components: {},
    },
    {
      id: `${v1alpha1.VulnerabilityReport.kind}-cluster-page-menu`,
      parentId: ROOT_MENU_ID,
      title: v1alpha1.VulnerabilityReport.kind,
      target: { pageId: `${v1alpha1.VulnerabilityReport.kind}-cluster-page` },
      components: {},
    },
    {
      id: `${v1alpha1.RbacAssessmentReport.kind}-cluster-page-menu`,
      parentId: ROOT_MENU_ID,
      title: v1alpha1.RbacAssessmentReport.kind,
      target: { pageId: `${v1alpha1.RbacAssessmentReport.kind}-cluster-page` },
      components: {},
    },
    {
      id: `${v1alpha1.ClusterRbacAssessmentReport.kind}-cluster-page-menu`,
      parentId: ROOT_MENU_ID,
      title: v1alpha1.ClusterRbacAssessmentReport.kind,
      target: { pageId: `${v1alpha1.ClusterRbacAssessmentReport.kind}-cluster-page` },
      components: {},
    },
    {
      id: `${v1alpha1.ExposedSecretReport.kind}-cluster-page-menu`,
      parentId: ROOT_MENU_ID,
      title: v1alpha1.ExposedSecretReport.kind,
      target: { pageId: `${v1alpha1.ExposedSecretReport.kind}-cluster-page` },
      components: {},
    },
  ];

  kubeObjectDetailItems = [
    {
      kind: v1alpha1.ClusterComplianceReport.kind,
      apiVersions: v1alpha1.ClusterComplianceReport.crd.apiVersions,
      priority: 10,
      components: {
        Details: (props: Renderer.Component.KubeObjectDetailsProps<any>) => (
          <detailsV1alpha1.ClusterComplianceReportDetails {...props} extension={this} />
        ),
      },
    },
    {
      kind: v1alpha1.ConfigAuditReport.kind,
      apiVersions: v1alpha1.ConfigAuditReport.crd.apiVersions,
      priority: 10,
      components: {
        Details: (props: Renderer.Component.KubeObjectDetailsProps<any>) => (
          <detailsV1alpha1.ConfigAuditReportDetails {...props} extension={this} />
        ),
      },
    },
    {
      kind: v1alpha1.ClusterConfigAuditReport.kind,
      apiVersions: v1alpha1.ClusterConfigAuditReport.crd.apiVersions,
      priority: 10,
      components: {
        Details: (props: Renderer.Component.KubeObjectDetailsProps<any>) => (
          <detailsV1alpha1.ClusterConfigAuditReportDetails {...props} extension={this} />
        ),
      },
    },
    {
      kind: v1alpha1.SbomReport.kind,
      apiVersions: v1alpha1.SbomReport.crd.apiVersions,
      priority: 10,
      components: {
        Details: (props: Renderer.Component.KubeObjectDetailsProps<any>) => (
          <detailsV1alpha1.SbomReportDetails {...props} extension={this} />
        ),
      },
    },
    {
      kind: v1alpha1.ClusterSbomReport.kind,
      apiVersions: v1alpha1.ClusterSbomReport.crd.apiVersions,
      priority: 10,
      components: {
        Details: (props: Renderer.Component.KubeObjectDetailsProps<any>) => (
          <detailsV1alpha1.ClusterSbomReportDetails {...props} extension={this} />
        ),
      },
    },
    {
      kind: v1alpha1.InfraAssessmentReport.kind,
      apiVersions: v1alpha1.InfraAssessmentReport.crd.apiVersions,
      priority: 10,
      components: {
        Details: (props: Renderer.Component.KubeObjectDetailsProps<any>) => (
          <detailsV1alpha1.InfraAssessmentReportDetails {...props} extension={this} />
        ),
      },
    },
    {
      kind: v1alpha1.ClusterInfraAssessmentReport.kind,
      apiVersions: v1alpha1.ClusterInfraAssessmentReport.crd.apiVersions,
      priority: 10,
      components: {
        Details: (props: Renderer.Component.KubeObjectDetailsProps<any>) => (
          <detailsV1alpha1.ClusterInfraAssessmentReportDetails {...props} extension={this} />
        ),
      },
    },
    {
      kind: v1alpha1.VulnerabilityReport.kind,
      apiVersions: v1alpha1.VulnerabilityReport.crd.apiVersions,
      priority: 10,
      components: {
        Details: (props: Renderer.Component.KubeObjectDetailsProps<any>) => (
          <detailsV1alpha1.VulnerabilityReportDetails {...props} extension={this} />
        ),
      },
    },
    {
      kind: v1alpha1.ClusterVulnerabilityReport.kind,
      apiVersions: v1alpha1.ClusterVulnerabilityReport.crd.apiVersions,
      priority: 10,
      components: {
        Details: (props: Renderer.Component.KubeObjectDetailsProps<any>) => (
          <detailsV1alpha1.ClusterVulnerabilityReportDetails {...props} extension={this} />
        ),
      },
    },
  ];

  async onActivate() {
    console.log("[trivy-extension] renderer activated");
  }
}
export default TrivyRenderer;
