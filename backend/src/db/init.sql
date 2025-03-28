
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_email_verified BOOLEAN DEFAULT FALSE,
  has_ticket BOOLEAN DEFAULT FALSE,
  google_id VARCHAR(255),
  apple_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create ticket_purchases table
CREATE TABLE IF NOT EXISTS ticket_purchases (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  payment_method VARCHAR(50),
  payment_plan VARCHAR(50),
  total_amount DECIMAL(10, 2),
  status VARCHAR(50),
  merchandise_items JSONB
);
