#!/bin/sh
# Aguardar até o banco de dados PostgreSQL estar pronto para aceitar conexões
until nc -z -v -w30 db 5432; do
  echo "Aguardando o banco de dados..."
  sleep 1
done

# Rodar a aplicação
exec "$@"
