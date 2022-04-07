#!/bin/bash

for ((i=2; i<=18; i++))
    do 
        fileName="volunteersFormatted$i.json"
        aws dynamodb batch-write-item --request-items file://$fileName
        echo " $i Batch Finished "
    done