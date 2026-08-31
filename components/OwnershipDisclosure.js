/**
 * GUARDRAILS 1.1 / 1.2 — any page where Salezx appears carries this, above the
 * comparison table and above the fold. Not in the footer, not below the table,
 * and the wording says "shared ownership" outright rather than "affiliated with".
 *
 * Render it wherever a Salezx row exists. Deleting it from a page that names
 * Salezx is a guardrail breach, not a styling decision.
 */
export default function OwnershipDisclosure({ children }) {
  return (
    <div className="disclosure" role="note">
      <h2>Ownership disclosure</h2>
      <p>
        {children || (
          <>
            playthetech and <strong>Salezx</strong> share common ownership. Salezx is judged here on the
            same criteria and the same evidence standard as every other platform on this page: figures
            come from each vendor&rsquo;s own site or documentation, and where Salezx publishes less than a
            competitor, this page says so.
          </>
        )}
      </p>
    </div>
  )
}
