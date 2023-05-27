-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 28 Maj 2023, 01:03
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

CREATE TABLE `constelation` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(512) NOT NULL,
  `to_show` tinyint(1) NOT NULL,
  `cloud_level` tinyint(4) DEFAULT NULL COMMENT 'From 1 to 10',
  `phase_of_moon` tinyint(4) DEFAULT NULL,
  `type_of_precipitation` tinyint(4) DEFAULT NULL,
  `fog_density` tinyint(4) DEFAULT NULL COMMENT 'From 1 to 10'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `constelation`
--

INSERT INTO `constelation` (`id`, `name`, `description`, `image`, `to_show`, `cloud_level`, `phase_of_moon`, `type_of_precipitation`, `fog_density`) VALUES
(7, 'Orion (Orion)', '        Orion to jedna z najbardziej rozpoznawalnych konstelacji na niebie. W jej centrum znajduje się pas Oriona, który składa się z trzech jasnych gwiazd', '\\uploads\\3af74ef2-99d3-4f65-b2e3-1095c5900107.png', 1, 1, 1, 0, 6),
(8, 'Wielka Niedźwiedzica (Ursa Major)', '    Wielka Niedźwiedzica to jedna z najbardziej znanych i łatwo rozpoznawalnych konstelacji na półkuli północnej. Ma charakterystyczną siedmiostronną formację.', '\\uploads\\a473a528-98d4-4abd-9d98-7e19e57b3e33.jpg', 1, 1, 1, 1, 1),
(9, 'Kasjopeja (Cassiopeia)', '    Kasjopeja to konstelacja na północnej półsferze niebieskiej. Ma charakterystyczną kształt litery \"M\" lub \"W\".', '\\uploads\\a4be433c-7f7e-49c9-b8b1-37a4e221c93c.jpg', 1, 1, 1, 1, 1),
(10, 'Strzała (Sagitta)', '    Strzała to mała konstelacja na niebie, przedstawiająca strzałę. Jest jedną z oryginalnych 48 konstelacji wymienionych przez Ptolemeusza.', '\\uploads\\189374d7-e02d-48c6-b05f-aa7763a60234.jpg', 1, 1, 1, 1, 1),
(11, 'Żagiel (Vela)', 'Żagiel to konstelacja na południowej półkuli nieba, przedstawiająca żagiel statku. ', '\\uploads\\dad5a966-3a07-40c4-b171-e06077d3f42b.jpg', 1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `star`
--

CREATE TABLE `star` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(512) NOT NULL,
  `to_show` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `star`
--

INSERT INTO `star` (`id`, `name`, `description`, `image`, `to_show`) VALUES
(25, 'Betelgeza (Alpha Orionis)', 'Jest to czerwony nadolbrzym o olbrzymiej jasności', '\\uploads\\a8f05c35-00d1-46b3-b85b-2033adc61b0a.jpg', 1),
(26, 'Rigel (Beta Orionis)', 'Rigel to błękitno-biała gwiazda będąca jedną z najjaśniejszych na niebie.', '\\uploads\\5960487e-67fd-4dd0-9377-e2a71338899e.jpg', 1),
(27, 'Mintaka (Delta Orionis)', 'Mintaka to trzecia gwiazda w pasie Oriona, o jasności podobnej do Rigel.', '\\uploads\\5bc30db8-9a33-4f22-a17a-1ba3a9ae2e86.jpg', 1),
(28, 'Alnitak (Zeta Orionis)', 'Alnitak jest jasną gwiazdą wielokrotną, składającą się z trzech składników.', '\\uploads\\544ced9a-5ec2-45c0-8bf1-c200455090b7.png', 1),
(29, 'Saiph (Kappa Orionis)', ' Saiph to jasna, nieco błękitna gwiazda znajdująca się w pobliżu Rigel.', '\\uploads\\86f65282-4a16-4314-ac4c-b16e377e8786.jpg', 1),
(30, 'Dubhe (Alpha Ursae Majoris)', 'Dubhe to najjaśniejsza gwiazda Wielkiej Niedźwiedzicy.', '\\uploads\\a135a5a5-06b2-40e2-b3fc-fe104fc97c80.jpg', 1),
(31, 'Merak (Beta Ursae Majoris)', 'Merak jest jedną z dwóch gwiazd tworzących krawędź \"wanny\" konstelacji.', '\\uploads\\82be5382-20ca-4a3c-bcfc-bd8e9a7b78b8.jpg', 1),
(32, 'Phecda (Gamma Ursae Majoris):', 'Phecda to kolejna jasna gwiazda znajdująca się w \"wannie\".', '\\uploads\\6eb7c938-fb04-4787-9de5-3ac958cb46e6.jpg', 1),
(33, 'Megrez (Delta Ursae Majoris)', 'Megrez to gwiazda w górnej części uchwytu \"wanny\".', '\\uploads\\8dc0e630-307b-46bc-827a-be47ff55fab0.jpg', 1),
(34, 'Alioth (Epsilon Ursae Majoris):', 'Alioth jest jedną z najjaśniejszych gwiazd w konstelacji.', '\\uploads\\a4f7c6db-fbdf-4d12-802a-6753f463b941.jpg', 1),
(35, 'Schedar (Alpha Cassiopeiae)', 'Schedar to najjaśniejsza gwiazda w Kasjopei.', '\\uploads\\17f26e4a-a817-41a9-8a36-17cfbb85607c.jpg', 1),
(36, 'Caph (Beta Cassiopeiae)', 'Caph to druga co do jasności gwiazda w konstelacji.', '\\uploads\\b69cbeb4-5298-4af0-b083-bb3ededb1cd2.jpg', 1),
(37, 'Gamma Cassiopeiae', 'Gamma Cassiopeiae to gwiazda zmienna o zmiennej jasności.', '\\uploads\\c82efd65-0419-45d5-9260-dfd0b7298563.jpg', 1),
(38, 'Ruchbah (Delta Cassiopeiae)', 'Ruchbah jest gwiazdą wielokrotną, składającą się z pięciu składników.', '\\uploads\\aa200dbd-3c08-41de-b3ed-8dd1edf8e585.jpg', 1),
(39, 'Achird (Eta Cassiopeiae)', 'Achird to gwiazda podwójna z dwoma składnikami o podobnej jasności.', '\\uploads\\201f12a0-bdae-4ed7-85c4-af76b0b3c760.jpg', 1),
(40, 'Gamma Sagittae', 'Gamma Sagittae to najjaśniejsza gwiazda w konstelacji.', '\\uploads\\a2f17cd3-1c51-48c7-ba35-61e560577068.jpg', 1),
(41, 'Delta Sagittae', 'Delta Sagittae to gwiazda wielokrotna, składająca się z trzech składników.', '\\uploads\\8e2531a0-cab7-417d-aea3-2b3220126b6e.jpg', 1),
(42, 'Epsilon Sagittae', 'Epsilon Sagittae to kolejna gwiazda wielokrotna, składająca się z pięciu składników.', '\\uploads\\36f54df5-f180-4c06-aa7e-f61019563887.jpg', 1),
(43, 'Zeta Sagittae', 'Zeta Sagittae to biała gwiazda podobna do Słońca.', '\\uploads\\12d73e54-16ff-40c9-a957-b80835882ee1.jpg', 1),
(44, 'Alpha Sagittae', 'Alpha Sagittae to jasna gwiazda typu widmowego A.', '\\uploads\\f4a328ff-cede-4203-8cad-1c1e22f9d69f.jpg', 1),
(45, 'Suhail al Muhlif (Lambda Velorum)', 'Suhail al Muhlif to najjaśniejsza gwiazda w konstelacji.', '\\uploads\\d06c2c2c-0ee8-405d-8eaf-dadf72e6c210.jpg', 1),
(46, 'Kappa Velorum', 'Kappa Velorum to gwiazda wielokrotna, składająca się z czterech składników.', '\\uploads\\e1d78e08-f0d3-43da-a43e-1f05eec62471.jpg', 1),
(47, 'Delta Velorum', 'Delta Velorum to jasna gwiazda o błękitnym kolorze.', '\\uploads\\f457a319-a20b-4b54-90f5-ae9cecb9d7c7.jpg', 1),
(48, 'HD 73634', 'HD 73634 to jasna gwiazda, wokół której odkryto egzoplanetę.', '\\uploads\\da1f0b8f-0474-4d49-8e76-61ebc57ce73c.jpg', 1),
(49, 'HD 7199', 'HD 7199 to układ podwójny składający się z dwóch żółtych gwiazd.', '\\uploads\\40bfc994-1b53-4157-94fe-4c12c78ff719.jpg', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `star_constelation`
--

CREATE TABLE `star_constelation` (
  `star_id` int(11) NOT NULL,
  `constelation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `star_constelation`
--

INSERT INTO `star_constelation` (`star_id`, `constelation_id`) VALUES
(30, 0),
(31, 0),
(32, 0),
(33, 0),
(34, 0),
(30, 8),
(31, 8),
(32, 8),
(33, 8),
(34, 8),
(35, 0),
(36, 0),
(37, 0),
(38, 0),
(39, 0),
(35, 9),
(36, 9),
(37, 9),
(38, 9),
(39, 9),
(40, 0),
(41, 0),
(42, 0),
(43, 0),
(44, 0),
(40, 10),
(41, 10),
(42, 10),
(43, 10),
(44, 10),
(45, 0),
(46, 0),
(47, 0),
(48, 0),
(49, 0),
(45, 11),
(46, 11),
(47, 11),
(48, 11),
(49, 11),
(25, 7),
(26, 7),
(27, 7),
(28, 7),
(29, 7);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `constelation`
--
ALTER TABLE `constelation`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT dla tabeli `star`
--
ALTER TABLE `star`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
