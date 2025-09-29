-- CreateEnum
CREATE TYPE "public"."StatusInstituicao" AS ENUM ('PENDENTE', 'ATIVO', 'INATIVO');

-- CreateEnum
CREATE TYPE "public"."StatusNecessidade" AS ENUM ('ATIVA', 'PAUSADA', 'CONCLUIDA');

-- CreateEnum
CREATE TYPE "public"."StatusDoacao" AS ENUM ('AGENDADA', 'ENTREGUE', 'CANCELADA');

-- CreateTable
CREATE TABLE "public"."Doador" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Instituicao" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "descricao" TEXT,
    "logoUrl" TEXT,
    "status" "public"."StatusInstituicao" NOT NULL DEFAULT 'PENDENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Instituicao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Endereco" (
    "id" TEXT NOT NULL,
    "instituicaoId" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "complemento" TEXT,
    "isPrincipal" BOOLEAN NOT NULL DEFAULT true,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Necessidade" (
    "id" TEXT NOT NULL,
    "instituicaoId" TEXT NOT NULL,
    "categoriaId" INTEGER,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" "public"."StatusNecessidade" NOT NULL DEFAULT 'ATIVA',
    "quantidadeSolicitada" INTEGER NOT NULL,
    "quantidadeRecebida" INTEGER NOT NULL DEFAULT 0,
    "unidadeMedida" TEXT,
    "prioridade" INTEGER NOT NULL DEFAULT 0,
    "dataLimite" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Necessidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Doacao" (
    "id" TEXT NOT NULL,
    "necessidadeId" TEXT NOT NULL,
    "doadorId" TEXT,
    "quantidadeDoada" INTEGER NOT NULL,
    "status" "public"."StatusDoacao" NOT NULL DEFAULT 'AGENDADA',
    "dataEntrega" TIMESTAMP(3),
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doador_email_key" ON "public"."Doador"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Instituicao_email_key" ON "public"."Instituicao"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Instituicao_cnpj_key" ON "public"."Instituicao"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "public"."Categoria"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_slug_key" ON "public"."Categoria"("slug");

-- AddForeignKey
ALTER TABLE "public"."Endereco" ADD CONSTRAINT "Endereco_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "public"."Instituicao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Necessidade" ADD CONSTRAINT "Necessidade_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "public"."Instituicao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Necessidade" ADD CONSTRAINT "Necessidade_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "public"."Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Doacao" ADD CONSTRAINT "Doacao_necessidadeId_fkey" FOREIGN KEY ("necessidadeId") REFERENCES "public"."Necessidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Doacao" ADD CONSTRAINT "Doacao_doadorId_fkey" FOREIGN KEY ("doadorId") REFERENCES "public"."Doador"("id") ON DELETE SET NULL ON UPDATE CASCADE;
