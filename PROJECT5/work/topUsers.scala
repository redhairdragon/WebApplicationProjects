val lines = sc.textFile ("twitter.edges")
val links=lines.flatMap(line => line.split(": ")(1).split(","))
val link1s=links.map(link=>(link,1))
val followCounts= link1s.reduceByKey((a,b)=>a+b)
val top=followCounts.filter{case (_,x)=>x>1000}
top.saveAsTextFile("./output")