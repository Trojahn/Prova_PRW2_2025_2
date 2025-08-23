CREATE TABLE IF NOT EXISTS alunos(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS disciplinas(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS matriculas(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  alunoId INTEGER NOT NULL,
  disciplinaId INTEGER NOT NULL,
  nota REAL CHECK(nota BETWEEN 0 AND 10),
  UNIQUE(alunoId, disciplinaId),
  FOREIGN KEY(alunoId) REFERENCES alunos(id),
  FOREIGN KEY(disciplinaId) REFERENCES disciplinas(id)
);

INSERT INTO alunos (nome) VALUES ('João'), ('Maria'), ('Ana');
INSERT INTO disciplinas (nome) VALUES ('Matemática'), ('Português'), ('História');
INSERT INTO matriculas (alunoId, disciplinaId, nota) VALUES (1, 1, 8.5), (2, 2, 9.0), (3, 3, 7.5);