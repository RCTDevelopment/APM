CREATE TABLE asset (
  `plantno` VARCHAR(45) NOT NULL,
  `model` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `group` VARCHAR(45) NULL,
  `serialno` VARCHAR(45) NULL,
  `site` VARCHAR(45) NULL,
  `purchaseDate` VARCHAR(45) NULL,
  `repairs` VARCHAR(45) NULL,
  PRIMARY KEY (`plantno`));

  ALTER TABLE `andru_dev`.`asset`
  ADD COLUMN `machineHours` VARCHAR(45) NULL AFTER `site`;

  ALTER TABLE `andru_dev`.`asset`
CHANGE COLUMN `repairs` `repairs` VARCHAR(255) NULL DEFAULT NULL ;


INSERT INTO asset VALUES (473,'Furukawa','Drill Rig PDR 200','Air Rig','5931','Pomona','01-06-1998','');
