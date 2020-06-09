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

 Date: 09/06/2020 15:44:58
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
  `careerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`rut`) USING BTREE,
  KEY `careerFK` (`careerId`),
  CONSTRAINT `careerFK` FOREIGN KEY (`careerId`) REFERENCES `Careers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
