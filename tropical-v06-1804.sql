-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 31-03-2023 a las 11:23:01
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tropical`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clients`
--

CREATE TABLE `clients` (
  `id` int UNSIGNED NOT NULL,
  `document` varchar(15) NOT NULL,
  `name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `state` int NOT NULL DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `clients`
--

INSERT INTO `clients` (`id`, `document`, `name`, `last_name`, `email`, `user_id`, `state`, `createdAt`, `updatedAt`) VALUES
(1, '74070643', 'miguel', 'cliente', 'mrp110793@gmail.com', 4, 1, '2023-03-25 17:47:14', '2023-03-25 17:47:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permissions`
--

CREATE TABLE `permissions` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  `state` int NOT NULL DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `description`, `state`, `createdAt`, `updatedAt`) VALUES
(1, 'accesos-index', 'ACCESOS: Menú', 1, '2023-03-11 03:58:50', '2023-03-11 04:08:33'),
(2, 'accesos-rol', 'ACCESOS: Roles', 1, '2023-03-11 04:08:15', '2023-03-11 04:08:15'),
(3, 'accesos-permisos', 'ACCESOS: Permisos', 1, '2023-03-11 04:09:18', '2023-03-11 04:09:18'),
(4, 'accesos-user', 'ACCESOS: Usuarios', 1, '2023-03-11 04:09:49', '2023-03-11 04:09:49'),
(5, 'accesos-asigned', 'ACCESOS: Asignar', 1, '2023-03-11 04:18:07', '2023-03-11 04:18:07'),
(6, 'maintenance-index', 'MANTENIMIENTO: Menú', 1, '2023-03-11 04:20:29', '2023-03-11 04:20:29'),
(7, 'maintenance-client', 'MANTENIMIENTO: Clientes', 1, '2023-03-11 04:23:47', '2023-03-11 04:23:47'),
(8, 'maintenance-presentation', 'MANTENIMIENTO: Presentaciones', 1, '2023-03-11 04:24:32', '2023-03-11 04:24:32'),
(9, 'maintenance-zone', 'MANTENIMIENTO: Zonas', 1, '2023-03-11 04:27:04', '2023-03-11 04:27:04'),
(10, 'maintenance-product', 'MANTENIMIENTO: Productos', 1, '2023-03-11 04:27:23', '2023-03-11 04:27:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presentations`
--

CREATE TABLE `presentations` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `state` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `presentations`
--

INSERT INTO `presentations` (`id`, `name`, `state`, `createdAt`, `updatedAt`) VALUES
(1, 'six pack 100ml', 1, NULL, NULL),
(2, 'doce pack', 1, NULL, NULL),
(3, 'veinticuatro pack', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `image` text NOT NULL,
  `state` int NOT NULL DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `state`, `createdAt`, `updatedAt`) VALUES
(1, 'jugo de limon', 'limon.jpg', 1, '2023-02-27 23:58:13', '2023-02-27 23:58:13'),
(2, 'jugo de piña', 'piña.jpg', 1, '2023-03-26 15:45:16', '2023-03-26 15:45:16'),
(3, 'jugo de maracuya', 'maracuya.jpg', 1, '2023-03-26 15:46:51', '2023-03-26 15:46:51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_presentations`
--

CREATE TABLE `product_presentations` (
  `id` int UNSIGNED NOT NULL,
  `productId` int UNSIGNED NOT NULL,
  `presentationId` int UNSIGNED NOT NULL,
  `price` decimal(11,2) NOT NULL,
  `state` int NOT NULL DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `product_presentations`
--

INSERT INTO `product_presentations` (`id`, `productId`, `presentationId`, `price`, `state`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 12.00, 1, '2023-02-27 23:58:43', '2023-02-27 23:58:43'),
(2, 2, 2, 24.00, 1, '2023-02-27 23:58:50', '2023-02-27 23:58:50'),
(3, 3, 3, 36.00, 1, '2023-02-27 23:58:57', '2023-02-27 23:58:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `state` int NOT NULL DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `state`, `createdAt`, `updatedAt`) VALUES
(1, 'Administrador', 1, NULL, NULL),
(2, 'Cliente', 1, NULL, NULL),
(3, 'test edit', 0, '2023-03-11 03:41:14', '2023-03-11 03:41:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `id` int UNSIGNED NOT NULL,
  `roleId` int UNSIGNED NOT NULL,
  `permissionId` int UNSIGNED NOT NULL,
  `state` int NOT NULL DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `id` int UNSIGNED NOT NULL,
  `clientId` int UNSIGNED NOT NULL,
  `date` timestamp NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `latitud` varchar(100) DEFAULT NULL,
  `longitud` varchar(100) DEFAULT NULL,
  `address` text,
  `zoneId` int UNSIGNED DEFAULT NULL,
  `state` int NOT NULL COMMENT '1:registrado 2:aceptado 3:en proceso 4:entregado 5:cancelado',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sale_details`
--

CREATE TABLE `sale_details` (
  `id` int UNSIGNED NOT NULL,
  `saleId` int UNSIGNED NOT NULL,
  `productPresentationId` int UNSIGNED NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(11,2) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `user` varchar(20) NOT NULL,
  `password` text NOT NULL,
  `roleId` int UNSIGNED NOT NULL,
  `state` int NOT NULL DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `user`, `password`, `roleId`, `state`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin 1', 'admin', '$2a$08$EWv1bLJHjWq2CCc7QfgkEeMdsCyZsa1Rk7KVYlRgJ.0xaw5T.ReXO', 1, 1, NULL, NULL),
(3, 'test2', 'test2', '$2a$08$CV6YUPwl14dXg1ierP22GOJ.tw.BLrcpVuTF0.gxLU4xhd9E6rFaW', 2, 0, '2023-03-13 01:33:08', '2023-03-13 01:45:34'),
(4, 'miguel cliente', '74070643', '$2a$08$/tRILT1bJMggMkbD8c.WdusY/KmxUiBzGCMvG5Em51FZgg7Z1uD0.', 2, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zones`
--

CREATE TABLE `zones` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(11,2) NOT NULL,
  `state` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT NOW(),
  `updatedAt` timestamp NULL DEFAULT NOW()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `zones`
--

INSERT INTO `zones` (`id`, `name`, `state`) VALUES
(1, 'Amelia Denis De Icaza', 1),
(2, 'Belisario Porras', 1),
(3, 'José Domingo Espinar', 1),
(4, 'Mateo Iturralde', 1),
(5, 'Victoriano Lorenzo', 1),
(6, 'Arnulfo Arias', 1),
(7, 'Belisario Frías', 1),
(8, 'Omar Torrijos', 1),
(9, 'Rufina Alfaro', 1),
(10, '24 de Diciembre', 1),
(11, 'Alcalde Díaz', 1),
(12, 'Ancón', 1),
(13, 'Betania', 1),
(14, 'Bella Vista', 1),
(15, 'Calidonia', 1),
(16, 'Caimitillo', 1),
(17, 'Chilibre', 1),
(18, 'Don Bosco', 1),
(19, 'El Chorrillo', 1),
(20, 'Curundú', 1),
(21, 'Ernesto Córdoba Campos', 1),
(22, 'Juan Díaz', 1),
(23, 'Las Cumbres', 1),
(24, 'Las Garzas', 1),
(25, 'Las Mañanitas', 1),
(26, 'Pacora', 1),
(27, 'Parque Lefevre', 1),
(28, 'Pedregal', 1),
(29, 'Pueblo Nuevo', 1),
(30, 'Río Abajo', 1),
(31, 'San Felipe', 1),
(32, 'San Francisco', 1),
(33, 'San Martín', 1),
(34, 'Santa Ana', 1),
(35, 'Tocumen', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `presentations`
--
ALTER TABLE `presentations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `product_presentations`
--
ALTER TABLE `product_presentations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `presentation_id` (`presentationId`),
  ADD KEY `product_id` (`productId`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `permissionId` (`permissionId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`clientId`),
  ADD KEY `zone_id` (`zoneId`);

--
-- Indices de la tabla `sale_details`
--
ALTER TABLE `sale_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sale_id` (`saleId`),
  ADD KEY `product_presentation_id` (`productPresentationId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`roleId`);

--
-- Indices de la tabla `zones`
--
ALTER TABLE `zones`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `presentations`
--
ALTER TABLE `presentations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `product_presentations`
--
ALTER TABLE `product_presentations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sale_details`
--
ALTER TABLE `sale_details`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `zones`
--
ALTER TABLE `zones`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `product_presentations`
--
ALTER TABLE `product_presentations`
  ADD CONSTRAINT `product_presentations_ibfk_1` FOREIGN KEY (`presentationId`) REFERENCES `presentations` (`id`),
  ADD CONSTRAINT `product_presentations_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_ibfk_1` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`),
  ADD CONSTRAINT `role_has_permissions_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`);

--
-- Filtros para la tabla `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`),
  ADD CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`zoneId`) REFERENCES `zones` (`id`);

--
-- Filtros para la tabla `sale_details`
--
ALTER TABLE `sale_details`
  ADD CONSTRAINT `sale_details_ibfk_2` FOREIGN KEY (`saleId`) REFERENCES `sales` (`id`),
  ADD CONSTRAINT `sale_details_ibfk_3` FOREIGN KEY (`productPresentationId`) REFERENCES `product_presentations` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
