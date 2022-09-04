drop table vehicles;

CREATE TABLE vehicles (
  `MakeId` int NOT NULL,
  `MakeName` varchar(255) NOT NULL,
  `VehicleTypeId` int NOT NULL,
  `VehicleTypeName` varchar(255) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`,`MakeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;