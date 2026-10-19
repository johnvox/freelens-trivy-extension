import { Renderer } from "@freelensapp/extensions";
import * as MobxReact from "mobx-react";
import { withErrorPage } from "../../components/error-page";
import { ComplianceSummaryChart } from "../../components/compliance-summary-chart";
import styles from "./overview-page.module.scss";
import stylesInline from "./overview-page.module.scss?inline";
import { ClusterComplianceReport, ClusterConfigAuditReport, ClusterInfraAssessmentReport, ClusterRbacAssessmentReport, ClusterSbomReport, ClusterVulnerabilityReport, ConfigAuditReport, InfraAssessmentReport, RbacAssessmentReport, SbomReport, VulnerabilityReport } from "../../api/aquasecurity.github.io/v1alpha1";
import { useEffect, useRef, useState } from "react";
import { ConfigAuditReportLegend, ConfigAuditReportsSummaryChart } from "../../components/configauditreport-summary-chart";

const { observer } = MobxReact;

const {
  Component: { NamespaceSelectFilter },
} = Renderer;

export const OverviewPageContent = observer(() => {
  const watches = useRef<(() => void)[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const summaries: Record<string, any[]> = {};

  const clusterComplianceReportStore = ClusterComplianceReport.getStore();
  const configAuditReportStore = ConfigAuditReport.getStore();
  const clusterConfigAuditReportStore = ClusterConfigAuditReport.getStore();
  const infraAssessmentReportStore = InfraAssessmentReport.getStore();
  const clusterInfraAssessmentReportStore = ClusterInfraAssessmentReport.getStore();
  const vulnerabilityReportStore = VulnerabilityReport.getStore();
  const clusterVulnerabilityReportStore = ClusterVulnerabilityReport.getStore();
  const rbacAssessmentReportStore = RbacAssessmentReport.getStore();
  const clusterRbacAssessmentReportStore = ClusterRbacAssessmentReport.getStore();
  const sbomStore = SbomReport.getStore();
  const clusterSbomStore = ClusterSbomReport.getStore();


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
        const namespaces = namespaceStore.items.map((ns) => ns.getName());

        await Promise.all([
          clusterComplianceReportStore.loadAll({}),
          configAuditReportStore.loadAll({ namespaces }),
          clusterConfigAuditReportStore.loadAll({}),
          infraAssessmentReportStore.loadAll({ namespaces }),
          clusterInfraAssessmentReportStore.loadAll({}),
          vulnerabilityReportStore.loadAll({ namespaces }),
          clusterVulnerabilityReportStore.loadAll({}),
          sbomStore.loadAll({ namespaces }),
          clusterSbomStore.loadAll({}),
          rbacAssessmentReportStore.loadAll({ namespaces }),
          clusterRbacAssessmentReportStore.loadAll({}),
        ]);

        if (!isMounted) {
          return;
        }
        watches.current.push(clusterComplianceReportStore.subscribe());
        watches.current.push(configAuditReportStore.subscribe());
        watches.current.push(clusterConfigAuditReportStore.subscribe());
        watches.current.push(infraAssessmentReportStore.subscribe());
        watches.current.push(clusterInfraAssessmentReportStore.subscribe());
        watches.current.push(vulnerabilityReportStore.subscribe());
        watches.current.push(clusterVulnerabilityReportStore.subscribe());
        watches.current.push(rbacAssessmentReportStore.subscribe());
        watches.current.push(clusterRbacAssessmentReportStore.subscribe());

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

  summaries[ClusterComplianceReport.kind] = ((clusterComplianceReportStore.contextItems as ClusterComplianceReport[]) ?? []);
  summaries[ConfigAuditReport.kind] = (configAuditReportStore.contextItems as ConfigAuditReport[]) ?? [];
  summaries[ClusterConfigAuditReport.kind] = (clusterConfigAuditReportStore.contextItems as ClusterConfigAuditReport[]) ?? [];
  summaries[InfraAssessmentReport.kind] = (infraAssessmentReportStore.contextItems as InfraAssessmentReport[]) ?? [];
  summaries[ClusterInfraAssessmentReport.kind] = (clusterInfraAssessmentReportStore.contextItems as ClusterInfraAssessmentReport[]) ?? [];
  summaries[VulnerabilityReport.kind] = (vulnerabilityReportStore.contextItems as VulnerabilityReport[]) ?? [];
  summaries[ClusterVulnerabilityReport.kind] = (clusterVulnerabilityReportStore.contextItems as ClusterVulnerabilityReport[]) ?? [];
  summaries[RbacAssessmentReport.kind] = (rbacAssessmentReportStore.contextItems as RbacAssessmentReport[]) ?? [];
  summaries[ClusterRbacAssessmentReport.kind] = (clusterRbacAssessmentReportStore.contextItems as ClusterRbacAssessmentReport[]) ?? [];

  const isLoading = !isLoaded && !loadError;
  if (isLoading) {
    return (
      <>
        <div className={styles.loadingMessage}>Loading Trivy reports...</div>
      </>
    );
  }

  return (
    <>
    <div className={styles.scrollBody}> 
      <h3 className={styles.title}>Audit Reports</h3>
      <div className={styles.chartsRow}>
        <ConfigAuditReportsSummaryChart reports={summaries[ConfigAuditReport.kind]} isLoading={isLoading} className={ConfigAuditReport.kind} />
        <ConfigAuditReportsSummaryChart reports={summaries[ClusterConfigAuditReport.kind]} isLoading={isLoading} className={ClusterConfigAuditReport.kind} />
        <ConfigAuditReportsSummaryChart reports={summaries[InfraAssessmentReport.kind]} isLoading={isLoading} className={InfraAssessmentReport.kind} />
        <ConfigAuditReportsSummaryChart reports={summaries[ClusterInfraAssessmentReport.kind]} isLoading={isLoading} className={ClusterInfraAssessmentReport.kind} />
        <ConfigAuditReportsSummaryChart reports={summaries[VulnerabilityReport.kind]} isLoading={isLoading} className={VulnerabilityReport.kind} />
        <ConfigAuditReportsSummaryChart reports={summaries[ClusterVulnerabilityReport.kind]} isLoading={isLoading} className={ClusterVulnerabilityReport.kind} />
        <ConfigAuditReportsSummaryChart reports={summaries[RbacAssessmentReport.kind]} isLoading={isLoading} className={RbacAssessmentReport.kind} />
        <ConfigAuditReportsSummaryChart reports={summaries[ClusterRbacAssessmentReport.kind]} isLoading={isLoading} className={ClusterRbacAssessmentReport.kind} />
      </div>
      <h3 className={styles.title}>Cluster Compliance Reports</h3>
      <div className={styles.chartsRow}>
        {summaries[ClusterComplianceReport.kind].map((mixin) => (
          <div className={styles.chart} key={mixin.metadata?.name}>
            <ComplianceSummaryChart report={mixin} isLoading={isLoading} />
          </div>
        ))}
      </div>
    </div>
    </>

  );
});

export interface OverviewPageProps {
  extension: Renderer.LensExtension;
}

export const OverviewPage = observer((props: OverviewPageProps) =>
  withErrorPage(props, () => {
    const watches = useRef<(() => void)[]>([]);
    const [,setIsLoaded] = useState(false);
    const [,setLoadError] = useState<string | null>(null);
    const sbomStore = SbomReport.getStore();
    const clusterSbomStore = ClusterSbomReport.getStore();
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
          const namespaces = namespaceStore.items.map((ns) => ns.getName());

          await Promise.all([
            sbomStore.loadAll({ namespaces }),
            clusterSbomStore.loadAll({}),
          ]);

          if (!isMounted) {
            return;
          }
          watches.current.push(sbomStore.subscribe());
          watches.current.push(clusterSbomStore.subscribe());

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

    const sboms = (sbomStore.contextItems as SbomReport[]) ?? [];
    const clusterSboms = (clusterSbomStore.contextItems as ClusterSbomReport[]) ?? [];
    return (
      <>
        <style>{stylesInline}</style>
        <div className={styles.root}>
          <div className={styles.header}>
            <h5 className={styles.title}>Trivy Overview</h5>
            <h5 className={styles.title}>Sbom Count: {sboms.length}</h5>
            <h5 className={styles.title}>Cluster Sbom Count: {clusterSboms.length}</h5>
            <div className={styles.namespaceFilter}>
              <NamespaceSelectFilter id="overview-namespace-select-filter-input" />
            </div>
          </div>
          <OverviewPageContent />
        </div>
      </>
    );
  })
);