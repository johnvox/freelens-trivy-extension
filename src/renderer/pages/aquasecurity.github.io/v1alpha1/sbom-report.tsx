import { Renderer } from "@freelensapp/extensions";
import * as MobxReact from "mobx-react";
import {  ClusterSbomReport, ClusterSbomReportApi, SbomReport, SbomReportApi } from "../../../api/aquasecurity.github.io/v1alpha1"
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

export interface SbomReportPageProps {
  extension: Renderer.LensExtension;
}

export const SbomReportPage = observer((props: SbomReportPageProps) =>
  withErrorPage(props, () => {
    const store = SbomReport.getStore<SbomReport>();

    return (
      <>
        <style>{stylesInline}</style>
        <KubeObjectListLayout<SbomReport, SbomReportApi>
          tableId={`${SbomReport.crd.plural}Table`}
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

export interface ClusterSbomReportPageProps {
  extension: Renderer.LensExtension;
}

export const ClusterSbomReportPage = observer((props: ClusterSbomReportPageProps) => 
  withErrorPage(props, () => {
    const store = ClusterSbomReport.getStore<ClusterSbomReport>();

    return (
      <>
        <style>{stylesInline}</style>
        <KubeObjectListLayout<ClusterSbomReport, ClusterSbomReportApi>
          tableId={`${ClusterSbomReport.crd.plural}Table`}
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
