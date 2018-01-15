DROP TRIGGER IF EXISTS `Decremet_Quantity`;

CREATE TRIGGER `Decremet_Quantity`
BEFORE insert ON `Orders2Products`
FOR EACH ROW
  UPDATE Products
    SET quantity = quantity - NEW.quantity
           WHERE ID=NEW.productID;
