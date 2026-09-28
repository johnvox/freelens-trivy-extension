import { Renderer } from "@freelensapp/extensions";
import * as MobxReact from "mobx-react";
import { withErrorPage } from "../../../components/error-page";

import type { InfraAssessmentReport, ClusterInfraAssessmentReport } from "../../../api/aquasecurity.github.io/v1alpha1";

const { observer } = MobxReact;

const {
  Component: { DrawerItem, MarkdownViewer },
} = Renderer;

export interface InfraAssessmentReportDetailsProps extends Renderer.Component.KubeObjectDetailsProps<InfraAssessmentReport> {
  extension: Renderer.LensExtension;
}

export const InfraAssessmentReportDetails = observer((props: InfraAssessmentReportDetailsProps) =>
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

export interface ClusterInfraAssessmentReportDetailsProps extends Renderer.Component.KubeObjectDetailsProps<ClusterInfraAssessmentReport> {
  extension: Renderer.LensExtension;
}

export const ClusterInfraAssessmentReportDetails = observer((props: ClusterInfraAssessmentReportDetailsProps) =>
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