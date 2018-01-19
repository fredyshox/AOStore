DROP TRIGGER IF EXISTS `Delete_Old_ParentCategory`;

DELIMITER $$

CREATE TRIGGER `Delete_Old_ParentCategory`
BEFORE delete ON `ProductCategory`
FOR EACH ROW
BEGIN
  UPDATE `ProductCategory`
  SET parentID = OLD.parentID
  WHERE parentID = OLD.ID;

  IF (OLD.parentID IS NULL) THEN
    DELETE FROM `Products`
    WHERE categoryID = OLD.ID;
  ELSE
    UPDATE `Products`
    SET categoryID = OLD.parentID;
  END IF;
END $$

DELIMITER ;
