export const errorMessagesPostgresql = {
  // Restrições de Chave Primária e Única
  '23505': 'O registro já existe no banco de dados.',
  '23514': 'A violação de uma restrição de chave primária ocorreu.',

  // Restrições de Chave Externa
  '23503': 'Ocorreu um erro de violação de chave estrangeira.',
  '23502': 'A violação de uma restrição de chave estrangeira ocorreu.',
  '23504': 'A violação de uma restrição de chave estrangeira ocorreu.',

  // Restrições de Validação
  '22001': 'O valor inserido é muito longo para o tipo de dado especificado.',
  '22003': 'O valor inserido é inválido para o tipo de dado especificado.',

  // Erros de Sintaxe
  '42601': 'Erro de sintaxe na consulta.',

  // Erros de Conexão
  '08001': 'Falha na conexão com o banco de dados.',
  '08006': 'A conexão com o banco de dados foi encerrada inesperadamente.',

  // Erros de Autenticação
  '28000': 'Falha na autenticação.',
  '28P01': 'Credenciais inválidas para a autenticação.',

  // Erros de Transação
  '40001': 'Erro de concorrência na transação.',
  '40P01': 'Falha na transação devido a bloqueio concorrente.',
};
