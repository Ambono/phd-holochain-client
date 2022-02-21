#!/bin/bash
sleep 60;
for i in {1..300}; do npm run app; echo $i of 300; done; sleep 30;
for i in {1..400}; do npm run app; echo $i of 400; done; sleep 30;
for i in {1..500}; do npm run app; echo $i of 500; done; sleep 30;
for i in {1..5}; do npm run app; echo $i of 50; done; sleep 30;
