import { Renderer } from "@freelensapp/extensions";
import * as MobxReact from "mobx-react";
import {  ClusterRbacAssessmentReport, ClusterRbacAssessmentReportApi, RbacAssessmentReport, RbacAssessmentReportApi } from "../../../api/aquasecurity.github.io/v1alpha1"
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

export interface RbacAssessmentReportPageProps {
  extension: Renderer.LensExtension;
}

export const RbacAssessmentReportPage = observer((props: RbacAssessmentReportPageProps) =>
  withErrorPage(props, () => {
    const store = RbacAssessmentReport.getStore<RbacAssessmentReport>();

    return (
      <>
        <style>{stylesInline}</style>
        <KubeObjectListLayout<RbacAssessmentReport, RbacAssessmentReportApi>
          tableId={`${RbacAssessmentReport.crd.plural}Table`}
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
