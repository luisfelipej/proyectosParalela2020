/*
 Navicat Premium Data Transfer

 Source Server         : LOCAL
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : paralela

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 16/06/2020 09:15:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Careers
-- ----------------------------
DROP TABLE IF EXISTS `Careers`;
CREATE TABLE `Careers` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `vacancies` int(255) DEFAULT NULL,
  `code` int(255) DEFAULT NULL,
  `lang` int(255) DEFAULT NULL,
  `math` int(255) DEFAULT NULL,
  `ciencHist` int(255) DEFAULT NULL,
  `avgMathLang` int(255) DEFAULT NULL,
  `ranking` int(255) DEFAULT NULL,
  `nem` varchar(255) DEFAULT NULL,
  `firstScore` double(255,0) DEFAULT NULL,
  `lastScore` double(255,0) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=967 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of Careers
-- ----------------------------
BEGIN;
INSERT INTO `Careers` VALUES (939, 'Administración Pública', 35, 21089, 30, 25, 10, 450, 20, '15', 6258, 513);
INSERT INTO `Careers` VALUES (940, 'Bibliotecología y Documentación', 35, 21002, 40, 10, 10, 450, 20, '20', 6753, 4536);
INSERT INTO `Careers` VALUES (941, 'Contador Público y Auditor', 80, 21012, 30, 15, 15, 450, 20, '20', 63555, 4522);
INSERT INTO `Careers` VALUES (942, 'Ingeniería Comercial', 125, 21048, 30, 30, 10, 450, 20, '10', 6529, 4969);
INSERT INTO `Careers` VALUES (943, 'Ingeniería en Administración Agroindustrial', 30, 21015, 30, 30, 10, 450, 20, '10', 6288, 4618);
INSERT INTO `Careers` VALUES (944, 'Ingeniería en Comercio Internacional', 90, 21081, 30, 30, 10, 450, 20, '10', 6372, 4588);
INSERT INTO `Careers` VALUES (945, 'Ingeniería en Gestión Turística', 25, 21082, 30, 30, 10, 450, 20, '10', 6594, 4481);
INSERT INTO `Careers` VALUES (946, 'Arquitectura', 100, 21047, 20, 20, 20, 450, 25, '15', 6402, 5274);
INSERT INTO `Careers` VALUES (947, 'Ingeniería Civil en Obras Civiles', 100, 21074, 15, 35, 10, 450, 20, '20', 625, 4761);
INSERT INTO `Careers` VALUES (948, 'Ingeniería en Construcción', 100, 21032, 15, 35, 10, 450, 20, '20', 7163, 47695);
INSERT INTO `Careers` VALUES (949, 'Ingeniería Civil en Prevención de Riesgos y Medioambiente', 30, 21087, 20, 20, 10, 450, 35, '15', 6152, 46285);
INSERT INTO `Careers` VALUES (950, 'Ingeniería en Biotecnología', 60, 21073, 20, 30, 10, 450, 25, '15', 6758, 5409);
INSERT INTO `Careers` VALUES (951, 'Ingeniería en Industria Alimentaria', 30, 21039, 20, 30, 10, 450, 25, '15', 6802, 4649);
INSERT INTO `Careers` VALUES (952, 'Ingeniería en Química', 80, 21080, 15, 30, 20, 450, 25, '10', 60655, 4517);
INSERT INTO `Careers` VALUES (953, 'Química Industrial', 40, 21083, 15, 30, 20, 450, 25, '10', 59605, 472);
INSERT INTO `Careers` VALUES (954, 'Diseño en Comunicación Visual', 100, 21024, 30, 10, 10, 450, 40, '10', 7063, 4402);
INSERT INTO `Careers` VALUES (955, 'Diseño Industrial', 65, 21023, 30, 10, 10, 450, 40, '10', 6422, 4399);
INSERT INTO `Careers` VALUES (956, 'Trabajo Social', 95, 21043, 20, 10, 20, 450, 30, '20', 7059, 5105);
INSERT INTO `Careers` VALUES (957, 'Bachillerato en Ciencias de la Ingeniería', 25, 21046, 20, 35, 10, 450, 25, '10', 58645, 50425);
INSERT INTO `Careers` VALUES (958, 'Dibujante Proyectista', 25, 21071, 20, 35, 10, 450, 25, '10', 68985, 49645);
INSERT INTO `Careers` VALUES (959, 'Ingeniería Civil en Computación mención Informática ', 130, 21041, 20, 35, 10, 450, 25, '10', 67365, 53935);
INSERT INTO `Careers` VALUES (960, 'Ingeniería Civil Industrial', 200, 21076, 20, 35, 10, 450, 25, '10', 67125, 50085);
INSERT INTO `Careers` VALUES (961, 'Ingeniería Civil en Ciencia de Datos', 60, 21049, 20, 35, 10, 450, 25, '10', 67365, 53935);
INSERT INTO `Careers` VALUES (962, 'Ingeniería Civil Electrónica', 80, 21075, 20, 35, 10, 450, 25, '10', 65735, 50065);
INSERT INTO `Careers` VALUES (963, 'Ingeniería Civil en Mecánica', 90, 21096, 20, 35, 10, 450, 25, '10', 69765, 5068);
INSERT INTO `Careers` VALUES (964, 'Ingeniería en Geomensura', 60, 21031, 20, 35, 10, 450, 25, '10', 6143, 48785);
INSERT INTO `Careers` VALUES (965, 'Ingeniería en Informática', 105, 21030, 20, 35, 10, 450, 25, '10', 70515, 50775);
INSERT INTO `Careers` VALUES (966, 'Ingeniería Industrial', 60, 21045, 20, 35, 10, 450, 25, '10', 58475, 47625);
COMMIT;

-- ----------------------------
-- Table structure for Postulants
-- ----------------------------
DROP TABLE IF EXISTS `Postulants`;
CREATE TABLE `Postulants` (
  `rut` bigint(255) NOT NULL,
  `nem` double(255,0) DEFAULT NULL,
  `ranking` double(255,0) DEFAULT NULL,
  `math` double(255,0) DEFAULT NULL,
  `lang` double(255,0) DEFAULT NULL,
  `cienc` double(255,0) DEFAULT NULL,
  `hist` double(255,0) DEFAULT NULL,
  `careerId` int(255) DEFAULT NULL,
  PRIMARY KEY (`rut`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for Postulations
-- ----------------------------
DROP TABLE IF EXISTS `Postulations`;
CREATE TABLE `Postulations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postulantId` bigint(20) DEFAULT NULL,
  `careerId` int(11) DEFAULT NULL,
  `score` double(255,0) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postulantFK` (`postulantId`),
  KEY `careerFK` (`careerId`),
  CONSTRAINT `careerFK` FOREIGN KEY (`careerId`) REFERENCES `Careers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `postulantFK` FOREIGN KEY (`postulantId`) REFERENCES `Postulants` (`rut`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1692 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
