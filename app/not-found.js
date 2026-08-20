export const metadata = { title: 'Page not found', robots: { index: false, follow: false } }

// Rendered with a real 404 status by Next, not a 200 with an error on it.
export default function NotFound() {
  return (
    <div className="shell">
      <div className="form-page">
      <h1>That page is not here</h1>
      <p>
        The comparison you asked for either moved or was never published. The full list
        of published comparisons is on the <a href="/">home page</a>, and if the pair you
        want is missing you can <a href="/request">ask for it</a>.
      </p>
      </div>
    </div>
  )
}
