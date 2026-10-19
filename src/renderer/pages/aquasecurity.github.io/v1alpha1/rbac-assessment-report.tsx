import { Renderer } from "@freelensapp/extensions";
import * as MobxReact from "mobx-react";
import {  ClusterRbacAssessmentReport, ClusterRbacAssessmentReportApi, RbacAssessmentReport, RbacAssessmentReportApi } from "../../../api/aquasecurity.github.io/v1alpha1"
import { withErrorPage } from "../../../components/error-page";
import styles from "./page.module.scss";
import stylesInline from "./page.module.scss?inline";
import { LevelBadge, LevelBadgeStatus } from "../../../components/shared";

const { observer } = MobxReact;

const {
  Component: { KubeObjectAge, KubeObjectListLayout, LinkToNamespace, TableCell },
} = Renderer;

const clusterCallbacks = {
  name: (object: ClusterRbacAssessmentReport) => object.getName(),
  age: (object: ClusterRbacAssessmentReport) => object.getCreationTimestamp(),
  critical: (object: ClusterRbacAssessmentReport) => object.report?.summary?.criticalCount ?? 0,
  high: (object: ClusterRbacAssessmentReport) => object.report?.summary?.highCount ?? 0,
  medium: (object: ClusterRbacAssessmentReport) => object.report?.summary?.mediumCount ?? 0,
  low: (object: ClusterRbacAssessmentReport) => object.report?.summary?.lowCount ?? 0,
  none: (object: ClusterRbacAssessmentReport) => object.report?.summary?.noneCount ?? 0,
  unknown: (object: ClusterRbacAssessmentReport) => object.report?.summary?.unknownCount ?? 0,
};

const nsCallbacks = {
  name: (object: RbacAssessmentReport) => object.getName(),
  namespace: (object: RbacAssessmentReport) => object.getNs(),
  age: (object: RbacAssessmentReport) => object.getCreationTimestamp(),
  critical: (object: RbacAssessmentReport) => object.report?.summary?.criticalCount ?? 0,
  high: (object: RbacAssessmentReport) => object.report?.summary?.highCount ?? 0,
  medium: (object: RbacAssessmentReport) => object.report?.summary?.mediumCount ?? 0,
  low: (object: RbacAssessmentReport) => object.report?.summary?.lowCount ?? 0,
  none: (object: RbacAssessmentReport) => object.report?.summary?.noneCount ?? 0,
  unknown: (object: RbacAssessmentReport) => object.report?.summary?.unknownCount ?? 0,
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

export interface ClusterRbacAssessmentReportPageProps {
  extension: Renderer.LensExtension;
}

export const ClusterRbacAssessmentReportPage = observer((props: ClusterRbacAssessmentReportPageProps) =>
  withErrorPage(props, () => {
    const store = ClusterRbacAssessmentReport.getStore<ClusterRbacAssessmentReport>();

    return (
      <>
        <style>{stylesInline}</style>
        <KubeObjectListLayout<ClusterRbacAssessmentReport, ClusterRbacAssessmentReportApi>
          tableId={`${ClusterRbacAssessmentReport.crd.plural}Table`}
          className={styles.page}
          store={store}
          sortingCallbacks={clusterCallbacks}
          searchFilters={[(object: ClusterRbacAssessmentReport) => object.getSearchFields()]}
          // renderHeaderTitle={KubeObject.crd.title}
          renderTableHeader={renderClusterTableHeader}
          renderTableContents={(object: ClusterRbacAssessmentReport) => [
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

export interface RbacAssessmentReportProps {
  extension: Renderer.LensExtension;
}

export const RbacAssessmentReportPage = observer((props: RbacAssessmentReportProps) =>
  withErrorPage(props, () => {
    const store = RbacAssessmentReport.getStore<RbacAssessmentReport>();

    return (
      <>
        <style>{stylesInline}</style>
        <KubeObjectListLayout<RbacAssessmentReport, RbacAssessmentReportApi>
          tableId={`${RbacAssessmentReport.crd.plural}Table`}
          className={styles.page}
          store={store}
          sortingCallbacks={nsCallbacks}
          searchFilters={[(object: RbacAssessmentReport) => object.getSearchFields()]}
          // renderHeaderTitle={KubeObject.crd.title}
          renderTableHeader={renderNsTableHeader}
          renderTableContents={(object: RbacAssessmentReport) => [
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
