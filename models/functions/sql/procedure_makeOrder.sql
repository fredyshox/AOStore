DROP PROCEDURE IF EXISTS `makeOrder`;

DELIMITER $

CREATE PROCEDURE `makeOrder`(user INT,delivery INT)
BEGIN
  -- DECLARE `OrderID` INT;
  -- SET `OrderID` = (Select max(ID) from Orders)+1;
  DECLARE orderID INT;

  DECLARE success int DEFAULT FALSE;
  DECLARE done int DEFAULT FALSE;
  DECLARE pid INT;
  DECLARE q INT;
  DECLARE o2p_cursor CURSOR FOR
      (SELECT c.`productID`, c.`quantity`
      FROM `Cart` c WHERE c.userID = user);
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  SET autocommit = 0;
  START TRANSACTION;
    INSERT INTO `Orders` (userID,createdAt,confirmed,deliveryID)
    VALUE (user,NOW(),false,delivery);

    SET orderID = LAST_INSERT_ID();

    OPEN o2p_cursor;
      read_loop: LOOP
        FETCH o2p_cursor INTO pid, q;
        IF done THEN
          IF (SELECT productIsAvailable(pid, q)) THEN
            INSERT INTO `Orders2Products` (productID, quantity, orderID)
            VALUES (pid, q, orderID);
          ELSE
            SET success = 1;
            SET done = 1;
          END IF;
        END IF;

        IF done THEN
         LEAVE read_loop;
        END IF;
      END LOOP;
    CLOSE o2p_cursor;

    IF success THEN
      ROLLBACK;
    END IF;

    DELETE FROM `Cart`
    WHERE Cart.userID=user;

  COMMIT;

END$

DELIMITER ;
