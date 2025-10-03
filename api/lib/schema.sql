-- Quote submissions table
CREATE TABLE IF NOT EXISTS quotes (
  id SERIAL PRIMARY KEY,
  reference_number VARCHAR(20) UNIQUE NOT NULL,
  idempotency_key VARCHAR(36) UNIQUE NOT NULL,
  insurance_type VARCHAR(20) NOT NULL,
  form_data JSONB NOT NULL,
  quote_data JSONB NOT NULL,
  contact_info JSONB NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  consent_given BOOLEAN NOT NULL,
  marketing_opt_in BOOLEAN DEFAULT FALSE,
  source VARCHAR(100),
  user_agent TEXT
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_quotes_reference ON quotes(reference_number);
CREATE INDEX IF NOT EXISTS idx_quotes_idempotency ON quotes(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_quotes_email ON quotes((contact_info->>'email'));
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_quotes_updated_at
    BEFORE UPDATE ON quotes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();