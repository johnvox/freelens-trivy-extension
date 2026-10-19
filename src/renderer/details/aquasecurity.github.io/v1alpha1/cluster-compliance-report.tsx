import { Renderer } from "@freelensapp/extensions";
import * as MobxReact from "mobx-react";
// import { ExamplePreferencesStore } from "../../common/store";
import { withErrorPage } from "../../../components/error-page";

import type { ClusterComplianceReport } from "../../../api/aquasecurity.github.io/v1alpha1";
import { LevelBadge,LevelBadgeStatus } from "../../../components/shared";

const { observer } = MobxReact;

const {
  Component: { DrawerItem, MarkdownViewer, DrawerTitle },
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
        <DrawerTitle>Spec</DrawerTitle>
        <DrawerItem name="Report Type">{object.spec.reportType}</DrawerItem>
        <DrawerItem name="Cron">{object.spec.cron}</DrawerItem>

        <DrawerTitle>Status</DrawerTitle>
        <DrawerItem name="Summary">
          <LevelBadge status={LevelBadgeStatus.Passed} count={object.status?.summary?.passCount ?? 0} prefix="Passed" />
          <LevelBadge status={LevelBadgeStatus.Failed} count={object.status?.summary?.failCount ?? 0} prefix="Failed" />
        </DrawerItem>

        {/* <DrawerTitle>Details</DrawerTitle>
        {object.status?.summaryReport?.controlCheck?.map((detail) => (
          <DrawerItem name={detail.id} title={detail.name}>
            <LevelBadge status={LevelBadgeStatus.Passed} count={detail.passCount ?? 0} prefix="Passed" />
            <LevelBadge status={LevelBadgeStatus.Failed} count={detail.failCount ?? 0} prefix="Failed" />
          </DrawerItem>
        ))} */}
      </>
    );
  }),
);