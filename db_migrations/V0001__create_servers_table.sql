CREATE TABLE IF NOT EXISTS servers (
    id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    server_id VARCHAR(100) NOT NULL,
    server_name VARCHAR(255) NOT NULL,
    version VARCHAR(50) NOT NULL,
    custom_id VARCHAR(100),
    players INTEGER DEFAULT 0,
    max_players INTEGER DEFAULT 20,
    status VARCHAR(50) DEFAULT 'offline',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_email, server_id)
);

CREATE INDEX idx_servers_user_email ON servers(user_email);
CREATE INDEX idx_servers_server_id ON servers(server_id);