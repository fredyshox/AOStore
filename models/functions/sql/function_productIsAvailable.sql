DROP FUNCTION IF EXISTS `productIsAvailable`;

DELIMITER $

CREATE FUNCTION `productIsAvailable`(IxD INT, num INT)
RETURNS BOOLEAN
BEGIN
  IF (SELECT quantity FROM `Products` WHERE ID=ixD) >= num
  THEN
    RETURN true;
  ELSE
    RETURN false;
  END IF;
END$

DELIMITER ;
