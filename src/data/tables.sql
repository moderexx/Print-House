
CREATE TABLE factories(
    "factoryId" BIGSERIAL PRIMARY KEY NOT NULL,
    "factoryName" VARCHAR(50)
);
CREATE TABLE products(
    "productCode" BIGSERIAL PRIMARY KEY NOT NULL,
    "productName" VARCHAR(30) NOT NULL,
    "productPrice" DECIMAL NOT NULL,
    "factoryId" BIGINT REFERENCES factories("factoryId") NOT NULL
);

CREATE TABLE clients(
"clientId" BIGSERIAL PRIMARY KEY NOT NULL,
"clientName" VARCHAR(30),
"clientAddress" VARCHAR(100)
);

CREATE TABLE contracts(
    "contractId" BIGSERIAL PRIMARY KEY NOT NULL,
    "clientId" BIGINT REFERENCES clients("clientId"),
    "contractFulfilledOn" DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE purchases(
    "purchaseId" BIGSERIAL PRIMARY KEY NOT NULL,
    "contractId" BIGINT REFERENCES contracts("contractId") NOT NULL,
    "productCode" BIGINT REFERENCES products("productCode") NOT NULL,
    "amount" SMALLINT NOT NULL DEFAULT 1
);