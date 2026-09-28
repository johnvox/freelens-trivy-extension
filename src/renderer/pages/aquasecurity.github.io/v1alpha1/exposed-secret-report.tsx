import { Renderer } from "@freelensapp/extensions";
import * as MobxReact from "mobx-react";
import { ExposedSecretReport, ExposedSecretReportApi } from "../../../api/aquasecurity.github.io/v1alpha1"
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