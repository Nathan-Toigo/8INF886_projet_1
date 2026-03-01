CREATE TABLE
   users (
      id_users INT AUTO_INCREMENT,
      username VARCHAR(52),
      password CHAR(64),
      PRIMARY KEY (id_users)
   );

INSERT INTO
   users (username, password)
VALUES
   (
      'baba',
      '$2a$12$If.fKyi3KCmTzZnh6optqeq4IKRlkKPgq3mkLfhTpU8t9ZIVYNn3W'
   );

INSERT INTO
   users (username, password)
VALUES
   (
      'toto',
      '$2a$12$3TRlwrJRKUDmnGu7NH4wV.c7tZEl7H1EIdMCe6eVmO4nbQOLQYvnG'
   );