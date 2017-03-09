/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50153
Source Host           : localhost:3306
Source Database       : kha

Target Server Type    : MYSQL
Target Server Version : 50153
File Encoding         : 65001

Date: 2012-12-13 16:23:46
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `foursquare_mayor`
-- ----------------------------
DROP TABLE IF EXISTS `foursquare_mayor`;
CREATE TABLE `foursquare_mayor` (
  `foursquare_mayor_id` int(11) NOT NULL AUTO_INCREMENT,
  `source_reference_id` int(11) NOT NULL,
  `mayor_id` int(11) NOT NULL,
  `first_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `foursquare_mayorcol` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`foursquare_mayor_id`),
  KEY `source_reference_id10` (`source_reference_id`),
  CONSTRAINT `fk_foursquare_mayor_source_reference1` FOREIGN KEY (`source_reference_id`) REFERENCES `source_reference` (`source_reference_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of foursquare_mayor
-- ----------------------------

-- ----------------------------
-- Table structure for `poi`
-- ----------------------------
DROP TABLE IF EXISTS `poi`;
CREATE TABLE `poi` (
  `poi_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `nid` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `slug` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`poi_id`),
  KEY `poi_id` (`poi_id`),
  KEY `fk_poi_poi_city1_idx` (`city_id`),
  CONSTRAINT `fk_poi_poi_city1` FOREIGN KEY (`city_id`) REFERENCES `poi_city` (`city_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of poi
-- ----------------------------

-- ----------------------------
-- Table structure for `poi_avg_hour_week_day`
-- ----------------------------
DROP TABLE IF EXISTS `poi_avg_hour_week_day`;
CREATE TABLE `poi_avg_hour_week_day` (
  `hour` int(11) NOT NULL,
  `week_day` int(11) NOT NULL,
  `poi_source_reference_poi_metric_id` int(11) NOT NULL,
  `average` float NOT NULL,
  `last_calculated` datetime NOT NULL,
  PRIMARY KEY (`hour`),
  KEY `fk_poi_avg_hour_day_week_poi_avg_week` (`week_day`),
  KEY `fk_poi_avg_hour_week_day_poi_source1` (`poi_source_reference_poi_metric_id`),
  CONSTRAINT `fk_poi_avg_hour_day_week_poi_avg_week` FOREIGN KEY (`week_day`) REFERENCES `poi_avg_week` (`day`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_poi_avg_hour_week_day_poi_source1` FOREIGN KEY (`poi_source_reference_poi_metric_id`) REFERENCES `source_reference_poi_metric` (`source_reference_poi_metric_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of poi_avg_hour_week_day
-- ----------------------------

-- ----------------------------
-- Table structure for `poi_avg_week`
-- ----------------------------
DROP TABLE IF EXISTS `poi_avg_week`;
CREATE TABLE `poi_avg_week` (
  `day` int(11) NOT NULL,
  `poi_source_reference_poi_metric_id` int(11) NOT NULL,
  `average` float NOT NULL,
  `last_calculated` datetime NOT NULL,
  PRIMARY KEY (`day`),
  KEY `fk_poi_avg_week_poi_source1` (`poi_source_reference_poi_metric_id`),
  CONSTRAINT `fk_poi_avg_week_poi_source1` FOREIGN KEY (`poi_source_reference_poi_metric_id`) REFERENCES `source_reference_poi_metric` (`source_reference_poi_metric_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of poi_avg_week
-- ----------------------------

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

-- ----------------------------
-- Table structure for `poi_stats`
-- ----------------------------
DROP TABLE IF EXISTS `poi_stats`;
CREATE TABLE `poi_stats` (
  `poi_source_reference_poi_metric_id` int(11) NOT NULL COMMENT 'data ouder dan intervalgrootte van aggregated verwijderen',
  `number` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `fk_poi_stats_source_reference_poi_metric1_idx` (`poi_source_reference_poi_metric_id`),
  CONSTRAINT `fk_poi_stats_source_reference_poi_metric1` FOREIGN KEY (`poi_source_reference_poi_metric_id`) REFERENCES `source_reference_poi_metric` (`source_reference_poi_metric_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of poi_stats
-- ----------------------------

-- ----------------------------
-- Table structure for `poi_stats_time_aggregated`
-- ----------------------------
DROP TABLE IF EXISTS `poi_stats_time_aggregated`;
CREATE TABLE `poi_stats_time_aggregated` (
  `poi_source_reference_poi_metric_id` int(11) NOT NULL,
  `differential_value` int(11) NOT NULL,
  `from` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `to` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `metric_id` int(11) NOT NULL,
  `poi_id` int(11) NOT NULL,
  KEY `fk_poi_stats_time_aggregated_source_reference_poi_metric1` (`poi_source_reference_poi_metric_id`),
  CONSTRAINT `fk_poi_stats_time_aggregated_source_reference_poi_metric1` FOREIGN KEY (`poi_source_reference_poi_metric_id`) REFERENCES `source_reference_poi_metric` (`source_reference_poi_metric_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of poi_stats_time_aggregated
-- ----------------------------

-- ----------------------------
-- Table structure for `source`
-- ----------------------------
DROP TABLE IF EXISTS `source`;
CREATE TABLE `source` (
  `source_id` int(11) NOT NULL AUTO_INCREMENT,
  `source_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`source_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of source
-- ----------------------------
INSERT INTO `source` VALUES ('1', 'facebook');
INSERT INTO `source` VALUES ('2', 'foursquare');
INSERT INTO `source` VALUES ('3', 'apen');
INSERT INTO `source` VALUES ('4', 'twitter');
INSERT INTO `source` VALUES ('5', 'google_analytics');
INSERT INTO `source` VALUES ('6', 'instagram');
INSERT INTO `source` VALUES ('7', 'netatmo');

-- ----------------------------
-- Table structure for `source_metric`
-- ----------------------------
DROP TABLE IF EXISTS `source_metric`;
CREATE TABLE `source_metric` (
  `metric_id` int(11) NOT NULL AUTO_INCREMENT,
  `metric_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `source_id` int(11) NOT NULL,
  `metric_type` varchar(45) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'incremental',
  PRIMARY KEY (`metric_id`),
  KEY `source_id1` (`source_id`),
  CONSTRAINT `fk_source_metric_source1` FOREIGN KEY (`source_id`) REFERENCES `source` (`source_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of source_metric
-- ----------------------------
INSERT INTO `source_metric` VALUES ('1', 'like', '1', 'differential');
INSERT INTO `source_metric` VALUES ('2', 'checkin', '1', 'differential');
INSERT INTO `source_metric` VALUES ('3', 'talking_about', '1', 'differential');
INSERT INTO `source_metric` VALUES ('4', 'checkin', '2', 'differential');
INSERT INTO `source_metric` VALUES ('5', 'user', '2', 'differential');
INSERT INTO `source_metric` VALUES ('6', 'visit', '3', 'differential');
INSERT INTO `source_metric` VALUES ('7', 'recent_mention', '4', 'differential');
INSERT INTO `source_metric` VALUES ('8', 'recent_tweet', '4', 'differential');
INSERT INTO `source_metric` VALUES ('9', 'pageview', '5', 'differential');
INSERT INTO `source_metric` VALUES ('10', 'visit', '5', 'differential');
INSERT INTO `source_metric` VALUES ('11', 'photo', '6', 'differential');
INSERT INTO `source_metric` VALUES ('12', 'co2', '7', 'differential');
INSERT INTO `source_metric` VALUES ('13', 'decibel', '7', 'differential');

-- ----------------------------
-- Table structure for `source_reference`
-- ----------------------------
DROP TABLE IF EXISTS `source_reference`;
CREATE TABLE `source_reference` (
  `source_reference_id` int(11) NOT NULL AUTO_INCREMENT,
  `source_reference` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `source_id` int(11) NOT NULL,
  `reference_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `referal_reference` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `initial_metric_value` int(11) DEFAULT NULL,
  PRIMARY KEY (`source_reference_id`),
  UNIQUE KEY `source_reference_source_id1` (`source_reference`,`source_id`),
  KEY `fk_source_reference_source1_idx` (`source_id`),
  KEY `referal_reference_source_reference1` (`referal_reference`),
  KEY `fk_source_reference_source_reference1_idx` (`referal_reference`,`source_reference`),
  CONSTRAINT `fk_source_reference_source1` FOREIGN KEY (`source_id`) REFERENCES `source` (`source_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_source_reference_source_reference1` FOREIGN KEY (`referal_reference`, `source_reference`) REFERENCES `source_reference` (`referal_reference`, `source_reference`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of source_reference
-- ----------------------------

-- ----------------------------
-- Table structure for `source_reference_poi`
-- ----------------------------
DROP TABLE IF EXISTS `source_reference_poi`;
CREATE TABLE `source_reference_poi` (
  `source_reference_poi_id` int(11) NOT NULL AUTO_INCREMENT,
  `poi_id` int(11) NOT NULL,
  `source_reference_id` int(11) NOT NULL,
  PRIMARY KEY (`source_reference_poi_id`),
  KEY `fk_source_reference_poi_source_reference1_idx` (`source_reference_id`),
  KEY `fk_source_reference_poi_poi1_idx` (`poi_id`),
  CONSTRAINT `fk_source_reference_poi_source_reference1` FOREIGN KEY (`source_reference_id`) REFERENCES `source_reference` (`source_reference_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_source_reference_poi_poi1` FOREIGN KEY (`poi_id`) REFERENCES `poi` (`poi_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of source_reference_poi
-- ----------------------------

-- ----------------------------
-- Table structure for `source_reference_poi_match`
-- ----------------------------
DROP TABLE IF EXISTS `source_reference_poi_match`;
CREATE TABLE `source_reference_poi_match` (
  `source_reference_id` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `poi_id` int(11) NOT NULL,
  `match_score` int(11) NOT NULL,
  `is_equal` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`source_reference_id`),
  KEY `poi_id1` (`poi_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of source_reference_poi_match
-- ----------------------------

-- ----------------------------
-- Table structure for `source_reference_poi_metric`
-- ----------------------------
DROP TABLE IF EXISTS `source_reference_poi_metric`;
CREATE TABLE `source_reference_poi_metric` (
  `source_reference_poi_metric_id` int(11) NOT NULL AUTO_INCREMENT,
  `source_reference_poi_id` int(11) NOT NULL,
  `metric_id` int(11) NOT NULL,
  PRIMARY KEY (`source_reference_poi_metric_id`),
  KEY `source_reference_id2` (`source_reference_poi_id`),
  KEY `fk_poi_source_metric_source_metric1_idx` (`metric_id`),
  CONSTRAINT `fk_poi_source_metric_source_metric1` FOREIGN KEY (`metric_id`) REFERENCES `source_metric` (`metric_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_source_reference_poi_metric_source_reference_poi1` FOREIGN KEY (`source_reference_poi_id`) REFERENCES `source_reference_poi` (`source_reference_poi_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of source_reference_poi_metric
-- ----------------------------

-- ----------------------------
-- Table structure for `weight_metric`
-- ----------------------------
DROP TABLE IF EXISTS `weight_metric`;
CREATE TABLE `weight_metric` (
  `metric_id` int(11) NOT NULL,
  `overall_weight` float DEFAULT NULL,
  `overall_weight_custom` float DEFAULT NULL,
  `real_time_weight` float DEFAULT NULL,
  `real_time_weight_custom` float DEFAULT NULL,
  `future_weight` float DEFAULT NULL,
  `future_weight_custom` float DEFAULT NULL,
  KEY `fk_weight_source_source_metric1` (`metric_id`),
  CONSTRAINT `fk_weight_source_source_metric1` FOREIGN KEY (`metric_id`) REFERENCES `source_metric` (`metric_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of weight_metric
-- ----------------------------

-- ----------------------------
-- Table structure for `weight_poi`
-- ----------------------------
DROP TABLE IF EXISTS `weight_poi`;
CREATE TABLE `weight_poi` (
  `poi_id` int(11) NOT NULL,
  `overall_weight` float DEFAULT NULL,
  `real_time_weight` float DEFAULT NULL,
  `future_weight` float DEFAULT NULL,
  `from` timestamp NULL DEFAULT NULL,
  `to` timestamp NULL DEFAULT NULL,
  KEY `fk_weight_poi_poi1` (`poi_id`),
  CONSTRAINT `fk_weight_poi_poi1` FOREIGN KEY (`poi_id`) REFERENCES `poi` (`poi_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of weight_poi
-- ----------------------------
