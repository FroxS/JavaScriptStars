-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 24 Maj 2023, 22:44
-- Wersja serwera: 10.4.24-MariaDB
-- Wersja PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `javascript`
--
CREATE DATABASE IF NOT EXISTS `javascript` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `javascript`;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `constelation`
--

DROP TABLE IF EXISTS `constelation`;
CREATE TABLE `constelation` (
  `Id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(512) NOT NULL,
  `enable` bit(1) NOT NULL DEFAULT b'1',
  `cloud_level` tinyint(4) DEFAULT NULL COMMENT 'From 1 to 10',
  `phase_of_moon` tinyint(4) DEFAULT NULL,
  `type_of_precipitation` tinyint(4) DEFAULT NULL,
  `fog_density` tinyint(4) DEFAULT NULL COMMENT 'From 1 to 10'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `constelation`
--

INSERT INTO `constelation` (`Id`, `name`, `description`, `image`, `enable`, `cloud_level`, `phase_of_moon`, `type_of_precipitation`, `fog_density`) VALUES
(1, 'starTTTddd', 'starTTTT11', '', b'1', 2, 1, 0, 5),
(2, 'constelation2', 'constelation2', '', b'1', 10, 2, 0, 2),
(3, 'TESTTEST', 'TESTTEST', '', b'1', 6, 2, 0, 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `star`
--

DROP TABLE IF EXISTS `star`;
CREATE TABLE `star` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `star`
--

INSERT INTO `star` (`id`, `name`, `description`, `image`) VALUES
(1, 'starTTT', 'starTTTT11', ''),
(3, 'star3', 'star3', ''),
(5, 'Star4', 'Star4', ''),
(15, 'TESTT', 'TESTT', '');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `star_constelation`
--

DROP TABLE IF EXISTS `star_constelation`;
CREATE TABLE `star_constelation` (
  `star_id` int(11) NOT NULL,
  `constelation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `star_constelation`
--

INSERT INTO `star_constelation` (`star_id`, `constelation_id`) VALUES
(1, 2),
(3, 2),
(5, 2),
(1, 1),
(3, 1),
(5, 1),
(15, 0),
(1, 3),
(3, 3),
(5, 3),
(15, 3);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `constelation`
--
ALTER TABLE `constelation`
  ADD PRIMARY KEY (`Id`);

--
-- Indeksy dla tabeli `star`
--
ALTER TABLE `star`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `constelation`
--
ALTER TABLE `constelation`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `star`
--
ALTER TABLE `star`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
