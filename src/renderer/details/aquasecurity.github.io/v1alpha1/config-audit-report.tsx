import { Renderer } from "@freelensapp/extensions";
import * as MobxReact from "mobx-react";
// import { ExamplePreferencesStore } from "../../common/store";
import { withErrorPage } from "../../../components/error-page";

import type { ClusterConfigAuditReport, ConfigAuditReport } from "../../../api/aquasecurity.github.io/v1alpha1";

const { observer } = MobxReact;

const {
  Component: { DrawerItem, MarkdownViewer },
} = Renderer;

export interface ConfigAuditReportDetailsProps extends Renderer.Component.KubeObjectDetailsProps<ConfigAuditReport> {
  extension: Renderer.LensExtension;
}

export const ConfigAuditReportDetails = observer((props: ConfigAuditReportDetailsProps) =>
  withErrorPage(props, () => {
    const { object } = props;
    // const preferences = ExamplePreferencesStore.getInstance<ExamplePreferencesStore>();

    return (
      <>
        <DrawerItem name="Api Version">{object.apiVersion}</DrawerItem>
        <DrawerItem name="Summary">
          <MarkdownViewer markdown={String(object.spec.summary?.criticalCount)} />
        </DrawerItem>
      </>
    );
  }),
);

export interface ClusterConfigAuditReportDetailsProps extends Renderer.Component.KubeObjectDetailsProps<ClusterConfigAuditReport> {
  extension: Renderer.LensExtension;
}

export const ClusterConfigAuditReportDetails = observer((props: ClusterConfigAuditReportDetailsProps) =>
  withErrorPage(props, () => {
    const { object } = props;
    // const preferences = ExamplePreferencesStore.getInstance<ExamplePreferencesStore>();

    return (
      <>
        <DrawerItem name="Api Version">{object.apiVersion}</DrawerItem>
        <DrawerItem name="Summary">
          <MarkdownViewer markdown={String(object.spec.summary?.criticalCount)} />
        </DrawerItem>
      </>
    );
  }),
);