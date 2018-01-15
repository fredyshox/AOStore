DROP FUNCTION IF EXISTS `calculateTotal`;

CREATE FUNCTION `calculateTotal`(orderID INT)
RETURNS REAL DETERMINISTIC
RETURN (SELECT SUM(p.price * o.quantity)
        FROM `Orders2Products` o
        JOIN `Products` p ON o.productID = p.ID
        WHERE o.orderID = orderID
        GROUP BY o.orderID);
