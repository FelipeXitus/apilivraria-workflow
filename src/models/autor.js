/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import db from '../db/dbconfig.js';

class Autor {
  constructor({
    id,
    nome,
    nacionalidade,
    created_at,
    updated_at,
  }) {
    this.id = id || null;
    this.nome = nome;
    this.nacionalidade = nacionalidade;
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }

  static async pegarAutores() {
    return db.select('*').from('autores');
  }

  static async pegarPeloId(id) {
    const resultado = await db.select('*').from('autores').where({ id });
    return resultado[0];
  }

  async criar() {
    const novoAutor = {
      nome: this.nome,
      nacionalidade: this.nacionalidade,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
    return db('autores').insert(novoAutor);
  }

  async atualizar(id) {
    await db('autores')
      .where({ id })
      .update({ ...this, updated_at: new Date().toISOString() });

    return db.select('*').from('autores').where({ id });
  }

  static async excluir(id) {
    return db('autores')
      .where({ id })
      .del();
  }

  async salvar() {
    if (this.id) {
      const resultado = await this.atualizar(this.id);
      return resultado;
    }
    const resultado = await this.criar();
    return resultado;
  }

  static async pegarLivrosPorAutor(autorId) {
    return db('livros')
      .join('autores', 'livros.autor_id', 'autores.id')
      .select('livros.*')
      .where({ 'autores.id': autorId });
  }
}

export default Autor;
