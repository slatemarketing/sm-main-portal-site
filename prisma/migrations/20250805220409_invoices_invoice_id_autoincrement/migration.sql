-- AlterTable
CREATE SEQUENCE "public".invoices_invoicenumber_seq;
ALTER TABLE "public"."Invoices" ALTER COLUMN "invoiceNumber" SET DEFAULT nextval('"public".invoices_invoicenumber_seq');
ALTER SEQUENCE "public".invoices_invoicenumber_seq OWNED BY "public"."Invoices"."invoiceNumber";
