drop database college_recommender;
create database college_recommender;
use college_recommender;
create table college (collegeName VARCHAR(100) NOT NULL, state VARCHAR(2) NOT NULL, region VARCHAR(45) NOT NULL, ACTComposite INT NOT NULL, SATEBRWScore INT NOT NULL, SATMathScore INT NOT NULL, admissionRatePercent INT NOT NULL, `rank` INT NOT NULL, institutionType VARCHAR(45) NOT NULL, medianCompletedStudentDebt INT NOT NULL, size VARCHAR(45) NOT NULL, PRIMARY KEY(collegeName));
create table college_declaration (userID INT NOT NULL, collegeName VARCHAR(90) NOT NULL, acceptanceStatus VARCHAR(45) NOT NULL, questionable BOOL NOT NULL DEFAULT false, PRIMARY KEY (`userID`, `collegeName`));
create table high_school (highSchool VARCHAR(50) NOT NULL, administrationScore VARCHAR(20) NOT NULL, readingProficiencyPerc INT NOT NULL, mathProficiencyPerc INT NOT NULL, averageSATScore INT NOT NULL, averageACTScore INT NOT NULL, averageSATEBRWScore INT NOT NULL, averageSATMathScore INT NOT NULL, favoriteMajors VARCHAR(200) NULL DEFAULT NULL);
create table `profile` (userID INT NOT NULL, SATMath INT, SATEBRW INT, ACTEng INT, ACTMath INT, ACTReading INT, ACTSci INT, ACTComp INT, ACTLit INT, APUSHist INT, APWorldHist INT, APMathI INT, APMathII INT, APEcoBio INT, APMolBio INT, APChem INT, APPhysics INT, passedAPAmount INT, PRIMARY KEY (`userID`));
create table student (userID INT NOT NULL, state VARCHAR(20), highSchoolCity VARCHAR(50), major1 VARCHAR(20), major2 VARCHAR(20), highSchool VARCHAR(20), highSchoolGPA DOUBLE, PRIMARY KEY (`userID`));
create table `user` (username VARCHAR(45) NOT NULL, userPassword VARCHAR(45) NOT NULL, userID INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(45) NOT NULL, PRIMARY KEY (`userID`));

ALTER TABLE college_declaration ADD CONSTRAINT FK_studentID_collegeDec FOREIGN KEY (userID) REFERENCES `student`(userID);
ALTER TABLE college_declaration ADD CONSTRAINT FK_college FOREIGN KEY (collegeName) REFERENCES `college`(collegename);
ALTER TABLE student ADD CONSTRAINT FK_userID FOREIGN KEY (userID) REFERENCES `user`(userID);
ALTER TABLE `profile` ADD CONSTRAINT FK_studentIDProfile FOREIGN KEY (userID) REFERENCES `student`(userID);