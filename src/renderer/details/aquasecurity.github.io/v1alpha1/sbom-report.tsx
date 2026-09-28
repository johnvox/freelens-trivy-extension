import { Renderer } from "@freelensapp/extensions";
import * as MobxReact from "mobx-react";
import { withErrorPage } from "../../../components/error-page";

import type { SbomReport, ClusterSbomReport } from "../../../api/aquasecurity.github.io/v1alpha1";

const { observer } = MobxReact;

const {
  Component: { DrawerItem, MarkdownViewer },
} = Renderer;

export interface SbomReportDetailsProps extends Renderer.Component.KubeObjectDetailsProps<SbomReport> {
  extension: Renderer.LensExtension;
}

export const SbomReportDetails = observer((props: SbomReportDetailsProps) =>
  withErrorPage(props, () => {
    const { object } = props;
    // const preferences = ExamplePreferencesStore.getInstance<ExamplePreferencesStore>();

    return (
      <>
        <DrawerItem name="Api Version">{object.apiVersion}</DrawerItem>
        <DrawerItem name="Summary">
          <MarkdownViewer markdown={String(object.spec.summary)} />
        </DrawerItem>
      </>
    );
  }),
);

export interface ClusterSbomReportDetailsProps extends Renderer.Component.KubeObjectDetailsProps<ClusterSbomReport> {
  extension: Renderer.LensExtension;
}

export const ClusterSbomReportDetails = observer((props: ClusterSbomReportDetailsProps) =>
  withErrorPage(props, () => {
    const { object } = props;
    // const preferences = ExamplePreferencesStore.getInstance<ExamplePreferencesStore>();

    return (
      <>
        <DrawerItem name="Api Version">{object.apiVersion}</DrawerItem>
        <DrawerItem name="Summary">
          <MarkdownViewer markdown={String(object.spec.summary)} />
        </DrawerItem>
      </>
    );
  }),
);