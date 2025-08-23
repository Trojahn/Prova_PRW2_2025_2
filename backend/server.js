import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { readFile } from "fs/promises";

const app = express();
app.use(express.json());

// Cria ou abre o banco
const db = await open({ filename: "./db.sqlite", driver: sqlite3.Database });
await db.exec("PRAGMA foreign_keys = ON;");

// ======================== Rotas ========================
// -------- Alunos --------
app.get("/alunos", async (req, res) => {
  const alunos = await db.all("SELECT * FROM alunos");
  res.json(alunos);
});

app.post("/alunos", async (req, res) => {
  if (!req.body?.nome || req.body.nome == "") {
    return res.status(400).json({ erro: "O campo 'nome' do aluno é obrigatório." });
  }
  const result = await db.run("INSERT INTO alunos(nome) VALUES(?)", req.body.nome);
  res.status(201).json({ id: result.lastID, nome: req.body.nome });
});

app.put("/alunos/:id", async (req, res) => {
  const { id } = req.params;
  if (!req.body?.nome || req.body.nome == "") {
    return res.status(400).json({ erro: "O campo 'nome' do aluno é obrigatório." });
  }
  const result = await db.run("UPDATE alunos SET nome=? WHERE id=?", req.body.nome, id);
  if (result.changes === 0) {
    return res.status(404).json({ erro: "Aluno não encontrado" })
  };
  res.json({ id: Number(id), nome: req.body.nome });
});

app.delete("/alunos/:id", async (req, res) => {
  const { id } = req.params;
  await db.run("DELETE FROM matriculas WHERE alunoId=?", id); // remove matrículas
  const result = await db.run("DELETE FROM alunos WHERE id=?", id);
  if (result.changes === 0) {
    return res.status(404).json({ erro: "Aluno não encontrado" });
  }
  res.status(204).end();
});

// -------- Disciplinas --------
app.get("/disciplinas", async (req, res) => {
  const disciplinas = await db.all("SELECT * FROM disciplinas");
  res.json(disciplinas);
});

app.post("/disciplinas", async (req, res) => {
  if (!req.body?.nome || req.body.nome == "") {
    return res.status(400).json({ erro: "O campo 'nome' da disciplina é obrigatório." });
  }
  const result = await db.run("INSERT INTO disciplinas(nome) VALUES(?)", req.body.nome);
  res.status(201).json({ id: result.lastID, nome: req.body.nome });
});

app.put("/disciplinas/:id", async (req, res) => {

  const { id } = req.params;
  if (!req.body?.nome || req.body.nome == "") {
    return res.status(400).json({ erro: "O campo 'nome' da disciplina é obrigatório." });
  }
  const result = await db.run("UPDATE disciplinas SET nome=? WHERE id=?", req.body.nome, id);
  if (result.changes === 0) {
    return res.status(404).json({ erro: "Disciplina não encontrada" });
  }
  res.json({ id: Number(id), nome: req.body.nome });
});

app.delete("/disciplinas/:id", async (req, res) => {
  const { id } = req.params;
  await db.run("DELETE FROM matriculas WHERE disciplinaId=?", id); // remove matrículas
  const result = await db.run("DELETE FROM disciplinas WHERE id=?", id);
  if (result.changes === 0) {
    return res.status(404).json({ erro: "Disciplina não encontrada" });
  }
  res.status(204).end();
});

// -------- Matrículas --------
app.get("/matriculas", async (req, res) => {
  const matriculas = await db.all("SELECT * FROM matriculas");
  res.json(matriculas);
});

app.post("/matriculas", async (req, res) => {
  if (!req.body?.alunoId || !req.body?.disciplinaId || !req.body?.nota) {
    return res.status(400).json({ erro: "Parâmetros incorretos" });
  }

  try {
    const result = await db.run(
      "INSERT INTO matriculas(alunoId, disciplinaId, nota) VALUES(?, ?, ?)",
      req.body.alunoId,
      req.body.disciplinaId,
      req.body.nota
    );
    res.status(201).json({ id: result.lastID, alunoId: req.body.alunoId, disciplinaId: req.body.disciplinaId, nota: req.body.nota });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

app.patch("/matriculas/:id", async (req, res) => {
  const { id } = req.params;
  if (!req.body?.nota) {
    return res.status(400).json({ erro: "Parâmetros incorretos" });
  }
  try {
    const result = await db.run(
      "UPDATE matriculas SET nota=? WHERE id=?",
      req.body.nota,
      id
    );
    if (result.changes === 0) {
      return res.status(404).json({ erro: "Matrícula não encontrada" });
    }
    res.json({ id: Number(id), nota: req.body.nota });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

app.delete("/matriculas/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.run("DELETE FROM matriculas WHERE id=?", id);
  if (result.changes === 0) {
    return res.status(404).json({ erro: "Matrícula não encontrada" });
  }
  res.status(204).end();
});


app.get("/", async (req, res) => {
  const html = await readFile("./routes.html", "utf-8");
  res.type("html").send(html);
});

// ======================== Start ========================
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));