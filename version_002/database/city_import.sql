/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50153
Source Host           : localhost:3306
Source Database       : kha

Target Server Type    : MYSQL
Target Server Version : 50153
File Encoding         : 65001

Date: 2012-12-17 11:53:56
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `poi_city`
-- ----------------------------
DROP TABLE IF EXISTS `poi_city`;
CREATE TABLE `poi_city` (
  `city_id` int(11) NOT NULL,
  `city_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of poi_city
-- ----------------------------
INSERT INTO `poi_city` VALUES ('1', 'antwerpen');
