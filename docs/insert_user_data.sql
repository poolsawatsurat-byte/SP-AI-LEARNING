-- =============================================
-- User Data with Role Column
-- =============================================

-- 7. user (better-auth)
INSERT INTO `user` (`id`, `name`, `email`, `emailVerified`, `image`, `role`, `createdAt`, `updatedAt`) VALUES
('admin-001', 'Admin', 'admin@example.com', 1, NULL, 'admin', NOW(), NOW()),
('user-001', 'สมชาย ใจดี', 'somchai@example.com', 1, NULL, 'user', NOW(), NOW()),
('user-002', 'สมหญิง รักเรียน', 'somyong@example.com', 1, NULL, 'user', NOW(), NOW());

-- 8. account (better-auth credentials — password: admin1234 / user12345)
INSERT INTO `account` (`id`, `accountId`, `providerId`, `userId`, `accessToken`, `refreshToken`, `idToken`, `accessTokenExpiresAt`, `refreshTokenExpiresAt`, `scope`, `password`, `createdAt`, `updatedAt`) VALUES
('acc-admin-001', 'admin@example.com', 'credential', 'admin-001', NULL, NULL, NULL, NULL, NULL, NULL, '$2b$12$Bk3pmVwe43wIjHGnAwHnlecX9Rcb1LhjsdbIEYUb/8t5cUzP44qjm', NOW(), NOW()),
('acc-user-001', 'somchai@example.com', 'credential', 'user-001', NULL, NULL, NULL, NULL, NULL, NULL, '$2b$12$BpV2BjqAAv5zUn1/bxghYu0E7bRf8W9medRAuWYw8MQCNyB1chK52', NOW(), NOW()),
('acc-user-002', 'somyong@example.com', 'credential', 'user-002', NULL, NULL, NULL, NULL, NULL, NULL, '$2b$12$BpV2BjqAAv5zUn1/bxghYu0E7bRf8W9medRAuWYw8MQCNyB1chK52', NOW(), NOW());
