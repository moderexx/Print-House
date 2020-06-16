
CREATE TABLE IF NOT EXISTS factories(
    "factoryId" BIGSERIAL PRIMARY KEY NOT NULL,
    "factoryName" VARCHAR(100)
);
CREATE TABLE IF NOT EXISTS products(
    "productCode" BIGSERIAL PRIMARY KEY NOT NULL,
    "productName" VARCHAR(100) NOT NULL,
    "productPrice" DECIMAL NOT NULL,
    "factoryId" BIGINT REFERENCES factories("factoryId") NOT NULL
);

CREATE TABLE IF NOT EXISTS clients(
"clientId" BIGSERIAL PRIMARY KEY NOT NULL,
"clientName" VARCHAR(30),
"clientAddress" VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS  contracts(
    "contractId" BIGSERIAL PRIMARY KEY NOT NULL,
    "clientId" BIGINT REFERENCES clients("clientId"),
    "contractFulfilledOn" DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS purchases(
    "purchaseId" BIGSERIAL PRIMARY KEY NOT NULL,
    "contractId" BIGINT REFERENCES contracts("contractId") NOT NULL,
    "productCode" BIGINT REFERENCES products("productCode") NOT NULL,
    "amount" SMALLINT NOT NULL DEFAULT 1
);