install the custom jar file using below command and then use it in the pom.xml file.
mvn install:install-file -Dfile="D:\JAR Files\atmosphere-runtime-3.0.10_jdk8-sources.jar" -DgroupId=org.atmosphere -DartifactId=atmosphere-runtime -Dversion=3.6.9 -Dpackaging=jar
