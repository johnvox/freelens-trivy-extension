import { Renderer } from "@freelensapp/extensions";
import { observer } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import styles from "./configauditreport-summary-chart.module.scss";
import stylesInline from "./configauditreport-summary-chart.module.scss?inline";
import { ConfigAuditReport } from "../api/aquasecurity.github.io/v1alpha1";
import { Severity } from "../api/common";
const { 
  Component: { PieChart, Badge, StatusBrick },
} = Renderer;

interface ConfigAuditReportsSummaryChartProps {
  className?: string;
  reports: ConfigAuditReport[];
  isLoading?: boolean;
}
const colorMap: Record<string, string> = {
  [Severity.CRITICAL]:  "#B91C1C",
  [Severity.HIGH]: "#F59E0B",
  [Severity.MEDIUM]: "#3B82F6",
  [Severity.LOW]:  "#10B981",
  [Severity.UNKNOWN]: "#6B7280",
  [Severity.NONE]: "#D1D5DB",
};
export const  ConfigAuditReportLegend = observer(({}) => {
    return (
      <div className="legend flex flex-wrap">
        {Object.entries(colorMap).map(([status, color]) => (
          <Badge className="LegendBadge flex gap-2 items-center" flat={true} label={
            <div className="flex items-center">
              <StatusBrick style={{ backgroundColor: color }} className="shrink-0" />
              <span>{status}</span>
            </div>
          } style={{ paddingLeft: "8px" }}/>
        ))} 
        </div>
    );  
});

export const ConfigAuditReportsSummaryChart = observer(
  ({ className, reports }: ConfigAuditReportsSummaryChartProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [resolvedColors, setResolvedColors] = useState<Record<string, string>>({});
    const summary = reports.reduce((acc, report) => {
      acc[Severity.CRITICAL] = (acc[Severity.CRITICAL] || 0) + (report.report?.summary?.criticalCount ?? 0);
      acc[Severity.HIGH] = (acc[Severity.HIGH] || 0) + (report.report?.summary?.highCount ?? 0);
      acc[Severity.MEDIUM] = (acc[Severity.MEDIUM] || 0) + (report.report?.summary?.mediumCount ?? 0);
      acc[Severity.LOW] = (acc[Severity.LOW] || 0) + (report.report?.summary?.lowCount ?? 0);
      acc[Severity.UNKNOWN] = (acc[Severity.UNKNOWN] || 0) + (report.report?.summary?.unknownCount ?? 0);
      acc[Severity.NONE] = (acc[Severity.NONE] || 0) + (report.report?.summary?.noneCount ?? 0);
      return acc
    }, {} as Record<keyof typeof Severity, number>);


    // Resolve theme colors using CSS custom properties
    useEffect(() => {
      if (containerRef.current) {
        const computedStyle = getComputedStyle(containerRef.current);
        const colorMap: Record<string, string> = {
          [Severity.CRITICAL]: computedStyle.getPropertyValue("--config-report-critical").trim() || "#B91C1C",
          [Severity.HIGH]: computedStyle.getPropertyValue("--config-report-high").trim() || "#F59E0B",
          [Severity.MEDIUM]: computedStyle.getPropertyValue("--config-report-medium").trim() || "#3B82F6",
          [Severity.LOW]: computedStyle.getPropertyValue("--config-report-low").trim() || "#10B981",
          [Severity.UNKNOWN]: computedStyle.getPropertyValue("--config-report-unknown").trim() || "#6B7280",
          [Severity.NONE]: computedStyle.getPropertyValue("--config-report-none").trim() || "#D1D5DB",
        };
        setResolvedColors(colorMap);
      }
    }, [reports]); // Re-run when applications change (which might indicate theme change)

    // Filter out empty status counts and ensure we have data
    const filteredStatusCounts = Object.fromEntries(Object.entries(summary).filter(([_, count]) => count >= 0));

    // Prepare chart data in FreeLens format
    const statusesToBeShown = Object.entries(filteredStatusCounts);
    const statusDataSet = {
      label: "Status",
      data: statusesToBeShown.map(([, value]) => value),
      backgroundColor: statusesToBeShown.map(
        ([status]) => resolvedColors[status] || resolvedColors[Severity.UNKNOWN] || "#757575",
      ),
      tooltipLabels: statusesToBeShown.map(
        ([status]) =>
          (percent: string) =>
            `${status}: ${percent})`,
      ),
      borderWidth: 0,
    };

    const chartData = {
      labels: statusesToBeShown.map(([status, count]) => `${status}: ${count}`),
      datasets: [statusDataSet as any],
    };

    const chartOptions = {
      plugins: [{
        tooltip: {
          enabled: true,
        },
        legend: {
          fullSize: false,
          position: "right",
        }
      }],
    };
    console.log(filteredStatusCounts);
    const hideChart = reports === null || Object.keys(filteredStatusCounts).length == 0 || Object.values(filteredStatusCounts).every((count) => count === 0);
    if (!hideChart) {
    return (
            <>
        <style>{stylesInline}</style>
        <div ref={containerRef} className={`ConfigAuditReportsChart ${styles.chartContainer} ${className || ""}`}>
          <div className={styles.chart}>
            <PieChart data={chartData} options={chartOptions} showLegend={true} title={className} />
          </div>
        </div>
      </>
      );
    }
    return null;
  },
);