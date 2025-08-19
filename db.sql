-- Tabla de usuarios
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de encuestas
CREATE TABLE polls (
    poll_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by INT NOT NULL,
    CONSTRAINT fk_poll_user FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Tabla de opciones
CREATE TABLE options (
    option_id SERIAL PRIMARY KEY,
    text VARCHAR(200) NOT NULL,
    poll_id INT NOT NULL,
    CONSTRAINT fk_option_poll FOREIGN KEY (poll_id) REFERENCES polls(poll_id) ON DELETE CASCADE
);

-- Tabla de votos
CREATE TABLE votes (
    vote_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    option_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_vote_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_vote_option FOREIGN KEY (option_id) REFERENCES options(option_id) ON DELETE CASCADE,
    CONSTRAINT unique_vote_per_user_per_poll UNIQUE (user_id, option_id)
);
