import { Renderer } from "@freelensapp/extensions";
import * as MobxReact from "mobx-react";
import { LevelBadge,LevelBadgeStatus } from "../../../components/shared";
import { ClusterComplianceReport, type ClusterComplianceReportApi } from "../../../api/aquasecurity.github.io/v1alpha1"
import { withErrorPage } from "../../../components/error-page";
import styles from "./page.module.scss";
import stylesInline from "./page.module.scss?inline";

const { observer } = MobxReact;

const {
  Component: { KubeObjectAge, KubeObjectListLayout, TableCell},
} = Renderer;

const KubeObject = ClusterComplianceReport;
type KubeObject = ClusterComplianceReport;
type KubeObjectApi = ClusterComplianceReportApi;

const sortingCallbacks = {
  name: (object: KubeObject) => object.getName(),
  type: (object: KubeObject) => object.spec.reportType ?? "",
  cron: (object: KubeObject) => object.spec.cron ?? "",
  failed: (object: KubeObject) => object.status?.summary?.failCount ?? 0,
  passed: (object: KubeObject) => object.status?.summary?.passCount ?? 0,
  lastExecuted: (object: KubeObject) => object.getCreationTimestamp(),
};

const renderTableHeader: { title: string; sortBy: keyof typeof sortingCallbacks; className?: string }[] = [
  { title: "Name", sortBy: "name" },
  { title: "Type", sortBy: "type" },
  { title: "Cron Expression", sortBy: "cron", className: styles.column },
  { title: "Check Failed", sortBy: "failed", className: styles.column },
  { title: "Check Passed", sortBy: "passed", className: styles.column },
  { title: "Last Executed", sortBy: "lastExecuted" },
];

export interface ClusterComplianceReportsPageProps {
  extension: Renderer.LensExtension;
}

export const ClusterComplianceReportPage = observer((props: ClusterComplianceReportsPageProps) =>
  withErrorPage(props, () => {
    const store = KubeObject.getStore<KubeObject>();

    return (
      <>
        <style>{stylesInline}</style>
        <KubeObjectListLayout<KubeObject, KubeObjectApi>
          tableId={`${KubeObject.crd.plural}Table`}
          className={styles.page}
          store={store}
          sortingCallbacks={sortingCallbacks}
          searchFilters={[(object: KubeObject) => object.getSearchFields()]}
          // renderHeaderTitle={KubeObject.crd.title}
          renderTableHeader={renderTableHeader}
          renderTableContents={(object: KubeObject) => [
            <TableCell>{object.getName()}</TableCell>,
            <TableCell>{object.spec?.reportType ?? "N/A"}</TableCell>,
            <TableCell>{object.spec?.cron ?? "N/A"}</TableCell>,
            <LevelBadge count={object.status?.summary?.failCount ?? 0} status={LevelBadgeStatus.Failed} />,
            <LevelBadge count={object.status?.summary?.passCount ?? 0} status={LevelBadgeStatus.Passed} />,
            <KubeObjectAge object={object} key="age" />,
          ]}
        />
      </>
    );
  }),
);
