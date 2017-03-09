SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `kha` ;
CREATE SCHEMA IF NOT EXISTS `kha` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
SHOW WARNINGS;
USE `kha` ;

-- -----------------------------------------------------
-- Table `source`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `source` ;

SHOW WARNINGS;
CREATE  TABLE IF NOT EXISTS `source` (
  `source_id` INT NOT NULL AUTO_INCREMENT ,
  `source_name` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`source_id`) )
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `source_metric`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `source_metric` ;

SHOW WARNINGS;
CREATE  TABLE IF NOT EXISTS `source_metric` (
  `metric_id` INT NOT NULL AUTO_INCREMENT ,
  `metric_name` VARCHAR(45) NOT NULL ,
  `source_id` INT NOT NULL ,
  `metric_type` VARCHAR(45) NOT NULL DEFAULT 'incremental' ,
  PRIMARY KEY (`metric_id`) ,
  INDEX `source_id1` (`source_id` ASC) ,
  CONSTRAINT `fk_source_metric_source1`
    FOREIGN KEY (`source_id` )
    REFERENCES `source` (`source_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `weight_metric`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `weight_metric` ;

SHOW WARNINGS;
CREATE  TABLE IF NOT EXISTS `weight_metric` (
  `metric_id` INT NOT NULL ,
  `overall_weight` FLOAT NULL ,
  `overall_weight_custom` FLOAT NULL ,
  `real_time_weight` FLOAT NULL ,
  `real_time_weight_custom` FLOAT NULL ,
  `future_weight` FLOAT NULL ,
  `future_weight_custom` FLOAT NULL ,
  CONSTRAINT `fk_weight_source_source_metric1`
    FOREIGN KEY (`metric_id` )
    REFERENCES `source_metric` (`metric_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `poi_city`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `poi_city` ;

SHOW WARNINGS;
CREATE  TABLE IF NOT EXISTS `poi_city` (
  `city_id` INT NOT NULL ,
  `city_name` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`city_id`) )
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `poi`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `poi` ;

SHOW WARNINGS;
CREATE  TABLE IF NOT EXISTS `poi` (
  `poi_id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(250) NOT NULL ,
  `nid` INT NOT NULL ,
  `city_id` INT NOT NULL ,
  `slug` VARCHAR(250) NULL ,
  PRIMARY KEY (`poi_id`) ,
  INDEX `poi_id` (`poi_id` ASC) ,
  INDEX `fk_poi_poi_city1_idx` (`city_id` ASC) ,
  CONSTRAINT `fk_poi_poi_city1`
    FOREIGN KEY (`city_id` )
    REFERENCES `poi_city` (`city_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `weight_poi`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `weight_poi` ;

SHOW WARNINGS;
CREATE  TABLE IF NOT EXISTS `weight_poi` (
  `poi_id` INT NOT NULL ,
  `overall_weight` FLOAT NULL ,
  `real_time_weight` FLOAT NULL ,
  `future_weight` FLOAT NULL ,
  `from` TIMESTAMP NULL ,
  `to` TIMESTAMP NULL ,
  CONSTRAINT `fk_weight_poi_poi1`
    FOREIGN KEY (`poi_id` )
    REFERENCES `poi` (`poi_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `source_reference`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `source_reference` ;

SHOW WARNINGS;
CREATE  TABLE IF NOT EXISTS `source_reference` (
  `source_reference_id` INT NOT NULL AUTO_INCREMENT ,
  `source_reference` VARCHAR(100) NOT NULL ,
  `source_id` INT NOT NULL ,
  `reference_name` VARCHAR(45) NOT NULL ,
  `referal_reference` INT NULL ,
  `initial_metric_value` INT NULL ,
  `source_referencecol` VARCHAR(45) NULL ,
  PRIMARY KEY (`source_reference_id`) ,
  INDEX `fk_source_reference_source1_idx` (`source_id` ASC) ,
  INDEX `fk_source_reference_source_reference1_idx` (`referal_reference` ASC) ,
  CONSTRAINT `fk_source_reference_source1`
    FOREIGN KEY (`source_id` )
    REFERENCES `source` (`source_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_source_reference_source_reference1`
    FOREIGN KEY (`referal_reference` )
    REFERENCES `source_reference` (`source_reference_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `source_reference_poi`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `source_reference_poi` ;

SHOW WARNINGS;
CREATE  TABLE IF NOT EXISTS `source_reference_poi` (
  `source_reference_poi_id` INT NOT NULL AUTO_INCREMENT ,
  `poi_id` INT NOT NULL ,
  `source_reference_id` INT NOT NULL ,
  PRIMARY KEY (`source_reference_poi_id`) ,
  INDEX `fk_source_reference_poi_source_reference1_idx` (`source_reference_id` ASC) ,
  INDEX `fk_source_reference_poi_poi1_idx` (`poi_id` ASC) ,
  CONSTRAINT `fk_source_reference_poi_source_reference1`
    FOREIGN KEY (`source_reference_id` )
    REFERENCES `source_reference` (`source_reference_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_source_reference_poi_poi1`
    FOREIGN KEY (`poi_id` )
    REFERENCES `poi` (`poi_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `source_reference_poi_metric`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `source_reference_poi_metric` ;

SHOW WARNINGS;
CREATE  TABLE IF NOT EXISTS `source_reference_poi_metric` (
  `source_reference_poi_metric_id` INT NOT NULL AUTO_INCREMENT ,
  `source_reference_poi_id` INT NOT NULL ,
  `metric_id` INT NOT NULL ,
  PRIMARY KEY (`source_reference_poi_metric_id`) ,
  INDEX `source_reference_id2` (`source_reference_poi_id` ASC) ,
  INDEX `fk_poi_source_metric_source_metric1_idx` (`metric_id` ASC) ,
  CONSTRAINT `fk_poi_source_metric_source_metric1`
    FOREIGN KEY (`metric_id` )
    REFERENCES `source_metric` (`metric_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_source_reference_poi_metric_source_reference_poi1`
    FOREIGN KEY (`source_reference_poi_id` )
    REFERENCES `source_reference_poi` (`source_reference_poi_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `poi_avg_week`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `poi_avg_week` ;

SHOW WARNINGS;
CREATE  TABLE IF NOT EXISTS `poi_avg_week` (
  `day` INT NOT NULL ,
  `poi_source_reference_poi_metric_id` INT NOT NULL ,
  `average` FLOAT NOT NULL ,
  `last_calculated` DATETIME NOT NULL ,
  PRIMARY KEY (`day`) ,
  INDEX `fk_poi_avg_week_poi_source1` (`poi_source_reference_poi_metric_id` ASC) ,
  CONSTRAINT `fk_poi_avg_week_poi_source1`
    FOREIGN KEY (`poi_source_reference_poi_metric_id` )
    REFERENCES `source_reference_poi_metric` (`source_reference_poi_metric_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `poi_avg_hour_week_day`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `poi_avg_hour_week_day` ;

SHOW WARNINGS;
CREATE  TABLE IF NOT EXISTS `poi_avg_hour_week_day` (
  `hour` INT NOT NULL ,
  `week_day` INT NOT NULL ,
  `poi_source_reference_poi_metric_id` INT NOT NULL ,
  `average` FLOAT NOT NULL ,
  `last_calculated` DATETIME NOT NULL ,
  PRIMARY KEY (`hour`) ,
  INDEX `fk_poi_avg_hour_day_week_poi_avg_week` (`week_day` ASC) ,
  INDEX `fk_poi_avg_hour_week_day_poi_source1` (`poi_source_reference_poi_metric_id` ASC) ,
  CONSTRAINT `fk_poi_avg_hour_day_week_poi_avg_week`
    FOREIGN KEY (`week_day` )
    REFERENCES `poi_avg_week` (`day` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_poi_avg_hour_week_day_poi_source1`
    FOREIGN KEY (`poi_source_reference_poi_metric_id` )
    REFERENCES `source_reference_poi_metric` (`source_reference_poi_metric_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `source_reference_poi_match`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `source_reference_poi_match` ;

SHOW WARNINGS;
CREATE  TABLE IF NOT EXISTS `source_reference_poi_match` (
  `source_reference_id` VARCHAR(100) NOT NULL ,
  `poi_id` INT NOT NULL ,
  `match_score` INT NOT NULL ,
  `is_equal` TINYINT(1) NULL DEFAULT 0 ,
  PRIMARY KEY (`source_reference_id`) ,
  INDEX `poi_id1` (`poi_id` ASC) )
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `poi_stats`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `poi_stats` ;

SHOW WARNINGS;
CREATE  TABLE IF NOT EXISTS `poi_stats` (
  `poi_source_reference_poi_metric_id` INT NOT NULL COMMENT 'data ouder dan intervalgrootte van aggregated verwijderen' ,
  `number` INT NOT NULL ,
  `timestamp` TIMESTAMP NOT NULL ,
  INDEX `fk_poi_stats_source_reference_poi_metric1_idx` (`poi_source_reference_poi_metric_id` ASC) ,
  CONSTRAINT `fk_poi_stats_source_reference_poi_metric1`
    FOREIGN KEY (`poi_source_reference_poi_metric_id` )
    REFERENCES `source_reference_poi_metric` (`source_reference_poi_metric_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `foursquare_mayor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `foursquare_mayor` ;

SHOW WARNINGS;
CREATE  TABLE IF NOT EXISTS `foursquare_mayor` (
  `foursquare_mayor_id` INT NOT NULL AUTO_INCREMENT ,
  `source_reference_id` INT NOT NULL ,
  `mayor_id` INT NOT NULL ,
  `first_name` VARCHAR(45) NOT NULL ,
  `last_name` VARCHAR(45) NOT NULL ,
  `foursquare_mayorcol` VARCHAR(45) NULL ,
  PRIMARY KEY (`foursquare_mayor_id`) ,
  INDEX `source_reference_id10` (`source_reference_id` ASC) ,
  CONSTRAINT `fk_foursquare_mayor_source_reference1`
    FOREIGN KEY (`source_reference_id` )
    REFERENCES `source_reference` (`source_reference_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `poi_stats_time_aggregated`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `poi_stats_time_aggregated` ;

SHOW WARNINGS;
CREATE  TABLE IF NOT EXISTS `poi_stats_time_aggregated` (
  `poi_source_reference_poi_metric_id` INT NOT NULL ,
  `differential_value` INT NOT NULL ,
  `from` TIMESTAMP NOT NULL ,
  `to` TIMESTAMP NOT NULL ,
  `metric_id` INT NOT NULL ,
  `poi_id` INT NOT NULL ,
  CONSTRAINT `fk_poi_stats_time_aggregated_source_reference_poi_metric1`
    FOREIGN KEY (`poi_source_reference_poi_metric_id` )
    REFERENCES `source_reference_poi_metric` (`source_reference_poi_metric_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
