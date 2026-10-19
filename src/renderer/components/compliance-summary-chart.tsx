import { Renderer } from "@freelensapp/extensions";
import { observer } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import styles from "./compliance-summary-chart.module.scss";
import stylesInline from "./compliance-summary-chart.module.scss?inline";
import { ClusterComplianceReport } from "../api/aquasecurity.github.io/v1alpha1/cluster-compliance-report";
const {
  Component: { PieChart },
} = Renderer;

interface ComplianceSummaryChartProps {
  className?: string;
  report: ClusterComplianceReport;
  isLoading?: boolean;
}

export const ComplianceSummaryChart = observer(
  ({ className, report }: ComplianceSummaryChartProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [resolvedColors, setResolvedColors] = useState<Record<string, string>>({});

    const complianceStatus: Record<string, number> = {
      Failed: report?.status?.summary?.failCount || 0,
      Passed: report?.status?.summary?.passCount || 0
    };

    // Resolve theme colors using CSS custom properties
    useEffect(() => {
      if (containerRef.current) {
        const computedStyle = getComputedStyle(containerRef.current);
        const colorMap: Record<string, string> = {
          Failed: computedStyle.getPropertyValue("--compliance-summary-failed").trim() || "#B91C1C",
          Passed: computedStyle.getPropertyValue("--compliance-summary-passed").trim() || "#16A34A",
        };
        setResolvedColors(colorMap);
      }
    }, [report]); // Re-run when applications change (which might indicate theme change)

    // Filter out empty status counts and ensure we have data
    const filteredStatusCounts = Object.fromEntries(Object.entries(complianceStatus).filter(([_, count]) => count >= 0));

    // Prepare chart data in FreeLens format
    const statusesToBeShown = Object.entries(filteredStatusCounts);

    const statusDataSet = {
      label: "Status",
      data: statusesToBeShown.map(([, value]) => value),
      backgroundColor: statusesToBeShown.map(
        ([status]) => resolvedColors[status] || resolvedColors.Unknown || "#757575",
      ),
      tooltipLabels: statusesToBeShown.map(
        ([status]) =>
          (percent: string) =>
            `${status}: ${percent}`,
      ),
      borderWidth: 0,
    };

    const chartData = {
      labels: statusesToBeShown.map(([status, count]) => `${status}: ${count}`),
      datasets: [statusDataSet as any],
    };

    const chartOptions = {
      showLegend: false,
      plugins: [{
        tooltip: {
          enabled: true,
        },
      }],
    };
    console.log(filteredStatusCounts);
    if (report === null || Object.keys(filteredStatusCounts).length === 0 || (complianceStatus.Failed === 0 && complianceStatus.Passed === 0)) {
      return null;
    }

    return (
      <>
        <style>{stylesInline}</style>
        <div ref={containerRef} className={`ComplianceSummaryChart ${styles.chartContainer} ${className || ""}`}>
          <div className={styles.chart}>
            <PieChart data={chartData} options={chartOptions} showLegend={false} title={report.metadata?.name} />
          </div>
        </div>
      </>
    );
  },
);