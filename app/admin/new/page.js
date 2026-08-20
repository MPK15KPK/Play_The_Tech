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
      <div className="form-page wide">
      <div className="admin-bar">
        <a href="/admin">← Admin</a>
        <span className="spacer" />
        {post?.published ? <a href={`/compare/${post.slug}`}>View published page</a> : null}
      </div>

      <h1>{post ? `Edit: ${post.title}` : 'New comparison'}</h1>
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
