FROM tomcat:9

# Set the working directory
WORKDIR /usr/local/tomcat/webapps

# Copy the WAR file from the host machine to the container
COPY target/study-library-svc.jar .

# Expose the default Tomcat port
EXPOSE 8080

# Start Tomcat when the container is run
CMD ["catalina.sh", "run"]