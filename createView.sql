USE [livelihoodDB]
GO

/****** Object:  View [dbo].[AllPendingApplication]    Script Date: 3/29/2023 4:49:39 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[AllPendingApplication]  
AS   
SELECT Course.coursename,TraineeRegistration.coursecode,(count(*)) as totalApplication ,TraineeRegistration.Dist 
  FROM TraineeRegistration
 JOIN Course
    ON Course.coursecode = TraineeRegistration.coursecode
  where TraineeRegistration.apoAction=1
 GROUP BY TraineeRegistration.coursecode ,Course.coursename,TraineeRegistration.Dist;  
GO


