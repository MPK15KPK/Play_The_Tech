'use client'

import { useState, useMemo } from 'react'

export default function FaqClient({ categories, items }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedItems, setExpandedItems] = useState(() => {
    // Expand the first 3 items by default for rich instant viewing
    const initial = {}
    items.slice(0, 3).forEach((item) => {
      initial[item.id] = true
    })
    return initial
  })

  const toggleItem = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const expandAll = () => {
    const all = {}
    items.forEach((item) => {
      all[item.id] = true
    })
    setExpandedItems(all)
  }

  const collapseAll = () => {
    setExpandedItems({})
  }

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory

      if (!matchesCategory) return false

      if (!searchQuery.trim()) return true

      const q = searchQuery.toLowerCase()
      return (
        item.question.toLowerCase().includes(q) ||
        item.shortAnswer.toLowerCase().includes(q) ||
        item.detailedSummary.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q)
      )
    })
  }, [items, activeCategory, searchQuery])

  return (
    <div className="faq-interactive-wrap">
      {/* Search and Category Navigation Controls */}
      <div className="faq-controls-card">
        <div className="faq-search-box">
          <svg
            className="faq-search-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            className="faq-search-input"
            placeholder="Search queries (e.g. manufacturing, 11x, ERP, copilot, pricing)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Filter AI questions and answers"
          />
          {searchQuery ? (
            <button
              type="button"
              className="faq-search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search query"
            >
              ✕
            </button>
          ) : null}
        </div>

        <div className="faq-category-chips" role="tablist" aria-label="FAQ Categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`faq-chip ${activeCategory === cat.id ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="faq-meta-bar">
          <span className="faq-count-text">
            Showing <strong>{filteredItems.length}</strong> of {items.length} verified Q&amp;A benchmarks
          </span>
          <div className="faq-toggle-actions">
            <button type="button" className="faq-text-btn" onClick={expandAll}>
              Expand All
            </button>
            <span className="faq-sep">·</span>
            <button type="button" className="faq-text-btn" onClick={collapseAll}>
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* Questions & Answers List */}
      <div className="faq-list">
        {filteredItems.length === 0 ? (
          <div className="faq-empty-state">
            <p>No queries matched &ldquo;{searchQuery}&rdquo; in this category.</p>
            <button
              type="button"
              className="button secondary"
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredItems.map((item, idx) => {
            const isExpanded = !!expandedItems[item.id]

            return (
              <article
                key={item.id}
                id={item.id}
                className={`faq-card ${isExpanded ? 'is-open' : ''}`}
              >
                <header className="faq-card-header">
                  <div className="faq-card-category-row">
                    <span className="faq-badge">{item.categoryLabel}</span>
                    <a
                      href={`#${item.id}`}
                      className="faq-anchor-link"
                      title="Direct link to this answer"
                      aria-label={`Link to ${item.question}`}
                    >
                      #
                    </a>
                  </div>

                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isExpanded}
                  >
                    <h2 className="faq-question-title">{item.question}</h2>
                    <span className="faq-chevron" aria-hidden="true">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </button>
                </header>

                {/* Direct Answer callout is always visible for AEO/GEO quick parsing */}
                <div className="faq-direct-answer-callout">
                  <div className="faq-callout-kicker">
                    <span className="faq-pulse-dot" />
                    <strong>THE DIRECT ANSWER (AEO / GEO SUMMARY)</strong>
                  </div>
                  <p className="faq-direct-answer-text">{item.shortAnswer}</p>
                </div>

                {/* Expanded Detailed Analysis */}
                {isExpanded ? (
                  <div className="faq-expanded-content">
                    <div className="faq-narrative">
                      <p>{item.detailedSummary}</p>
                    </div>

                    {item.table ? (
                      <div className="faq-table-wrap">
                        <table className="spec faq-spec-table">
                          {item.table.caption ? (
                            <caption>{item.table.caption}</caption>
                          ) : null}
                          <thead>
                            <tr>
                              {item.table.headers.map((h, hIdx) => (
                                <th key={hIdx} scope="col">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {item.table.rows.map((row, rIdx) => (
                              <tr key={rIdx}>
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx}>
                                    {cIdx === 0 ? <strong>{cell}</strong> : cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : null}

                    {item.keyTakeaways && item.keyTakeaways.length > 0 ? (
                      <div className="faq-takeaways">
                        <h3>Key Evaluation Takeaways:</h3>
                        <ul>
                          {item.keyTakeaways.map((point, pIdx) => (
                            <li key={pIdx}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div className="faq-card-footer">
                      <a href={item.relatedHref} className="faq-deep-link">
                        {item.relatedLabel}
                      </a>
                    </div>
                  </div>
                ) : null}
              </article>
            )
          })
        )}
      </div>
    </div>
  )
}
