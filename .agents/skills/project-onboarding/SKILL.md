---
name: project-onboarding
description: Use when a new developer asks about setup project. how to get started, what tech stack is used. Triggers on "โปรเจกต์นี้ตั้งค่าอย่างไร", "ฉันจะเริ่มต้นกับโปรเจกต์นี้ได้อย่างไร", "โปรเจกต์นี้ใช้เทคโนโลยีอะไรบ้าง" or many orientation question from someone unfamiliar with the codebase.
compatibility: Use Node.js 22+
license: MIT
metadata:
  author: Surat Poolsawat
  version: "1.0"
---

## First-Time Setup

```bash
# 1. Install Deps
[] npm install

# 2. Copy env
[] cp .env.example .env

# 3. Pull DB Schema (Prisma ORM)
[] npx prisma db pull

# 4. Generate Prisma Client
[] npx prisma generate

# 5. Check lint
[] npm run lint
```

## Gotchas

- ต้องติดตั้ง และปิด Docker Desktop ไว้
- ให้อธิบายการรันโปรเจกต์ และให้ใช้คำสั่ง npm run

## Output

- ถ้าถามการ Setup ให้ตอบเป็นในรูปแบบของตาราง และอ่านง่าย