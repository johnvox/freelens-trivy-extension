import { Renderer } from "@freelensapp/extensions";
import * as MobxReact from "mobx-react";
import { ExposedSecretReport, ExposedSecretReportApi } from "../../../api/aquasecurity.github.io/v1alpha1"
import { withErrorPage } from "../../../components/error-page";
import styles from "./page.module.scss";
import stylesInline from "./page.module.scss?inline";
import { LevelBadge, LevelBadgeStatus } from "../../../components/shared";


const { observer } = MobxReact;

const {
  Component: { KubeObjectAge, KubeObjectListLayout, LinkToNamespace, TableCell },
} = Renderer;


const nsCallbacks = {
  name: (object: ExposedSecretReport) => object.getName(),
  namespace: (object: ExposedSecretReport) => object.getNs(),
  age: (object: ExposedSecretReport) => object.getCreationTimestamp(),
  critical: (object: ExposedSecretReport) => object.report?.summary?.criticalCount ?? 0,
  high: (object: ExposedSecretReport) => object.report?.summary?.highCount ?? 0,
  medium: (object: ExposedSecretReport) => object.report?.summary?.mediumCount ?? 0,
  low: (object: ExposedSecretReport) => object.report?.summary?.lowCount ?? 0,
  none: (object: ExposedSecretReport) => object.report?.summary?.noneCount ?? 0,
  unknown: (object: ExposedSecretReport) => object.report?.summary?.unknownCount ?? 0,
};

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


export interface ExposedSecretReportPageProps {
  extension: Renderer.LensExtension;
}

export const ExposedSecretReportPage = observer((props: ExposedSecretReportPageProps) =>
  withErrorPage(props, () => {
    const store = ExposedSecretReport.getStore<ExposedSecretReport>();

    return (
      <>
        <style>{stylesInline}</style>
        <KubeObjectListLayout<ExposedSecretReport, ExposedSecretReportApi>
          tableId={`${ExposedSecretReport.crd.plural}Table`}
          className={styles.page}
          store={store}
          sortingCallbacks={nsCallbacks}
          searchFilters={[(object: ExposedSecretReport) => object.getSearchFields()]}
          // renderHeaderTitle={KubeObject.crd.title}
          renderTableHeader={renderNsTableHeader}
          renderTableContents={(object: ExposedSecretReport) => [
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
