import { Renderer } from "@freelensapp/extensions";
import * as MobxReact from "mobx-react";
import { withErrorPage } from "../../../components/error-page";

import type { RbacAssessmentReport, ClusterRbacAssessmentReport } from "../../../api/aquasecurity.github.io/v1alpha1";

const { observer } = MobxReact;

const {
  Component: { DrawerItem, MarkdownViewer },
} = Renderer;

export interface RbacAssessmentReportDetailsProps extends Renderer.Component.KubeObjectDetailsProps<RbacAssessmentReport> {
  extension: Renderer.LensExtension;
}

export const RbacAssessmentReportDetails = observer((props: RbacAssessmentReportDetailsProps) =>
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

export interface ClusterRbacAssessmentReportDetailsProps extends Renderer.Component.KubeObjectDetailsProps<ClusterRbacAssessmentReport> {
  extension: Renderer.LensExtension;
}

export const ClusterRbacAssessmentReportDetails = observer((props: ClusterRbacAssessmentReportDetailsProps) =>
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