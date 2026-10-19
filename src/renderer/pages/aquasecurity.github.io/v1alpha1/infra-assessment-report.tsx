import { Renderer } from "@freelensapp/extensions";
import * as MobxReact from "mobx-react";
import { ClusterInfraAssessmentReport, InfraAssessmentReport, InfraAssessmentReportApi, type ClusterInfraAssessmentReportApi } from "../../../api/aquasecurity.github.io/v1alpha1"
import { withErrorPage } from "../../../components/error-page";
import styles from "./page.module.scss";
import stylesInline from "./page.module.scss?inline";
import { LevelBadge, LevelBadgeStatus } from "../../../components/shared";

const { observer } = MobxReact;

const {
  Component: { KubeObjectAge, KubeObjectListLayout, LinkToNamespace, TableCell },
} = Renderer;

const clusterCallbacks = {
  name: (object: ClusterInfraAssessmentReport) => object.getName(),
  age: (object: ClusterInfraAssessmentReport) => object.getCreationTimestamp(),
  critical: (object: ClusterInfraAssessmentReport) => object.report?.summary.criticalCount ?? 0,
  high: (object: ClusterInfraAssessmentReport) => object.report?.summary.highCount ?? 0,
  medium: (object: ClusterInfraAssessmentReport) => object.report?.summary.mediumCount ?? 0,
  low: (object: ClusterInfraAssessmentReport) => object.report?.summary.lowCount ?? 0,
  none: (object: ClusterInfraAssessmentReport) => object.report?.summary.noneCount ?? 0,
  unknown: (object: ClusterInfraAssessmentReport) => object.report?.summary.unknownCount ?? 0,
};

const nsCallbacks = {
  name: (object: InfraAssessmentReport) => object.getName(),
  namespace: (object: InfraAssessmentReport) => object.getNs(),
  age: (object: InfraAssessmentReport) => object.getCreationTimestamp(),
  critical: (object: InfraAssessmentReport) => object.report?.summary?.criticalCount ?? 0,
  high: (object: InfraAssessmentReport) => object.report?.summary?.highCount ?? 0,
  medium: (object: InfraAssessmentReport) => object.report?.summary?.mediumCount ?? 0,
  low: (object: InfraAssessmentReport) => object.report?.summary?.lowCount ?? 0,
  none: (object: InfraAssessmentReport) => object.report?.summary?.noneCount ?? 0,
  unknown: (object: InfraAssessmentReport) => object.report?.summary?.unknownCount ?? 0,
};

const renderClusterTableHeader: { title: string; sortBy: keyof typeof clusterCallbacks; className?: string }[] = [
  { title: "Name", sortBy: "name" },
  { title: "Critical", sortBy: "critical", className: styles.column },
  { title: "High", sortBy: "high", className: styles.column },
  { title: "Medium", sortBy: "medium", className: styles.column },
  { title: "Low", sortBy: "low", className: styles.column },
  { title: "None", sortBy: "none", className: styles.column },
  { title: "Unknown", sortBy: "unknown", className: styles.column },
  { title: "Age", sortBy: "age", className: styles.column },
];

const renderNsTableHeader: { title: string; sortBy: keyof typeof nsCallbacks; className?: string }[] = [
  { title: "Name", sortBy: "name" },
  { title: "Namespace", sortBy: "namespace" },
  { title: "Critical", sortBy: "critical", className: styles.column },
  { title: "High", sortBy: "high", className: styles.column },
  { title: "Medium", sortBy: "medium", className: styles.column },
  { title: "Low", sortBy: "low", className: styles.column },
  { title: "None", sortBy: "none", className: styles.column },
  { title: "Unknown", sortBy: "unknown", className: styles.column },
  { title: "Age", sortBy: "age", className: styles.column },
];

export interface ClusterInfraAssessmentReportPageProps {
  extension: Renderer.LensExtension;
}

export const ClusterInfraAssessmentReportPage = observer((props: ClusterInfraAssessmentReportPageProps) =>
  withErrorPage(props, () => {
    const store = ClusterInfraAssessmentReport.getStore<ClusterInfraAssessmentReport>();

    return (
      <>
        <style>{stylesInline}</style>
        <KubeObjectListLayout<ClusterInfraAssessmentReport, ClusterInfraAssessmentReportApi>
          tableId={`${ClusterInfraAssessmentReport.crd.plural}Table`}
          className={styles.page}
          store={store}
          sortingCallbacks={clusterCallbacks}
          searchFilters={[(object: ClusterInfraAssessmentReport) => object.getSearchFields()]}
          // renderHeaderTitle={KubeObject.crd.title}
          renderTableHeader={renderClusterTableHeader}
          renderTableContents={(object: ClusterInfraAssessmentReport) => [
            <TableCell>{object.getName()}</TableCell>,
            <LevelBadge count={object.report?.summary?.criticalCount ?? 0} status={LevelBadgeStatus.Critical} />,
            <LevelBadge count={object.report?.summary?.highCount ?? 0} status={LevelBadgeStatus.High} />,
            <LevelBadge count={object.report?.summary?.mediumCount ?? 0} status={LevelBadgeStatus.Medium} />,
            <LevelBadge count={object.report?.summary?.lowCount ?? 0} status={LevelBadgeStatus.Low} />,
            <LevelBadge count={object.report?.summary?.noneCount ?? 0} status={LevelBadgeStatus.None} />,
            <LevelBadge count={object.report?.summary?.unknownCount ?? 0} status={LevelBadgeStatus.Unknown} />,
            <KubeObjectAge object={object} key="age" />,
          ]}
        />
      </>
    );
  }),
);

export interface InfraAssessmentReportPageProps {
  extension: Renderer.LensExtension;
}

export const InfraAssessmentReportPage = observer((props: InfraAssessmentReportPageProps) =>
  withErrorPage(props, () => {
    const store = InfraAssessmentReport.getStore<InfraAssessmentReport>();
    return (
      <>
        <style>{stylesInline}</style>
        <KubeObjectListLayout<InfraAssessmentReport, InfraAssessmentReportApi>
          tableId={`${InfraAssessmentReport.crd.plural}Table`}
          className={styles.page}
          store={store}
          sortingCallbacks={nsCallbacks}
          searchFilters={[(object: InfraAssessmentReport) => object.getSearchFields()]}
          // renderHeaderTitle={KubeObject.crd.title}
          renderTableHeader={renderNsTableHeader}
          renderTableContents={(object: InfraAssessmentReport) => [
            <TableCell>{object.getName()}</TableCell>,
            <LinkToNamespace namespace={object.getNs()} />,
            <LevelBadge count={object.report?.summary?.criticalCount ?? 0} status={LevelBadgeStatus.Critical} />,
            <LevelBadge count={object.report?.summary?.highCount ?? 0} status={LevelBadgeStatus.High} />,
            <LevelBadge count={object.report?.summary?.mediumCount ?? 0} status={LevelBadgeStatus.Medium} />,
            <LevelBadge count={object.report?.summary?.lowCount ?? 0} status={LevelBadgeStatus.Low} />,
            <LevelBadge count={object.report?.summary?.noneCount ?? 0} status={LevelBadgeStatus.None} />,
            <LevelBadge count={object.report?.summary?.unknownCount ?? 0} status={LevelBadgeStatus.Unknown} />,
            <KubeObjectAge object={object} key="age" />,
          ]}
        />
      </>
    );
  }),
);
