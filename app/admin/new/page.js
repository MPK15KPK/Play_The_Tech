import { one, POSTS } from '../../../lib/db.js'
import { requireAdmin } from '../../../lib/session.js'
import PostForm from './PostForm.js'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Edit comparison', robots: { index: false, follow: false, nocache: true } }

export default async function NewPostPage({ searchParams }) {
  await requireAdmin('/admin/new')

  const sp = await searchParams
  const id = Number.parseInt(sp?.id, 10)

  let post = null
  if (Number.isInteger(id) && id > 0) {
    post = await one(`SELECT * FROM ${POSTS} WHERE id = $1`, [id])
  }

  return (
    <div className="shell admin-shell">
      <div className="admin-bar">
        <a className="button secondary" href="/admin">← Back to Dashboard</a>
        <span className="spacer" />
        {post?.published ? (
          <a className="button" href={`/compare/${post.slug}`} target="_blank" rel="noreferrer">
            View Live Post ↗
          </a>
        ) : null}
      </div>

      <div className="admin-card editor-card">
        <div className="editor-card-head">
          <h1>{post ? `Edit: ${post.title}` : 'Create New Comparison'}</h1>
          <p className="editor-card-subtitle">
            Author an independent primary-sourced comparison matrix and editorial guide.
          </p>
        </div>

        {!post && Number.isInteger(id) && id > 0 ? (
          <div className="notice bad" role="alert">
            <p>No post with id {id}. This form will create a new one instead.</p>
          </div>
        ) : null}

        <PostForm post={post} />
      </div>
    </div>
  )
}
