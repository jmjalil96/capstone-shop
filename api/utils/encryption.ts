import { createCipheriv, createDecipheriv, randomBytes, scryptSync, createHash } from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const KEY_LENGTH = 32
const IV_LENGTH = 16
const SALT = process.env.ENCRYPTION_SALT || 'default-salt-change-in-prod'

export function encrypt(text: string): string {
  const key = scryptSync(process.env.ENCRYPTION_KEY || 'default-key-change-in-prod', SALT, KEY_LENGTH)
  const iv = randomBytes(IV_LENGTH)
  const cipher = createCipheriv(ALGORITHM, key, iv)

  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  const authTag = cipher.getAuthTag()

  // Return format: iv:authTag:encrypted
  return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted
}

export function decrypt(encryptedText: string): string {
  const key = scryptSync(process.env.ENCRYPTION_KEY || 'default-key-change-in-prod', SALT, KEY_LENGTH)
  const parts = encryptedText.split(':')

  if (parts.length !== 3) {
    throw new Error('Invalid encrypted data format')
  }

  const iv = Buffer.from(parts[0], 'hex')
  const authTag = Buffer.from(parts[1], 'hex')
  const encrypted = parts[2]

  const decipher = createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(authTag)

  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}

// Hash sensitive data for logging (one-way)
export function hashForLogging(text: string): string {
  return createHash('sha256').update(text).digest('hex').substring(0, 8)
}