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
      'test',
      '$2a$12$If.fKyi3KCmTzZnh6optqeq4IKRlkKPgq3mkLfhTpU8t9ZIVYNn3W'
   );

INSERT INTO
   users (username, password)
VALUES
   (
      'arno',
      '$2a$12$I6rF7zPwTQ8dnQvHCzUE0OVve.LsLYwi19t59BX7HbwS1Hk5JNVR2'
   );

CREATE TABLE
   actions (
      id_actions INT AUTO_INCREMENT,
      name VARCHAR(255) UNIQUE,
      PRIMARY KEY (id_actions)
   );

INSERT INTO
   actions (name)
VALUES
   ('login');

INSERT INTO
   actions (name)
VALUES
   ('logout');

INSERT INTO
   actions (name)
VALUES
   ('go_to_home');

INSERT INTO
   actions (name)
VALUES
   ('go_to_settings');

INSERT INTO
   actions (name)
VALUES
   ('go_to_chat');

INSERT INTO
   actions (name)
VALUES
   ('typing_in_chat');

INSERT INTO
   actions (name)
VALUES
   ('sent_in_chat');

CREATE TABLE
   logs (
      id_logs INT AUTO_INCREMENT,
      id_actions INT,
      id_users INT,
      date DATETIME,
      PRIMARY KEY (id_logs),
      FOREIGN KEY (id_users) REFERENCES users (id_users),
      FOREIGN KEY (id_actions) REFERENCES actions (id_actions)
   );

CREATE VIEW logs_view AS
SELECT
   users.username,
   actions.name,
   logs.date
FROM
   logs
   natural join actions
   natural join users
ORDER BY
   logs.date DESC;

SELECT
   actions.name,
   logs.date
FROM
   logs
   natural join actions
   natural join users
WHERE
   users.username = 'test'
ORDER BY
   logs.date DESC; --test user logs