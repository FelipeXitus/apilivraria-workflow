/* eslint-disable linebreak-style */
import {
  describe, expect, it, jest,
} from '@jest/globals';
import Evento from '../../models/evento.js';

describe('testando o modelo Evento', () => {
  const objetoEvento = {
    id: 1,
    nome: 'Evento de Teste',
    descricao: 'Descrição do evento de teste',
    data: '2024-12-31',
    autor_id: 1,
  };

  it('deve criar uma instância de Evento corretamente', () => {
    const evento = new Evento(objetoEvento);

    expect(evento).toEqual(expect.objectContaining(objetoEvento));
  });

  it('Deve fazer uma chamada simulada ao BD', () => {
    const evento = new Evento(objetoEvento);

    evento.salvar = jest.fn().mockReturnValue({
      id: 1,
      nome: 'Evento de Teste',
      descricao: 'Descrição do evento de teste',
      data: '2024-12-31',
      autor_id: 1,
      created_at: '2022-10-01',
      updated_at: '2022-10-01',
    });

    const retorno = evento.salvar();

    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEvento,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });
});
