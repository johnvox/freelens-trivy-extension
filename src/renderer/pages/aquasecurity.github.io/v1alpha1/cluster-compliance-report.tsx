import { Renderer } from "@freelensapp/extensions";
import * as MobxReact from "mobx-react";
import { ClusterComplianceReport, type ClusterComplianceReportApi } from "../../../api/aquasecurity.github.io/v1alpha1"
import { withErrorPage } from "../../../components/error-page";
import styles from "./page.module.scss";
import stylesInline from "./page.module.scss?inline";

const { observer } = MobxReact;

const {
  Component: { KubeObjectAge, KubeObjectListLayout, LinkToNamespace, WithTooltip },
} = Renderer;

const KubeObject = ClusterComplianceReport;
type KubeObject = ClusterComplianceReport;
type KubeObjectApi = ClusterComplianceReportApi;

const sortingCallbacks = {
  name: (object: KubeObject) => object.getName(),
  namespace: (object: KubeObject) => object.getNs(),
  // active: (object: KubeObject) => String(KubeObject.getActive(object)),
  // title: (object: KubeObject) => KubeObject.getTitle(object),
  age: (object: KubeObject) => object.getCreationTimestamp(),
};

const renderTableHeader: { title: string; sortBy: keyof typeof sortingCallbacks; className?: string }[] = [
  { title: "Name", sortBy: "name" },
  { title: "Namespace", sortBy: "namespace" },
  // { title: "Active", sortBy: "active", className: styles.active },
  // { title: "Title", sortBy: "title", className: styles.title },
  { title: "Age", sortBy: "age", className: styles.age },
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
            <WithTooltip>{object.getName()}</WithTooltip>,
            <LinkToNamespace namespace={object.getNs()} />,
            // <BadgeBoolean value={KubeObject.getActive(object)} />,
            // <WithTooltip>{KubeObject.getTitle(object) ?? "N/A"}</WithTooltip>,
            <KubeObjectAge object={object} key="age" />,
          ]}
        />
      </>
    );
  }),
);
