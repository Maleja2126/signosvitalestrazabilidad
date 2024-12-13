-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-12-2024 a las 23:48:49
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `basededatosprueba`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_paciente`
--

CREATE TABLE `historial_paciente` (
  `id` int(11) NOT NULL,
  `id_paciente` int(11) NOT NULL,
  `primer_nombre` varchar(50) DEFAULT NULL,
  `segundo_nombre` varchar(50) DEFAULT NULL,
  `primer_apellido` varchar(50) DEFAULT NULL,
  `segundo_apellido` varchar(50) DEFAULT NULL,
  `tipo_identificacion` enum('cédula de ciudadanía','tarjeta de identidad') DEFAULT NULL,
  `numero_identificacion` varchar(20) DEFAULT NULL,
  `ubicacion` varchar(20) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `status` enum('activo','inactivo') DEFAULT NULL,
  `age_group` enum('Recién nacido','Lactante temprano','Lactante mayor','Niño pequeño','Preescolar temprano','Preescolar tardío','Adulto') DEFAULT NULL,
  `responsable_username` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `responsable_registro` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial_paciente`
--

INSERT INTO `historial_paciente` (`id`, `id_paciente`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `tipo_identificacion`, `numero_identificacion`, `ubicacion`, `fecha_nacimiento`, `status`, `age_group`, `responsable_username`, `created_at`, `responsable_registro`) VALUES
(4, 5, 'Carmen', 'Isabel', 'Hernández', 'Lopez', 'tarjeta de identidad', '98765432', '204A', '2020-11-15', 'activo', 'Preescolar temprano', NULL, '2024-12-11 21:26:42', NULL),
(5, 42, 'Adriana', 'Cecilia', 'Hernández', 'Flórez', 'tarjeta de identidad', '24455666', '304A', '2018-06-17', 'activo', 'Preescolar tardío', NULL, '2024-12-11 21:46:07', NULL),
(6, 42, 'Adriana', 'Laura', 'Hernández', 'Flórez', 'tarjeta de identidad', '24455666', '304A', '2018-06-17', 'activo', 'Preescolar tardío', NULL, '2024-12-11 21:47:25', NULL),
(7, 42, 'Adriana', 'Laura', 'Hernández', 'Solares', 'tarjeta de identidad', '24455666', '304A', '2018-06-17', 'activo', 'Preescolar tardío', NULL, '2024-12-11 21:48:59', NULL),
(8, 42, 'Adriana', 'Lauraa', 'Hernández', 'Solares', 'tarjeta de identidad', '24455666', '304A', '2018-06-17', 'activo', 'Preescolar tardío', NULL, '2024-12-13 01:23:41', NULL),
(9, 42, 'Adriana', 'Lauraa', 'Hernández', 'Solares', 'tarjeta de identidad', '2445566688', '304A', '2018-06-17', 'activo', 'Preescolar tardío', NULL, '2024-12-13 01:37:58', NULL),
(10, 42, 'Adriana', 'Lauraa', 'Hernández', 'Solares', 'tarjeta de identidad', '7416963256', '304A', '2018-06-17', 'activo', 'Preescolar tardío', NULL, '2024-12-13 01:54:19', 'Laura Solaresss'),
(11, 42, 'Adriana', 'Lauraa', 'Hernández', 'Solares', 'tarjeta de identidad', '7416963256', '304An', '2018-06-17', 'activo', 'Preescolar tardío', NULL, '2024-12-13 05:59:56', NULL),
(12, 42, 'Adriana', 'Lauraa', 'Hernández', 'Quintero', 'tarjeta de identidad', '7416963256', '304An', '2018-06-17', 'activo', 'Preescolar tardío', NULL, '2024-12-13 07:59:57', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_signos_pacientes`
--

CREATE TABLE `historial_signos_pacientes` (
  `id` int(11) NOT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `id_registro` int(11) DEFAULT NULL,
  `record_date` date DEFAULT NULL,
  `record_time` time DEFAULT NULL,
  `presion_sistolica` int(11) DEFAULT NULL,
  `presion_diastolica` int(11) DEFAULT NULL,
  `presion_media` int(11) DEFAULT NULL,
  `pulso` int(11) DEFAULT NULL,
  `temperatura` float DEFAULT NULL,
  `frecuencia_respiratoria` int(11) DEFAULT NULL,
  `saturacion_oxigeno` int(11) DEFAULT NULL,
  `peso_adulto` float DEFAULT NULL,
  `peso_pediatrico` float DEFAULT NULL,
  `talla` int(11) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `responsable_signos` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial_signos_pacientes`
--

INSERT INTO `historial_signos_pacientes` (`id`, `id_paciente`, `id_registro`, `record_date`, `record_time`, `presion_sistolica`, `presion_diastolica`, `presion_media`, `pulso`, `temperatura`, `frecuencia_respiratoria`, `saturacion_oxigeno`, `peso_adulto`, `peso_pediatrico`, `talla`, `observaciones`, `responsable_signos`, `created_at`) VALUES
(1, 42, 177, '2024-12-02', '08:00:00', 120, 70, 87, 120, 36.7, 35, 96, NULL, 22, 88, NULL, 'Alejandra Hernández', '2024-12-13 01:24:03'),
(2, 42, 174, '2024-12-11', '03:47:00', 120, 81, 94, 110, 36.4, 30, 99, NULL, 25, 85, 'revisar pacientee', 'Alejandra Hernández', '2024-12-13 01:32:49'),
(3, 42, 174, '2024-12-11', '03:47:00', 120, 81, 94, 110, 36.4, 30, 99, NULL, 25, 85, 'revisar pacienteee', 'Alejandra Hernández', '2024-12-13 01:33:13'),
(4, 42, 177, '2024-12-02', '08:00:00', 120, 80, 93, 120, 36.7, 35, 96, NULL, 22, 88, 'dijfiejpfoew', 'Alejandra Hernández', '2024-12-13 01:38:43'),
(5, 42, 177, '2024-12-02', '08:00:00', 120, 80, 93, 120, 36.7, 35, 96, NULL, 22, 88, 'fgvbhjnkmnjkm', 'Laura Solares', '2024-12-13 02:43:51'),
(6, 42, 177, '2024-12-02', '08:00:00', 120, 80, 93, 120, 36.7, 35, 96, NULL, 22, 88, 'xcvhbnm,', 'Laura Solares', '2024-12-13 02:43:57'),
(7, 42, 177, '2024-12-02', '08:00:00', 120, 80, 93, 120, 36.7, 35, 96, NULL, 22, 88, 'xcvhbnm,', 'Alejandra Hernández', '2024-12-13 03:27:53'),
(8, 42, 174, '2024-12-11', '00:51:00', 120, 81, 94, 110, 36.4, 30, 99, NULL, 25, 85, 'revisar pacienteeek', 'Alejandra Hernández', '2024-12-13 05:51:27'),
(9, 42, 177, '2024-12-13', '02:55:00', 120, 80, 93, 120, 36.7, 34, 96, NULL, 22, 88, 'xcvhbnm,', 'Alejandra Hernández', '2024-12-13 07:55:22'),
(10, 42, 177, '2024-12-13', '03:00:00', 120, 70, 87, 120, 36.7, 34, 96, NULL, 22, 88, 'xcvhbnm,', 'Alejandra Hernández', '2024-12-13 08:00:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `primer_nombre` varchar(50) NOT NULL,
  `segundo_nombre` varchar(50) NOT NULL,
  `primer_apellido` varchar(50) NOT NULL,
  `segundo_apellido` varchar(50) NOT NULL,
  `numero_identificacion` varchar(20) NOT NULL,
  `tipo_identificacion` enum('cédula de ciudadanía','tarjeta de identidad') NOT NULL,
  `ubicacion` varchar(20) DEFAULT NULL,
  `status` enum('activo','inactivo') DEFAULT 'activo',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_nacimiento` date NOT NULL DEFAULT '1900-01-01',
  `age_group` enum('Recién nacido','Lactante temprano','Lactante mayor','Niño pequeño','Preescolar temprano','Preescolar tardío','Adulto') NOT NULL,
  `responsable_username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `patients`
--

INSERT INTO `patients` (`id`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `numero_identificacion`, `tipo_identificacion`, `ubicacion`, `status`, `created_at`, `fecha_nacimiento`, `age_group`, `responsable_username`) VALUES
(1, 'María', 'Luisa', 'Sánchez', 'Torres', '12345678', 'tarjeta de identidad', '102B', 'activo', '2023-05-13 00:35:00', '2007-04-20', 'Adulto', 'Aura Laraaaa'),
(2, 'Juan', '', 'Pérez', 'Gómez', '8764321', 'cédula de ciudadanía', '203A', 'inactivo', '2022-03-10 19:15:00', '1995-07-14', 'Adulto', 'Aura Laraaaa'),
(3, 'Ana', 'María', 'Rodríguez', 'López', '45678912', 'tarjeta de identidad', '305C', 'activo', '2023-11-25 18:45:00', '2018-08-10', 'Preescolar tardío', 'Aura Laraaaa'),
(4, 'Luis', '', 'Martínez', 'García', '34567890', 'cédula de ciudadanía', '102B', 'activo', '2021-07-06 03:20:00', '1987-03-22', 'Adulto', 'Aura Laraaaa'),
(5, 'Carmen', 'Isabel', 'Hernández', 'Lopez', '98765432', 'tarjeta de identidad', '204A', 'activo', '2023-02-18 21:10:00', '2020-11-15', 'Preescolar temprano', NULL),
(6, 'José', '', 'Díaz', 'Torres', '65432198', 'cédula de ciudadanía', '301B', 'activo', '2020-12-31 02:45:00', '1992-06-08', 'Adulto', 'Aura Laraaaa'),
(7, 'Paola', 'Andrea', 'Ramírez', 'Morales', '12349876', 'tarjeta de identidad', '102C', 'activo', '2023-08-14 23:00:00', '2019-04-12', 'Preescolar tardío', 'Aura Laraaaa'),
(8, 'Miguel', '', 'Jiménez', 'Pérez', '78912345', 'cédula de ciudadanía', '202A', 'inactivo', '2021-01-20 20:30:00', '1983-09-05', 'Adulto', 'Aura Laraaaa'),
(9, 'Lucía', 'Sofía', 'Soto', 'Vargas', '43219876', 'tarjeta de identidad', '303C', 'activo', '2023-06-28 19:50:00', '2022-01-22', 'Lactante mayor', 'Aura Laraaaa'),
(10, 'Carlos', '', 'Gómez', 'Ortiz', '54321987', 'cédula de ciudadanía', '203B', 'activo', '2022-10-16 01:40:00', '1979-12-31', 'Adulto', 'Aura Laraaaa'),
(11, 'Valeria', 'Fernanda', 'Torres', 'Mendoza', '87654321', 'tarjeta de identidad', '102A', 'activo', '2023-09-01 22:20:00', '2023-05-10', 'Recién nacido', 'Aura Laraaaa'),
(12, 'Pedro', '', 'Álvarez', 'Ramírez', '11223344', 'cédula de ciudadanía', '205C', 'inactivo', '2020-06-05 18:10:00', '1998-02-18', 'Adulto', 'Aura Laraaaa'),
(13, 'Isabela', 'Mariana', 'Gutiérrez', 'Rojas', '33445566', 'tarjeta de identidad', '302B', 'activo', '2022-11-24 03:00:00', '2017-03-25', 'Preescolar temprano', 'Aura Laraaaa'),
(14, 'David', '', 'López', 'Martínez', '99887766', 'cédula de ciudadanía', '201A', 'activo', '2021-04-19 00:30:00', '1989-11-03', 'Adulto', 'Aura Laraaaa'),
(15, 'Sofía', 'Gabriela', 'Moreno', 'Jiménez', '66554433', 'tarjeta de identidad', '304A', 'activo', '2023-01-13 02:50:00', '2021-09-05', 'Niño pequeño', 'Aura Laraaaa'),
(16, 'Andrés', '', 'Ramos', 'Pérez', '22334455', 'cédula de ciudadanía', '203C', 'activo', '2020-03-10 05:15:00', '1990-05-20', 'Adulto', NULL),
(17, 'Camila', 'Alejandra', 'Serrano', 'Hernández', '44556677', 'tarjeta de identidad', '102B', 'activo', '2023-10-07 20:40:00', '2023-01-15', 'Lactante temprano', 'Aura Laraaaa'),
(18, 'Fernando', '', 'Mejía', 'Ruiz', '77889900', 'cédula de ciudadanía', '305B', 'activo', '2021-12-31 19:20:00', '1991-07-09', 'Adulto', 'Aura Laraaaa'),
(19, 'Laura', 'Natalia', 'Gómez', 'Ramírez', '99001122', 'tarjeta de identidad', '304C', 'activo', '2023-03-16 00:50:00', '2019-10-21', 'Preescolar tardío', 'Aura Laraaaa'),
(20, 'Ricardo', '', 'Suárez', 'Torres', '88990011', 'cédula de ciudadanía', '202A', 'inactivo', '2022-07-22 21:35:00', '1980-06-11', 'Adulto', 'Aura Laraaaa'),
(21, 'Mónica', 'Patricia', 'Paredes', 'Vargas', '55443322', 'tarjeta de identidad', '302A', 'activo', '2023-04-11 23:10:00', '2016-08-17', 'Preescolar temprano', 'Aura Laraaaa'),
(22, 'Sebastián', '', 'Castro', 'Ortega', '22114433', 'cédula de ciudadanía', '204B', 'activo', '2021-08-28 04:25:00', '1986-02-27', 'Adulto', 'Aura Laraaaa'),
(23, 'Daniela', 'Andrea', 'Vargas', 'García', '66778899', 'tarjeta de identidad', '301A', 'activo', '2022-01-05 19:45:00', '2021-03-12', 'Niño pequeño', 'Aura Laraaaa'),
(24, 'Gabriel', '', 'Mora', 'Hernández', '33221144', 'cédula de ciudadanía', '305C', 'inactivo', '2020-11-11 01:55:00', '1993-10-30', 'Adulto', 'Aura Laraaaa'),
(25, 'Mariana', 'Elena', 'Peña', 'Díaz', '99887755', 'tarjeta de identidad', '202C', 'activo', '2023-07-08 20:05:00', '2015-12-25', 'Preescolar temprano', 'Aura Laraaaa'),
(26, 'Carolina', 'Andrea', 'Martínez', 'Gómez', '11224455', 'tarjeta de identidad', '102C', 'activo', '2023-05-02 20:00:00', '2020-03-15', 'Niño pequeño', 'Laura Solaresss'),
(27, 'Esteban', '', 'González', 'López', '99887744', 'cédula de ciudadanía', '203B', 'inactivo', '2022-06-10 21:30:00', '1995-08-20', 'Adulto', NULL),
(28, 'Sara', 'Julieta', 'Ramírez', 'Cruz', '33445577', 'tarjeta de identidad', '301A', 'activo', '2023-08-16 00:25:00', '2017-11-30', 'Preescolar temprano', 'Laura Solaresss'),
(29, 'Héctor', '', 'Vargas', 'Mejía', '55667788', 'cédula de ciudadanía', '204C', 'activo', '2021-12-01 19:45:00', '1990-01-11', 'Adulto', NULL),
(30, 'Diana', 'Patricia', 'Castro', 'Mendoza', '22334477', 'tarjeta de identidad', '302B', 'activo', '2023-10-20 23:10:00', '2021-06-05', 'Niño pequeño', 'Laura Solaresss'),
(31, 'Felipe', '', 'Hernández', 'García', '44556622', 'cédula de ciudadanía', '303A', 'inactivo', '2020-04-19 02:20:00', '1982-07-19', 'Adulto', NULL),
(32, 'Camila', 'Sofía', 'Rojas', 'Duarte', '66778855', 'tarjeta de identidad', '201C', 'activo', '2023-09-30 18:35:00', '2022-09-22', 'Lactante mayor', 'Laura Solaresss'),
(33, 'Jorge', '', 'Morales', 'Pérez', '77889911', 'cédula de ciudadanía', '305B', 'activo', '2022-03-05 20:50:00', '1984-10-30', 'Adulto', NULL),
(34, 'Lorena', 'Isabel', 'Ortiz', 'Ramos', '88990022', 'tarjeta de identidad', '302C', 'activo', '2023-07-14 21:15:00', '2023-02-25', 'Lactante temprano', 'Laura Solaresss'),
(35, 'Daniel', '', 'Suárez', 'Martínez', '22117788', 'cédula de ciudadanía', '203A', 'activo', '2021-05-18 22:40:00', '1996-05-09', 'Adulto', NULL),
(36, 'Luisa', 'María', 'Mora', 'Sánchez', '11227799', 'tarjeta de identidad', '305C', 'inactivo', '2022-09-12 19:55:00', '2019-04-15', 'Preescolar tardío', 'Laura Solaresss'),
(37, 'Francisco', '', 'Serrano', 'Jiménez', '33448822', 'cédula de ciudadanía', '102B', 'activo', '2020-11-12 01:20:00', '1988-03-07', 'Adulto', NULL),
(38, 'Natalia', 'Alejandra', 'Díaz', 'Ortiz', '55660033', 'tarjeta de identidad', '204A', 'activo', '2023-01-22 18:15:00', '2020-10-12', 'Niño pequeño', 'Laura Solaresss'),
(39, 'Roberto', '', 'Gutiérrez', 'Soto', '66772244', 'cédula de ciudadanía', '102C', 'activo', '2021-06-26 00:45:00', '1993-11-15', 'Adulto', NULL),
(40, 'Luciana', 'Valeria', 'Paredes', 'Castillo', '77883311', 'tarjeta de identidad', '203C', 'activo', '2022-02-15 03:50:00', '2023-08-10', 'Recién nacido', 'Laura Solaresss'),
(41, 'Eduardo', '', 'Álvarez', 'Moreno', '22331177', 'cédula de ciudadanía', '202B', 'inactivo', '2020-07-20 04:30:00', '1981-09-25', 'Adulto', NULL),
(42, 'Adriana', 'Lauraa', 'Hernández', 'Quintero', '7416963256', 'tarjeta de identidad', '304An', 'activo', '2023-11-05 17:55:00', '2018-06-17', 'Preescolar tardío', NULL),
(43, 'Mauricio', '', 'Jiménez', 'Vega', '99880044', 'cédula de ciudadanía', '202C', 'activo', '2022-04-15 23:25:00', '1994-12-20', 'Adulto', NULL),
(44, 'Elena', 'Beatriz', 'Vega', 'Torres', '33441166', 'tarjeta de identidad', '204B', 'activo', '2023-03-10 21:35:00', '2021-02-28', 'Niño pequeño', 'Laura Solaresss'),
(45, 'Álvaro', '', 'Soto', 'Rojas', '55664488', 'cédula de ciudadanía', '301C', 'activo', '2020-08-30 19:40:00', '1985-04-22', 'Adulto', NULL),
(46, 'Marisol', 'Victoria', 'Torres', 'Peña', '66775599', 'tarjeta de identidad', '203B', 'inactivo', '2021-09-26 02:15:00', '2016-12-05', 'Preescolar temprano', 'Laura Solaresss'),
(47, 'Óscar', '', 'López', 'Díaz', '77881122', 'cédula de ciudadanía', '102A', 'activo', '2023-06-14 20:25:00', '1992-08-01', 'Adulto', NULL),
(48, 'Silvia', 'Patricia', 'Castillo', 'Vargas', '22338844', 'tarjeta de identidad', '301B', 'activo', '2023-12-10 00:10:00', '2019-07-13', 'Preescolar tardío', 'Laura Solaresss'),
(49, 'Fernando', '', 'Moreno', 'Álvarez', '44556699', 'cédula de ciudadanía', '204C', 'activo', '2022-05-07 19:05:00', '1987-01-29', 'Adulto', NULL),
(50, 'Rocío', 'Elena', 'Pérez', 'Gutiérrez', '66779900', 'tarjeta de identidad', '305A', 'activo', '2021-03-18 22:50:00', '2020-01-01', 'Niño pequeño', 'Laura Solaresss'),
(51, 'Camilo', '', 'Hdez', '', '32569669', 'tarjeta de identidad', '741', 'activo', '2024-12-13 01:40:26', '2007-10-19', 'Adulto', NULL),
(52, 'fcygbhjn', '', 'cvbhjnm', '', '84512485125', 'tarjeta de identidad', '741', 'activo', '2024-12-13 07:17:07', '2004-12-26', 'Adulto', NULL),
(53, 'hola', '', 'Laura', '', '845645632', 'tarjeta de identidad', '7412', 'activo', '2024-12-13 07:18:27', '2003-12-26', 'Adulto', NULL),
(54, 'enfknewf', '', 'pjwepfew', '', 'fcvgbhjkml,ñmnbjvhcg', 'cédula de ciudadanía', '741', 'activo', '2024-12-13 07:44:14', '2002-12-26', 'Adulto', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registros_paciente`
--

CREATE TABLE `registros_paciente` (
  `id` int(11) NOT NULL,
  `id_paciente` int(11) NOT NULL,
  `record_date` date NOT NULL,
  `record_time` time NOT NULL,
  `presion_sistolica` int(11) DEFAULT NULL,
  `presion_diastolica` int(11) DEFAULT NULL,
  `presion_media` decimal(5,2) DEFAULT NULL,
  `pulso` int(11) DEFAULT NULL,
  `temperatura` decimal(4,1) DEFAULT NULL,
  `frecuencia_respiratoria` int(11) DEFAULT NULL,
  `saturacion_oxigeno` int(11) DEFAULT NULL,
  `peso_adulto` decimal(6,3) DEFAULT NULL,
  `peso_pediatrico` decimal(4,1) DEFAULT NULL,
  `talla` int(11) DEFAULT NULL,
  `observaciones` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `responsable_signos` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registros_paciente`
--

INSERT INTO `registros_paciente` (`id`, `id_paciente`, `record_date`, `record_time`, `presion_sistolica`, `presion_diastolica`, `presion_media`, `pulso`, `temperatura`, `frecuencia_respiratoria`, `saturacion_oxigeno`, `peso_adulto`, `peso_pediatrico`, `talla`, `observaciones`, `created_at`, `responsable_signos`) VALUES
(1, 1, '2024-12-10', '10:30:00', 120, 80, 106.67, 75, 36.8, 18, 98, 60.000, NULL, 160, '', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(2, 1, '2024-11-22', '14:15:00', 140, 90, 123.33, 85, 37.0, 20, 97, 61.200, NULL, 162, 'Presión ligeramente elevada', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(3, 1, '2024-10-15', '11:00:00', 125, 85, 111.67, 78, 36.9, 19, 98, 60.500, NULL, 161, 'Pulso dentro del rango normal', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(4, 1, '2024-08-01', '09:00:00', 130, 88, 116.00, 80, 36.7, 18, 97, 60.800, NULL, 163, 'Estable', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(5, 2, '2024-12-01', '08:15:00', 118, 78, 104.67, 72, 36.6, 17, 98, 59.000, NULL, 155, 'Sin alteraciones', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(6, 2, '2024-10-10', '10:45:00', 122, 80, 108.00, 74, 36.8, 18, 97, 59.500, NULL, 156, 'Signos normales', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(7, 2, '2024-09-15', '11:30:00', 125, 82, 110.67, 75, 36.7, 19, 97, 60.000, NULL, 157, 'Observación sin novedades', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(8, 2, '2024-08-20', '14:20:00', 124, 81, 109.67, 73, 36.6, 18, 97, 59.800, NULL, 158, 'Control regular', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(9, 3, '2024-09-18', '09:45:00', 110, 70, 96.67, 95, 37.2, 25, 99, NULL, 14.5, 110, 'Frecuencia respiratoria ligeramente elevada', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(10, 3, '2024-08-10', '12:30:00', 100, 65, 88.33, 90, 36.7, 22, 98, NULL, 14.8, 115, 'Parámetros normales', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(11, 3, '2024-07-05', '15:20:00', 105, 68, 92.67, 92, 36.9, 24, 98, NULL, 14.6, 112, 'Observación normal', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(12, 3, '2024-06-15', '10:00:00', 108, 69, 95.00, 91, 37.0, 23, 98, NULL, 14.7, 113, 'Sin novedades', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(13, 3, '2024-05-25', '09:30:00', 107, 67, 93.67, 93, 36.8, 24, 99, NULL, 14.9, 114, 'Control satisfactorio del paciente', '2024-12-11 13:57:01', NULL),
(14, 4, '2024-11-01', '07:50:00', 100, 65, 88.33, 110, 37.5, 30, 100, NULL, 8.2, 75, 'Saturación en el límite superior', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(15, 4, '2024-10-15', '09:15:00', 98, 62, 86.00, 109, 37.3, 29, 99, NULL, 8.1, 74, 'Signos normales', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(16, 4, '2024-09-10', '12:00:00', 95, 60, 83.33, 108, 37.4, 28, 99, NULL, 8.0, 73, 'Parámetros estables', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(17, 5, '2024-12-05', '16:20:00', 135, 85, 118.33, 65, 36.5, 15, 96, NULL, 70.5, 175, '', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(18, 5, '2024-11-20', '08:40:00', 145, 95, 128.33, 72, 37.1, 20, 97, NULL, 72.0, 178, '', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(19, 5, '2024-10-30', '09:30:00', 138, 88, 121.33, 70, 36.8, 16, 96, NULL, 71.0, 176, '', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(20, 5, '2024-09-15', '10:15:00', 140, 90, 123.33, 68, 36.6, 15, 97, NULL, 70.8, 177, 'Estable', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(21, 6, '2024-07-01', '16:10:00', 135, 85, 118.33, 65, 36.5, 15, 96, 70.500, NULL, 175, '', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(22, 6, '2024-10-25', '08:20:00', 145, 95, 128.33, 72, 37.1, 20, 97, 72.000, NULL, 178, '', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(23, 6, '2024-11-30', '09:10:00', 138, 88, 121.33, 70, 36.8, 16, 96, 71.000, NULL, 176, '', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(24, 7, '2024-08-05', '10:00:00', 118, 78, 104.67, 75, 36.7, 18, 98, 58.500, NULL, 160, 'Pulso dentro del rango normal', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(25, 7, '2024-09-10', '11:45:00', 120, 80, 106.67, 77, 36.8, 18, 97, 59.000, NULL, 161, 'Signos normales', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(26, 7, '2024-07-15', '09:30:00', 125, 85, 111.67, 79, 36.9, 19, 97, 60.000, NULL, 162, 'Estable', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(27, 7, '2024-06-20', '12:20:00', 122, 82, 108.67, 78, 36.7, 18, 98, 59.500, NULL, 163, 'Sin novedades', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(28, 8, '2024-12-11', '07:30:00', 115, 75, 101.67, 85, 37.0, 22, 98, 90.000, NULL, 120, '', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(29, 8, '2024-05-10', '10:45:00', 120, 80, 106.67, 90, 36.9, 20, 95, 97.000, NULL, 122, '', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(30, 8, '2024-07-08', '12:40:00', 118, 78, 104.67, 80, 36.8, 21, 98, 93.000, NULL, 121, '', '2024-12-11 08:57:01', 'Aura Laraaaa'),
(31, 10, '2024-12-01', '08:00:00', 120, 80, 106.67, 70, 37.0, 18, 98, 60.000, NULL, 100, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(32, 10, '2024-12-02', '09:00:00', 180, 110, 156.67, 50, 39.8, 12, 82, 61.000, NULL, 99, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(33, 10, '2024-12-03', '10:15:00', 125, 85, 111.67, 72, 36.8, 16, 99, 60.000, NULL, 105, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(34, 10, '2024-12-04', '11:30:00', 175, 105, 151.67, 58, 39.7, 13, 88, 61.000, NULL, 102, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(35, 10, '2024-12-05', '12:45:00', 118, 75, 103.67, 80, 36.5, 18, 97, 62.000, NULL, 101, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(36, 10, '2024-12-06', '13:30:00', 185, 115, 161.67, 52, 40.2, 11, 83, 62.000, NULL, 107, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(37, 9, '2024-12-07', '14:00:00', 135, 90, 120.00, 68, 37.2, 17, 96, NULL, 22.0, 106, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(38, 9, '2024-12-08', '15:00:00', 210, 135, 185.00, 47, 40.3, 12, 81, NULL, 21.0, 106, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(39, 9, '2024-12-10', '17:15:00', 205, 125, 178.33, 51, 40.4, 16, 80, NULL, 22.0, 110, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(40, 9, '2024-12-11', '18:00:00', 128, 82, 112.67, 74, 36.6, 19, 99, NULL, 21.9, 109, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(41, 9, '2024-12-12', '19:00:00', 190, 115, 165.00, 53, 39.8, 13, 85, NULL, 21.7, 108, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(42, 11, '2024-12-10', '17:00:00', 205, 145, 185.00, 51, 40.4, 16, 80, NULL, 50.0, 150, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(43, 11, '2024-12-11', '18:00:00', 128, 82, 112.67, 74, 36.6, 19, 99, NULL, 52.0, 149, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(44, 11, '2024-12-12', '19:00:00', 190, 115, 165.00, 53, 39.8, 13, 85, NULL, 51.5, 148, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(45, 11, '2024-12-07', '14:00:00', 190, 130, 170.00, 49, 40.5, 13, 84, NULL, 51.0, 153, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(46, 11, '2024-12-08', '15:00:00', 130, 85, 115.00, 75, 36.9, 18, 98, NULL, 51.3, 152, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(47, 11, '2024-12-09', '16:00:00', 200, 140, 180.00, 46, 40.8, 14, 80, NULL, 50.0, 151, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(48, 11, '2024-12-01', '08:30:00', 160, 105, 141.67, 52, 39.5, 11, 88, NULL, 51.0, 155, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(49, 11, '2024-12-02', '09:15:00', 120, 80, 106.67, 72, 37.0, 16, 97, NULL, 50.0, 153, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(50, 11, '2024-12-03', '10:00:00', 170, 110, 150.00, 55, 39.8, 10, 83, 97.000, NULL, 152, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(51, 12, '2024-12-04', '11:00:00', 118, 75, 103.67, 80, 36.5, 18, 97, 96.500, NULL, 151, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(52, 12, '2024-12-05', '12:00:00', 180, 120, 160.00, 60, 40.3, 8, 80, 96.800, NULL, 150, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(53, 12, '2024-12-06', '13:00:00', 125, 85, 111.67, 68, 37.2, 17, 96, 95.500, NULL, 154, NULL, '2024-12-11 09:09:28', 'Aura Laraaaa'),
(54, 13, '2024-12-02', '09:00:00', 115, 75, 101.67, 65, 36.5, 16, 97, NULL, 21.5, 108, NULL, '2024-12-12 00:13:30', 'Laura Solaresss'),
(55, 13, '2024-12-03', '10:00:00', 125, 85, 111.67, 72, 36.8, 17, 99, NULL, 22.2, 112, NULL, '2024-12-12 00:13:30', 'Laura Solaresss'),
(56, 13, '2024-12-04', '11:00:00', 130, 90, 116.67, 75, 37.2, 18, 96, NULL, 21.9, 110, NULL, '2024-12-12 00:13:30', 'Laura Solaresss'),
(57, 14, '2024-12-01', '08:30:00', 130, 85, 115.00, 78, 36.7, 20, 97, 70.500, NULL, 165, NULL, '2024-12-12 00:13:30', 'Laura Solaresss'),
(58, 14, '2024-12-02', '09:30:00', 125, 80, 110.00, 75, 36.9, 18, 96, 71.200, NULL, 162, NULL, '2024-12-12 00:13:30', 'Laura Solaresss'),
(59, 14, '2024-12-03', '10:30:00', 135, 90, 120.00, 80, 37.0, 19, 98, 70.800, NULL, 160, NULL, '2024-12-12 00:13:30', 'Laura Solaresss'),
(60, 14, '2024-12-04', '11:30:00', 140, 95, 125.00, 85, 37.1, 21, 96, 71.000, NULL, 163, NULL, '2024-12-12 00:13:30', 'Laura Solaresss'),
(61, 15, '2024-12-01', '08:15:00', 110, 70, 96.67, 65, 36.2, 14, 99, NULL, 18.5, 105, NULL, '2024-12-12 00:13:30', 'Laura Solaresss'),
(62, 15, '2024-12-02', '09:15:00', 115, 75, 101.67, 68, 36.4, 15, 97, NULL, 18.8, 107, NULL, '2024-12-12 00:13:30', 'Laura Solaresss'),
(63, 15, '2024-12-03', '10:15:00', 120, 80, 106.67, 70, 36.6, 16, 98, NULL, 19.0, 108, NULL, '2024-12-12 00:13:30', 'Laura Solaresss'),
(64, 15, '2024-12-04', '11:15:00', 125, 85, 111.67, 72, 36.8, 17, 96, NULL, 19.2, 110, NULL, '2024-12-12 00:13:30', 'Laura Solaresss'),
(65, 13, '2024-12-01', '08:00:00', 120, 80, 106.67, 70, 37.0, 18, 98, NULL, 22.0, 110, NULL, '2024-12-12 00:13:30', 'Laura Solaresss'),
(66, 16, '2024-12-01', '16:00:00', 125, 85, 111.67, 75, 36.8, 20, 97, 73.000, NULL, 171, NULL, '2024-12-12 00:27:15', 'Laura Solaresss'),
(67, 16, '2024-12-02', '00:00:00', 130, 90, 116.67, 80, 37.2, 22, 96, 74.000, NULL, 172, NULL, '2024-12-12 00:27:15', 'Laura Solaresss'),
(68, 16, '2024-12-02', '08:00:00', 135, 95, 121.67, 85, 37.1, 21, 98, 73.500, NULL, 173, NULL, '2024-12-12 00:27:15', 'Laura Solaresss'),
(69, 17, '2024-12-01', '08:00:00', 100, 65, 88.33, 60, 36.5, 16, 99, NULL, 10.5, 85, NULL, '2024-12-12 00:27:15', 'Laura Solaresss'),
(70, 17, '2024-12-01', '16:00:00', 105, 70, 93.33, 62, 36.7, 18, 98, NULL, 10.8, 86, NULL, '2024-12-12 00:27:15', 'Laura Solaresss'),
(71, 17, '2024-12-02', '00:00:00', 110, 75, 98.33, 65, 36.9, 20, 97, NULL, 11.0, 87, NULL, '2024-12-12 00:27:15', 'Laura Solaresss'),
(72, 17, '2024-12-02', '08:00:00', 115, 80, 103.33, 68, 37.0, 19, 96, NULL, 11.2, 88, NULL, '2024-12-12 00:27:15', 'Laura Solaresss'),
(73, 18, '2024-12-01', '08:00:00', 140, 90, 123.33, 85, 37.3, 20, 97, 80.000, NULL, 175, NULL, '2024-12-12 00:27:15', 'Laura Solaresss'),
(74, 18, '2024-12-01', '16:00:00', 135, 85, 118.33, 82, 36.9, 19, 98, 79.500, NULL, 174, NULL, '2024-12-12 00:27:15', 'Laura Solaresss'),
(75, 18, '2024-12-02', '00:00:00', 130, 80, 113.33, 78, 36.8, 18, 96, 79.000, NULL, 173, NULL, '2024-12-12 00:27:15', 'Laura Solaresss'),
(76, 18, '2024-12-02', '08:00:00', 125, 75, 108.33, 75, 36.7, 17, 95, 78.500, NULL, 172, NULL, '2024-12-12 00:27:15', 'Laura Solaresss'),
(77, 19, '2024-12-01', '08:00:00', 110, 70, 96.67, 65, 36.5, 16, 99, NULL, 20.5, 105, NULL, '2024-12-12 00:27:15', 'Laura Solaresss'),
(78, 19, '2024-12-01', '16:00:00', 115, 75, 101.67, 68, 36.6, 17, 98, NULL, 21.0, 106, NULL, '2024-12-12 00:27:15', 'Laura Solaresss'),
(79, 19, '2024-12-02', '00:00:00', 120, 80, 106.67, 70, 36.7, 18, 97, NULL, 21.5, 107, NULL, '2024-12-12 00:27:15', 'Laura Solaresss'),
(80, 19, '2024-12-02', '08:00:00', 125, 85, 111.67, 72, 36.8, 19, 96, NULL, 22.0, 108, NULL, '2024-12-12 00:27:15', 'Laura Solaresss'),
(81, 20, '2024-12-01', '08:00:00', 130, 85, 115.00, 75, 36.8, 18, 97, 75.000, NULL, 170, NULL, '2024-12-12 00:27:15', 'Laura Solaresss'),
(82, 20, '2024-12-01', '16:00:00', 125, 80, 110.00, 72, 36.7, 17, 96, 74.500, NULL, 169, NULL, '2024-12-12 00:27:15', 'Laura Solaresss'),
(83, 20, '2024-12-02', '00:00:00', 120, 75, 105.00, 70, 36.6, 16, 95, 74.000, NULL, 168, NULL, '2024-12-12 00:27:15', 'Laura Solaresss'),
(84, 20, '2024-12-02', '08:00:00', 115, 70, 100.00, 68, 36.5, 15, 94, 73.500, NULL, 167, NULL, '2024-12-12 00:27:15', 'Laura Solaresss'),
(85, 16, '2024-12-01', '08:00:00', 120, 80, 106.67, 70, 37.0, 18, 98, 72.500, NULL, 170, 'dfdddfdgesdgedged', '2024-12-12 10:27:15', NULL),
(86, 21, '2024-12-01', '16:00:00', 115, 75, 101.67, 68, 36.6, 18, 97, NULL, 18.5, 106, NULL, '2024-12-12 00:37:30', 'Laura Solaresss'),
(87, 21, '2024-12-02', '00:00:00', 120, 80, 106.67, 70, 36.7, 19, 96, NULL, 19.0, 107, NULL, '2024-12-12 00:37:30', 'Laura Solaresss'),
(88, 21, '2024-12-02', '08:00:00', 125, 85, 111.67, 72, 36.8, 20, 95, NULL, 19.5, 108, NULL, '2024-12-12 00:37:30', 'Laura Solaresss'),
(89, 22, '2024-12-01', '08:00:00', 130, 85, 115.00, 75, 36.9, 18, 98, 72.000, NULL, 170, NULL, '2024-12-12 00:37:30', 'Laura Solaresss'),
(90, 22, '2024-12-01', '16:00:00', 125, 80, 110.00, 72, 36.8, 17, 97, 71.500, NULL, 171, NULL, '2024-12-12 00:37:30', 'Laura Solaresss'),
(91, 22, '2024-12-02', '00:00:00', 120, 75, 105.00, 70, 36.7, 16, 96, 71.000, NULL, 172, NULL, '2024-12-12 00:37:30', 'Laura Solaresss'),
(92, 22, '2024-12-02', '08:00:00', 115, 70, 100.00, 68, 36.6, 15, 95, 70.500, NULL, 173, NULL, '2024-12-12 00:37:30', 'Laura Solaresss'),
(93, 23, '2024-12-01', '08:00:00', 100, 65, 88.33, 60, 36.4, 15, 99, NULL, 12.0, 90, NULL, '2024-12-12 00:37:30', 'Laura Solaresss'),
(94, 23, '2024-12-01', '16:00:00', 105, 70, 93.33, 62, 36.5, 17, 98, NULL, 12.5, 91, NULL, '2024-12-12 00:37:30', 'Laura Solaresss'),
(95, 23, '2024-12-02', '00:00:00', 110, 75, 98.33, 65, 36.6, 19, 97, NULL, 13.0, 92, NULL, '2024-12-12 00:37:30', 'Laura Solaresss'),
(96, 23, '2024-12-02', '08:00:00', 115, 80, 103.33, 68, 36.7, 18, 96, NULL, 13.5, 93, NULL, '2024-12-12 00:37:30', 'Laura Solaresss'),
(97, 24, '2024-12-01', '08:00:00', 140, 90, 123.33, 85, 37.0, 20, 98, 80.000, NULL, 175, NULL, '2024-12-12 00:37:30', 'Laura Solaresss'),
(98, 24, '2024-12-01', '16:00:00', 135, 85, 118.33, 82, 36.9, 19, 97, 79.500, NULL, 174, NULL, '2024-12-12 00:37:30', 'Laura Solaresss'),
(99, 24, '2024-12-02', '00:00:00', 130, 80, 113.33, 78, 36.8, 18, 96, 79.000, NULL, 173, NULL, '2024-12-12 00:37:30', 'Laura Solaresss'),
(100, 24, '2024-12-02', '08:00:00', 125, 75, 108.33, 75, 36.7, 17, 95, 78.500, NULL, 172, NULL, '2024-12-12 00:37:30', 'Laura Solaresss'),
(101, 25, '2024-12-01', '08:00:00', 115, 70, 100.00, 68, 36.5, 16, 99, NULL, 20.0, 110, NULL, '2024-12-12 00:37:30', 'Laura Solaresss'),
(102, 25, '2024-12-01', '16:00:00', 120, 75, 105.00, 70, 36.6, 18, 98, NULL, 20.5, 111, NULL, '2024-12-12 00:37:30', 'Laura Solaresss'),
(103, 25, '2024-12-02', '00:00:00', 125, 80, 110.00, 72, 36.7, 20, 97, NULL, 21.0, 112, NULL, '2024-12-12 00:37:30', 'Laura Solaresss'),
(104, 25, '2024-12-02', '08:00:00', 130, 85, 115.00, 75, 36.8, 22, 96, NULL, 21.5, 113, NULL, '2024-12-12 00:37:30', 'Laura Solaresss'),
(105, 21, '2024-12-01', '08:00:00', 110, 70, 96.67, 65, 36.5, 16, 98, NULL, 18.0, 105, NULL, '2024-12-12 00:37:30', 'Laura Solaresss'),
(106, 26, '2024-12-01', '08:00:00', 100, 65, 88.33, 60, 36.4, 16, 99, NULL, 12.0, 92, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(107, 26, '2024-12-01', '16:00:00', 105, 70, 93.33, 62, 36.5, 17, 98, NULL, 12.5, 93, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(108, 26, '2024-12-02', '00:00:00', 110, 75, 98.33, 65, 36.6, 18, 97, NULL, 13.0, 94, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(109, 26, '2024-12-02', '08:00:00', 50, 80, 70.00, 68, 36.7, 19, 96, NULL, 13.5, 95, NULL, '2024-12-12 05:52:43', NULL),
(110, 27, '2024-12-01', '08:00:00', 120, 80, 106.67, 70, 36.7, 18, 98, 70.000, NULL, 170, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(111, 27, '2024-12-01', '16:00:00', 125, 85, 111.67, 72, 36.8, 19, 97, 70.500, NULL, 171, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(112, 27, '2024-12-02', '00:00:00', 130, 90, 116.67, 75, 36.9, 20, 96, 71.000, NULL, 172, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(113, 27, '2024-12-02', '08:00:00', 135, 95, 121.67, 78, 37.0, 21, 95, 71.500, NULL, 173, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(114, 28, '2024-12-01', '08:00:00', 110, 70, 96.67, 65, 36.6, 17, 98, NULL, 15.0, 100, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(115, 28, '2024-12-01', '16:00:00', 115, 75, 101.67, 68, 36.7, 18, 97, NULL, 15.5, 101, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(116, 28, '2024-12-02', '00:00:00', 120, 80, 106.67, 70, 36.8, 19, 96, NULL, 16.0, 102, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(117, 28, '2024-12-02', '08:00:00', 125, 85, 111.67, 72, 36.9, 20, 95, NULL, 16.5, 103, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(118, 29, '2024-12-01', '08:00:00', 130, 85, 115.00, 75, 36.8, 18, 97, 72.000, NULL, 175, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(119, 29, '2024-12-01', '16:00:00', 125, 80, 110.00, 72, 36.7, 17, 96, 71.500, NULL, 174, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(120, 29, '2024-12-02', '00:00:00', 120, 75, 105.00, 70, 36.6, 16, 95, 71.000, NULL, 173, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(121, 29, '2024-12-02', '08:00:00', 115, 70, 100.00, 68, 36.5, 15, 94, 70.500, NULL, 172, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(122, 30, '2024-12-01', '08:00:00', 100, 65, 88.33, 60, 36.4, 16, 99, NULL, 11.0, 85, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(123, 30, '2024-12-01', '16:00:00', 105, 70, 93.33, 62, 36.5, 17, 98, NULL, 11.5, 86, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(124, 30, '2024-12-02', '00:00:00', 110, 75, 98.33, 65, 36.6, 18, 97, NULL, 12.0, 87, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(125, 30, '2024-12-02', '08:00:00', 115, 80, 103.33, 68, 36.7, 19, 96, NULL, 12.5, 88, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(126, 31, '2024-12-01', '08:00:00', 140, 90, 123.33, 85, 37.0, 20, 98, 80.000, NULL, 175, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(127, 31, '2024-12-01', '16:00:00', 135, 85, 118.33, 82, 36.9, 19, 97, 79.500, NULL, 174, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(128, 31, '2024-12-02', '00:00:00', 130, 80, 113.33, 78, 36.8, 18, 96, 79.000, NULL, 173, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(129, 31, '2024-12-02', '08:00:00', 125, 75, 108.33, 75, 36.7, 17, 95, 78.500, NULL, 172, NULL, '2024-12-12 00:52:43', 'Laura Solaresss'),
(130, 32, '2024-12-01', '08:00:00', 100, 65, 88.33, 60, 36.4, 16, 99, NULL, 10.0, 85, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(131, 32, '2024-12-01', '16:00:00', 105, 70, 93.33, 62, 36.5, 17, 98, NULL, 10.5, 86, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(132, 32, '2024-12-02', '00:00:00', 110, 75, 98.33, 65, 36.6, 18, 97, NULL, 11.0, 87, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(133, 32, '2024-12-02', '08:00:00', 115, 80, 103.33, 68, 36.7, 19, 96, NULL, 11.5, 88, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(134, 33, '2024-12-01', '08:00:00', 120, 80, 106.67, 70, 36.7, 18, 98, 72.000, NULL, 170, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(135, 33, '2024-12-01', '16:00:00', 125, 85, 111.67, 72, 36.8, 19, 97, 72.500, NULL, 171, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(136, 33, '2024-12-02', '00:00:00', 130, 90, 116.67, 75, 36.9, 20, 96, 73.000, NULL, 172, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(137, 33, '2024-12-02', '08:00:00', 135, 95, 121.67, 78, 37.0, 21, 95, 73.500, NULL, 173, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(138, 34, '2024-12-01', '08:00:00', 90, 60, 80.00, 58, 36.4, 15, 99, NULL, 7.0, 70, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(139, 34, '2024-12-01', '16:00:00', 95, 65, 85.00, 60, 36.5, 16, 98, NULL, 7.5, 71, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(140, 34, '2024-12-02', '00:00:00', 100, 70, 90.00, 62, 36.6, 17, 97, NULL, 8.0, 72, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(141, 34, '2024-12-02', '08:00:00', 105, 75, 95.00, 65, 36.7, 18, 96, NULL, 8.5, 73, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(142, 35, '2024-12-01', '08:00:00', 130, 85, 115.00, 75, 36.8, 18, 97, 74.000, NULL, 175, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(143, 35, '2024-12-01', '16:00:00', 125, 80, 110.00, 72, 36.7, 17, 96, 73.500, NULL, 174, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(144, 35, '2024-12-02', '00:00:00', 120, 75, 105.00, 70, 36.6, 16, 95, 73.000, NULL, 173, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(145, 35, '2024-12-02', '08:00:00', 115, 70, 100.00, 68, 36.5, 15, 94, 72.500, NULL, 172, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(146, 36, '2024-12-01', '08:00:00', 110, 70, 96.67, 65, 36.6, 17, 98, NULL, 15.0, 100, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(147, 36, '2024-12-01', '16:00:00', 115, 75, 101.67, 68, 36.7, 18, 97, NULL, 15.5, 101, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(148, 36, '2024-12-02', '00:00:00', 120, 80, 106.67, 70, 36.8, 19, 96, NULL, 16.0, 102, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(149, 36, '2024-12-02', '08:00:00', 125, 85, 111.67, 72, 36.9, 20, 95, NULL, 16.5, 103, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(150, 37, '2024-12-01', '08:00:00', 140, 90, 123.33, 85, 37.0, 20, 98, 80.000, NULL, 175, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(151, 37, '2024-12-01', '16:00:00', 135, 85, 118.33, 82, 36.9, 19, 97, 79.500, NULL, 174, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(152, 37, '2024-12-02', '00:00:00', 130, 80, 113.33, 78, 36.8, 18, 96, 79.000, NULL, 173, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(153, 37, '2024-12-02', '08:00:00', 125, 75, 108.33, 75, 36.7, 17, 95, 78.500, NULL, 172, NULL, '2024-12-12 00:57:06', 'Laura Solaresss'),
(154, 38, '2024-12-01', '08:00:00', 110, 70, 96.67, 65, 36.6, 17, 98, NULL, 15.0, 100, NULL, '2024-12-12 01:07:32', 'Laura Solaresss'),
(155, 38, '2024-12-01', '16:00:00', 115, 75, 101.67, 68, 36.7, 18, 97, NULL, 15.5, 101, NULL, '2024-12-12 01:07:32', 'Laura Solaresss'),
(156, 38, '2024-12-02', '00:00:00', 120, 80, 106.67, 70, 36.8, 19, 96, NULL, 16.0, 102, NULL, '2024-12-12 01:07:32', 'Laura Solaresss'),
(157, 38, '2024-12-02', '08:00:00', 125, 85, 111.67, 72, 36.9, 20, 95, NULL, 16.5, 103, NULL, '2024-12-12 01:07:32', 'Laura Solaresss'),
(158, 39, '2024-12-01', '08:00:00', 140, 90, 123.33, 85, 37.0, 20, 98, 80.000, NULL, 175, NULL, '2024-12-12 01:07:32', 'Laura Solaresss'),
(159, 39, '2024-12-01', '16:00:00', 135, 85, 118.33, 82, 36.9, 19, 97, 79.500, NULL, 174, NULL, '2024-12-12 01:07:32', 'Laura Solaresss'),
(160, 39, '2024-12-02', '00:00:00', 130, 80, 113.33, 78, 36.8, 18, 96, 79.000, NULL, 173, NULL, '2024-12-12 01:07:32', 'Laura Solaresss'),
(161, 39, '2024-12-02', '08:00:00', 125, 75, 108.33, 75, 36.7, 17, 95, 78.500, NULL, 172, NULL, '2024-12-12 01:07:32', 'Laura Solaresss'),
(162, 40, '2024-12-01', '08:00:00', 110, 70, 96.67, 65, 36.6, 17, 98, NULL, 15.0, 100, NULL, '2024-12-12 01:07:32', 'Laura Solaresss'),
(163, 40, '2024-12-01', '16:00:00', 115, 75, 101.67, 68, 36.7, 18, 97, NULL, 15.5, 101, NULL, '2024-12-12 01:07:32', 'Laura Solaresss'),
(164, 40, '2024-12-02', '00:00:00', 120, 80, 106.67, 70, 36.8, 19, 96, NULL, 16.0, 102, NULL, '2024-12-12 01:07:32', 'Laura Solaresss'),
(165, 40, '2024-12-02', '08:00:00', 125, 85, 111.67, 72, 36.9, 20, 95, NULL, 16.5, 103, NULL, '2024-12-12 01:07:32', 'Laura Solaresss'),
(166, 40, '2024-12-01', '08:00:00', 140, 90, 123.33, 85, 37.0, 20, 98, 80.000, NULL, 175, NULL, '2024-12-12 01:07:32', 'Laura Solaresss'),
(167, 40, '2024-12-01', '16:00:00', 135, 85, 118.33, 82, 36.9, 19, 97, 79.500, NULL, 174, NULL, '2024-12-12 01:07:32', 'Laura Solaresss'),
(168, 40, '2024-12-02', '00:00:00', 130, 80, 113.33, 78, 36.8, 18, 96, 79.000, NULL, 173, NULL, '2024-12-12 01:07:32', 'Laura Solaresss'),
(169, 40, '2024-12-02', '08:00:00', 125, 75, 108.33, 75, 36.7, 17, 95, 78.500, NULL, 172, NULL, '2024-12-12 01:07:32', 'Laura Solaresss'),
(170, 41, '2024-12-01', '08:00:00', 138, 90, 122.00, 72, 36.2, 18, 97, 70.000, NULL, 175, NULL, '2024-12-12 01:16:48', NULL),
(171, 41, '2024-12-01', '16:00:00', 145, 95, 128.33, 76, 36.5, 20, 96, 71.000, NULL, 176, NULL, '2024-12-12 01:16:48', NULL),
(172, 41, '2024-12-02', '00:00:00', 160, 100, 140.00, 80, 36.7, 22, 95, 72.000, NULL, 177, NULL, '2024-12-12 01:16:48', NULL),
(173, 41, '2024-12-02', '08:00:00', 130, 85, 115.00, 70, 36.8, 18, 98, 73.000, NULL, 178, NULL, '2024-12-12 01:16:48', NULL),
(174, 42, '2024-12-11', '00:51:00', 120, 81, 94.00, 110, 36.4, 30, 99, NULL, 25.0, 85, 'revisar pacienteeek', '2024-12-12 11:16:48', NULL),
(175, 42, '2024-12-11', '16:00:00', 120, 80, 106.67, 115, 38.0, 32, 98, NULL, 21.0, 87, NULL, '2024-12-12 06:16:48', NULL),
(176, 42, '2024-12-11', '16:00:00', 110, 70, 96.67, 100, 36.6, 28, 97, NULL, 21.5, 82, NULL, '2024-12-12 06:16:48', NULL),
(177, 42, '2024-12-13', '03:00:00', 120, 70, 87.00, 120, 36.7, 34, 96, NULL, 22.0, 88, 'xcvhbnm,', '2024-12-12 11:16:48', NULL),
(178, 43, '2024-12-01', '08:00:00', 160, 95, 138.33, 88, 36.3, 15, 100, 75.000, NULL, 170, NULL, '2024-12-12 01:16:48', NULL),
(179, 43, '2024-12-01', '16:00:00', 155, 90, 133.33, 90, 36.4, 18, 98, 76.000, NULL, 171, NULL, '2024-12-12 01:16:48', NULL),
(180, 43, '2024-12-02', '00:00:00', 150, 85, 128.33, 85, 36.5, 17, 97, 77.000, NULL, 172, NULL, '2024-12-12 01:16:48', NULL),
(181, 43, '2024-12-02', '08:00:00', 140, 80, 120.00, 82, 36.6, 16, 99, 78.000, NULL, 173, NULL, '2024-12-12 01:16:48', NULL),
(182, 44, '2024-12-01', '08:00:00', 120, 70, 103.33, 110, 36.6, 25, 99, NULL, 15.5, 85, NULL, '2024-12-12 01:16:48', NULL),
(183, 44, '2024-12-01', '16:00:00', 130, 75, 111.67, 112, 36.7, 28, 98, NULL, 16.0, 86, NULL, '2024-12-12 01:16:48', NULL),
(184, 44, '2024-12-02', '00:00:00', 125, 80, 110.00, 105, 36.8, 26, 97, NULL, 16.5, 87, NULL, '2024-12-12 01:16:48', NULL),
(185, 44, '2024-12-02', '08:00:00', 135, 85, 118.33, 115, 36.9, 30, 96, NULL, 17.0, 88, NULL, '2024-12-12 01:16:48', NULL),
(186, 45, '2024-12-01', '08:00:00', 150, 95, 131.67, 78, 36.2, 14, 99, 80.000, NULL, 180, NULL, '2024-12-12 01:16:48', NULL),
(187, 45, '2024-12-01', '16:00:00', 160, 100, 140.00, 80, 36.3, 18, 98, 81.000, NULL, 181, NULL, '2024-12-12 01:16:48', NULL),
(188, 45, '2024-12-02', '00:00:00', 140, 90, 123.33, 82, 36.4, 15, 97, 82.000, NULL, 182, NULL, '2024-12-12 01:16:48', NULL),
(189, 45, '2024-12-02', '08:00:00', 145, 95, 128.33, 84, 36.5, 16, 96, 83.000, NULL, 183, NULL, '2024-12-12 01:16:48', NULL),
(190, 46, '2024-12-01', '08:00:00', 180, 120, 160.00, 55, 36.2, 22, 92, NULL, 18.0, 80, NULL, '2024-12-12 01:21:24', NULL),
(191, 46, '2024-12-01', '16:00:00', 170, 110, 150.00, 58, 36.3, 25, 93, NULL, 18.5, 82, NULL, '2024-12-12 01:21:24', NULL),
(192, 46, '2024-12-02', '00:00:00', 160, 100, 140.00, 60, 36.4, 28, 94, NULL, 19.0, 84, NULL, '2024-12-12 01:21:24', NULL),
(193, 46, '2024-12-02', '08:00:00', 150, 90, 130.00, 62, 36.5, 30, 95, NULL, 19.5, 86, NULL, '2024-12-12 01:21:24', NULL),
(194, 47, '2024-12-01', '08:00:00', 200, 150, 183.33, 85, 37.0, 20, 98, 80.000, NULL, 175, NULL, '2024-12-12 01:21:24', NULL),
(195, 47, '2024-12-01', '16:00:00', 180, 130, 163.33, 90, 37.1, 18, 97, 80.500, NULL, 176, NULL, '2024-12-12 01:21:24', NULL),
(196, 47, '2024-12-02', '00:00:00', 190, 140, 173.33, 92, 37.2, 17, 96, 81.000, NULL, 177, NULL, '2024-12-12 01:21:24', NULL),
(197, 47, '2024-12-02', '08:00:00', 170, 120, 153.33, 85, 37.3, 16, 95, 81.500, NULL, 178, NULL, '2024-12-12 01:21:24', NULL),
(198, 48, '2024-12-01', '08:00:00', 180, 125, 161.67, 65, 36.1, 20, 92, NULL, 22.0, 88, NULL, '2024-12-12 01:21:24', NULL),
(199, 48, '2024-12-01', '16:00:00', 170, 115, 151.67, 67, 36.2, 22, 93, NULL, 22.5, 90, NULL, '2024-12-12 01:21:24', NULL),
(200, 48, '2024-12-02', '00:00:00', 160, 105, 141.67, 70, 36.3, 24, 94, NULL, 23.0, 92, NULL, '2024-12-12 01:21:24', NULL),
(201, 48, '2024-12-02', '08:00:00', 150, 95, 131.67, 72, 36.4, 26, 95, NULL, 23.5, 94, NULL, '2024-12-12 01:21:24', NULL),
(202, 49, '2024-12-01', '08:00:00', 220, 170, 203.33, 95, 37.5, 15, 99, 90.000, NULL, 180, NULL, '2024-12-12 01:21:24', NULL),
(203, 49, '2024-12-01', '16:00:00', 210, 160, 193.33, 100, 37.6, 14, 98, 90.500, NULL, 181, NULL, '2024-12-12 01:21:24', NULL),
(204, 49, '2024-12-02', '00:00:00', 200, 150, 183.33, 105, 37.7, 13, 97, 91.000, NULL, 182, NULL, '2024-12-12 01:21:24', NULL),
(205, 49, '2024-12-02', '08:00:00', 190, 140, 173.33, 110, 37.8, 12, 96, 91.500, NULL, 183, NULL, '2024-12-12 01:21:24', NULL),
(206, 50, '2024-12-01', '08:00:00', 140, 95, 125.00, 50, 36.0, 30, 94, NULL, 14.0, 75, NULL, '2024-12-12 01:21:24', NULL),
(207, 50, '2024-12-01', '16:00:00', 130, 85, 115.00, 55, 36.1, 32, 95, NULL, 14.5, 77, NULL, '2024-12-12 01:21:24', NULL),
(208, 50, '2024-12-02', '00:00:00', 120, 80, 106.67, 60, 36.2, 35, 96, NULL, 15.0, 79, NULL, '2024-12-12 01:21:24', NULL),
(209, 50, '2024-12-02', '08:00:00', 110, 70, 96.67, 65, 36.3, 38, 97, NULL, 15.5, 81, NULL, '2024-12-12 01:21:24', NULL),
(210, 1, '2024-12-11', '16:16:00', 120, 80, 83.00, 70, 38.0, 50, 96, 50.000, NULL, 159, '', '2024-12-11 21:16:25', NULL),
(211, 42, '2024-12-13', '23:32:00', 120, 80, 93.00, 70, 38.0, 50, 100, NULL, 50.0, 150, '', '2024-12-13 04:33:04', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trazabilidad`
--

CREATE TABLE `trazabilidad` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `usuario_nombre` varchar(255) NOT NULL,
  `accion` enum('Creación','Actualización de datos del paciente','Descarga de PDF','Cambio de estado del paciente','Nuevo registro de Signos Vitales','Actualización de Signos Vitales') NOT NULL,
  `entidad_id` int(11) DEFAULT NULL,
  `datos_antiguos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`datos_antiguos`)),
  `datos_nuevos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `fecha_hora` timestamp NOT NULL DEFAULT current_timestamp(),
  `tipo_accion` enum('Paciente','Signos Vitales') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `trazabilidad`
--

INSERT INTO `trazabilidad` (`id`, `usuario_id`, `usuario_nombre`, `accion`, `entidad_id`, `datos_antiguos`, `datos_nuevos`, `fecha_hora`, `tipo_accion`) VALUES
(44, NULL, 'Alejandra Hernández', 'Cambio de estado del paciente', 42, '{\"estadoAnterior\":\"activo\",\"nombre\":\"Adriana Lauraa Hernández Solares\",\"numero_identificacion\":\"7416963256\",\"responsable\":\"Laura Solaressss\"}', '{\"estadoNuevo\":\"inactivo\",\"nombre\":\"Adriana Lauraa Hernández Solares\",\"numero_identificacion\":\"7416963256\",\"responsable\":\"Alejandra Hernández\"}', '2024-12-13 02:40:02', 'Paciente'),
(45, NULL, 'Alejandra Hernández', 'Cambio de estado del paciente', 42, '{\"estadoAnterior\":\"inactivo\",\"nombre\":\"Adriana Lauraa Hernández Solares\",\"numero_identificacion\":\"7416963256\",\"responsable\":\"Alejandra Hernández\"}', '{\"estadoNuevo\":\"activo\",\"nombre\":\"Adriana Lauraa Hernández Solares\",\"numero_identificacion\":\"7416963256\",\"responsable\":\"Alejandra Hernández\"}', '2024-12-13 02:40:03', 'Paciente'),
(46, 34, 'Laura Solares', 'Actualización de Signos Vitales', 42, '{\"id\":177,\"id_paciente\":42,\"record_date\":\"2024-12-02T05:00:00.000Z\",\"record_time\":\"08:00:00\",\"presion_sistolica\":120,\"presion_diastolica\":80,\"presion_media\":\"93.00\",\"pulso\":120,\"temperatura\":\"36.7\",\"frecuencia_respiratoria\":35,\"saturacion_oxigeno\":96,\"peso_adulto\":null,\"peso_pediatrico\":\"22.0\",\"talla\":88,\"observaciones\":\"dijfiejpfoew\",\"created_at\":\"2024-12-12T11:16:48.000Z\",\"responsable_signos\":\"Alejandra Hernández\"}', '{\"record_date\":{\"anterior\":\"2024-12-02T05:00:00.000Z\",\"nuevo\":\"2024-12-02\"},\"observaciones\":{\"anterior\":\"dijfiejpfoew\",\"nuevo\":\"fgvbhjnkmnjkm\"},\"created_at\":{\"anterior\":\"2024-12-12T11:16:48.000Z\",\"nuevo\":\"2024-12-12 06:16:48\"},\"responsable_signos\":{\"anterior\":\"Alejandra Hernández\",\"nuevo\":\"Laura Solares\"},\"paciente\":{\"nombre_completo\":\"Adriana Hernández\",\"tipo_identificacion\":\"tarjeta de identidad\",\"numero_identificacion\":\"7416963256\"}}', '2024-12-13 02:43:51', 'Signos Vitales'),
(47, 34, 'Laura Solares', 'Actualización de Signos Vitales', 42, '{\"id\":177,\"id_paciente\":42,\"record_date\":\"2024-12-02T05:00:00.000Z\",\"record_time\":\"08:00:00\",\"presion_sistolica\":120,\"presion_diastolica\":80,\"presion_media\":\"93.00\",\"pulso\":120,\"temperatura\":\"36.7\",\"frecuencia_respiratoria\":35,\"saturacion_oxigeno\":96,\"peso_adulto\":null,\"peso_pediatrico\":\"22.0\",\"talla\":88,\"observaciones\":\"fgvbhjnkmnjkm\",\"created_at\":\"2024-12-12T11:16:48.000Z\",\"responsable_signos\":\"Laura Solares\"}', '{\"record_date\":{\"anterior\":\"2024-12-02T05:00:00.000Z\",\"nuevo\":\"2024-12-02\"},\"observaciones\":{\"anterior\":\"fgvbhjnkmnjkm\",\"nuevo\":\"xcvhbnm,\"},\"created_at\":{\"anterior\":\"2024-12-12T11:16:48.000Z\",\"nuevo\":\"2024-12-12 06:16:48\"},\"responsable_signos\":{\"anterior\":\"Laura Solares\",\"nuevo\":\"Laura Solares\"},\"paciente\":{\"nombre_completo\":\"Adriana Hernández\",\"tipo_identificacion\":\"tarjeta de identidad\",\"numero_identificacion\":\"7416963256\"}}', '2024-12-13 02:43:57', 'Signos Vitales'),
(48, 34, 'Laura Solares', 'Descarga de PDF', 42, NULL, '{\"primer_nombre\":\"Adriana\",\"segundo_nombre\":\"Lauraa\",\"primer_apellido\":\"Hernández\",\"segundo_apellido\":\"Solares\",\"numero_identificacion\":\"7416963256\",\"tipo_identificacion\":\"tarjeta de identidad\",\"ubicacion\":\"304A\",\"status\":\"activo\",\"created_at\":\"5/11/2023, 12:55:00\",\"fecha_nacimiento\":\"17/6/2018\",\"age_group\":\"Preescolar tardío\",\"responsable_username\":\"Alejandra Hernández\"}', '2024-12-13 02:45:20', 'Paciente'),
(49, NULL, 'Alejandra Hernández', 'Actualización de Signos Vitales', 42, '{\"id\":177,\"id_paciente\":42,\"record_date\":\"2024-12-02T05:00:00.000Z\",\"record_time\":\"08:00:00\",\"presion_sistolica\":120,\"presion_diastolica\":80,\"presion_media\":\"93.00\",\"pulso\":120,\"temperatura\":\"36.7\",\"frecuencia_respiratoria\":35,\"saturacion_oxigeno\":96,\"peso_adulto\":null,\"peso_pediatrico\":\"22.0\",\"talla\":88,\"observaciones\":\"xcvhbnm,\",\"created_at\":\"2024-12-12T11:16:48.000Z\",\"responsable_signos\":\"Laura Solaresss\"}', '{\"record_date\":{\"anterior\":\"2024-12-02T05:00:00.000Z\",\"nuevo\":\"2024-12-02\"},\"created_at\":{\"anterior\":\"2024-12-12T11:16:48.000Z\",\"nuevo\":\"2024-12-12 06:16:48\"},\"responsable_signos\":{\"anterior\":\"Laura Solaresss\",\"nuevo\":\"Alejandra Hernández\"},\"paciente\":{\"nombre_completo\":\"Adriana Hernández\",\"tipo_identificacion\":\"tarjeta de identidad\",\"numero_identificacion\":\"7416963256\"}}', '2024-12-13 03:27:53', 'Signos Vitales'),
(50, NULL, 'Alejandra Hernández', 'Nuevo registro de Signos Vitales', 42, NULL, '{\"id_paciente\":\"42\",\"record_date\":\"2024-12-13\",\"record_time\":\"23:32\",\"presion_sistolica\":\"120\",\"presion_diastolica\":\"80\",\"presion_media\":\"93\",\"pulso\":\"70\",\"temperatura\":\"38\",\"frecuencia_respiratoria\":\"50\",\"saturacion_oxigeno\":\"100\",\"peso_adulto\":null,\"peso_pediatrico\":\"50\",\"talla\":\"150\",\"observaciones\":\"\",\"responsable_signos\":\"Alejandra Hernández\",\"paciente\":{\"nombre_completo\":\"Adriana Lauraa Hernández Solares\",\"tipo_identificacion\":\"tarjeta de identidad\",\"numero_identificacion\":\"7416963256\"}}', '2024-12-13 04:33:04', 'Signos Vitales'),
(51, NULL, 'Alejandra Hernández', 'Actualización de Signos Vitales', 42, '{\"id\":174,\"id_paciente\":42,\"record_date\":\"2024-12-11T05:00:00.000Z\",\"record_time\":\"03:47:00\",\"presion_sistolica\":120,\"presion_diastolica\":81,\"presion_media\":\"94.00\",\"pulso\":110,\"temperatura\":\"36.4\",\"frecuencia_respiratoria\":30,\"saturacion_oxigeno\":99,\"peso_adulto\":null,\"peso_pediatrico\":\"25.0\",\"talla\":85,\"observaciones\":\"revisar pacienteee\",\"created_at\":\"2024-12-12T11:16:48.000Z\",\"responsable_signos\":\"Alejandra Hernández\"}', '{\"record_date\":{\"anterior\":\"2024-12-11T05:00:00.000Z\",\"nuevo\":\"2024-12-11\"},\"record_time\":{\"anterior\":\"03:47:00\",\"nuevo\":\"00:51\"},\"observaciones\":{\"anterior\":\"revisar pacienteee\",\"nuevo\":\"revisar pacienteeek\"},\"created_at\":{\"anterior\":\"2024-12-12T11:16:48.000Z\",\"nuevo\":\"2024-12-12 06:16:48\"},\"responsable_signos\":{\"anterior\":\"Alejandra Hernández\",\"nuevo\":\"Alejandra Hernández\"},\"paciente\":{\"nombre_completo\":\"Adriana Hernández\",\"tipo_identificacion\":\"tarjeta de identidad\",\"numero_identificacion\":\"7416963256\"}}', '2024-12-13 05:51:27', 'Signos Vitales'),
(52, NULL, 'Alejandra Hernández', 'Actualización de datos del paciente', 42, '{\"id\":42,\"primer_nombre\":\"Adriana\",\"segundo_nombre\":\"Lauraa\",\"primer_apellido\":\"Hernández\",\"segundo_apellido\":\"Solares\",\"numero_identificacion\":\"7416963256\",\"tipo_identificacion\":\"tarjeta de identidad\",\"ubicacion\":\"304A\",\"status\":\"activo\",\"created_at\":\"2023-11-05T17:55:00.000Z\",\"fecha_nacimiento\":\"2018-06-17T05:00:00.000Z\",\"age_group\":\"Preescolar tardío\",\"responsable_username\":\"Alejandra Hernández\"}', '{\"ubicacion\":\"304An\",\"responsable_username\":\"Alejandra Hernández\"}', '2024-12-13 05:59:56', 'Paciente'),
(53, NULL, 'Alejandra Hernández', 'Descarga de PDF', 42, NULL, '{\"primer_nombre\":\"Adriana\",\"segundo_nombre\":\"Lauraa\",\"primer_apellido\":\"Hernández\",\"segundo_apellido\":\"Solares\",\"numero_identificacion\":\"7416963256\",\"tipo_identificacion\":\"tarjeta de identidad\",\"ubicacion\":\"304An\",\"status\":\"activo\",\"created_at\":\"5/11/2023, 12:55:00\",\"fecha_nacimiento\":\"17/6/2018\",\"age_group\":\"Preescolar tardío\",\"responsable_username\":\"Alejandra Hernández\"}', '2024-12-13 06:04:27', 'Paciente'),
(54, NULL, 'Alejandra Hernández', 'Descarga de PDF', 35, NULL, '{\"primer_nombre\":\"Daniel\",\"segundo_nombre\":\"\",\"primer_apellido\":\"Suárez\",\"segundo_apellido\":\"Martínez\",\"numero_identificacion\":\"22117788\",\"tipo_identificacion\":\"cédula de ciudadanía\",\"ubicacion\":\"203A\",\"status\":\"activo\",\"created_at\":\"18/5/2021, 17:40:00\",\"fecha_nacimiento\":\"9/5/1996\",\"age_group\":\"Adulto\",\"responsable_username\":\"Alejandra Hernández\"}', '2024-12-13 06:05:26', 'Paciente'),
(55, NULL, 'Alejandra Hernández', 'Descarga de PDF', 42, NULL, '{\"primer_nombre\":\"Adriana\",\"segundo_nombre\":\"Lauraa\",\"primer_apellido\":\"Hernández\",\"segundo_apellido\":\"Solares\",\"numero_identificacion\":\"7416963256\",\"tipo_identificacion\":\"tarjeta de identidad\",\"ubicacion\":\"304An\",\"status\":\"activo\",\"created_at\":\"5/11/2023, 12:55:00\",\"fecha_nacimiento\":\"17/6/2018\",\"age_group\":\"Preescolar tardío\",\"responsable_username\":\"Alejandra Hernández\"}', '2024-12-13 06:10:29', 'Paciente'),
(56, NULL, 'Alejandra Hernández', 'Creación', 52, NULL, '{\"primer_nombre\":\"fcygbhjn\",\"segundo_nombre\":\"\",\"primer_apellido\":\"cvbhjnm\",\"segundo_apellido\":\"\",\"numero_identificacion\":\"84512485125\",\"fecha_nacimiento\":\"2004-12-26\",\"tipo_identificacion\":\"tarjeta de identidad\",\"ubicacion\":\"741\",\"status\":\"activo\",\"age_group\":\"Adulto\",\"responsable_username\":\"Alejandra Hernández\"}', '2024-12-13 07:17:07', 'Paciente'),
(57, NULL, 'Alejandra Hernández', 'Creación', 53, NULL, '{\"primer_nombre\":\"hola\",\"segundo_nombre\":\"\",\"primer_apellido\":\"Laura\",\"segundo_apellido\":\"\",\"numero_identificacion\":\"845645632\",\"fecha_nacimiento\":\"2003-12-26\",\"tipo_identificacion\":\"tarjeta de identidad\",\"ubicacion\":\"7412\",\"status\":\"activo\",\"age_group\":\"Adulto\",\"responsable_username\":\"Alejandra Hernández\"}', '2024-12-13 07:18:27', 'Paciente'),
(58, NULL, 'Alejandra Hernández', 'Creación', 54, NULL, '{\"primer_nombre\":\"enfknewf\",\"segundo_nombre\":\"\",\"primer_apellido\":\"pjwepfew\",\"segundo_apellido\":\"\",\"numero_identificacion\":\"fcvgbhjkml,ñmnbjvhcgvh\",\"fecha_nacimiento\":\"2002-12-26\",\"tipo_identificacion\":\"cédula de ciudadanía\",\"ubicacion\":\"741\",\"status\":\"activo\",\"age_group\":\"Adulto\",\"responsable_username\":\"Alejandra Hernández\"}', '2024-12-13 07:44:14', 'Paciente'),
(59, NULL, 'Alejandra Hernández', 'Actualización de Signos Vitales', 42, '{\"id\":177,\"id_paciente\":42,\"record_date\":\"2024-12-02T05:00:00.000Z\",\"record_time\":\"08:00:00\",\"presion_sistolica\":120,\"presion_diastolica\":80,\"presion_media\":\"93.00\",\"pulso\":120,\"temperatura\":\"36.7\",\"frecuencia_respiratoria\":35,\"saturacion_oxigeno\":96,\"peso_adulto\":null,\"peso_pediatrico\":\"22.0\",\"talla\":88,\"observaciones\":\"xcvhbnm,\",\"created_at\":\"2024-12-12T11:16:48.000Z\",\"responsable_signos\":\"Alejandra Hernández\"}', '{\"record_date\":{\"anterior\":\"2024-12-02T05:00:00.000Z\",\"nuevo\":\"2024-12-13\"},\"record_time\":{\"anterior\":\"08:00:00\",\"nuevo\":\"02:55\"},\"frecuencia_respiratoria\":{\"anterior\":35,\"nuevo\":\"34\"},\"created_at\":{\"anterior\":\"2024-12-12T11:16:48.000Z\",\"nuevo\":\"2024-12-12 06:16:48\"},\"responsable_signos\":{\"anterior\":\"Alejandra Hernández\",\"nuevo\":\"Alejandra Hernández\"},\"paciente\":{\"nombre_completo\":\"Adriana Hernández\",\"tipo_identificacion\":\"tarjeta de identidad\",\"numero_identificacion\":\"7416963256\"}}', '2024-12-13 07:55:22', 'Signos Vitales'),
(60, NULL, 'Alejandra Hernández', 'Actualización de datos del paciente', 42, '{\"id\":42,\"primer_nombre\":\"Adriana\",\"segundo_nombre\":\"Lauraa\",\"primer_apellido\":\"Hernández\",\"segundo_apellido\":\"Solares\",\"numero_identificacion\":\"7416963256\",\"tipo_identificacion\":\"tarjeta de identidad\",\"ubicacion\":\"304An\",\"status\":\"activo\",\"created_at\":\"2023-11-05T17:55:00.000Z\",\"fecha_nacimiento\":\"2018-06-17T05:00:00.000Z\",\"age_group\":\"Preescolar tardío\",\"responsable_username\":\"Alejandra Hernández\"}', '{\"segundo_apellido\":\"Quintero\",\"responsable_username\":\"Alejandra Hernández\"}', '2024-12-13 07:59:57', 'Paciente'),
(61, NULL, 'Alejandra Hernández', 'Actualización de Signos Vitales', 42, '{\"id\":177,\"id_paciente\":42,\"record_date\":\"2024-12-13T05:00:00.000Z\",\"record_time\":\"02:55:00\",\"presion_sistolica\":120,\"presion_diastolica\":80,\"presion_media\":\"93.00\",\"pulso\":120,\"temperatura\":\"36.7\",\"frecuencia_respiratoria\":34,\"saturacion_oxigeno\":96,\"peso_adulto\":null,\"peso_pediatrico\":\"22.0\",\"talla\":88,\"observaciones\":\"xcvhbnm,\",\"created_at\":\"2024-12-12T11:16:48.000Z\",\"responsable_signos\":\"Alejandra Hernández\"}', '{\"record_date\":{\"anterior\":\"2024-12-13T05:00:00.000Z\",\"nuevo\":\"2024-12-13\"},\"record_time\":{\"anterior\":\"02:55:00\",\"nuevo\":\"03:00\"},\"presion_diastolica\":{\"anterior\":80,\"nuevo\":\"70\"},\"presion_media\":{\"anterior\":\"93.00\",\"nuevo\":\"87\"},\"created_at\":{\"anterior\":\"2024-12-12T11:16:48.000Z\",\"nuevo\":\"2024-12-12 06:16:48\"},\"responsable_signos\":{\"anterior\":\"Alejandra Hernández\",\"nuevo\":\"Alejandra Hernández\"},\"paciente\":{\"nombre_completo\":\"Adriana Hernández\",\"tipo_identificacion\":\"tarjeta de identidad\",\"numero_identificacion\":\"7416963256\"}}', '2024-12-13 08:00:23', 'Signos Vitales');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('jefe','staff','user') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `reset_token` varchar(64) DEFAULT NULL,
  `reset_token_expiration` datetime DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `profile_image` varchar(255) DEFAULT NULL,
  `numero_identificacion` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `role`, `created_at`, `reset_token`, `reset_token_expiration`, `is_active`, `profile_image`, `numero_identificacion`) VALUES
(24, 'Laura Quintero', '$2a$10$4QjKIOQOj3a8.raQBl.3FO.JcIcrmp7em6L1NqOkPOk3sZQEg8Fde', 'lauraquintero881120@gmail.com', 'user', '2024-11-17 00:33:09', 'bf8d8b908a3f116abad05b935b6e2f0286db3eb204e034185ffc84059d3a1b22', '2024-11-18 12:39:58', 1, NULL, '1005542018'),
(32, 'Aura Laraaaa', '$2a$10$IuI7YMVUD0KFONSJ58551eIa2Rv349RHIFor9M0drs0PHRR2dX5eO', 'alara470@unab.edu.co', 'jefe', '2024-11-26 07:42:28', NULL, NULL, 1, NULL, '1003383319'),
(34, 'Laura Solaresss', '$2a$10$/yNWyF5x/biozKXGAG7RqOhaQ1wic.IHc8E1nPUIQ5e8juYZReuSS', 'lsolares@unab.edu.co', 'jefe', '2024-12-11 07:03:03', NULL, NULL, 1, NULL, '1005542019'),
(35, 'Sofía López', '$2a$10$yTIYJQUJv0xWJ0ht6UP4l.xw3xAFqIohyDh0OpAbAEVL9.14IwpKq', 'sofia.martinez21@signos.com', 'user', '2024-12-11 07:11:32', NULL, NULL, 1, NULL, '1039475621'),
(36, 'adasda', '$2a$10$WVkjJV3jEpEas/zQVyTus.Fp.Spbc3a3JuY307XSNQGiWfftPX90q', 'adasda@gmail.com', 'staff', '2024-12-13 01:20:51', NULL, NULL, 1, NULL, '256252677'),
(37, 'Alejandra Hernández', '$2a$10$iRb2dZdQ14fbBQb4VhUFZOKYKbqHWgFJkKs.BEIXsfvlb62azetDi', 'mhernandez333@unab.edu.co', 'jefe', '2024-12-13 21:01:58', NULL, NULL, 1, 'profile-1734123718769-866670074.jpg', '1091967574');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `historial_paciente`
--
ALTER TABLE `historial_paciente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`id_paciente`) USING BTREE,
  ADD KEY `fk_responsable_registro` (`responsable_registro`);

--
-- Indices de la tabla `historial_signos_pacientes`
--
ALTER TABLE `historial_signos_pacientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_registro` (`id_registro`);

--
-- Indices de la tabla `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero_identificacion` (`numero_identificacion`),
  ADD KEY `fk_responsable_username` (`responsable_username`);

--
-- Indices de la tabla `registros_paciente`
--
ALTER TABLE `registros_paciente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`id_paciente`) USING BTREE,
  ADD KEY `fk_responsable_signos` (`responsable_signos`);

--
-- Indices de la tabla `trazabilidad`
--
ALTER TABLE `trazabilidad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario_id` (`usuario_id`),
  ADD KEY `fk_entidad_id` (`entidad_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `nombreU` (`username`) USING BTREE,
  ADD UNIQUE KEY `numero_identificacion` (`numero_identificacion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `historial_paciente`
--
ALTER TABLE `historial_paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `historial_signos_pacientes`
--
ALTER TABLE `historial_signos_pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `registros_paciente`
--
ALTER TABLE `registros_paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=212;

--
-- AUTO_INCREMENT de la tabla `trazabilidad`
--
ALTER TABLE `trazabilidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial_paciente`
--
ALTER TABLE `historial_paciente`
  ADD CONSTRAINT `fk_responsable_registro` FOREIGN KEY (`responsable_registro`) REFERENCES `users` (`username`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `historial_paciente_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `historial_signos_pacientes`
--
ALTER TABLE `historial_signos_pacientes`
  ADD CONSTRAINT `historial_signos_pacientes_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `patients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `historial_signos_pacientes_ibfk_2` FOREIGN KEY (`id_registro`) REFERENCES `registros_paciente` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `fk_responsable_username` FOREIGN KEY (`responsable_username`) REFERENCES `users` (`username`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `registros_paciente`
--
ALTER TABLE `registros_paciente`
  ADD CONSTRAINT `fk_responsable_signos` FOREIGN KEY (`responsable_signos`) REFERENCES `users` (`username`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `registros_paciente_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `trazabilidad`
--
ALTER TABLE `trazabilidad`
  ADD CONSTRAINT `fk_entidad_id` FOREIGN KEY (`entidad_id`) REFERENCES `patients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
