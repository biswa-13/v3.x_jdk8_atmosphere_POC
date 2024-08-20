There is no official atmosphere-runtime version 3.6.9, it's a customized one created to support the JDK8 along with Javax.servlet. The source files and the jar file is available in atmosphere-runtime folder-3.6.9, please follow below steps to use it in your maven project. <br/>

install the custom jar file using the below command and then use it in the pom.xml file. <br/>
mvn install:install-file -Dfile="D:\JAR Files\atmosphere-runtime-3.0.10_jdk8-sources.jar" -DgroupId=org.atmosphere -DartifactId=atmosphere-runtime -Dversion=3.6.9 -Dpackaging=jar
