# iot-vehicle-counter
This repository contains the code and 3D models required to build a camera-enabled IoT vehicle counter device and its companion web application. Read the [project guide](https://www.hackster.io/rhammell/predictive-maintenance-of-roads-using-an-iot-vehicle-counter-d28b21) on Hackster.io for a complete project description and build tutorial.

## Project Description
This device and web application can be used in combination to monitor and analyze the amount of vehicle traffic a road receives, enabling traffic engineers to better determine when road maintenance will be needed.

The vehicle counter consists of electronics housed in a 3D printed body, which attaches to a signpost or other object alongside a road designated to be monitored.

When powered on, the device continuously captures images of the road using its onboard camera and processes them through a custom object detection model that can detect vehicles. As vehicles drive past the device, they are captured in an image and detected.

Each time a vehicle is detected, the device's cellular connectivity is utilized to send detection messages to a cloud service and store the detections in a database, accumulating a total vehicle count for that device.

The web application provides users with an interactive map that shows the locations of deployed devices, as well as their real-time vehicle counts. Daily average vehicle counts are calculated and displayed as well.

## Demo Video
[![Video](https://img.youtube.com/vi/SLzzm7CUwOk/0.jpg)](https://www.youtube.com/watch?v=SLzzm7CUwOk)
