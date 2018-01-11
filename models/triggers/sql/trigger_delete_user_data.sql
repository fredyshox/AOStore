DROP TRIGGER IF EXISTS `Delete_User_Data`;

DELIMITER |

CREATE TRIGGER `Delete_User_Data`
BEFORE delete ON `Users`
FOR EACH ROW
  BEGIN
    DELETE FROM `User2Adress`
    WHERE User2Adress.userID=old.ID;
    DELETE FROM `Orders`
    WHERE Orders.ID=old.ID;
  END |

DELIMITER ;
