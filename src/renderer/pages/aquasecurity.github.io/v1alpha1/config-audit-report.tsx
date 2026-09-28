import { Renderer } from "@freelensapp/extensions";
import * as MobxReact from "mobx-react";
import { ClusterConfigAuditReport, ConfigAuditReport, ConfigAuditReportApi, type ClusterConfigAuditReportApi } from "../../../api/aquasecurity.github.io/v1alpha1"
import { withErrorPage } from "../../../components/error-page";
import styles from "./page.module.scss";
import stylesInline from "./page.module.scss?inline";

const { observer } = MobxReact;

const {
  Component: { KubeObjectAge, KubeObjectListLayout, LinkToNamespace, WithTooltip },
} = Renderer;

const sortingCallbacks = {
  name: (object: Renderer.K8sApi.KubeObject) => object.getName(),
  namespace: (object: Renderer.K8sApi.KubeObject) => object.getNs(),
  age: (object: Renderer.K8sApi.KubeObject) => object.getCreationTimestamp(),
};

const renderTableHeader: { title: string; sortBy: keyof typeof sortingCallbacks; className?: string }[] = [
  { title: "Name", sortBy: "name" },
  { title: "Namespace", sortBy: "namespace" },
  { title: "Age", sortBy: "age", className: styles.age },
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
          sortingCallbacks={sortingCallbacks}
          searchFilters={[(object: Renderer.K8sApi.KubeObject) => object.getSearchFields()]}
          // renderHeaderTitle={KubeObject.crd.title}
          renderTableHeader={renderTableHeader}
          renderTableContents={(object: Renderer.K8sApi.KubeObject) => [
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
          sortingCallbacks={sortingCallbacks}
          searchFilters={[(object: Renderer.K8sApi.KubeObject) => object.getSearchFields()]}
          // renderHeaderTitle={KubeObject.crd.title}
          renderTableHeader={renderTableHeader}
          renderTableContents={(object: Renderer.K8sApi.KubeObject) => [
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
