-- Sample seed data for TAAMED ERP

INSERT INTO leads (name, phone, business_type, message) VALUES
('Ahmed Mostafa', '+201001112222', 'Supermarket', 'Need a quote for 3 branches.'),
('Sara Ali',     '+201003334444', 'Pharmacy',    'Looking for POS + inventory.');

INSERT INTO demo_requests (name, phone, company) VALUES
('Khaled R.', '+201005556666', 'Delta Foods');

INSERT INTO quote_requests (name, phone, users, business_type, modules, estimate) VALUES
('Mona F.', '+201007778888', 25, 'Retail', ARRAY['accounting','inventory','pos'], 624.00);
