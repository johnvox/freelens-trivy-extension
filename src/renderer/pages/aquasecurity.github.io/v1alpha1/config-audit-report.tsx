import { Renderer } from "@freelensapp/extensions";
import * as MobxReact from "mobx-react";
import { LevelBadge,LevelBadgeStatus } from "../../../components/shared";
import { ClusterConfigAuditReport, ConfigAuditReport, ConfigAuditReportApi, type ClusterConfigAuditReportApi } from "../../../api/aquasecurity.github.io/v1alpha1"
import { withErrorPage } from "../../../components/error-page";
import styles from "./page.module.scss";
import stylesInline from "./page.module.scss?inline";

const { observer } = MobxReact;

const {
  Component: { KubeObjectAge, KubeObjectListLayout, LinkToNamespace, TableCell },
} = Renderer;

const clusterCallbacks = {
  name: (object: ClusterConfigAuditReport) => object.getName(),
  age: (object: ClusterConfigAuditReport) => object.getCreationTimestamp(),
  critical: (object: ClusterConfigAuditReport) => object.report?.summary?.criticalCount ?? 0,
  high: (object: ClusterConfigAuditReport) => object.report?.summary?.highCount ?? 0,
  medium: (object: ClusterConfigAuditReport) => object.report?.summary?.mediumCount ?? 0,
  low: (object: ClusterConfigAuditReport) => object.report?.summary?.lowCount ?? 0,
  none: (object: ClusterConfigAuditReport) => object.report?.summary?.noneCount ?? 0,
  unknown: (object: ClusterConfigAuditReport) => object.report?.summary?.unknownCount ?? 0,
};

const nsCallbacks = {
  name: (object: ConfigAuditReport) => object.getName(),
  namespace: (object: ConfigAuditReport) => object.getNs(),
  age: (object: ConfigAuditReport) => object.getCreationTimestamp(),
  critical: (object: ConfigAuditReport) => object.report?.summary?.criticalCount ?? 0,
  high: (object: ConfigAuditReport) => object.report?.summary?.highCount ?? 0,
  medium: (object: ConfigAuditReport) => object.report?.summary?.mediumCount ?? 0,
  low: (object: ConfigAuditReport) => object.report?.summary?.lowCount ?? 0,
  none: (object: ConfigAuditReport) => object.report?.summary?.noneCount ?? 0,
  unknown: (object: ConfigAuditReport) => object.report?.summary?.unknownCount ?? 0,
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

export interface ClusterConfigAuditReportPageProps {
  extension: Renderer.LensExtension;
}

export const ClusterConfigAuditReportPage = observer((props: ClusterConfigAuditReportPageProps) =>
  withErrorPage(props, () => {
    const store = ClusterConfigAuditReport.getStore<ClusterConfigAuditReport>();

    return (
      <>
        <style>{stylesInline}</style>
        <KubeObjectListLayout<ClusterConfigAuditReport, ClusterConfigAuditReportApi>
          tableId={`${ClusterConfigAuditReport.crd.plural}Table`}
          className={styles.page}
          store={store}
          sortingCallbacks={clusterCallbacks}
          searchFilters={[(object: ClusterConfigAuditReport) => object.getSearchFields()]}
          // renderHeaderTitle={KubeObject.crd.title}
          renderTableHeader={renderClusterTableHeader}
          renderTableContents={(object: ClusterConfigAuditReport) => [
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

export interface ConfigAuditReportPageProps {
  extension: Renderer.LensExtension;
}

export const ConfigAuditReportPage = observer((props: ConfigAuditReportPageProps) =>
  withErrorPage(props, () => {
    const store = ConfigAuditReport.getStore<ConfigAuditReport>();

    return (
      <>
        <style>{stylesInline}</style>
        <KubeObjectListLayout<ConfigAuditReport, ConfigAuditReportApi>
          tableId={`${ConfigAuditReport.crd.plural}Table`}
          className={styles.page}
          store={store}
          sortingCallbacks={nsCallbacks}
          searchFilters={[(object: ConfigAuditReport) => object.getSearchFields()]}
          // renderHeaderTitle={KubeObject.crd.title}
          renderTableHeader={renderNsTableHeader}
          renderTableContents={(object: ConfigAuditReport) => [
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
