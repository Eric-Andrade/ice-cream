-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema eri_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema eri_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eri_db` DEFAULT CHARACTER SET utf8 ;
USE `eri_db` ;

-- -----------------------------------------------------
-- Table `eri_db`.`branchoffices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eri_db`.`branchoffices` (
  `idbranchoffice` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `boname` VARCHAR(100) NOT NULL,
  `bodirection` VARCHAR(50) NOT NULL,
  `boschudle` VARCHAR(50) NOT NULL,
  `bophone` VARCHAR(20) NOT NULL,
  `bostate` VARCHAR(50) NOT NULL,
  `bocity` VARCHAR(50) NOT NULL,
  `bozip` INT(5) UNSIGNED NOT NULL,
  `bofacebook` VARCHAR(100) NULL DEFAULT NULL,
  `botwitter` VARCHAR(100) NULL DEFAULT NULL,
  `boinstagram` VARCHAR(100) NULL DEFAULT NULL,
  `bodateregistered` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `bodateupdated` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idbranchoffice`),
  UNIQUE INDEX `boname` (`boname` ASC),
  UNIQUE INDEX `bodirection` (`bodirection` ASC),
  UNIQUE INDEX `bophone` (`bophone` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `eri_db`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eri_db`.`categories` (
  `idcategory` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `catname` VARCHAR(70) NOT NULL,
  `catdateregistered` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `catdateupdated` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idcategory`),
  UNIQUE INDEX `catname` (`catname` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `eri_db`.`clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eri_db`.`clients` (
  `idclient` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `cusername` VARCHAR(50) NOT NULL,
  `cemail` VARCHAR(150) NOT NULL,
  `cpassword` VARCHAR(50) NOT NULL,
  `ccodepass` VARCHAR(50) NOT NULL,
  `cavatar` VARCHAR(50) NOT NULL,
  `cfullname` VARCHAR(50) NOT NULL,
  `cbirthdate` DATE NOT NULL,
  `cgender` ENUM('man', 'woman') NOT NULL,
  `cphone` VARCHAR(20) NOT NULL,
  `clastpurchase` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cdirection` VARCHAR(200) NULL DEFAULT NULL,
  `cgeolocation` VARCHAR(25) NULL DEFAULT NULL,
  `cemailverified` ENUM('waiting', 'verified') NOT NULL DEFAULT 'waiting',
  `cactive` ENUM('actived', 'desactived') NOT NULL DEFAULT 'actived',
  `cverificationcode` VARCHAR(15) NULL DEFAULT NULL,
  `cdateregistered` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cdateupdated` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idclient`),
  UNIQUE INDEX `cusername` (`cusername` ASC),
  UNIQUE INDEX `cemail` (`cemail` ASC),
  UNIQUE INDEX `cphone` (`cphone` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `eri_db`.`clients_devices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eri_db`.`clients_devices` (
  `idcd` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idclient` INT(10) UNSIGNED NOT NULL,
  `cd_device` VARCHAR(50) NOT NULL,
  `cd_ip` VARCHAR(50) NOT NULL,
  `cd_dateregistered` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cd_dateupdated` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idcd`),
  INDEX `idclient` (`idclient` ASC),
  CONSTRAINT `clients_devices_ibfk_1`
    FOREIGN KEY (`idclient`)
    REFERENCES `eri_db`.`clients` (`idclient`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `eri_db`.`employees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eri_db`.`employees` (
  `idemployee` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idbranchoffice` INT(10) UNSIGNED NOT NULL,
  `eusername` VARCHAR(50) NOT NULL,
  `eemail` VARCHAR(150) NULL DEFAULT NULL,
  `epassword` VARCHAR(50) NOT NULL,
  `ecodepass` VARCHAR(50) NOT NULL,
  `eturn` VARCHAR(50) NOT NULL,
  `eavatar` VARCHAR(50) NOT NULL,
  `efullname` VARCHAR(50) NOT NULL,
  `ebirthdate` DATE NOT NULL,
  `egender` ENUM('man', 'woman') NOT NULL,
  `ephone` VARCHAR(20) NOT NULL,
  `erol` ENUM('admon', 'professional', 'deliveryman', 'chef', 'barman', 'dishwasher', 'waiter', 'other') NOT NULL DEFAULT 'other',
  `edirection` VARCHAR(200) NOT NULL,
  `eactive` ENUM('actived', 'desactived') NOT NULL DEFAULT 'actived',
  `egeolocation` VARCHAR(25) NULL DEFAULT NULL,
  `edateregistered` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `edateupdated` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idemployee`),
  UNIQUE INDEX `eusername` (`eusername` ASC),
  UNIQUE INDEX `ephone` (`ephone` ASC),
  UNIQUE INDEX `eemail` (`eemail` ASC),
  INDEX `idbranchoffice` (`idbranchoffice` ASC),
  CONSTRAINT `employees_ibfk_1`
    FOREIGN KEY (`idbranchoffice`)
    REFERENCES `eri_db`.`branchoffices` (`idbranchoffice`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `eri_db`.`employees_attachments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eri_db`.`employees_attachments` (
  `idae` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idemployee` INT(10) UNSIGNED NOT NULL,
  `ae_ine` VARCHAR(50) NOT NULL,
  `ae_curp` VARCHAR(50) NOT NULL,
  `ae_birthcertificate` VARCHAR(50) NOT NULL,
  `ae_proofofaddress` VARCHAR(50) NOT NULL,
  `ae_driverslicense` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`idae`),
  UNIQUE INDEX `ae_ine` (`ae_ine` ASC),
  UNIQUE INDEX `ae_curp` (`ae_curp` ASC),
  UNIQUE INDEX `ae_birthcertificate` (`ae_birthcertificate` ASC),
  UNIQUE INDEX `ae_proofofaddress` (`ae_proofofaddress` ASC),
  UNIQUE INDEX `ae_driverslicense` (`ae_driverslicense` ASC),
  INDEX `idemployee` (`idemployee` ASC),
  CONSTRAINT `employees_attachments_ibfk_1`
    FOREIGN KEY (`idemployee`)
    REFERENCES `eri_db`.`employees` (`idemployee`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `eri_db`.`inventories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eri_db`.`inventories` (
  `idinventory` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idbranchoffice` INT(10) UNSIGNED NOT NULL,
  `invdescription` VARCHAR(200) NULL DEFAULT NULL,
  `invdateregistered` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `invdateupdated` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idinventory`),
  INDEX `idbranchoffice` (`idbranchoffice` ASC),
  CONSTRAINT `inventories_ibfk_1`
    FOREIGN KEY (`idbranchoffice`)
    REFERENCES `eri_db`.`branchoffices` (`idbranchoffice`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `eri_db`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eri_db`.`orders` (
  `idorder` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idclient` INT(10) UNSIGNED NOT NULL,
  `idbranchoffice` INT(10) UNSIGNED NOT NULL,
  `ototalprice` DECIMAL(10,2) UNSIGNED NOT NULL,
  `odirectiondelivery` VARCHAR(200) NULL DEFAULT NULL,
  `opaid` ENUM('false', 'true') NOT NULL DEFAULT 'false',
  `ostatus` ENUM('waitingconfirmation', 'confirmed', 'denied', 'processing', 'ready', 'delivered') NOT NULL DEFAULT 'waitingconfirmation',
  `ohour` TIME NOT NULL,
  `odateregistered` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `odateupdated` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idorder`),
  INDEX `idclient` (`idclient` ASC),
  INDEX `idbranchoffice` (`idbranchoffice` ASC),
  CONSTRAINT `orders_ibfk_1`
    FOREIGN KEY (`idclient`)
    REFERENCES `eri_db`.`clients` (`idclient`),
  CONSTRAINT `orders_ibfk_2`
    FOREIGN KEY (`idbranchoffice`)
    REFERENCES `eri_db`.`branchoffices` (`idbranchoffice`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `eri_db`.`order_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eri_db`.`order_details` (
  `idod` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idorder` INT(10) UNSIGNED NOT NULL,
  `od_typeservice` ENUM('eathere', 'togo') NOT NULL DEFAULT 'eathere',
  `od_amount` INT(5) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`idod`),
  INDEX `idorder` (`idorder` ASC),
  CONSTRAINT `order_details_ibfk_1`
    FOREIGN KEY (`idorder`)
    REFERENCES `eri_db`.`orders` (`idorder`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `eri_db`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eri_db`.`products` (
  `idproduct` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idcategory` INT(10) UNSIGNED NOT NULL,
  `pname` VARCHAR(50) NOT NULL,
  `pdescription` TEXT NOT NULL,
  `pvideo` VARCHAR(200) NULL DEFAULT NULL,
  `pthumb` VARCHAR(200) NOT NULL,
  `ppricing` DECIMAL(6,2) NOT NULL,
  `pdiscount` TINYINT(2) UNSIGNED NULL DEFAULT NULL,
  `pdateregistered` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pdateupdated` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idproduct`),
  UNIQUE INDEX `pname` (`pname` ASC),
  INDEX `idcategory` (`idcategory` ASC),
  CONSTRAINT `products_ibfk_1`
    FOREIGN KEY (`idcategory`)
    REFERENCES `eri_db`.`categories` (`idcategory`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `eri_db`.`products_images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eri_db`.`products_images` (
  `idpi` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idproduct` INT(10) UNSIGNED NOT NULL,
  `pi_image` VARCHAR(200) NOT NULL,
  `pi_ateregistered` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pi_ateupdated` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idpi`),
  INDEX `idproduct` (`idproduct` ASC),
  CONSTRAINT `products_images_ibfk_1`
    FOREIGN KEY (`idproduct`)
    REFERENCES `eri_db`.`products` (`idproduct`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `eri_db`.`routes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eri_db`.`routes` (
  `idroute` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idemployee` INT(10) UNSIGNED NOT NULL,
  `rcomments` VARCHAR(200) NULL DEFAULT NULL,
  `rdateregistered` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rdateupdated` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idroute`),
  INDEX `idemployee` (`idemployee` ASC),
  CONSTRAINT `routes_ibfk_1`
    FOREIGN KEY (`idemployee`)
    REFERENCES `eri_db`.`employees` (`idemployee`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

USE `eri_db` ;

-- -----------------------------------------------------
-- procedure sp_branchoffices
-- -----------------------------------------------------

DELIMITER $$
USE `eri_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_branchoffices`(
in _idbranchoffice INT,
in _boname VARCHAR(100),
in _bodirection VARCHAR(50),
in _boschudle VARCHAR(50),
in _bophone VARCHAR(20),
in _bostate VARCHAR(50),
in _bocity VARCHAR(50),
in _bozip INT(5),
in _bofacebook VARCHAR(100),
in _botwitter VARCHAR(100),
in _boinstagram VARCHAR(100),
in _action enum('create','update','delete','getone','getall')
)
BEGIN
	DECLARE _dr TIMESTAMP;
    DECLARE _du TIMESTAMP;
    SET _dr = CURRENT_TIMESTAMP;
    SET _du = NOW();
    
	CASE _action
    WHEN 'create' THEN
		INSERT INTO branchoffices VALUES(_idbranchoffice, _boname, _bodirection, _boschudle, _bophone, _bostate, _bocity, _bozip, _bofacebook, _botwitter, _boinstagram, _dr, null);
	WHEN 'update' THEN
		UPDATE branchoffices SET boname=_boname, bodirection=_bodirection, boschudle=_boschudle, bophone=_bophone, bostate=_bostate, bocity=_bocity, bozip=_bozip, bofacebook=_bofacebook, botwitter=_botwitter, boinstagram=_boinstagram, bodateupdated=_du WHERE idbranchoffice=_idbranchoffice;
    WHEN 'delete' THEN
		DELETE FROM branchoffices WHERE idbranchoffice=_idbranchoffice;
    WHEN 'getone' THEN
		SELECT * FROM branchoffices WHERE idbranchoffice=_idbranchoffice;
    WHEN 'getall' THEN
		SELECT * FROM branchoffices;
    END CASE;
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
