DROP TRIGGER IF EXISTS `Delete_Old_ParentCategory`;

CREATE TRIGGER `Delete_Old_ParentCategory`
BEFORE delete ON `ProductCategory`
FOR EACH ROW
    UPDATE `ProductCategory`
    SET parentID = OLD.parentID
    WHERE parentID=OLD.ID;
