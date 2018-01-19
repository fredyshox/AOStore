DROP PROCEDURE IF EXISTS constraint_if_not_exists;

DELIMITER |
CREATE PROCEDURE constraint_if_not_exists (name varchar(64), stmt_str varchar(300))
BEGIN
  IF NOT EXISTS (SELECT * FROM information_schema.TABLE_CONSTRAINTS WHERE
                 CONSTRAINT_SCHEMA = DATABASE() AND
                 CONSTRAINT_NAME = name AND
                 CONSTRAINT_TYPE = 'FOREIGN KEY') THEN
    SET @str = stmt_str;
    PREPARE stmt FROM @str;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
    SET @str = NULL;
  END IF;
END |

DELIMITER ;
