#!/bin/bash
sleep 90;
for i in {1..250}; do npm run app; echo $i of 250; done; sleep 5;
for i in {1..300}; do npm run app; echo $i of 300; done; sleep 5;
for i in {1..400}; do npm run app; echo $i of 400; done; sleep 5;
for i in {1..50}; do npm run app; echo $i of 500; done; sleep 5;
