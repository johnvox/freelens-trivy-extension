import { Renderer } from "@freelensapp/extensions";
import * as MobxReact from "mobx-react";
import { withErrorPage } from "../../components/error-page";
import { SeveritySummaryChart, SeveritySummaryMixin } from "../../components/severity-summary-chart";
import { ComplianceSummaryChart } from "../../components/compliance-summary-chart";
import styles from "./overview-page.module.scss";
import stylesInline from "./overview-page.module.scss?inline";
import { ClusterComplianceReport, getClusterComplianceReportStore } from "../../api/aquasecurity.github.io/v1alpha1";
import { useEffect, useRef, useState } from "react";

const { observer } = MobxReact;

const {
  Component: {  },
} = Renderer;

export const OverviewPageContent = observer(() => {

  const watches = useRef<(() => void)[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const summaries: Record<string, SeveritySummaryMixin[]> = {};
  // const appProjectStore = getArgoAppProjectStore();
  const clusterComplianceReportStore = getClusterComplianceReportStore();

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const namespaceStore = Renderer.K8sApi.namespaceStore;
      try {
        setLoadError(null);
        setIsLoaded(false);
        await namespaceStore.loadAll({ namespaces: [] });
        if (!isMounted) {
          return;
        }
        watches.current.push(namespaceStore.subscribe());

        await Promise.all([
          clusterComplianceReportStore.loadAll({}),
        ]);
        if (!isMounted) {
          return;
        }
        watches.current.push(clusterComplianceReportStore.subscribe());

        if (isMounted) {
          setIsLoaded(true);
        }
      } catch (error) {
        if (isMounted) {
          const message = error instanceof Error ? error.message : "Failed to load Trivy overview data.";
          setLoadError(message);
          setIsLoaded(true);
        }
      }
    })();

    return () => {
      isMounted = false;
      for (const unsubscribe of watches.current) {
        unsubscribe();
      }
      watches.current = [];
    };
  }, []);

  const clusterComplianceReports = (clusterComplianceReportStore.contextItems as ClusterComplianceReport[]) ?? [];

  
  summaries[ClusterComplianceReport.kind] = clusterComplianceReports as SeveritySummaryMixin[];
  const isLoading = !isLoaded && !loadError;
  return (
    <>
      {isLoading ? <div className={styles.loadingMessage}>Loading Trivy reports...</div> : null}
      <h3 className={styles.title}>Cluster Compliance Reports</h3>
      <div className={styles.chartsRow}>        
        {clusterComplianceReports.map((mixin) => (
          <div className={styles.chart} key={mixin.metadata?.name}>
            <ComplianceSummaryChart report={mixin} isLoading={isLoading} />
          </div>
        ))}
      </div>
      <div className={styles.chartsRow}>
        {Object.entries(summaries).map(([k, mixin]) => (
          <div className={styles.chart} key={k}>
            <SeveritySummaryChart summaries={mixin} isLoading={isLoading} />
          </div>
        ))}
      </div>
    </>
  );
});

export interface OverviewPageProps {
  extension: Renderer.LensExtension;
}

export const OverviewPage = observer((props: OverviewPageProps) => 
  withErrorPage(props, () => {
    return (
      <>
        <style>{stylesInline}</style>
        <OverviewPageContent />
      </>
    );
  })
);