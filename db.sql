USE myapi;

INSERT INTO customers (name, email, phone, address) VALUES
('Alice', 'alice@example.com', '1234567890', '123 Main St'),
('Bob', 'bob@example.com', '0987654321', '456 Elm St');

INSERT INTO employees (name, email, phone, job_title) VALUES
('John', 'john@example.com', '1112223333', 'Manager'),
('Jane', 'jane@example.com', '4445556666', 'Developer');

INSERT INTO tasks (description, status, customer_id, employee_id, start_date, due_date) VALUES
('Task 1 description', 'Pending', 1, 1, '2024-07-01', '2024-07-10'),
('Task 2 description', 'Completed', 2, 2, '2024-07-05', '2024-07-15');
