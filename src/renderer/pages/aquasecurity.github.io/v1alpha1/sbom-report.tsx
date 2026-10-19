import { Renderer } from "@freelensapp/extensions";
import * as MobxReact from "mobx-react";
import {  ClusterSbomReport, ClusterSbomReportApi, SbomReport, SbomReportApi } from "../../../api/aquasecurity.github.io/v1alpha1"
import { withErrorPage } from "../../../components/error-page";
import styles from "./page.module.scss";
import stylesInline from "./page.module.scss?inline";

const { observer } = MobxReact;

const {
  Component: { KubeObjectAge, KubeObjectListLayout, LinkToNamespace, TableCell },
} = Renderer;

const clusterCallbacks = {
  name: (object: ClusterSbomReport) => object.getName(),
  age: (object: ClusterSbomReport) => object.getCreationTimestamp(),
  components: (object: ClusterSbomReport) => object.report?.summary?.componentsCount ?? 0,
  dependencies: (object: ClusterSbomReport) => object.report?.summary?.dependenciesCount ?? 0,
  registry: (object: ClusterSbomReport) => object.report?.registry?.server || "N/A",
};

const nsCallbacks = {
  name: (object: SbomReport) => object.getName(),
  namespace: (object: SbomReport) => object.getNs(),
  age: (object: SbomReport) => object.getCreationTimestamp(),
  components: (object: SbomReport) => object.report?.summary?.componentsCount ?? 0,
  dependencies: (object: SbomReport) => object.report?.summary?.dependenciesCount ?? 0,
  registry: (object: SbomReport) => object.report?.registry?.server || "N/A",
};

const renderClusterTableHeader: { title: string; sortBy: keyof typeof clusterCallbacks; className?: string }[] = [
  { title: "Name", sortBy: "name" },
  { title: "Registry", sortBy: "registry", className: styles.column },
  { title: "Components", sortBy: "components", className: styles.column },
  { title: "Dependencies", sortBy: "dependencies", className: styles.column },
  { title: "Age", sortBy: "age", className: styles.column },
];

const renderNsTableHeader: { title: string; sortBy: keyof typeof nsCallbacks; className?: string }[] = [
  { title: "Name", sortBy: "name" },
  { title: "Namespace", sortBy: "namespace" },
  { title: "Registry", sortBy: "registry", className: styles.column },
  { title: "Components", sortBy: "components", className: styles.column },
  { title: "Dependencies", sortBy: "dependencies", className: styles.column },
  { title: "Age", sortBy: "age", className: styles.column },
];

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
          sortingCallbacks={clusterCallbacks}
          searchFilters={[(object: ClusterSbomReport) => object.getSearchFields()]}
          // renderHeaderTitle={KubeObject.crd.title}
          renderTableHeader={renderClusterTableHeader}
          renderTableContents={(object: ClusterSbomReport) => [
            <TableCell>{object.getName()}</TableCell>,
            <TableCell>{object.report?.registry?.server || "N/A"}</TableCell>,
            <TableCell>{object.report?.summary?.componentsCount ?? 0}</TableCell>,
            <TableCell>{object.report?.summary?.dependenciesCount ?? 0}</TableCell>,
            <KubeObjectAge object={object} key="age" />,
          ]}
        />
      </>
    );
  }),
);

export interface SbomReportProps {
  extension: Renderer.LensExtension;
}

export const SbomReportPage = observer((props: SbomReportProps) =>
  withErrorPage(props, () => {
    const store = SbomReport.getStore<SbomReport>();

    return (
      <>
        <style>{stylesInline}</style>
        <KubeObjectListLayout<SbomReport, SbomReportApi>
          tableId={`${SbomReport.crd.plural}Table`}
          className={styles.page}
          store={store}
          sortingCallbacks={nsCallbacks}
          searchFilters={[(object: SbomReport) => object.getSearchFields()]}
          // renderHeaderTitle={KubeObject.crd.title}
          renderTableHeader={renderNsTableHeader}
          renderTableContents={(object: SbomReport) => [
            <TableCell>{object.getName()}</TableCell>,
            <LinkToNamespace namespace={object.getNs()} />,
            <TableCell>{object.report?.registry?.server || "N/A"}</TableCell>,
            <TableCell>{object.report?.summary?.componentsCount ?? 0}</TableCell>,
            <TableCell>{object.report?.summary?.dependenciesCount ?? 0}</TableCell>,
            <KubeObjectAge object={object} key="age" />,
          ]}
        />
      </>
    );
  }),
);
