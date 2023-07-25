-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.33 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para azteca_checadores
CREATE DATABASE IF NOT EXISTS `azteca_checadores` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `azteca_checadores`;

-- Volcando estructura para tabla azteca_checadores.images
CREATE TABLE IF NOT EXISTS `images` (
  `image_ID` int unsigned NOT NULL AUTO_INCREMENT,
  `image_name` varchar(80) NOT NULL DEFAULT '0',
  `image_dest` varchar(255) NOT NULL DEFAULT '0',
  `image_url` varchar(255) NOT NULL DEFAULT '',
  `image_uploadDate` datetime DEFAULT (now()),
  `image_branch_ID` int unsigned NOT NULL DEFAULT (0),
  PRIMARY KEY (`image_ID`),
  KEY `FK_images_stores` (`image_branch_ID`),
  CONSTRAINT `FK_images_stores` FOREIGN KEY (`image_branch_ID`) REFERENCES `stores` (`store_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla azteca_checadores.stores
CREATE TABLE IF NOT EXISTS `stores` (
  `store_ID` int unsigned NOT NULL AUTO_INCREMENT,
  `store_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `store_street` varchar(80) NOT NULL DEFAULT '',
  `store_number` varchar(6) NOT NULL DEFAULT '',
  `store_cologne` varchar(80) NOT NULL DEFAULT '',
  PRIMARY KEY (`store_ID`),
  UNIQUE KEY `store_name` (`store_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla azteca_checadores.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_ID` int unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(80) NOT NULL DEFAULT '',
  `user_password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `user_email` varchar(255) DEFAULT '',
  `user_role` varchar(10) NOT NULL DEFAULT '',
  `user_mainAdmin` tinyint unsigned DEFAULT NULL,
  PRIMARY KEY (`user_ID`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
