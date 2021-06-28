# Temperature Server for MLX Temperature Sensor  
Contains a Dart Web Server for reading from a websocket hosted on the pi.  
The python reader.py script reads the sensor input live and then opens a  
websocket and pipes the information to the front end.  
The app.js node server is for controlling the temperature reader elements  
with rest endpoints due to frequent restarts required. 