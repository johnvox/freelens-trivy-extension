import { Renderer } from "@freelensapp/extensions";
import * as MobxReact from "mobx-react";
// import { ExamplePreferencesStore } from "../../common/store";
import { withErrorPage } from "../../../components/error-page";

import type { ClusterComplianceReport } from "../../../api/aquasecurity.github.io/v1alpha1";

const { observer } = MobxReact;

const {
  Component: { DrawerItem, MarkdownViewer },
} = Renderer;

export interface ClusterComplianceReportDetailsProps extends Renderer.Component.KubeObjectDetailsProps<ClusterComplianceReport> {
  extension: Renderer.LensExtension;
}

export const ClusterComplianceReportDetails = observer((props: ClusterComplianceReportDetailsProps) =>
  withErrorPage(props, () => {
    const { object } = props;
    // const preferences = ExamplePreferencesStore.getInstance<ExamplePreferencesStore>();

    return (
      <>
        <DrawerItem name="Api Version">{object.apiVersion}</DrawerItem>
        <DrawerItem name="Report Type">
          <MarkdownViewer markdown={object.spec.reportType} />
        </DrawerItem>
        <DrawerItem name="Cron Expression">
          <MarkdownViewer markdown={object.spec.cron} />
        </DrawerItem>
      </>
    );
  }),
);