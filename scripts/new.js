import { writeFileSync } from 'fs'
import { resolve } from 'path'

const __dirname = import.meta.dirname;

try {
  writeFileSync(resolve(__dirname, '../pages/posts', `.drafts-${Date.now()}.md`), `\
---
title: [NO TITLE]
date: ${Date.now()}
tags: []
drafts: true
---

# [NO TITLE]

:)
`)
} catch(err) {
  console.error(err)
}