import { Renderer } from "@freelensapp/extensions";
import { observer } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import styles from "./severity-summary-chart.module.scss";
import stylesInline from "./severity-summary-chart.module.scss?inline";
import { Summary, Severity} from "../api/common";

const {
  Component: { PieChart },
} = Renderer;

export interface SeveritySummaryMixin {
  summary?: Summary;
}

export interface ComplianceSummaryMixin {
  summary?: Summary;
}

interface SeveritySummaryChartProps {
  className?: string;
  summaries: SeveritySummaryMixin[];
  isLoading?: boolean;
}

export const SeveritySummaryChart = observer(
  ({ className, summaries, isLoading }: SeveritySummaryChartProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [resolvedColors, setResolvedColors] = useState<Record<string, string>>({});

    // Count applications by health status
    const statusCounts = summaries.reduce(
      (acc, summaryMixin) => {
        acc[Severity.CRITICAL] = (acc[Severity.CRITICAL] || 0) + (summaryMixin.summary?.criticalCount || 0);
        acc[Severity.HIGH] = (acc[Severity.HIGH] || 0) + (summaryMixin.summary?.highCount || 0);;
        acc[Severity.MEDIUM] = (acc[Severity.MEDIUM] || 0) + (summaryMixin.summary?.mediumCount || 0);
        acc[Severity.LOW] = (acc[Severity.LOW] || 0) + (summaryMixin.summary?.lowCount || 0);
        acc[Severity.UNKNOWN] = (acc[Severity.UNKNOWN] || 0) + (summaryMixin.summary?.unknownCount || 0);
        acc[Severity.NONE] = (acc[Severity.NONE] || 0) + (summaryMixin.summary?.noneCount || 0);
        return acc;
      },
      {} as Record<string, number>,
    );
    console.debug("[trivy]", summaries, JSON.stringify(summaries));
    // Resolve theme colors using CSS custom properties
    useEffect(() => {
      if (containerRef.current) {
        const computedStyle = getComputedStyle(containerRef.current);
        const colorMap: Record<string, string> = {
          Critical: computedStyle.getPropertyValue("--severity-summary-critical").trim() || "#B91C1C",
          High: computedStyle.getPropertyValue("--severity-summary-high").trim() || "#F97316",
          Medium: computedStyle.getPropertyValue("--severity-summary-medium").trim() || "#EAB308",
          Low: computedStyle.getPropertyValue("--severity-summary-low").trim() || "#16A34A",
          Unknown: computedStyle.getPropertyValue("--severity-summary-unknown").trim() || "#7C3AED",
          None: computedStyle.getPropertyValue("--severity-summary-none").trim() || "#94A3B8",
        };
        setResolvedColors(colorMap);
      }
    }, [summaries]); // Re-run when applications change (which might indicate theme change)

    // Filter out empty status counts and ensure we have data
    const filteredStatusCounts = Object.fromEntries(Object.entries(statusCounts).filter(([_, count]) => count > 0));

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
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom" as const,
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltip: {
          enabled: true,
        },
      },
    };

    if (summaries.length === 0 || Object.keys(filteredStatusCounts).length === 0) {
      return (
        <>
          <style>{stylesInline}</style>
          <div className={`${styles.chartContainer} ${className || ""}`}>
            <h6 className={styles.title}>Trivy Report Summary</h6>
            <div className={styles.noData}>
              <div>{isLoading ? "Loading Trivy Reports..." : "No reports"}</div>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <style>{stylesInline}</style>
        <div ref={containerRef} className={`SeveritySummaryChart ${styles.chartContainer} ${className || ""}`}>
          <h6 className={styles.title}>Trivy Report Summary</h6>
          <div className={styles.chart}>
            <PieChart data={chartData} options={chartOptions} height={300} showLegend={true} legendPosition="bottom" />
          </div>
        </div>
      </>
    );
  },
);

export const FailedSuccessSummaryChart = observer(
  ({ className, summaries, isLoading }: SeveritySummaryChartProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [resolvedColors, setResolvedColors] = useState<Record<string, string>>({});

    // Count applications by health status
    const statusCounts = summaries.reduce(
      (acc, summaryMixin) => {
        acc[Severity.CRITICAL] = (acc[Severity.CRITICAL] || 0) + (summaryMixin.summary?.criticalCount || 0);
        acc[Severity.HIGH] = (acc[Severity.HIGH] || 0) + (summaryMixin.summary?.highCount || 0);;
        acc[Severity.MEDIUM] = (acc[Severity.MEDIUM] || 0) + (summaryMixin.summary?.mediumCount || 0);
        acc[Severity.LOW] = (acc[Severity.LOW] || 0) + (summaryMixin.summary?.lowCount || 0);
        acc[Severity.UNKNOWN] = (acc[Severity.UNKNOWN] || 0) + (summaryMixin.summary?.unknownCount || 0);
        acc[Severity.NONE] = (acc[Severity.NONE] || 0) + (summaryMixin.summary?.noneCount || 0);
        return acc;
      },
      {} as Record<string, number>,
    );
    console.debug("[trivy]", summaries, JSON.stringify(summaries));
    // Resolve theme colors using CSS custom properties
    useEffect(() => {
      if (containerRef.current) {
        const computedStyle = getComputedStyle(containerRef.current);
        const colorMap: Record<string, string> = {
          Critical: computedStyle.getPropertyValue("--severity-summary-critical").trim() || "#B91C1C",
          High: computedStyle.getPropertyValue("--severity-summary-high").trim() || "#F97316",
          Medium: computedStyle.getPropertyValue("--severity-summary-medium").trim() || "#EAB308",
          Low: computedStyle.getPropertyValue("--severity-summary-low").trim() || "#16A34A",
          Unknown: computedStyle.getPropertyValue("--severity-summary-unknown").trim() || "#7C3AED",
          None: computedStyle.getPropertyValue("--severity-summary-none").trim() || "#94A3B8",
        };
        setResolvedColors(colorMap);
      }
    }, [summaries]); // Re-run when applications change (which might indicate theme change)

    // Filter out empty status counts and ensure we have data
    const filteredStatusCounts = Object.fromEntries(Object.entries(statusCounts).filter(([_, count]) => count > 0));

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
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom" as const,
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltip: {
          enabled: true,
        },
      },
    };

    if (summaries.length === 0 || Object.keys(filteredStatusCounts).length === 0) {
      return (
        <>
          <style>{stylesInline}</style>
          <div className={`${styles.chartContainer} ${className || ""}`}>
            <h6 className={styles.title}>Trivy Report Summary</h6>
            <div className={styles.noData}>
              <div>{isLoading ? "Loading Trivy Reports..." : "No reports"}</div>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <style>{stylesInline}</style>
        <div ref={containerRef} className={`SeveritySummaryChart ${styles.chartContainer} ${className || ""}`}>
          <h6 className={styles.title}>Trivy Report Summary</h6>
          <div className={styles.chart}>
            <PieChart data={chartData} options={chartOptions} height={300} showLegend={true} legendPosition="bottom" />
          </div>
        </div>
      </>
    );
  },
);