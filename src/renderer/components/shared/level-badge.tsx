import React from "react";

const baseStyle: React.CSSProperties = {
  display: "inline-block",
  borderRadius: "999px",
  padding: "0.125rem 0.5rem",
  fontSize: "0.75rem",
  lineHeight: 1.4,
  fontWeight: 600,
  whiteSpace: "nowrap",
};

export enum LevelBadgeStatus {
  Failed = 1,
  Passed,
  Critical,
  High,
  Medium,
  Low,
  Unknown,
  None,
}

const toneStyles: Record<LevelBadgeStatus, React.CSSProperties> = {
  [LevelBadgeStatus.Passed]: {
    backgroundColor: "#dcfce7",
    color: "#166534",
  },
  [LevelBadgeStatus.Failed]: {
    backgroundColor: "#f8d7da",
    color: "#842029",
  },
  [LevelBadgeStatus.Critical]: {
    backgroundColor: "#f8d7da",
    color: "#842029",
  },
  [LevelBadgeStatus.High]: {
    backgroundColor: "#ffedd5",
    color: "#9a3412",
  },
  [LevelBadgeStatus.Medium]: {
    backgroundColor: "#fef9c3",
    color: "#854d0e",
  },
  [LevelBadgeStatus.Low]: {
    backgroundColor: "#dbeafe",
    color: "#166534",
  },
  [LevelBadgeStatus.Unknown]: {
    backgroundColor: "#f3e8ff",
    color: "#6b21a8",
  },
  [LevelBadgeStatus.None]: {
    backgroundColor: "#f1f5f9",
    color: "#475569",
  },
};

function getStatusTone(count:number, status: LevelBadgeStatus): LevelBadgeStatus {
  switch (status) {
    case LevelBadgeStatus.Failed:
      if (count > 0) {
        return LevelBadgeStatus.Failed;
      }
      return LevelBadgeStatus.Passed;
    default:
      if (count > 0) {
        return status;
      }
      return LevelBadgeStatus.Passed;
  }
}

interface StatusBadgeProps {
  count: number;
  status: LevelBadgeStatus;
  prefix?: string;
}

// FailedBadge, PassedBadge
export function LevelBadge({ count, status, prefix }: StatusBadgeProps) {
  const tone = getStatusTone(count, status);

  return (
    <span data-testid="StatusBadge" data-tone={tone} style={{ ...baseStyle, ...toneStyles[tone] }}>
      {prefix ? `${prefix}: ` : ""}
      {count}
    </span>
  );
}