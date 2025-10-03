interface LogEntry {
  timestamp: string
  level: 'info' | 'warn' | 'error'
  event: string
  referenceNumber?: string
  idempotencyKey?: string
  insuranceType?: string
  email?: string // Hashed for privacy
  duration?: number // milliseconds
  error?: {
    message: string
    stack?: string
    code?: string
  }
  metadata?: Record<string, any>
}

class Logger {
  private log(level: LogEntry['level'], entry: Omit<LogEntry, 'timestamp' | 'level'>) {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      ...entry,
    }

    // In production, this could send to a logging service
    console.log(JSON.stringify(logEntry))
  }

  info(event: string, data?: Partial<LogEntry>) {
    this.log('info', { event, ...data })
  }

  warn(event: string, data?: Partial<LogEntry>) {
    this.log('warn', { event, ...data })
  }

  error(event: string, error: Error | string, data?: Partial<LogEntry>) {
    const errorData = typeof error === 'string' ? { message: error } : {
      message: error.message,
      stack: error.stack,
      code: (error as any).code
    }

    this.log('error', {
      event,
      error: errorData,
      ...data
    })
  }
}

export const logger = new Logger()