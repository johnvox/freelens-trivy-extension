export type Time = string;

export interface TypeMeta {
  apiVersion?: string;
  kind?: string;
}

export interface ListMeta {
  resourceVersion?: string;
  continue?: string;
  remainingItemCount?: number;
}

export interface ObjectMeta {
  name?: string;
  namespace?: string;
  uid?: string;
  resourceVersion?: string;
  creationTimestamp?: Time;
  labels?: Record<string, string>;
  annotations?: Record<string, string>;
  ownerReferences?: Array<{
    apiVersion: string;
    kind: string;
    name: string;
    uid: string;
    controller?: boolean;
    blockOwnerDeletion?: boolean;
  }>;
  [key: string]: unknown;
}

export interface Scanner {
  /** Name of the scanner. */
  name: string;
  /** Name of the vendor providing the scanner. */
  vendor: string;
  /** Version of the scanner. */
  version: string;
}

export interface Registry {
  /** FQDN of the registry server. */
  server?: string;
}

export interface Artifact {
  /** Name of the repository in the Artifact registry. */
  repository?: string;
  /** Unique and immutable identifier of an Artifact. */
  digest?: string;
  /** Mutable, human-readable string used to identify an Artifact. */
  tag?: string;
  /** Type and format of an Artifact. */
  mimeType?: string;
}

export interface Summary {
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  unknownCount?: number;
  noneCount?: number;
}

export interface CheckScope {
  /** e.g. Container, ConfigMapKey or JSONPath. */
  type: string;
  /** Depends on type: container name, ConfigMap key or JSONPath expression. */
  value: string;
}

export enum Severity {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  UNKNOWN = "UNKNOWN",
  NONE = "NONE",
}

export type EmptyStatus = {};