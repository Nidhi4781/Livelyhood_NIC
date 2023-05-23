--select (select coursename from Course where coursecode=t.coursecode) as coursename,t.coursecode,(count(*)) as totalApplication 
--from TraineeRegistration t 
--where Dist=649
--group by t.coursecode



SELECT Course.coursename,TraineeRegistration.coursecode,(count(*)) as totalApplication 
  FROM TraineeRegistration
 JOIN Course
    ON Course.coursecode = TraineeRegistration.coursecode
  where TraineeRegistration.Dist=649
 GROUP BY TraineeRegistration.coursecode ,Course.coursename



 select count(*) from TraineeRegistration