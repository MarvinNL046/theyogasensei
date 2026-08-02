import { describe, expect, it } from 'vitest'
import { POSES } from './PoseInfoCard'

describe('pose information panels', () => {
  it('provides complete safety and variation guidance for every live pose', () => {
    expect(Object.keys(POSES)).toHaveLength(8)

    for (const [slug, pose] of Object.entries(POSES)) {
      expect(pose?.level, `${slug}: level`).toBeTruthy()
      expect(pose?.type, `${slug}: type`).toBeTruthy()
      expect(pose?.areas, `${slug}: primary areas`).toBeTruthy()
      expect(pose?.props, `${slug}: props`).toBeTruthy()
      expect(pose?.modify, `${slug}: safety`).toBeTruthy()
      expect(pose?.hold, `${slug}: hold`).toBeTruthy()
      expect(pose?.breathing, `${slug}: breathing`).toBeTruthy()
      expect(pose?.exit, `${slug}: exit`).toBeTruthy()
      expect(pose?.easier, `${slug}: easier variation`).toBeTruthy()
      expect(pose?.chair, `${slug}: chair variation`).toBeTruthy()
      expect(pose?.sequence, `${slug}: sequence`).toBeTruthy()
    }
  })
})
