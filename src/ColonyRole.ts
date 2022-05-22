export enum ColonyRole {
  Recovery,
  Root,
  Arbitration,
  Architecture,
  /**
   * @deprecated
   * The `ArchitectureSubdomain` role has been deprecated and should not be used */
  ArchitectureSubdomain,
  Funding,
  Administration,
  /** @internal */
  LAST_ROLE,
}