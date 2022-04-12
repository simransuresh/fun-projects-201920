-- MySQL dump 10.17  Distrib 10.3.16-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: user_db
-- ------------------------------------------------------
-- Server version	10.3.16-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_details`
--

DROP TABLE IF EXISTS `auth_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_details` (
  `username` varchar(20) NOT NULL,
  `password` varchar(20) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_details`
--

LOCK TABLES `auth_details` WRITE;
/*!40000 ALTER TABLE `auth_details` DISABLE KEYS */;
INSERT INTO `auth_details` VALUES ('simran','pass123',1);
/*!40000 ALTER TABLE `auth_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `img2`
--

DROP TABLE IF EXISTS `img2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `img2` (
  `name` varchar(10) DEFAULT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(10) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `usertype` int(11) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `img2`
--

LOCK TABLES `img2` WRITE;
/*!40000 ALTER TABLE `img2` DISABLE KEYS */;
INSERT INTO `img2` VALUES ('chintu','chintu','12345','',1,1),('den','den','den','RVmJOPT9Ud6HI2ISSM3_o3qQ.jpg',0,0),('sed','des','$2b$10$6lo','_qIWw2R6G_nL8YPUEsSxDNU9.jpg',1,0),('wmdokc','fed','$2b$10$6mw','',1,0),('friday','friday','weekend','fDjHvkV9q3MfgNAaCLC7HoI9.jpg',1,0),('simran','gaya','123','',1,0),('gaya','gaya3','1212','',1,0),('simsim','gayuuu','123','JjRrqQD96_p4HlRyhaBGvDtB.jpg',1,0),('guru','guru','$2b$10$Jmp','dvBPtWYVp58pMst9m8jUE5ev.jpg',1,0),('guru','guru123','$2b$10$58o','w872gPnhOpZ4XsO2DmhxnFHd.jpg',1,0),('monday1','monday1','monday1','aRFDU_rcFQBwhWcuvPHO4EHQ.jpg',1,1),('monday2','monday2','monday2','5lP8u2d63vIrZ7sHQLiU-Bb-.jpg',1,2),('simran','mwiowmco','pass123','5t_ALrHpu2ShVV-0KDrdpZTP.jpg',1,0),('myuser','myuser','user1','2n248jXC-94U_w9IDOra86uD.jpg',1,0),('myuser','myuser1','$2b$10$MII','vVe10OjdDU6OApTkZFcF0DNO.jpg',1,0),('shinchan','ncwiw','234','hVBSKEexvDBd3zf3TPnBCxT8.jpg',1,0),('one','one','one','BTqsmFjlZNdNyr4gLQJ_uEst.jpg',1,0),('fnrwqi','sed','$2b$10$O5P','jz-MH1dTASESga8u1x9cfjMF.jpg',1,0),('shinchan','shinchan','pass123','',1,0),('simsim','sim1','simsim','axguHt9PVM0Cmr13HZD5V5iq.jpg',1,0),('sim','sim123','$2b$10$/NF','2q8YOmCJf6GTtYsdgzbxjA2G.jpg',0,0),('sim1','sim3','1231','AjQ_oQiCd7dHNIOMXKyDLu-R.jpg',1,0),('simran','simran','123123','I7ZTwtOoDXoCEVeZKc6v0Fu1.jpg',1,2),('simran','simsim','pass123','42moipdiBXHDeqctBKqNhMfn.jpg',1,0),('smra','smmwdo','pass123','kGL8mMktbeJc8OXksDiW0RnM.jpg',1,0),('trial1','test1','123','vy2CW2F9-fya2xWYMndCLj4k.jpg',1,0),('dqd','test2','pwd','AeB2kA0lEh1xv1ilCDGXvHcX.jpg',1,0),('two','two','two','vVQP1pDslYEgmaut28rZsFom.jpg',1,0),('user1','user1','123123','',1,0),('user123','user123','1212','SMNSXgyHWz6ju_nKxB3skjHl.jpg',1,0),('user2','user2','pic123','',1,0),('user21','user21','1212','4G1MevrHebN5Bg2rKMgnz3-E.jpg',1,0),('user56','user3','12345','IMl0-eA8vMaFR3iKt5CFmRcO.jpg',1,0),('user23','user32','2332','URI_RrAR0NbGFbFdyLFtYjQB.jpg',1,0),('user34','user34','1212','l_uPZyTBdS3U7yNCTkk16Xk8.jpg',1,0),('user45','user45','123','userAuthsrcassetsn36j-ohlC4QW8pDIMuWbGKi.jpg',1,0),('user46','user46','1212','YzvEMqmhyt3el7xqBIFYj0eh.jpg',1,0),('use67','user67','$2b$10$bpJ','RwxmTwaxWWHZTSJnOXYIEnIz.jpg',1,0),('ccnwiqw','wnejin','wmoc','DT4h2PLk3MXESpMD0Tb9RIRc.jpg',1,0),('dww','xsa','$2b$10$e34','csJY79-eQTZmTZErPZU6oWVj.jpg',1,0);
/*!40000 ALTER TABLE `img2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imgupload`
--

DROP TABLE IF EXISTS `imgupload`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `imgupload` (
  `name` varchar(20) DEFAULT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imgupload`
--

LOCK TABLES `imgupload` WRITE;
/*!40000 ALTER TABLE `imgupload` DISABLE KEYS */;
INSERT INTO `imgupload` VALUES ('gaya3','gaya','123','/img2.png',1),('simran','test','XXX','C:Desktopimg1.png',1),('simran12','test2','pwd','uploads\npHhe7YxAIzUuYwOuFlfY5f9.jpg',1),('simran','ydmomwq','pwd','',1);
/*!40000 ALTER TABLE `imgupload` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `new_users`
--

DROP TABLE IF EXISTS `new_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `new_users` (
  `name` varchar(20) DEFAULT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `usertype` int(11) NOT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` text DEFAULT NULL,
  `login_time` text DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `new_users`
--

LOCK TABLES `new_users` WRITE;
/*!40000 ALTER TABLE `new_users` DISABLE KEYS */;
INSERT INTO `new_users` VALUES ('admin','admin','$2b$10$Q7EK3T5J6rTlXJddpJklI.cz6bIneLMSkmQU5pqexWCpNu38tLHe2','kSxVpSMT4g1sBrr4kP2b3rCe.jpg',1,1,'2019/08/08 10:38:11','2019/08/09 15:46:04'),('user1','user1','$2b$10$lgI4TUWMUqRykzuV.XIzO.f7Uh1.k8EDBAlo84ipC2gJCr2eYQWmO','0pgc6_2RpEwafypPtsHRjx_t.jpg',2,1,'2019/08/08 10:38:29','2019/08/09 13:45:35'),('user2','user2','$2b$10$wG0plg8IeTUkmX3yI4RQFuHLhATsOlaPX97wg5t3ZJyOgVdAJB2Xi','eQoNUCgIrdtyD40rSjVRcEA3.jpg',2,1,'2019/08/08 10:38:44','2019/08/09 15:46:40'),('user3','user3','$2b$10$Y8/YhhlyTFMPc47lMmKgQug4If2.Qzkq38DhfmuR16rPm6gS08WcS','u-Epm925ZzCTYyVy7L3Eeurr.jpg',2,1,'2019/08/08 10:38:58','2019/08/07 15:08:02'),('user4','user4','$2b$10$6.w1oC9qCuuMAzlatiSgP.mJ.4nII4cjORuueRmJOGyO.T8E9SiWe','',2,1,'2019/08/09 10:16:05','2019/08/08 10:34:42'),('user5','user5','$2b$10$N/za7VKZasfbBUZQ3H9Xu.fC52ZkqKyJbUsLFPKIx5LS92Fb7IJtG','',2,1,'2019/08/09 10:18:26','2019/08/09 10:19:32');
/*!40000 ALTER TABLE `new_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `username` varchar(20) DEFAULT NULL,
  `login` tinyint(1) DEFAULT NULL,
  `profile` tinyint(1) DEFAULT NULL,
  `upload` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('admin',1,1,1),('user1',1,1,1),('user2',1,1,0),('user3',1,1,1),('user4',1,1,1),('user4',1,1,1),('admin',1,1,1),('user1',1,1,1),('user2',1,1,0),('user3',1,1,1),('user4',1,1,1),('user5',1,1,1);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `tasks` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES ('start exercise'),('choose one game'),('pick a flower'),('play guitar');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_tasks`
--

DROP TABLE IF EXISTS `user_tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_tasks` (
  `assigned_tasks` text DEFAULT NULL,
  `start_time` text DEFAULT NULL,
  `end_time` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tasks`
--

LOCK TABLES `user_tasks` WRITE;
/*!40000 ALTER TABLE `user_tasks` DISABLE KEYS */;
INSERT INTO `user_tasks` VALUES ('start exercise','2019/08/07 11:06:21','2019/08/07 11:11:21'),('choose one game','2019/08/07 11:27:05','2019/08/07 11:32:05'),('play guitar','2019/08/07 16:19:16','2019/08/07 16:24:16'),('pick a flower','2019/08/07 16:48:57','2019/08/07 16:53:57'),('start exercise','2019/08/07 16:48:57','2019/08/07 16:53:57'),('choose one game','2019/08/07 16:48:57','2019/08/07 16:53:57'),('start exercise','2019/08/07 16:54:04','2019/08/07 16:59:04'),('pick a flower','2019/08/07 16:54:19','2019/08/07 16:59:19'),('play guitar','2019/08/07 16:54:48','2019/08/07 16:59:48'),('start exercise','2019/08/08 15:21:15','2019/08/08 15:26:15'),('play guitar','2019/08/08 15:21:54','2019/08/08 15:26:54'),('pick a flower','2019/08/08 18:17:19','2019/08/08 18:22:19'),('pick a flower','2019/08/09 15:46:28','2019/08/09 15:51:28');
/*!40000 ALTER TABLE `user_tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userinfo` (
  `name` varchar(20) DEFAULT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinfo`
--

LOCK TABLES `userinfo` WRITE;
/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
INSERT INTO `userinfo` VALUES ('user1','user1','user1',1);
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `name` varchar(20) NOT NULL,
  `email` varchar(20) DEFAULT NULL,
  `pwd` varchar(20) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('ABC','ABC@123.com','XXXX',1),('ABC2','ABC2@123.com','XXXX',0),('ABC3','ABC3@123.com','XXXX',0),('ABC4','ABC4@123.com','XXXX',1),('simran','simran@gmail.com','pass123',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-09 16:43:53
